function parseKanban(content) {
  // Strip the %% kanban:settings %% block and anything after it
  const stripped = content.replace(/%%[\s\S]*?%%/g, '').trim();
 
  const columns = [];
  let currentColumn = null;
 
  for (const rawLine of stripped.split('\n')) {
    const line = rawLine.trim();
    if (!line) continue;
 
    // Column heading
    if (line.startsWith('## ')) {
      currentColumn = { title: line.slice(3).trim(), cards: [] };
      columns.push(currentColumn);
      continue;
    }
 
    // Card (checked or unchecked) — handle nested bullet indentation
    const cardMatch = line.match(/^-\s+\[( |x)\]\s*(.*)/i);
    if (cardMatch && currentColumn) {
      const done = cardMatch[1].toLowerCase() === 'x';
      const text = cardMatch[2].trim();
      // Skip blank card text (artefact of nested lists in the raw file)
      if (text) {
        currentColumn.cards.push({ done, text });
      }
      continue;
    }
  }
 
  return columns;
}
 
function renderKanban(columns, meta) {
  const title = meta.title || 'kanban board';
 
  const colsHtml = columns.map(col => {
    const cards = col.cards.map(card => {
      const doneClass = card.done ? ' kanban-card--done' : '';
      const icon = card.done
        ? '<span class="kanban-card__icon" aria-hidden="true">✓</span>'
        : '<span class="kanban-card__icon" aria-hidden="true">○</span>';
      return `<li class="kanban-card${doneClass}">${icon}<span class="kanban-card__text">${escapeHtml(card.text)}</span></li>`;
    }).join('\n');
 
    const cardCount = col.cards.length;
    const doneCount = col.cards.filter(c => c.done).length;
    const countLabel = cardCount > 0
      ? `<span class="kanban-col__count">${doneCount}/${cardCount}</span>`
      : '';
 
    return `
    <div class="kanban-col">
      <div class="kanban-col__header">
        <h3 class="kanban-col__title">${escapeHtml(col.title)}</h3>
        ${countLabel}
      </div>
      <ul class="kanban-col__cards">
        ${cards || '<li class="kanban-card kanban-card--empty">—</li>'}
      </ul>
    </div>`;
  }).join('\n');
 
  return `
<div class="kanban-board" aria-label="${escapeHtml(title)}">
  <div class="kanban-board__columns">
    ${colsHtml}
  </div>
</div>`;
}
 
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
 
// Eleventy transform — wraps the rendered page content
function kanbanTransform(content, outputPath) {
  // Only act on HTML output pages
  if (!outputPath || !outputPath.endsWith('.html')) return content;
 
  // Check if this page has the kanban-plugin frontmatter flag
  // Eleventy has already rendered the markdown; we detect via a sentinel
  // we inject in the template (see note below), or by checking the data cascade.
  // Simplest approach: check for the rendered artefact of the ## headings
  // combined with the settings block remnant — but cleanest is the template approach.
  // This transform is a no-op; use the paired shortcode instead (see below).
  return content;
}
 
// --- Eleventy shortcode approach (recommended) ---
//
// This is cleaner than a blind transform. In .eleventy.js:
//
//   const { renderKanbanFromFile } = require('./kanban-transform');
//   eleventyConfig.addShortcode('kanban', renderKanbanFromFile);
//
// Then in your layout template, detect kanban-plugin frontmatter and call:
//   {% if kanban-plugin %}{% kanban page.inputPath %}{% endif %}
//
// Or use the Eleventy computed data approach shown further down.
 
const fs = require('fs');
const matter = require('gray-matter'); // already a dep in most Eleventy setups
 
function renderKanbanFromFile(inputPath) {
  try {
    const raw = fs.readFileSync(inputPath, 'utf8');
    const { data, content } = matter(raw);
    if (!data['kanban-plugin']) return '';
    const columns = parseKanban(content);
    return renderKanban(columns, data);
  } catch (e) {
    console.warn('[kanban-transform] Could not render:', inputPath, e.message);
    return '';
  }
}
 
// --- Eleventy computed data / template override approach (most robust) ---
//
// In .eleventy.js, add a custom template format that handles .md files
// with kanban-plugin frontmatter:
//
//   eleventyConfig.addExtension('md', {
//     key: 'md',
//     compile: async function(inputContent, inputPath) {
//       const matter = require('gray-matter');
//       const { data, content } = matter(inputContent);
//       if (data['kanban-plugin']) {
//         const { parseKanban, renderKanban } = require('./kanban-transform');
//         return async () => renderKanban(parseKanban(content), data);
//       }
//       // fall through to default markdown rendering
//       return undefined;
//     }
//   });
//
// NOTE: The addExtension override approach requires Eleventy 2.x.
 
module.exports = { parseKanban, renderKanban, renderKanbanFromFile, kanbanTransform };
 
