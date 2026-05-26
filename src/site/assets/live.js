(async function () {
  console.log("Live widget loaded");

  const SUPABASE_URL = 'https://fetlnstxydhmtpzzlxur.supabase.co'
  const SUPABASE_KEY = 'sb_publishable_6iYXZtPYvCM_1i9hVmULYg_cPCV1rHw'

  // --- Utilities ---

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  function relativeTime(dateString) {
    if (!dateString) return "unknown time";
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return "unknown time";
    const ms = d.getTime() - Date.now();
    const sec = Math.round(ms / 1000);
    const min = Math.round(sec / 60);
    const hr = Math.round(min / 60);
    const day = Math.round(hr / 24);
    if (Math.abs(day) >= 1) return rtf.format(day, "day");
    if (Math.abs(hr) >= 1) return rtf.format(hr, "hour");
    if (Math.abs(min) >= 1) return rtf.format(min, "minute");
    return rtf.format(sec, "second");
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function processWikilinks(text) {
    if (!text) return text;
    return text.replace(/\[\[([^\]|#]+)(?:#[^\]]+)?(?:\|([^\]]+))?\]\]/g, (match, link, alias) => {
      const displayText = alias || link;
      const slug = link.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return `<a href="/notes/${slug}/" class="internal-link">${displayText}</a>`;
    });
  }

  async function fetchJson(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error("Failed to fetch", url, e);
      return null;
    }
  }

  async function fetchSupabaseSessions() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/sessions?order=started.desc&limit=20`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        }
      )
      if (!res.ok) return []
      const data = await res.json()
      return data.map(s => ({
        source: 'supabase',
        start: s.started,
        end: s.ended || null,
        topic: s.type + (s.note ? ` · ${s.note}` : ''),
        status: s.status
      }))
    } catch (e) {
      console.error('Supabase fetch failed', e)
      return []
    }
  }

  // --- Active session detection ---
  // Supabase: trust the explicit status field
  // Obsidian: trust the isLikelyActive flag (no end + within 8h staleness threshold)

  function isActive(session) {
    if (session.source === 'supabase') return session.status === 'active'
    return session.isLikelyActive === true
  }

  // --- Live bar ---

  function updateLiveBar(activeSession) {
    const bar = document.querySelector('[data-livebar]')
    if (!bar) return
    const text = bar.querySelector('[data-livebar-text]')

    if (activeSession) {
      const started = new Date(activeSession.start).getTime()
      const tick = () => {
        const mins = Math.max(0, Math.floor((Date.now() - started) / 60000))
        if (text) text.innerHTML = `<strong>LIVE</strong> — ${activeSession.topic} · ${mins}m`
      }
      bar.dataset.state = 'on'
      tick()
      setInterval(tick, 60_000)
    } else {
      bar.dataset.state = 'idle'
      if (text) text.textContent = 'no active session'
    }
  }

  // --- Live column ---

  function updateLiveColumn(allSessions, stream) {
    const now = new Date()
    const nowContainer = document.getElementById('live-now')
    const nextContainer = document.getElementById('live-next')
    const streamContainer = document.getElementById('live-stream')
    const liveHeading = document.getElementById('live-heading')

    console.log('streamContainer:', streamContainer)
    console.log('allSessions count:', allSessions.length)
    console.log('stream count:', stream ? stream.length : 'null')

    let currentSession = allSessions.find(isActive) || null

    // fall back to most recent if nothing active
    if (!currentSession && allSessions.length > 0) {
      currentSession = allSessions[0]
    }

    const nextSession = allSessions.find(s => new Date(s.start) > now) || null

    if (liveHeading) {
      const isLive = currentSession && isActive(currentSession)
      if (isLive) {
        liveHeading.innerHTML = '<span class="record-dot"></span>LIVE'
        liveHeading.classList.add('is-live')
      } else {
        liveHeading.textContent = 'in progress'
        liveHeading.classList.remove('is-live')
      }
    }

    if (nowContainer && currentSession) {
      const s = currentSession
      const start = new Date(s.start)
      const end = s.end ? new Date(s.end) : null
      const isSessionActive = isActive(s)
      const statusLabel = isSessionActive
        ? '<span class="status active">LIVE NOW</span>'
        : '<span class="status">Most Recent</span>'

      let duration = ''
      if (start && end) {
        const durationMs = end - start
        const hours = Math.floor(durationMs / (1000 * 60 * 60))
        const mins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
        duration = `<span class="session-duration">${hours}h ${mins}m</span>`
      }

      const tick = () => {
        const mins = isSessionActive ? Math.max(0, Math.floor((Date.now() - start) / 60000)) : null
        nowContainer.innerHTML = `
          <div class="session-card ${isSessionActive ? 'active' : ''}">
            <div class="session-header">
              <h3>${processWikilinks(s.topic || 'Session')}</h3>
              ${statusLabel}
            </div>
            <div class="session-meta">
              <span>Started ${relativeTime(s.start)}</span>
              ${isSessionActive ? `<span>${mins}m and counting</span>` : duration}
              ${!isSessionActive && end ? `<span>Ended ${relativeTime(s.end)}</span>` : ''}
            </div>
            ${s.url ? `<a href="${s.url}" class="session-link">View full session →</a>` : ''}
            <div class="content-type-label">session</div>
          </div>`
      }
      tick()
      if (isSessionActive) setInterval(tick, 60_000)
    } else if (nowContainer) {
      nowContainer.innerHTML = '<p class="no-data">No recent work sessions</p>'
    }

    if (nextContainer) {
      if (nextSession) {
        nextContainer.innerHTML = `
          <div class="session-card upcoming">
            <div class="session-header">
              <h3>${processWikilinks(nextSession.topic || 'Upcoming session')}</h3>
              <span class="status">Scheduled ${relativeTime(nextSession.start)}</span>
            </div>
            ${nextSession.url ? `<a href="${nextSession.url}" class="session-link">View details →</a>` : ''}
            <div class="content-type-label">session</div>
          </div>`
      } else {
        nextContainer.innerHTML = ''
      }
    }

    console.log('about to render stream, items:', stream ? stream.length : 'null', 'container:', streamContainer)

    if (streamContainer && stream && stream.length) {
        console.log('rendering stream items:', stream.slice(0, 5))
      streamContainer.innerHTML = stream.slice(0, 5).map((item, i) => `
  <div class="feed-card ${i % 2 === 0 ? 'align-left' : 'align-right'}">
    <div class="feed-card-content">
      <p>${processWikilinks(item.text)}</p>
    </div>
    <div class="feed-card-meta">
      ${relativeTime(item.date)}
      ${(item.noteUrl || item.url) ? `· <a href="${item.noteUrl || item.url}" class="stream-link">view note</a>` : ''}
    </div>
    <div class="content-type-label">recent thinking</div>
  </div>`
).join('')
    }
  }

  // --- Main render ---

  async function render() {
    const base = (window.BASE_URL || "/").replace(/\/+$/, "") + "/";

    const [supabaseSessions, obsidianSessions, stream] = await Promise.all([
      fetchSupabaseSessions(),
      fetchJson(`${base}data/sessions.json`),
      fetchJson(`${base}data/stream.json`)
    ])

    console.log('obsidian sessions:', obsidianSessions)
    console.log('stream:', stream)

    const allSessions = [
      ...(supabaseSessions || []),
      ...(obsidianSessions || [])
    ].sort((a, b) => new Date(b.start) - new Date(a.start))

    const activeSession = allSessions.find(isActive)

    updateLiveBar(activeSession)
    updateLiveColumn(allSessions, stream)
  }

  if (document.readyState !== 'loading') render()
  else document.addEventListener('DOMContentLoaded', render)
  setInterval(render, 30_000)

})();