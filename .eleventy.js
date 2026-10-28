const slugify = require("@sindresorhus/slugify");
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const fs = require("fs");
const matter = require("gray-matter");
const faviconsPlugin = require("eleventy-plugin-gen-favicons");
const tocPlugin = require("eleventy-plugin-nesting-toc");
const { parse } = require("node-html-parser");
const htmlMinifier = require("html-minifier-terser");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fg = require("fast-glob");

const { headerToId, namedHeadingsFilter } = require("./src/helpers/utils");
const { userMarkdownSetup, userEleventySetup } = require("./src/helpers/userSetup");

const { renderKanbanFromFile } = require('./scripts/kanban-transform');

const Image = require("@11ty/eleventy-img");
function transformImage(src, cls, alt, sizes, widths = ["500", "700", "auto"]) {
  let options = {
    widths: widths,
    formats: ["webp", "jpeg"],
    outputDir: "./dist/img/optimized",
    urlPath: "/img/optimized",
  };
  Image(src, options);
  let metadata = Image.statsSync(src, options);
  return metadata;
}

function getAnchorLink(filePath, linkTitle) {
  const {attributes, innerHTML} = getAnchorAttributes(filePath, linkTitle);
  return `<a ${Object.keys(attributes).map(key => `${key}="${attributes[key]}"`).join(" ")}>${innerHTML}</a>`;
}

function getAnchorAttributes(filePath, linkTitle) {
  let fileName = filePath.replaceAll("&amp;", "&");
  let header = "";
  let headerLinkPath = "";
  if (filePath.includes("#")) {
    [fileName, header] = filePath.split("#");
    headerLinkPath = `#${headerToId(header)}`;
  }

  let noteIcon = process.env.NOTE_ICON_DEFAULT;
  const title = linkTitle ? linkTitle : fileName;
  let permalink = `/notes/${slugify(filePath)}`;
  let deadLink = false;
  try {
    const startPath = "./src/site/notes/";
    const fullPath = fileName.endsWith(".md")
      ? `${startPath}${fileName}`
      : `${startPath}${fileName}.md`;
    const file = fs.readFileSync(fullPath, "utf8");
    const frontMatter = matter(file);
    if (frontMatter.data.permalink) {
      permalink = frontMatter.data.permalink;
    }
    if (
      frontMatter.data.tags &&
      frontMatter.data.tags.indexOf("gardenEntry") != -1
    ) {
      permalink = "/";
    }
    if (frontMatter.data.noteIcon) {
      noteIcon = frontMatter.data.noteIcon;
    }
  } catch {
    deadLink = true;
  }

  if (deadLink) {
    return {
      attributes: {
        "class": "internal-link is-unresolved",
        "href": "/404",
        "target": "",
      },
      innerHTML: title,
    }
  }
  return {
    attributes: {
      "class": "internal-link",
      "target": "",
      "data-note-icon": noteIcon,
      "href": `${permalink}${headerLinkPath}`,
    },
    innerHTML: title,
  }
}

