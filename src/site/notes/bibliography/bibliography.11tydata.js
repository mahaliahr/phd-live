module.exports = {
  eleventyComputed: {
    // BIBLIOGRAPHY -> /bibliography/<slug>/ (keeps auto-generated Zotero
    // stubs from colliding with hand-written notes of the same slug under
    // references/ or published/, which use the default /notes/<slug>/ namespace)
    permalink: (d) => {
      if (d.permalink === false) return false;
      return d.permalink || `/bibliography/${d.page.fileSlug}/`;
    },
  },
};
