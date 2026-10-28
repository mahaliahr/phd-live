class Milestones {
  data() {
    return {
      permalink: "/data/milestones.json",
      eleventyExcludeFromCollections: true,
    };
  }

  render({ collections }) {
    const milestones = (collections.milestones || []).map(m => ({
      title: m.title,
      due: m.due,
      checked: m.checked,
      status: m.status,
      url: m.url,
      noteTitle: m.noteTitle,
      tags: m.tags,
      milestone: m.milestone,
      key: m.key,
      track: m.track,
      date: m.date,
      sourceDate: m.sourceDate
    }));
    
    return JSON.stringify(milestones, null, 2);
  }
}

module.exports = Milestones;