const tagRegex = /(^|\s|\>)(#[^\s!@#$%^&*()=+\.,\[{\]};:'"?><]+)(?!([^<]*>))/g;

module.exports = {
  isKanban: (data) => !!data['kanban-plugin']
};

module.exports = function (eleventyConfig) {
  eleventyConfig.setLiquidOptions({ dynamicPartials: true });

  let markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .use(require("markdown-it-anchor"), { slugify: headerToId })
    .use(require("markdown-it-mark"))
    .use(require("markdown-it-footnote"))
    .use(markdownItAttrs)
    .use(function (md) {
      md.renderer.rules.hashtag_open = function (tokens, idx) {
        return '<a class="tag" onclick="toggleTagSearch(this)">';
      };
    })
    .use(require("markdown-it-mathjax3"), {
      tex: { inlineMath: [["$", "$"]] },
      options: { skipHtmlTags: { "[-]": ["pre"] } },
    })
    .use(require("markdown-it-task-checkbox"), {
      disabled: true,
      divWrap: false,
      divClass: "checkbox",
      idPrefix: "cbx_",
      ulClass: "task-list",
      liClass: "task-list-item",
    })
    .use(require("markdown-it-plantuml"), {
      openMarker: "```plantuml",
      closeMarker: "```",
    })
    .use(namedHeadingsFilter)
    .use(function (md) {
      //https://github.com/DCsunset/markdown-it-mermaid-plugin
      const origFenceRule =
        md.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        if (token.info === "mermaid") {
          const code = token.content.trim();
          return `<pre class="mermaid">${code}</pre>`;
        }
        if (token.info === "transclusion") {
          const code = token.content.trim();
          return `<div class="transclusion">${md.render(code)}</div>`;
        }
        if (token.info.startsWith("ad-")) {
          const code = token.content.trim();
          const parts = code.split("\n")
          let titleLine;
          let collapse;
          let collapsible = false
          let collapsed = true
          let icon;
          let color;
          let nbLinesToSkip = 0
          for (let i = 0; i < 4; i++) {
            if (parts[i] && parts[i].trim()) {
              let line = parts[i] && parts[i].trim().toLowerCase()
              if (line.startsWith("title:")) {
                titleLine = line.substring(6);
                nbLinesToSkip++;
              } else if (line.startsWith("icon:")) {
                icon = line.substring(5);
                nbLinesToSkip++;
              } else if (line.startsWith("collapse:")) {
                collapsible = true
                collapse = line.substring(9);
                if (collapse && collapse.trim().toLowerCase() == 'open') {
                  collapsed = false
                }
                nbLinesToSkip++;
              } else if (line.startsWith("color:")) {
                color = line.substring(6);
                nbLinesToSkip++;
              }
            }
          }
          const foldDiv = collapsible ? `<div class="callout-fold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-chevron-down">
              <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          </div>` : "";
          const titleDiv = titleLine
            ? `<div class="callout-title"><div class="callout-title-inner">${titleLine}</div>${foldDiv}</div>`
            : "";
          let collapseClasses = titleLine && collapsible ? 'is-collapsible' : ''
          if (collapsible && collapsed) {
            collapseClasses += " is-collapsed"
          }

          let res = `<div data-callout-metadata class="callout ${collapseClasses}" data-callout="${token.info.substring(3)
            }">${titleDiv}\n<div class="callout-content">${md.render(
              parts.slice(nbLinesToSkip).join("\n")
            )}</div></div>`;
          return res
        }

        // Other languages
        return origFenceRule(tokens, idx, options, env, slf);
      };

      const defaultImageRule =
        md.renderer.rules.image ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };

      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const imageName = tokens[idx].content;
        const [fileName, ...widthAndMetaData] = imageName.split("|");
        const lastValue = widthAndMetaData[widthAndMetaData.length - 1];
        const lastValueIsNumber = !isNaN(lastValue);
        const width = lastValueIsNumber ? lastValue : null;

        let metaData = "";
        if (widthAndMetaData.length > 1) {
          metaData = widthAndMetaData.slice(0, widthAndMetaData.length - 1).join(" ");
        }
        if (!lastValueIsNumber) {
          metaData += ` ${lastValue}`;
        }
        if (width) {
          const widthIndex = tokens[idx].attrIndex("width");
          const widthAttr = `${width}px`;
          if (widthIndex < 0) tokens[idx].attrPush(["width", widthAttr]);
          else tokens[idx].attrs[widthIndex][1] = widthAttr;
        }

        // Rewrite relative image src to /notes/...
        const srcIdx = tokens[idx].attrIndex("src");
        if (srcIdx >= 0) {
          let src = tokens[idx].attrs[srcIdx][1] || "";
          const isAbsolute = /^https?:\/\//i.test(src) || src.startsWith("/");
          if (!isAbsolute) {
            // Always map bare filename to /notes/images/
            if (!src.includes("/")) {
              src = `/notes/images/${src}`;
            } else {
              src = `/notes/${src}`;
            }
            tokens[idx].attrs[srcIdx][1] = src;
          }
        }

        return defaultImageRule(tokens, idx, options, env, self);
      };

      const defaultLinkRule =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options, env, self);
        };
      md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
        const aIndex = tokens[idx].attrIndex("target");
        const classIndex = tokens[idx].attrIndex("class");

        if (aIndex < 0) {
          tokens[idx].attrPush(["target", "_blank"]);
        } else {
          tokens[idx].attrs[aIndex][1] = "_blank";
        }

        if (classIndex < 0) {
          tokens[idx].attrPush(["class", "external-link"]);
        } else {
          tokens[idx].attrs[classIndex][1] = "external-link";
        }

        return defaultLinkRule(tokens, idx, options, env, self);
      };
    })
    .use(userMarkdownSetup);

  eleventyConfig.setLibrary("md", markdownLib);

  // Add markdown filter for canvas node text rendering
  eleventyConfig.addFilter("markdown", function(content) {
    if (!content) return "";
    return markdownLib.render(String(content));
  });

  // Place filters BEFORE the return (not after)
  eleventyConfig.addFilter("isoDate", function (date) {
    return date ? new Date(date).toISOString() : "";
  });

  eleventyConfig.addFilter("link", function (str) {
    return (
      str &&
      str.replace(/\[\[(.*?\|.*?)\]\]/g, function (match, p1) {
        if (p1.indexOf("],[") > -1 || p1.indexOf('"$"') > -1) return match;
        const [fileLink, linkTitle] = p1.split("|");
        return getAnchorLink(fileLink, linkTitle);
      })
    );
  });

  eleventyConfig.addFilter("taggify", function (str) {
    return (
      str &&
      str.replace(tagRegex, function (match, precede, tag) {
        return `${precede}<a class="tag" onclick="toggleTagSearch(this)" data-content="${tag}">${tag}</a>`;
      })
    );
  });

  eleventyConfig.addFilter("searchableTags", function (str) {
    let tags;
    let match = str && str.match(tagRegex);
    if (match) {
      tags = match
        .map((m) => {
          return `"${m.split("#")[1]}"`;
        })
        .join(", ");
    }
    if (tags) {
      return `${tags},`;
    } else {
      return "";
    }
  });

  eleventyConfig.addFilter("hideDataview", function (str) {
    return (
      str &&
      str.replace(/\(\S+\:\:(.*)\)/g, function (_, value) {
        return value.trim();
      })
    );
  });

  eleventyConfig.addTransform("dataview-js-links", function (str) {
    const parsed = parse(str);
    for (const dataViewJsLink of parsed.querySelectorAll("a[data-href].internal-link")) {
      const notePath = dataViewJsLink.getAttribute("data-href");
      const title = dataViewJsLink.innerHTML;
      const {attributes, innerHTML} = getAnchorAttributes(notePath, title);
      for (const key in attributes) {
        dataViewJsLink.setAttribute(key, attributes[key]);
      }
      dataViewJsLink.innerHTML = innerHTML;
    }

    return str && parsed.innerHTML;
  });

  eleventyConfig.addTransform("callout-block", function (str) {
    const parsed = parse(str);

    const transformCalloutBlocks = (
      blockquotes = parsed.querySelectorAll("blockquote")
    ) => {
      for (const blockquote of blockquotes) {
        transformCalloutBlocks(blockquote.querySelectorAll("blockquote"));

        let content = blockquote.innerHTML;

        let titleDiv = "";
        let calloutType = "";
        let calloutMetaData = "";
        let isCollapsable;
        let isCollapsed;
        const calloutMeta = /\[!([\w-]*)\|?(\s?.*)\](\+|\-){0,1}(\s?.*)/;
        if (!content.match(calloutMeta)) {
          continue;
        }

        content = content.replace(
          calloutMeta,
          function (metaInfoMatch, callout, metaData, collapse, title) {
            isCollapsable = Boolean(collapse);
            isCollapsed = collapse === "-";
            const titleText = title.replace(/(<\/{0,1}\w+>)/, "")
              ? title
              : `${callout.charAt(0).toUpperCase()}${callout
                .substring(1)
                .toLowerCase()}`;
            const fold = isCollapsable
              ? `<div class="callout-fold"><i icon-name="chevron-down"></i></div>`
              : ``;

            calloutType = callout;
            calloutMetaData = metaData;
            titleDiv = `<div class="callout-title"><div class="callout-title-inner">${titleText}</div>${fold}</div>`;
            return "";
          }
        );

        /* Hacky fix for callouts with only a title:
        This will ensure callout-content isn't produced if
        the callout only has a title, like this:
        ```md
        > [!info] i only have a title
        ```
        Not sure why content has a random <p> tag in it,
        */
        if (content === "\n<p>\n") {
          content = "";
        }
        let contentDiv = content ? `\n<div class="callout-content">${content}</div>` : "";

        blockquote.tagName = "div";
        blockquote.classList.add("callout");
        blockquote.classList.add(isCollapsable ? "is-collapsible" : "");
        blockquote.classList.add(isCollapsed ? "is-collapsed" : "");
        blockquote.setAttribute("data-callout", calloutType.toLowerCase());
        calloutMetaData && blockquote.setAttribute("data-callout-metadata", calloutMetaData);
        blockquote.innerHTML = `${titleDiv}${contentDiv}`;
      }
    };

    transformCalloutBlocks();

    return str && parsed.innerHTML;
  });

  function fillPictureSourceSets(src, cls, alt, meta, width, imageTag) {
    imageTag.tagName = "picture";
    let html = `<source
      media="(max-width:480px)"
      srcset="${meta.webp[0].url}"
      type="image/webp"
      />
      <source
      media="(max-width:480px)"
      srcset="${meta.jpeg[0].url}"
      />
      `
    if (meta.webp && meta.webp[1] && meta.webp[1].url) {
      html += `<source
        media="(max-width:1920px)"
        srcset="${meta.webp[1].url}"
        type="image/webp"
        />`
    }
    if (meta.jpeg && meta.jpeg[1] && meta.jpeg[1].url) {
      html += `<source
        media="(max-width:1920px)"
        srcset="${meta.jpeg[1].url}"
        />`
    }
    html += `<img
      class="${cls.toString()}"
      src="${src}"
      alt="${alt}"
      width="${width}"
      />`;
    imageTag.innerHTML = html;
  }


  eleventyConfig.addTransform("picture", function (str) {
    if(process.env.USE_FULL_RESOLUTION_IMAGES === "true"){
      return str;
    }
    const parsed = parse(str);
    for (const imageTag of parsed.querySelectorAll(".cm-s-obsidian img")) {
      const src = imageTag.getAttribute("src");
      if (src && src.startsWith("/") && !src.endsWith(".svg")) {
        const cls = imageTag.classList.value;
        const alt = imageTag.getAttribute("alt");
        const width = imageTag.getAttribute("width") || '';

        try {
          const meta = transformImage(
            "./src/site" + decodeURI(imageTag.getAttribute("src")),
            cls.toString(),
            alt,
            ["(max-width: 480px)", "(max-width: 1024px)"]
          );

          if (meta) {
            fillPictureSourceSets(src, cls, alt, meta, width, imageTag);
          }
        } catch {
          // Make it fault tolarent.
        }
      }
    }
    return str && parsed.innerHTML;
  });

  eleventyConfig.addTransform("table", function (str) {
    const parsed = parse(str);
    for (const t of parsed.querySelectorAll(".cm-s-obsidian > table")) {
      let inner = t.innerHTML;
      t.tagName = "div";
      t.classList.add("table-wrapper");
      t.innerHTML = `<table>${inner}</table>`;
    }

    for (const t of parsed.querySelectorAll(
      ".cm-s-obsidian > .block-language-dataview > table"
    )) {
      t.classList.add("dataview");
      t.classList.add("table-view-table");
      t.querySelector("thead")?.classList.add("table-view-thead");
      t.querySelector("tbody")?.classList.add("table-view-tbody");
      t.querySelectorAll("thead > tr")?.forEach((tr) => {
        tr.classList.add("table-view-tr-header");
      });
      t.querySelectorAll("thead > tr > th")?.forEach((th) => {
        th.classList.add("table-view-th");
      });
    }
    return str && parsed.innerHTML;
  });

  eleventyConfig.addTransform("htmlMinifier", (content, outputPath) => {
    if (
      (process.env.NODE_ENV === "production" || process.env.ELEVENTY_ENV === "prod") &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      return htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        minifyCSS: true,
        minifyJS: true,
        keepClosingSlash: true,
      });
    }
    return content;
  });

  // Add canvas file support
