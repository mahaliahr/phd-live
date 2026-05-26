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

  // find active, next, and most recent
  let currentSession = null
  let nextSession = null

  for (const session of allSessions) {
    if (!session.start) continue
    const start = new Date(session.start)
    if (isNaN(start.getTime())) continue
    const end = session.end ? new Date(session.end) : null
    if (start <= now && (!end || end >= now)) {
      currentSession = session
      break
    }
  }

  for (const s of allSessions) {
    if (new Date(s.start) > now) {
      nextSession = s
      break
    }
  }

  if (!currentSession && allSessions.length > 0) {
    currentSession = allSessions[0]
  }

  // update heading
  if (liveHeading) {
    const isLive = currentSession && !currentSession.end
    if (isLive) {
      liveHeading.innerHTML = '<span class="record-dot"></span>LIVE'
      liveHeading.classList.add('is-live')
    } else {
      liveHeading.textContent = 'in progress'
      liveHeading.classList.remove('is-live')
    }
  }

  // current session card
  if (nowContainer && currentSession) {
    const s = currentSession
    const start = new Date(s.start)
    const end = s.end ? new Date(s.end) : null
    const isActive = start <= now && (!end || end >= now)
    const statusLabel = isActive
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
      const mins = isActive ? Math.max(0, Math.floor((Date.now() - start) / 60000)) : null
      nowContainer.innerHTML = `
        <div class="session-card ${isActive ? 'active' : ''}">
          <div class="session-header">
            <h3>${processWikilinks(s.topic || 'Session')}</h3>
            ${statusLabel}
          </div>
          <div class="session-meta">
            <span>Started ${relativeTime(s.start)}</span>
            ${isActive ? `<span>${mins}m and counting</span>` : duration}
            ${!isActive && end ? `<span>Ended ${relativeTime(s.end)}</span>` : ''}
          </div>
          ${s.url ? `<a href="${s.url}" class="session-link">View full session →</a>` : ''}
          <div class="content-type-label">session</div>
        </div>`
    }
    tick()
    if (isActive) setInterval(tick, 60_000)
  } else if (nowContainer) {
    nowContainer.innerHTML = '<p class="no-data">No recent work sessions</p>'
  }

  // next session card
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

  // stream items
  if (streamContainer && stream && stream.length) {
    streamContainer.innerHTML = stream.slice(0, 5).map(item => `
      <div class="stream-item">
        <span class="stream-time">${relativeTime(item.date)}</span>
        <span class="stream-text">${processWikilinks(item.text)}</span>
        ${item.noteUrl ? `<a href="${item.noteUrl}" class="stream-link">→</a>` : ''}
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

  const allSessions = [
    ...(supabaseSessions || []),
    ...(obsidianSessions || [])
  ].sort((a, b) => new Date(b.start) - new Date(a.start))

  const activeSession = allSessions.find(s => s.status === 'active' || (!s.end && new Date(s.start) <= new Date()))

  updateLiveBar(activeSession)
  updateLiveColumn(allSessions, stream)
}

if (document.readyState !== 'loading') render()
else document.addEventListener('DOMContentLoaded', render)
setInterval(render, 30_000)