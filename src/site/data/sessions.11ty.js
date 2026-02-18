const fs = require("fs");

class SessionsJson {
  data() {
    return { permalink: "/data/sessions.json", eleventyExcludeFromCollections: true };
  }

  normalizeToIso(raw) {
    if (!raw) return null;
    const s = String(raw).trim();

    // Try direct parse
    let d = new Date(s);
    if (!isNaN(d.getTime())) return d.toISOString();

    // Handle +0000 or +00:00 timezone format
    const tzMatch = s.match(/^(.+?)([+-]\d{2}):?(\d{2})$/);
    if (tzMatch) {
      const base = tzMatch[1].trim().replace(" ", "T");
      const tz = tzMatch[2] + ":" + tzMatch[3];
      d = new Date(base + tz);
      if (!isNaN(d.getTime())) return d.toISOString();
    }

    // Fallback: replace space with T and append Z
    const alt = s.replace(" ", "T") + "Z";
    d = new Date(alt);
    if (!isNaN(d.getTime())) return d.toISOString();

    return null;
  }

  parseSessionsFromContent(content) {
    const sessions = [];
    if (!content) return sessions;

    let sanitized = String(content)
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/```[\s\S]*?```/g, "");

    const startPattern = /start::\s*(.+?)(?:\n|$)/gi;
    let match;
    const starts = [];
    while ((match = startPattern.exec(sanitized)) !== null) {
      const raw = match[1].trim();
      if (/Y{2,4}|YYYY\-MM\-DD|YYYY|MM|DD/.test(raw)) continue;
      starts.push({ value: raw, index: match.index });
    }

    for (let i = 0; i < starts.length; i++) {
      const startInfo = starts[i];
      const nextStartIndex = starts[i + 1]?.index || sanitized.length;
      const block = sanitized.slice(startInfo.index, nextStartIndex);

      const topicMatch = /topic::\s*(.+?)(?:\n|$)/i.exec(block);
      const endMatch = /end::\s*(.+?)(?:\n|$)/i.exec(block);

      // Strip HTML tags from extracted values
      const stripHtml = (str) => str ? str.replace(/<[^>]*>/g, "").trim() : null;

      sessions.push({
        start: stripHtml(startInfo.value),
        topic: stripHtml(topicMatch ? topicMatch[1] : null),
        end: stripHtml(endMatch ? endMatch[1] : null),
      });
    }

    return sessions;
  }

  readRawContent(note) {
    const candidates = [
      note.templateContent,
      note.template?.inputContent,
      note.rawInput,
      note.template?.content,
      note.content,
    ];

    for (const c of candidates) {
      if (typeof c === "string" && c.trim().length) return c;
    }

    if (note.inputPath) {
      try {
        return fs.readFileSync(note.inputPath, "utf8");
      } catch (e) {
        // ignore
      }
    }
    return "";
  }

  render(data) {
    const sessions = [];
    const seen = new Set();

    const collectionsToCheck = [
      ...(data.collections?.daily || []),
      ...(data.collections?.sessions || []),
      ...(data.collections?.stream || []),
      ...(data.collections?.notes || []),
      ...(data.collections?.zettels || []),
      ...(data.collections?.all || []),
    ];

    for (const note of collectionsToCheck) {
      if (!note || !note.url) continue;
      if (seen.has(note.url)) continue;
      seen.add(note.url);

      const rawContent = this.readRawContent(note);
      const parsed = this.parseSessionsFromContent(rawContent);

      for (const s of parsed) {
        sessions.push({
          start: this.normalizeToIso(s.start) || s.start,
          end: this.normalizeToIso(s.end) || s.end || null,
          topic: s.topic,
          url: note.url,
          title: note.data?.title || note.fileSlug,
        });
      }

      if (Array.isArray(note.data?.sessions)) {
        for (const s of note.data.sessions) {
          sessions.push({
            start: this.normalizeToIso(s.start) || s.start,
            end: this.normalizeToIso(s.end) || s.end || null,
            topic: s.topic || note.data.topic || null,
            url: note.url,
            title: note.data?.title || note.fileSlug,
          });
        }
      } else if (note.data?.start) {
        sessions.push({
          start: this.normalizeToIso(note.data.start) || note.data.start,
          end: this.normalizeToIso(note.data.end) || note.data.end || null,
          topic: note.data.topic || null,
          url: note.url,
          title: note.data?.title || note.fileSlug,
        });
      }
    }

    sessions.sort((a, b) => {
      const da = isNaN(Date.parse(a.start)) ? 0 : new Date(a.start).getTime();
      const db = isNaN(Date.parse(b.start)) ? 0 : new Date(b.start).getTime();
      return db - da;
    });

    return JSON.stringify(sessions);
  }
}

module.exports = SessionsJson;