eleventyConfig.addDataExtension("canvas", {
  parser: (contents) => {
    try {
      return JSON.parse(contents);
    } catch (e) {
      console.error("Error parsing canvas file:", e);
      return null;
    }
  },
  read: true
});

// Remove addExtension entirely - use a passthrough approach instead
eleventyConfig.addExtension("canvas", {
  compile: function(inputContent, inputPath) {
    return function(data) {
      // Return empty string - layout handles all rendering
      return Promise.resolve("");
    };
  },
  compileOptions: {
    permalink: function(permalinkString, inputPath) {
      // Only process .canvas files
      if (!inputPath.endsWith(".canvas")) return;
      const slug = inputPath
        .replace(/^.*\/notes\//, "")
        .replace(/\.canvas$/, "")
        .toLowerCase();
      return () => Promise.resolve(`/notes/${slug}/`);
    }
  }
});

eleventyConfig.addShortcode('kanban', renderKanbanFromFile);

  // Images: flatten ALL images to /notes/images/
  eleventyConfig.addPassthroughCopy({
    "src/site/notes/images/**/*.{png,jpg,jpeg,gif,svg,webp,avif}": "notes/images",
    "src/site/notes/daily/**/*.{png,jpg,jpeg,gif,svg,webp,avif}": "notes/images",
    "src/site/notes/sessions/**/*.{png,jpg,jpeg,gif,svg,webp,avif}": "notes/images",
    "src/site/notes/blog/**/*.{png,jpg,jpeg,gif,svg,webp,avif}": "notes/images",
    "src/site/notes/published/**/*.{png,jpg,jpeg,gif,svg,webp,avif}": "notes/images",
  });
  eleventyConfig.addWatchTarget("src/site/notes/**/*.{png,jpg,jpeg,gif,svg,webp,avif}");

  // Other assets (styles, scripts, etc)
  eleventyConfig.addPassthroughCopy({ "src/site/assets": "assets" });
  eleventyConfig.addWatchTarget("src/site/assets");
  eleventyConfig.addPassthroughCopy({ "src/site/styles": "styles" });
  eleventyConfig.addWatchTarget("src/site/styles");
  eleventyConfig.addPassthroughCopy({ "src/site/img" : "img" });
  eleventyConfig.addPassthroughCopy({ "src/site/scripts" : "scripts" });
  eleventyConfig.addPassthroughCopy({ "src/site/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/site/favicon.svg": "favicon.ico" });
  eleventyConfig.addPassthroughCopy("src/site/styles/_theme.*.css");
  eleventyConfig.addPassthroughCopy("src/site/mirror");


  
  eleventyConfig.addPlugin(faviconsPlugin, { outputDir: "dist" });
  eleventyConfig.addPlugin(tocPlugin, {
    ul: true,
    tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
  });


  eleventyConfig.addFilter("dateToZulu", function (date) {
    try {
      return new Date(date).toISOString("dd-MM-yyyyTHH:mm:ssZ");
    } catch {
      return "";
    }
  });
  
  eleventyConfig.addFilter("jsonify", function (variable) {
    return JSON.stringify(variable) || '""';
  });

  eleventyConfig.addFilter("validJson", function (variable) {
    if (Array.isArray(variable)) {
      return variable.map((x) => x.replaceAll("\\", "\\\\")).join(",");
    } else if (typeof variable === "string") {
      return variable.replaceAll("\\", "\\\\");
    }
    return variable;
  });

  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "slash",
      singleTags: ["link"],
    },
  });

  eleventyConfig.addFilter('truncate_array', (arr, n) => {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, n);
});

