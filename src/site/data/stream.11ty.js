class StreamJson {
  data() {
    return { 
      permalink: "/data/stream.json", 
      eleventyExcludeFromCollections: true,
      layout: false
    };
  }
  
  render(data) {
    const items = (data.collections?.streamItems || [])
      .slice(0, 50)
      .map(i => {
        let text = String(i.text || '').trim();
        
        // Strip HTML tags from stream text
        text = text.replace(/<[^>]*>/g, '');
        
        return {
          date: i.date || null,
          text: text,
          url: i.url || null,
        };
      })
      .filter(i => i.text && i.text.length > 0);
    
    return JSON.stringify(items);
  }
}

module.exports = StreamJson;