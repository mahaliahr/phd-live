/**
 * _data/screenshots.js
 *
 * Fetches the list of screenshots from the phd-live-screenshots GitHub repo
 * at Eleventy build time and groups them by date into entries like:
 *   { date: '2025-06-04', home: '...url...', notes: '...url...', graph: '...url...' }
 *
 * Screenshots are served as raw GitHub URLs
 * If the fetch fails (e.g. repo not yet created), returns an empty array gracefully.
 */

const GITHUB_USER  = 'mahaliahr';
const SCREENSHOTS_REPO = 'phd-live-screenshots';
const BRANCH = 'main';

// GitHub API: list files in /screenshots folder
const API_URL = `https://api.github.com/repos/${GITHUB_USER}/${SCREENSHOTS_REPO}/contents/screenshots`;

// Raw file base URL
const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${SCREENSHOTS_REPO}/${BRANCH}/screenshots`;

module.exports = async function () {
  try {
    const res = await fetch(API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // If making the screenshots repo private, add:
        // 'Authorization': `Bearer ${process.env.SCREENSHOTS_PAT}`
        'User-Agent': 'phd-live-eleventy'
      }
    });

    if (!res.ok) {
      console.warn(`[screenshots] GitHub API returned ${res.status} — no screenshots loaded`);
      return [];
    }

    const files = await res.json();

    // Filenames are: YYYY-MM-DD_home.png, YYYY-MM-DD_notes.png, YYYY-MM-DD_graph.png
    const entries = {};

    for (const file of files) {
      const match = file.name.match(/^(\d{4}-\d{2}-\d{2})_(home|notes|graph)\.png$/);
      if (!match) continue;

      const [, date, page] = match;
      if (!entries[date]) entries[date] = { date };
      entries[date][page] = `${RAW_BASE}/${file.name}`;
    }

    // Return sorted chronologically (oldest first — the template reverses for display)
    return Object.values(entries).sort((a, b) => a.date.localeCompare(b.date));

  } catch (err) {
    console.warn(`[screenshots] Failed to fetch screenshots: ${err.message}`);
    return [];
  }
};