eleventyConfig.addFilter('skip', (arr, n) => {
  if (!Array.isArray(arr)) return [];
  return arr.slice(n);
});

  // Convert Obsidian-style image embeds ![[image.png|alt or WxH]]
  eleventyConfig.addFilter("dgMedia", (html) => {
    if (!html) return html;
    const re = /!\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;

    return html.replace(re, (_m, file, alias) => {
      const raw = String(file || "").trim().replace(/^\.?\//, "");
      const ext = raw.split(".").pop().toLowerCase();
      if (!/^(png|jpe?g|gif|svg|webp|avif)$/.test(ext)) return _m;

      // Alt or size (200 or 200x120)
      const a = String(alias || "").trim();
      let alt = a || raw, w, h;
      const m = a.match(/^(\d+)(?:x(\d+))?$/);
      if (m) { w = m[1]; h = m[2]; alt = raw; }

      // Map to public URL under /notes; keep subpath if provided (images/foo.png)
      const src = raw.includes("/") ? `/notes/${encodeURI(raw)}` : `/notes/images/${encodeURI(raw)}`;

      const attrs = [
        `src="${src}"`,
        `alt="${alt.replace(/"/g, "&quot;")}"`,
        `loading="lazy"`, `decoding="async"`,
        w ? `width="${w}"` : "", h ? `height="${h}"` : ""
      ].filter(Boolean).join(" ");

      return `<img ${attrs}>`;
    });
  });

  // isoDate used by blog list templates in DG
  eleventyConfig.addFilter("isoDate", (d) => (d ? new Date(d).toISOString() : ""));

  const getText = (p) => {
  try { return fs.readFileSync(p.inputPath, "utf8"); } catch { return ""; }
};
const inlineField = (src, key) => {
  if (typeof src !== "string" || !src) return null;
  
  // Try multiple patterns:
  // 1. Standard: key:: value
  // 2. With whitespace variations
  const patterns = [
    new RegExp(`^\\s*${key}\\s*::\\s*(.+?)\\s*$`, "mi"),
    new RegExp(`\\n\\s*${key}\\s*::\\s*(.+?)\\s*(?:\\n|$)`, "gi"),
  ];
  
  for (const re of patterns) {
    const m = src.match(re);
    if (m && m[1]) {
      const value = m[1].trim();
      // console.log(`   Found ${key}:: ${value}`);
      return value;
    }
  }
  
  return null;
};

// Normalize date strings to UTC to avoid timezone issues
// If a date has no timezone indicator, treat it as UTC
const normalizeToUTC = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return dateStr;
  
  // Check if already has timezone: +XXXX, -XXXX, or Z
  const hasTz = /[+-]\d{2}:?\d{2}|Z$/i.test(dateStr.trim());
  if (hasTz) return dateStr;
  
  // No timezone - add UTC indicator
  // Handle formats like "2026-01-24 12:37" or "2026-01-24T12:37:00"
  const trimmed = dateStr.trim();
  if (/^\d{4}-\d{2}-\d{2}[\sT]\d{2}:\d{2}/.test(trimmed)) {
    // If it has a space separator, convert to T
    const normalized = trimmed.replace(' ', 'T');
    // Add seconds if missing
    const withSeconds = /:\d{2}:\d{2}/.test(normalized) ? normalized : normalized + ':00';
    return withSeconds + '+00:00';
  }
  
  return dateStr;
};


  // Add canvas files to a dedicated collection
  eleventyConfig.addCollection("canvasPages", (api) =>
    api.getFilteredByGlob("src/site/notes/**/*.canvas")
  );
  
