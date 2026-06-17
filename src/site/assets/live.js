(async function () {
  console.log("Live widget loaded");

  const SUPABASE_URL = 'https://fetlnstxydhmtpzzlxur.supabase.co'
  const SUPABASE_KEY = 'sb_publishable_6iYXZtPYvCM_1i9hVmULYg_cPCV1rHw'

  // --- Utilities ---

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  function relativeTime(dateString) {
    if (!dateString) return "unknown time";
    const d = new Date(normalizeSessionTimestamp(dateString));
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
    return new Date(normalizeSessionTimestamp(iso)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  function normalizeSessionTimestamp(value) {
    if (!value) return null;
    const raw = String(value).trim();
    if (!raw) return null;
    const normalized = raw.replace(' ', 'T');
    const hasTimezone = /(?:Z|[+-]\d{2}:?\d{2})$/i.test(normalized);
    if (hasTimezone) {
      if (/[+-]\d{4}$/.test(normalized)) {
        return normalized.replace(/([+-]\d{2})(\d{2})$/, '$1:$2');
      }
      return normalized;
    }
    return `${normalized}Z`;
  }

  function toUtcMs(value) {
    const normalized = normalizeSessionTimestamp(value);
    if (!normalized) return NaN;
    const ms = Date.parse(normalized);
    return Number.isFinite(ms) ? ms : NaN;
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
        status: s.status,
        url: `/daily/${s.started.slice(0, 10)}/`
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
    if (session.source === 'supabase') {
      const status = String(session.status || '').trim().toLowerCase();
      if (status !== 'active') return false;

      const now = Date.now();
      const startedMs = toUtcMs(session.start);
      const endedMs = toUtcMs(session.end);

      if (Number.isFinite(startedMs) && startedMs > now) return false;
      if (Number.isFinite(endedMs) && endedMs <= now) return false;
      return true;
    }
    return session.isLikelyActive === true
  }

  // --- Live bar ---

  function updateLiveBar(activeSession) {
    const bar = document.querySelector('[data-livebar]')
    if (!bar) return
    const text = bar.querySelector('[data-livebar-text]')

    if (activeSession) {
      const started = toUtcMs(activeSession.start)
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
    const nowMs = Date.now()
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

    const nextSession = allSessions.find(s => {
      const startMs = toUtcMs(s.start)
      return Number.isFinite(startMs) && startMs > nowMs
    }) || null

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
      const startMs = toUtcMs(s.start)
      const endMs = toUtcMs(s.end)
      const isSessionActive = isActive(s)
      const statusLabel = isSessionActive
        ? '<span class="status active">LIVE NOW</span>'
        : '<span class="status">Most Recent</span>'

      let duration = ''
      if (Number.isFinite(startMs) && Number.isFinite(endMs) && endMs >= startMs) {
        const durationMs = endMs - startMs
        const hours = Math.floor(durationMs / (1000 * 60 * 60))
        const mins = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60))
        duration = `<span class="session-duration">${hours}h ${mins}m</span>`
      }

      const tick = () => {
        const mins = isSessionActive && Number.isFinite(startMs)
          ? Math.max(0, Math.floor((Date.now() - startMs) / 60000))
          : null
        nowContainer.innerHTML = `
          <div class="session-card ${isSessionActive ? 'active' : ''}">
            <div class="session-header">
              <h3>${processWikilinks(s.topic || 'Session')}</h3>
              ${statusLabel}
            </div>
            <div class="session-meta">
              <span>Started ${relativeTime(s.start)}</span>
              ${isSessionActive ? `<span>${mins}m and counting</span>` : duration}
              ${!isSessionActive && Number.isFinite(endMs) ? `<span>Ended ${relativeTime(s.end)}</span>` : ''}
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
    ].sort((a, b) => {
      const bStart = toUtcMs(b.start)
      const aStart = toUtcMs(a.start)
      if (!Number.isFinite(bStart)) return -1
      if (!Number.isFinite(aStart)) return 1
      return bStart - aStart
    })

    allSessions.forEach((session, index) => {
      const parsedStart = new Date(normalizeSessionTimestamp(session.start))
      console.log('[live][session-before-isActive]', {
        index,
        source: session.source || null,
        start: session.start || null,
        end: session.end || null,
        status: session.status || null,
        parsedStartIso: Number.isNaN(parsedStart.getTime()) ? null : parsedStart.toISOString(),
      })
    })

    const activeSession = allSessions.find(isActive)

    updateLiveBar(activeSession)
    updateLiveColumn(allSessions, stream)
  }

  if (document.readyState !== 'loading') render()
  else document.addEventListener('DOMContentLoaded', render)
  setInterval(render, 30_000)

})();