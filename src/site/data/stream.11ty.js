class StreamJson {
  data() {
    return { permalink: "/data/stream.json", eleventyExcludeFromCollections: true };
  }
  
  render(data) {
    const items = (data.collections?.streamItems || [])
      .slice(0, 50)
      .map(i => {
        // More aggressive text cleaning
        let text = String(i.text || '')
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control chars
          .replace(/[\u2028\u2029]/g, '') // Remove line/paragraph separators
          .replace(/[""]/g, '"') // Normalize quotes
          .replace(/['']/g, "'") // Normalize apostrophes
          .trim();
        
        // Remove any trailing commas or invalid chars
        text = text.replace(/,\s*$/, '');
        
        return {
          date: i.date || null,
          text: text,
          url: i.url || null,
        };
      })
      .filter(i => i.text && i.text.length > 0); // Only include items with valid text
    
    // Use JSON.stringify with replacer to catch any remaining issues
    return JSON.stringify(items, (key, value) => {
      if (typeof value === 'string') {
        // Extra safety: remove any remaining problematic characters
        return value.replace(/[\u0000-\u001F\u007F-\u009F\u2028\u2029]/g, '');
      }
      return value;
    }, 2);
  }
}

module.exports = StreamJson;