// ===== MILESTONES COLLECTION =====
// Harvests checkbox lines tagged #milestone from published notes only.
// Syntax: - [ ] | [x] | [/]  text #tags @YYYY-MM-DD
eleventyConfig.addCollection("milestones", (c) => {
  const out = [];
  const lineRe = /^\s*(?:[-*+]\s+)?\[([ xX\/])\]\s+(.+)$/;
  const tagRe = /(^|\s)#([A-Za-z][\w\/-]*)/g;
  const dueRe = /(^|\s)@(\d{4}-\d[\d-]*)(?=\s|$)/g;
  const parseDue = (tok) => {
    const m = tok.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!m) return null;
    const [y, mo, d] = [+m[1], +m[2], +m[3]];
    const dt = new Date(Date.UTC(y, mo - 1, d));
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
    return dt.toISOString().slice(0, 10);
  };
  const isoDay = /^\d{4}-\d{2}-\d{2}$/;

  for (const p of c.getAll()) {
    if (!p.inputPath?.endsWith('.md')) continue;
    if (p.inputPath.includes('/_unpublished/') || p.inputPath.includes('/_templates/')) continue;
    if (p.data?.["dg-publish"] !== true) continue;

    const txt = getText(p);
    if (!txt || !txt.includes('#milestone')) continue;

    // Daily note date: filename first, then frontmatter date/created
    let sourceDate = null;
    const slug = p.fileSlug || '';
    const isDaily = isoDay.test(slug) || p.inputPath.includes('/notes/daily/') ||
      (Array.isArray(p.data?.tags) && p.data.tags.includes('daily'));
    if (isoDay.test(slug)) {
      sourceDate = slug;
    } else if (isDaily) {
      for (const f of [p.data?.date, p.data?.created]) {
        if (!f) continue;
        const d = f instanceof Date ? f : new Date(f);
        if (!isNaN(d)) { sourceDate = d.toISOString().slice(0, 10); break; }
      }
    }

    for (const line of txt.split('\n')) {
      const match = line.match(lineRe);
      if (!match) continue;

      const box = match[1].toLowerCase();
      const body = match[2];
      const tags = [...body.matchAll(tagRe)].map(m => m[2].toLowerCase());
      if (!tags.includes('milestone')) continue;

      let due = null;
      for (const dm of body.matchAll(dueRe)) {
        const parsed = parseDue(dm[2]);
        if (parsed) { due = due || parsed; }
        else console.warn(`[milestones] unparseable due date "@${dm[2]}" in ${p.inputPath}`);
      }
      const title = body
        .replace(tagRe, '$1')
        .replace(dueRe, '$1')
        .replace(/\s+/g, ' ')
        .trim();

      const status = box === 'x' ? 'done' : box === '/' ? 'active' : 'planned';
      out.push({
        title,
        due,
        checked: box === 'x',
        status,
        url: p.url,
        noteTitle: p.data.title || p.fileSlug,
        tags,
        milestone: true,
        key: tags.includes('key'),
        track: tags.includes('build') ? 'build' : 'research',
        date: due || (status === 'done' ? sourceDate : null),
        sourceDate,
      });
    }
  }

  // Sort: incomplete first (by date), then complete (by date)
  return out.sort((a, b) => {
    if (a.checked !== b.checked) return a.checked ? 1 : -1;
    if (!a.due && !b.due) return 0;
    if (!a.due) return 1;
    if (!b.due) return -1;
    return new Date(a.due) - new Date(b.due);
  });
});

// Page model for /research and /build: strip markers, now/next lists and log
eleventyConfig.addFilter("buildTimeline", (items, track, monthsBefore, monthsAfter) => {
  const iso = (d) => d.toISOString().slice(0, 10);
  const nowDate = new Date();
  const today = new Date(Date.UTC(nowDate.getUTCFullYear(), nowDate.getUTCMonth(), nowDate.getUTCDate()));
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - monthsBefore, today.getUTCDate()));
  const end = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() + monthsAfter, today.getUTCDate()));
  const span = end - start;
  const r2 = (n) => Math.round(n * 100) / 100;
  const pct = (d) => r2(((d - start) / span) * 100);
  const todayStr = iso(today);
  const todayPct = pct(today);
  const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const utc = (str) => new Date(str + 'T00:00:00Z');
  const short = (str) => utc(str).getUTCDate() + ' ' + MONTHS[utc(str).getUTCMonth()];

  const months = [];
  for (let d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + 1, 1)); d <= end;
       d = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1))) {
    const jan = d.getUTCMonth() === 0;
    months.push({
      pct: pct(d),
      label: MONTHS[d.getUTCMonth()] + (jan ? ' ' + String(d.getUTCFullYear()).slice(2) : ''),
    });
  }

  const all = (items || []).filter(i => i.track === track).map((i, idx) => {
    const overdue = i.status === 'planned' && !!i.date && i.date < todayStr;
    return Object.assign({}, i, {
      id: 'i' + idx,
      overdue,
      dateLabel: i.date ? short(i.date) : null,
      sourceLabel: i.sourceDate ? 'daily / ' + short(i.sourceDate) : null,
    });
  });

  // Strip: every dated item inside the axis; stagger close neighbours across 3 levels
  const markers = [];
  let prevPct = -Infinity, prevLevel = 0;
  for (const i of all.filter(i => i.date && i.date >= iso(start) && i.date <= iso(end))
                     .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id))) {
    const p = pct(utc(i.date));
    const level = p - prevPct < 3 ? (prevLevel + 1) % 3 : 0;
    prevPct = p; prevLevel = level;
    markers.push({
      id: i.id, pct: p, level, status: i.status, overdue: i.overdue, key: i.key,
      lineLeft: Math.min(p, todayPct), lineWidth: r2(Math.abs(p - todayPct)),
      tip: i.title.replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]/g, (m, t, al) => al || t)
                  .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') + ' (' + i.date + ')',
    });
  }

  const byDate = (a, b) => (a.date || '9999').localeCompare(b.date || '9999');
  const nowItems = all.filter(i => i.status === 'active').sort(byDate);
  const overdue = all.filter(i => i.overdue).sort(byDate);
  const upcoming = all.filter(i => i.status === 'planned' && i.date && i.date >= todayStr).sort(byDate);
  const undated = all.filter(i => i.status === 'planned' && !i.date);
  const next = overdue.concat(upcoming, undated);

  const groups = new Map();
  for (const i of all.filter(i => i.status === 'done' && i.date).sort((a, b) => b.date.localeCompare(a.date))) {
    const key = i.date.slice(0, 7);
    if (!groups.has(key)) groups.set(key, { label: MONTHS[+key.slice(5) - 1] + ' ' + key.slice(0, 4), items: [] });
    groups.get(key).items.push(i);
  }
  const log = [...groups.keys()].sort().reverse().map(k => groups.get(k));

  return { months, todayPct, markers, now: nowItems, next, log };
});

