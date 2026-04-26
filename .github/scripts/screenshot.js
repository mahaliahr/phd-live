/**
 * screenshot.js
 * Captures homepage, note page, and graph page of PhD-Live.
 * Runs a pixel-diff against the most recent screenshot for each page
 * and only saves if the change is above the threshold.
 *
 */

const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');
const fs = require('fs');
const path = require('path');

// ─── Config ────────────────────────────────────────────────────────────────

const SITE_URL = process.env.SITE_URL || 'http://phd.mm-hr.com';

const PAGES = [
  { name: 'home',  path: '/' },
  { name: 'notes', path: '/notes' },
  { name: 'graph', path: '/graph' },
];

const VIEWPORT = { width: 1440, height: 900 };
const FULL_PAGE = true;

// Minimum percentage of pixels that must differ to save a new screenshot.
// 0.5% as default — catches real changes, ignores timestamps/cursors.
const DIFF_THRESHOLD = 0.005;

const OUTPUT_DIR = '/tmp/phd-screenshots';
const PREV_DIR   = path.join(OUTPUT_DIR, 'previous');

// ─── Helpers ────────────────────────────────────────────────────────────────

function loadPng(filepath) {
  const data = fs.readFileSync(filepath);
  return PNG.sync.read(data);
}

function isDifferentEnough(newImgPath, prevImgPath) {
  if (!fs.existsSync(prevImgPath)) return true; // No previous — always save

  try {
    const img1 = loadPng(prevImgPath);
    const img2 = loadPng(newImgPath);

    // If dimensions changed, always save
    if (img1.width !== img2.width || img1.height !== img2.height) return true;

    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(
      img1.data, img2.data, diff.data,
      width, height,
      { threshold: 0.1 }
    );

    const diffRatio = numDiffPixels / (width * height);
    console.log(`  diff ratio: ${(diffRatio * 100).toFixed(3)}%`);
    return diffRatio >= DIFF_THRESHOLD;

  } catch (err) {
    console.warn(`  Could not diff images: ${err.message} — saving anyway`);
    return true;
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

(async () => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.mkdirSync(PREV_DIR,   { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });

  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  for (const page of PAGES) {
    console.log(`\nCapturing: ${page.name} (${SITE_URL}${page.path})`);

    const tab = await context.newPage();
    await tab.goto(`${SITE_URL}${page.path}`, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for live widget to finish rendering on homepage
  if (page.name === 'home') {
    await tab.waitForSelector('#live-stream', { timeout: 10000 }).catch(() => {
      console.log('  live-stream not found, continuing anyway');
  });
}

// Small pause for any remaining rendering
await tab.waitForTimeout(3000);

    const tmpPath  = path.join(OUTPUT_DIR, `${page.name}_tmp.png`);
    const prevPath = path.join(PREV_DIR,   `${page.name}_latest.png`);
    const savePath = path.join(OUTPUT_DIR, `${date}_${page.name}.png`);

    await tab.evaluate(() => {
      document.body.style.overflow = 'visible';
      document.body.style.height = 'auto';
      document.documentElement.style.overflow = 'visible';
      document.documentElement.style.height = 'auto';
    });

    await tab.screenshot({ path: tmpPath, fullPage: FULL_PAGE });
    await tab.close();

    if (isDifferentEnough(tmpPath, prevPath)) {
      fs.copyFileSync(tmpPath, savePath);
      fs.copyFileSync(tmpPath, prevPath); // Update latest reference
      console.log(`  ✓ Saved: ${path.basename(savePath)}`);
    } else {
      console.log(`  — Skipped (no significant change)`);
    }

    fs.unlinkSync(tmpPath);
  }

  await browser.close();
  console.log('\nDone.');
})();
