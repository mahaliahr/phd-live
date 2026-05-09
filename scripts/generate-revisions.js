const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const NOTES_DIR = 'src/site/notes';
const OUTPUT = 'src/site/_data/revisions.json';

function stripFrontmatter(content) {
  return content.replace(/^---[\s\S]*?---\n?/, '').trim();
}

function getNoteDate(filepath) {
  // check filename first -- most reliable for daily notes
  const filename = path.basename(filepath, '.md');
  if (/^\d{4}-\d{2}-\d{2}$/.test(filename)) {
    return filename;
  }
  // fall back to frontmatter
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const { data } = matter(content);
    if (data['date-created'] && /^\d{4}-\d{2}-\d{2}$/.test(String(data['date-created']))) {
      return String(data['date-created']);
    }
    if (data.title && /^\d{4}-\d{2}-\d{2}$/.test(String(data.title))) {
      return String(data.title);
    }
    return null;
  } catch {
    return null;
  }
}

function getFullHistory(filepath) {
  try {
    return execSync(
      `git log --follow --unified=3 --format="COMMIT:%H|%ai" -p -- ${filepath}`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();
  } catch {
    return '';
  }
}

function parseHistory(raw) {
  if (!raw) return [];
  const entries = raw.split(/(?=COMMIT:)/);
  return entries
    .filter(e => e.trim())
    .map(entry => {
      const lines = entry.split('\n');
      const header = lines[0].replace('COMMIT:', '');
      const [hash, date] = header.split('|');
      const diff = lines.slice(1).join('\n');
      return {
        hash: hash.trim(),
        date: date.trim().slice(0, 10),
        diff
      };
    });
}

function parsePatchToDiff(patch) {
  if (!patch) return { diff: '', added: 0, removed: 0 };

  let result = '';
  let added = 0;
  let removed = 0;

  const lines = patch.split('\n');

  for (const line of lines) {
    if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
      continue;
    } else if (line.startsWith('+')) {
      const word = stripFrontmatter(line.slice(1).trim());
      if (word) {
        result += `{+${word}+} `;
        added += word.split(/\s+/).length;
      }
    } else if (line.startsWith('-')) {
      const word = stripFrontmatter(line.slice(1).trim());
      if (word) {
        result += `[-${word}-] `;
        removed += word.split(/\s+/).length;
      }
    }
  }

  return { diff: result.trim(), added, removed };
}

function collapseByDay(commits) {
  const byDay = {};
  for (const commit of commits) {
    if (!byDay[commit.date]) {
      byDay[commit.date] = commit;
    }
  }
  return Object.values(byDay).sort((a, b) => b.date.localeCompare(a.date));
}

function buildRevisions(filepath) {
  const raw = getFullHistory(filepath);
  if (!raw) return null;

  const commits = parseHistory(raw);
  if (commits.length === 0) return null;

  const collapsed = collapseByDay(commits);
  const noteDate = getNoteDate(filepath);

  const revisions = collapsed
    .filter(commit => !noteDate || commit.date >= noteDate)
    .map((commit) => {
      const { diff, added, removed } = parsePatchToDiff(commit.diff);
      return {
        date: commit.date,
        hash: commit.hash.slice(0, 7),
        wordCount: added,
        delta: added - removed,
        added,
        removed,
        diff
      };
    });

  if (revisions.length === 0) return null;

  return {
    noteDate,
    revisions
  };
}

// Main
const files = glob.sync(`${NOTES_DIR}/**/*.md`).filter(f =>
  !f.includes('notes/_templates') &&
  !f.includes('notes/_unpublished')
);

const output = {};

for (const filepath of files) {
  const slug = filepath
    .replace(NOTES_DIR + '/', '')
    .replace(/\.md$/, '')
    .replace(/^.*\//, '');

  const result = buildRevisions(filepath);
  if (result && result.revisions.length > 0) {
    output[slug] = result;
  }
}

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
console.log(`✓ Revisions generated for ${Object.keys(output).length} notes`);