// Render [[wikilinks]], [markdown](links) and bare URLs in a task title; everything else escaped
const noteLookups = new WeakMap();
eleventyConfig.addFilter("inlineLinks", (str, notes) => {
  const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  let lookup = null;
  if (Array.isArray(notes)) {
    lookup = noteLookups.get(notes);
    if (!lookup) {
      lookup = new Map();
      for (const n of notes) {
        if (n.inputPath?.endsWith('.md') && n.fileSlug) lookup.set(n.fileSlug.toLowerCase(), n);
      }
      noteLookups.set(notes, lookup);
    }
  }
  const re = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|([^\]]+))?\]\]|\[([^\]]+)\]\(([^)\s]+)\)|(https?:\/\/[^\s<>"]+)/g;
  let out = '', last = 0, m;
  const s = String(str || '');
  while ((m = re.exec(s))) {
    out += esc(s.slice(last, m.index));
    last = m.index + m[0].length;
    if (m[1]) {
      const target = m[1].trim();
      const note = lookup && lookup.get(target.toLowerCase());
      const slug = target.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const href = note ? note.url : `/notes/${slug}/`;
      const text = (m[2] && m[2].trim()) || (note && note.data?.title) || slug.replace(/-/g, ' ');
      out += `<a href="${esc(href)}">${esc(text)}</a>`;
    } else if (m[3]) {
      out += /^(https?:|\/|#|mailto:)/i.test(m[4]) ? `<a href="${esc(m[4])}">${esc(m[3])}</a>` : esc(m[0]);
    } else {
      let url = m[5];
      const trail = url.match(/[.,;:!?)\]]+$/);
      if (trail) { url = url.slice(0, -trail[0].length); last -= trail[0].length; }
      let host = url;
      try { host = new URL(url).hostname.replace(/^www\./, ''); } catch {}
      out += `<a href="${esc(url)}">${esc(host)}</a>`;
    }
  }
  return out + esc(s.slice(last));
});

// Sessions: any note in notes/sessions/ or with "start::"
eleventyConfig.addCollection("sessions", (c) => {
  const result = c.getAll()
    .filter(p => {
      if (!p.inputPath || !p.inputPath.endsWith('.md')) return false;
      const txt = getText(p);
      const hasStart = /(^|\n)\s*start::/i.test(txt);
      const inSessions = p.inputPath.includes("/notes/sessions/");
      const inDaily = p.inputPath.includes("/notes/daily/");
      
      return inSessions || (inDaily && hasStart) || hasStart;
    })
    .map(p => {
      const txt = getText(p);
      const start = normalizeToUTC(inlineField(txt, "start"));
      const end = normalizeToUTC(inlineField(txt, "end"));
      const topic = inlineField(txt, "topic") || p.data.title || p.fileSlug;
      
      return { 
        start, 
        end, 
        topic, 
        url: p.url,
        title: p.data.title || p.fileSlug 
      };
    })
    .filter(s => {
      // Reject template placeholders and invalid dates
      if (!s.start) return false;
      if (s.start.includes('YYYY') || s.start.includes('HH:MM')) return false;
      
      const date = new Date(s.start);
      return !isNaN(date.getTime());
    })
    .sort((a, b) => new Date(b.start || 0) - new Date(a.start || 0));
  
  return result;
});

