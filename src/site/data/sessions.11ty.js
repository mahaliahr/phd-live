class SessionsJson {
  data() {
    return { permalink: "/data/sessions.json", eleventyExcludeFromCollections: true };
  }

  parseSessionsFromContent(content) {
    const sessions = [];
    if (!content) return sessions;

    // Match session blocks (with or without <details> wrapper)
    // Pattern: start:: followed by datetime, optionally topic:: and end::
    const sessionRegex = /start::\s*([^\n]+?)(?:\n|$)(?:[\s\S]*?topic::\s*([^\n]+?))?(?:\n|$)?(?:[\s\S]*?end::\s*([^\n]+?))?(?:\n|<\/details>|$)/gi;
    
    let match;
    while ((match = sessionRegex.exec(content)) !== null) {
      const start = match[1]?.trim();
      const topic = match[2]?.trim() || null;
      const end = match[3]?.trim() || null;
      
      if (start) {
        sessions.push({ start, end, topic });
      }
    }

    return sessions;
  }

  render(data) {
    const sessions = [];
    
    // Get all daily/session notes
    const notes = [
      ...(data.collections?.daily || []),
      ...(data.collections?.sessions || []),
      ...(data.collections?.stream || []),
    ];

    // Deduplicate by URL
    const seen = new Set();
    const uniqueNotes = notes.filter(n => {
      if (seen.has(n.url)) return false;
      seen.add(n.url);
      return true;
    });

    for (const note of uniqueNotes) {
      // Parse sessions from note content
      const rawContent = note.template?.inputContent || note.rawInput || "";
      const parsedSessions = this.parseSessionsFromContent(rawContent);

      for (const s of parsedSessions) {
        sessions.push({
          start: s.start,
          end: s.end,
          topic: s.topic,
          url: note.url,
          title: note.data?.title || note.fileSlug,
        });
      }

    }

    // Sort by start time, newest first
    sessions.sort((a, b) => {
      const dateA = new Date(a.start);
      const dateB = new Date(b.start);
      return dateB - dateA;
    });

    return JSON.stringify(sessions);
  }
}

module.exports = SessionsJson;