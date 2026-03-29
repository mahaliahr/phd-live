const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const Diff = require('diff');

const NOTES_DIR = 'src/site/notes';
const OUTPUT = 'src/site/_data/revisions.json';

function getWordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
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
  let contextBuffer = [];

  const lines = patch.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('+++') || line.startsWith('---') || line.startsWith('@@')) {
      continue;
    } else if (line.startsWith('+')) {
      const word = line.slice(1).trim();
      if (word) {
        result += `{+${word}+} `;
        added += word.split(/\s+/).length;
      }
    } else if (line.startsWith('-')) {
      const word = line.slice(1).trim();
      if (word) {
        result += `[-${word}-] `;
        removed += word.split(/\s+/).length;
      }
    }
  }

  return { diff: result.trim(), added, removed };
}

function buildRevisions(filepath) {
  const raw = getFullHistory(filepath);
  if (!raw) return null;

  const commits = parseHistory(raw);
  if (commits.length === 0) return null;

  const collapsed = collapseByDay(commits);

  const revisions = collapsed.map((commit, i) => {
    const { diff, added, removed } = parsePatchToDiff(commit.diff);
    const wordCount = added; // approximate from this commit's additions

    return {
      date: commit.date,
      hash: commit.hash.slice(0, 7),
      wordCount,
      delta: added - removed,
      added,
      removed,
      diff
    };
  });

  return revisions;
}


function getCommitsForFile(filepath) {
    // DEBUG line if files not processing
    // console.log('Processing:', filepath);
  if (!filepath || filepath.trim() === '') return [];
  
  try {
    const log = execSync(
      `git log --follow --format="%H|%ai|%s" -- ${filepath}`,
      { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }
    ).trim();

    if (!log) return [];

    return log.split('\n').map(line => {
      const [hash, date, ...msgParts] = line.split('|');
      return {
        hash: hash.trim(),
        date: date.trim().slice(0, 10),
        message: msgParts.join('|').trim()
      };
    });
  } catch {
    return [];
  }
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


// Main
const files = glob.sync(`${NOTES_DIR}/**/*.md`).filter(f => !f.includes('notes/_templates'));
const output = {};

for (const filepath of files) {
  const slug = filepath
    .replace(NOTES_DIR + '/', '')
    .replace(/\.md$/, '');

  const revisions = buildRevisions(filepath);
  if (revisions && revisions.length > 0) {
    output[slug] = revisions;
  }
}

fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
console.log(`Revisions generated for ${Object.keys(output).length} notes`);