// Stream: from daily notes or stream.md lines "- HH:MM message"
const streamLineRe = /^\s*-\s*(\d{1,2}:\d{2})\s+(.+)$/gm;
const hasSessionFrontmatterLine = (text = "") => /(?:^|\n)\s*(start|end|topic)::/i.test(String(text));
eleventyConfig.addCollection("streamItems", (c) => {
  const out = [];
  const candidates = c.getAll().filter(p => {
    const path = p?.inputPath || "";
    return typeof path === "string" && ( /\/notes\/daily\//i.test(path) || /\/stream\.md$/i.test(path) );
  });
  for (const p of candidates) {
    const txt = getText(p);
    if (!txt) continue;
    const dateField = inlineField(txt, "date");
    const fromSlug = (p.fileSlug || "").match(/\d{4}-\d{2}-\d{2}/)?.[0] || null;
    const fromPath = (p.inputPath || "").match(/\d{4}-\d{2}-\d{2}/)?.[0] || null;
    const day = dateField || fromSlug || fromPath || null;
    const re = new RegExp(streamLineRe.source, streamLineRe.flags);
    let m;
    while ((m = re.exec(txt))) {
      const [, time, message] = m;
      const cleanedMessage = String(message || '').trim();
      if (!cleanedMessage || hasSessionFrontmatterLine(cleanedMessage)) continue;
      const dateStr = day ? normalizeToUTC(`${day} ${time}`) : time;
      out.push({ date: dateStr, text: cleanedMessage, url: p.url });
    }
  }
  return out.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
});

  // Digital Garden-style wikilinks filter (simple)
  eleventyConfig.addFilter("link", (html, pages = []) => {
    if (!html) return html;

    const map = new Map();
    for (const p of pages) {
      if (!p?.url) continue;
      if (p.fileSlug) map.set(p.fileSlug.toLowerCase(), p.url);
      if (p.data?.title) map.set(slugify(p.data.title), p.url);
    }
    const re = /\[\[([^\]|#]+)(?:#[^\]|]+)?(?:\|([^\]]+))?\]\]/g;
    return html.replace(re, (_m, target, alias) => {
      const key = slugify(String(target || ""));
      const href = map.get(key) || `/notes/${key}/`;
      const text = alias || target;
      return `<a class="internal-link" href="${href}">${text}</a>`;
    });
  });

  eleventyConfig.addFilter("embedMedia", (html) => {
    if (!html) return html;
    return html.replace(/!\[\[([^\]|#]+)(?:#[^\]]+)?\]\]/g, (_m, file) => {
      const fname = String(file).trim();
      const safe = encodeURI(fname);
      // Adjust the base to where you store images
      const src = `/assets/img/${safe}`;
      return `<img src="${src}" alt="${fname}">`;
    });
  });

 // Collections used by the graph generator
  const isMd = (p) => String(p.inputPath || "").toLowerCase().endsWith(".md");
  const isPublished = (p) =>
    p?.data?.["dg-publish"] === true &&
    !p?.data?.draft &&
    p?.data?.visibility !== "private";

  const hasFeaturedFlag = (p) => {
    const featured = p?.data?.featured;
    if (featured === true) return true;
    if (typeof featured === "string" && featured.trim().toLowerCase() === "true") return true;

    const tags = p?.data?.tags;
    if (Array.isArray(tags)) {
      return tags.some((t) => String(t).trim().toLowerCase() === "featured");
    }

    // Handles accidental nested front matter like:
    // tags:
    //   featured: true
    if (tags && typeof tags === "object") {
      const nestedFeatured = tags.featured;
      if (nestedFeatured === true) return true;
      if (typeof nestedFeatured === "string" && nestedFeatured.trim().toLowerCase() === "true") return true;
    }

    return false;
  };

  eleventyConfig.addCollection("note", (api) => [
    ...api.getFilteredByGlob("src/site/notes/**/*.md").filter((p) => isMd(p) && isPublished(p)),
    ...api.getFilteredByGlob("src/site/notes/**/*.canvas")
  ]);

  eleventyConfig.addCollection("notes", (api) => [
    ...api.getFilteredByGlob("src/site/notes/**/*.md").filter((p) => isMd(p) && isPublished(p)),
    ...api.getFilteredByGlob("src/site/notes/**/*.canvas")
  ]);

  // ===== Daily notes grouped by month (for the two-column notes index) =====
  // Daily notes live under src/site/notes/daily/ and are always named YYYY-MM-DD.md,
  // so we key off the filename rather than frontmatter title (which is inconsistent).
  const DAILY_SLUG_RE = /^\d{4}-\d{2}-\d{2}$/;

  const formatDailyEntryTitle = (slug) => {
    const [y, m, d] = slug.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  const monthLabel = (key) => {
    const [y, m] = key.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, 1)).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });
  };

  const currentMonthKey = () => {
    const d = new Date();
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
  };

  const previousMonthKey = () => {
    const d = new Date();
    const prev = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() - 1, 1));
    return `${prev.getUTCFullYear()}-${String(prev.getUTCMonth() + 1).padStart(2, "0")}`;
  };

  const getDailyEntries = (api) =>
    api.getFilteredByGlob("src/site/notes/daily/*.md")
      .filter((p) => isMd(p) && isPublished(p) && DAILY_SLUG_RE.test(p.fileSlug))
      .map((p) => ({ url: p.url, title: formatDailyEntryTitle(p.fileSlug), date: p.fileSlug }))
      .sort((a, b) => b.date.localeCompare(a.date));

  // Full breakdown by real calendar month (used by the /notes/daily/ archive page).
  eleventyConfig.addCollection("dailyNotesArchive", (api) => {
    const entries = getDailyEntries(api);
    const curKey = currentMonthKey();
    const prevKey = previousMonthKey();

    const groups = new Map();
    for (const entry of entries) {
      const key = entry.date.slice(0, 7);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry);
    }

    return [...groups.entries()]
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([key, notes]) => ({
        key,
        label: monthLabel(key),
        count: notes.length,
        open: key === curKey || key === prevKey,
        notes,
      }));
  });

  // Compact sidebar version: current month + previous month get their own group,
  // everything older is bucketed into a single collapsed "Earlier" group.
  eleventyConfig.addCollection("dailyNotesSidebar", (api) => {
    const entries = getDailyEntries(api);
    const curKey = currentMonthKey();
    const prevKey = previousMonthKey();

    const current = entries.filter((e) => e.date.slice(0, 7) === curKey);
    const previous = entries.filter((e) => e.date.slice(0, 7) === prevKey);
    const earlier = entries.filter((e) => {
      const key = e.date.slice(0, 7);
      return key !== curKey && key !== prevKey;
    });

    const groups = [];
    if (current.length) {
      groups.push({ key: curKey, label: monthLabel(curKey), count: current.length, open: true, notes: current });
    }
    if (previous.length) {
      groups.push({ key: prevKey, label: monthLabel(prevKey), count: previous.length, open: true, notes: previous });
    }
    if (earlier.length) {
      groups.push({ key: "earlier", label: "Earlier", count: earlier.length, open: false, notes: earlier });
    }
    return groups;
  });

  // ===== Non-daily ("thematic") notes, most recently updated/created first =====
  eleventyConfig.addCollection("thematicNotes", (api) => {
    const pages = [
      ...api.getFilteredByGlob("src/site/notes/**/*.md").filter((p) => isMd(p) && isPublished(p)),
      ...api.getFilteredByGlob("src/site/notes/**/*.canvas"),
    ].filter((p) => !p.inputPath.includes("/notes/daily/"));

    const sortTime = (p) => {
      const raw = p.data?.updated || p.date;
      const t = raw instanceof Date ? raw.getTime() : new Date(raw).getTime();
      return Number.isNaN(t) ? 0 : t;
    };

    return pages
      .map((p) => {
        const tags = Array.isArray(p.data?.tags)
          ? p.data.tags.filter((t) => t && t !== "note" && t !== "gardenEntry")
          : [];
        return {
          url: p.url,
          title: p.data?.title || p.fileSlug,
          primaryTag: tags[0] || null,
          sortTime: sortTime(p),
        };
      })
      .sort((a, b) => b.sortTime - a.sortTime);
  });

  eleventyConfig.addCollection("postFeaturedFirst", (api) => {
    const byBlogFolder = api.getFilteredByGlob("src/site/notes/blog/**/*.md");
    const byPublishedFolder = api.getFilteredByGlob("src/site/notes/published/**/*.md");
    const byTag = api.getFilteredByTag("post");

    // De-dupe by inputPath
    const map = new Map();
    [...byBlogFolder, ...byPublishedFolder, ...byTag].forEach(p => map.set(p.inputPath, p));

    return [...map.values()]
      .filter(isPublished)
      .sort((a, b) => {
        const fa = hasFeaturedFlag(a), fb = hasFeaturedFlag(b);
        if (fa !== fb) return fb - fa;               // featured first
        return (b.date || 0) - (a.date || 0);        // newest next
      });
  });

  eleventyConfig.addCollection("featuredPosts", (api) => {
    const byBlogFolder = api.getFilteredByGlob("src/site/notes/blog/**/*.md");
    const byPublishedFolder = api.getFilteredByGlob("src/site/notes/published/**/*.md");
    const byTag = api.getFilteredByTag("post");

    const map = new Map();
    [...byBlogFolder, ...byPublishedFolder, ...byTag].forEach((p) => map.set(p.inputPath, p));

    return [...map.values()]
      .filter((p) => isPublished(p) && hasFeaturedFlag(p))
      .sort((a, b) => {
        const dateA = new Date(a.data?.date || a.date || 0).getTime();
        const dateB = new Date(b.data?.date || b.date || 0).getTime();
        return dateB - dateA;
      });
  });

  // Add this with other collections (after the notes collection):
eleventyConfig.addCollection("posts", (c) => {
  return c.getAll()
    .filter(p => {
      if (!p.data) return false;
      // Check for type: post OR tags including 'post'
      const hasPostType = p.data.type === "post";
      const hasPostTag = Array.isArray(p.data.tags) && p.data.tags.includes("post");
      const isPublished = p.data["dg-publish"] !== false;
      
      return (hasPostType || hasPostTag) && isPublished;
    })
    .sort((a, b) => {
      const dateA = new Date(a.data.date || a.date);
      const dateB = new Date(b.data.date || b.date);
      return dateB - dateA; // newest first
    });
});

  eleventyConfig.on('afterBuild', async () => {
  // Get the list of all HTML files generated
  const files = await fg('dist/**/*.html');

  // Iterate over each file and minify
  for (const file of files) {
    // Skip if already minified
    if (file.endsWith('.min.html')) continue;

    // Read the file
    const content = await fs.promises.readFile(file, 'utf8');

    // Minify the content
    const minified = await htmlMinifier.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true,
      conservativeCollapse: true,
      preserveLineBreaks: true,
      minifyCSS: true,
      minifyJS: true,
      keepClosingSlash: true,
    });

    // Write the minified content to a new file
    await fs.promises.writeFile(file.replace('.html', '.min.html'), minified);
  }
});

  eleventyConfig.addCollection("featuredZettels", (api) => {
    return api.getFilteredByGlob("src/site/notes/**/*.md")
      .filter(p => isPublished(p) && (p.data?.featured || (p.data?.tags || []).includes("gardenEntry")))
      .sort((a, b) => {
        const bu = b.data?.updated ? new Date(b.data.updated) : b.date;
        const au = a.data?.updated ? new Date(a.data.updated) : a.date;
        return bu - au;
      });
  });

  eleventyConfig.addCollection("zettels", (api) => {
    return api.getFilteredByGlob("src/site/notes/**/*.md")
      .filter(p =>
        isPublished(p) &&
        !(p.inputPath || "").includes("/notes/blog/") &&
        !(p.inputPath || "").includes("/notes/published/") &&
        !p.data?.featured
      )
      .sort((a, b) => {
        const bu = b.data?.updated ? new Date(b.data.updated) : b.date;
        const au = a.data?.updated ? new Date(a.data.updated) : a.date;
        return bu - au;
      });
  });

  // Ensure these collections are not also added in src/helpers/userSetup.js
  // If they are, remove one set.

  // Add a limit filter for arrays
  eleventyConfig.addFilter("limit", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : []));

  eleventyConfig.addFilter("formatDailyTitle", function(title) {
    // console.log("formatDailyTitle called with:", title, "Type:", typeof title);
    
    // Handle Date objects
    if (title instanceof Date) {
      const result = title.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
      });
      console.log("Formatted Date object to:", result);
      return result;
    }
    
    // Handle string representation of Date objects
    if (title && typeof title === 'string' && title.includes('GMT')) {
      const date = new Date(title);
      if (!isNaN(date.getTime())) {
        const result = date.toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          timeZone: 'UTC'
        });
        // console.log("Formatted Date string to:", result);
        return result;
      }
    }
    
    // Handle YYYY-MM-DD strings
    if (title && typeof title === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(title)) {
      const [year, month, day] = title.split('-');
      const date = new Date(Date.UTC(year, month - 1, day));
      const result = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
      });
      // console.log("Formatted YYYY-MM-DD to:", result);
      return result;
    }
        return title;
  });

  eleventyConfig.addFilter("date", function(date, format) {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    
    if (format === 'dddd, MMMM D, YYYY') {
      return d.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'UTC'
      });
    }
    
    return d.toISOString();
  });

  eleventyConfig.addFilter("readableDate", function(date) {
    if (!date) return "";
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'UTC'
    });
  });

eleventyConfig.addFilter("renderDiff", function(diffString) {
  if (!diffString) return '';
  
  // escape HTML characters first
  const escaped = diffString
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  
  // then convert diff markers to spans
  return escaped
    .replace(/\{\+(.+?)\+\}/gs, '<span class="diff-added">$1</span>')
    .replace(/\[-(.+?)-\]/gs, '<span class="diff-removed">$1</span>');
});

  return {
    dir: {
      input: "src/site",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js", "canvas"],
  };
}; // <— nothing below this line

