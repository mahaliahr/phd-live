(async function () {
  console.log("Live widget loaded");

  const SUPABASE_URL = 'https://fetlnstxydhmtpzzlxur.supabase.co'
  const SUPABASE_KEY = 'sb_publishable_6iYXZtPYvCM_1i9hVmULYg_cPCV1rHw'

  // Bot session lines (study companion / supervisor bot) are disabled
  // pending a redesigned output — flip this back to true to re-enable.
  const SHOW_BOT_SESSIONS = false

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

  function parseLinks(text) {
    if (!text) return text

    // wikilinks: [[note name]] → internal link
    text = text.replace(/\[\[([^\]]+)\]\]/g, (_, name) => {
      const slug = name.toLowerCase().replace(/\s+/g, '-')
      return `<a href="/notes/${slug}" class="live-card-link">${name}</a>`
    })

    // markdown links: [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
      const isExternal = url.startsWith('http')
      return `<a href="${url}" class="live-card-link"${isExternal ? ' target="_blank" rel="noopener"' : ''}>${label}</a>`
    })

    return text
  }

  function toShortPreview(text, max = 160) {
    if (!text) return ''
    const cleaned = String(text)
      .replace(/\[\[([^\]|#]+)(?:#[^\]]+)?(?:\|([^\]]+))?\]\]/g, (_, link, alias) => alias || link)
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/\s+/g, ' ')
      .trim()
    if (cleaned.length <= max) return cleaned
    return `${cleaned.slice(0, max - 1).trimEnd()}…`
  }

  function formatDurationMinutes(startValue, endValue) {
    const startMs = toUtcMs(startValue)
    const endMs = toUtcMs(endValue)
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs < startMs) {
      return ''
    }

    const totalMinutes = Math.max(1, Math.round((endMs - startMs) / 60000))
    return `${totalMinutes} mins`
  }

  function hasSessionFrontmatter(text) {
    if (!text) return false
    return /(?:^|\n)\s*(start|end|topic)::/i.test(String(text))
  }

  function parseSessionBlocksFromText(text) {
    const sessions = []
    if (!text) return sessions

    const content = String(text).replace(/\r\n?/g, '\n')
    const startPattern = /\bstart::\s*(.+?)(?=(?:\s+\btopic::|\s+\bend::|\s+\bstart::|\n|$))/gi
    const starts = []
    let match

    while ((match = startPattern.exec(content)) !== null) {
      const startValue = String(match[1] || '').trim()
      if (!startValue) continue
      starts.push({ value: startValue, index: match.index })
    }

    for (let i = 0; i < starts.length; i++) {
      const current = starts[i]
      const nextIndex = starts[i + 1]?.index ?? content.length
      const block = content.slice(current.index, nextIndex)

      const topicMatch = /\btopic::\s*(.+?)(?=(?:\s+\bend::|\s+\bstart::|\n|$))/i.exec(block)
      const endMatch = /\bend::\s*(.+?)(?=(?:\s+\bstart::|\n|$))/i.exec(block)
      const started = normalizeSessionTimestamp(current.value)
      const ended = normalizeSessionTimestamp(endMatch?.[1] ? String(endMatch[1]).trim() : null)
      const topic = topicMatch?.[1] ? String(topicMatch[1]).trim() : null

      if (!started || !Number.isFinite(toUtcMs(started))) continue
      sessions.push({
        type: 'session',
        started,
        topic: topic || 'Session',
        ended: ended || null,
      })
    }

    return sessions
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
        source: s.source || 'dashboard',
        start: s.started,
        end: s.ended || null,
        topic: s.type + (s.note ? ` · ${s.note}` : ''),
        summary: s.summary || null,
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
    if (session.source === 'study_companion' || session.source === 'supervisor_bot') return false
    if (session.source === 'dashboard') {
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

  let tickerRAF = null

  function applyTickerIfNeeded(meta) {
    if (tickerRAF) {
      cancelAnimationFrame(tickerRAF)
      tickerRAF = null
    }

    meta.classList.remove('is-scrolling')
    meta.innerHTML = meta.textContent

    requestAnimationFrame(() => {
      if (meta.scrollWidth <= meta.offsetWidth) return

      const text = meta.textContent
      const gap = '     '
      const full = text + gap + text
      const span = document.createElement('span')
      span.style.display = 'inline-block'
      span.style.willChange = 'transform'
      span.textContent = full
      meta.innerHTML = ''
      meta.appendChild(span)
      meta.classList.add('is-scrolling')

      const singleWidth = span.offsetWidth / 2
      let pos = 0
      const speed = 0.4

      function tick() {
        pos += speed
        if (pos >= singleWidth) pos -= singleWidth
        span.style.transform = `translateX(${-pos}px)`
        tickerRAF = requestAnimationFrame(tick)
      }

      tickerRAF = requestAnimationFrame(tick)
    })
  }

  let liveBarTicker = null

  function updateLiveBar(activeSession) {
    const dot = document.querySelector('[data-logo-dot]')
    const meta = document.querySelector('[data-logo-meta]')
    if (!dot) return

    // Every render() call reached this point before without clearing the
    // previous interval, so intervals piled up the longer the page stayed
    // open (each one re-running the marquee setup). Clear before re-arming.
    if (liveBarTicker) {
      clearInterval(liveBarTicker)
      liveBarTicker = null
    }

    if (activeSession) {
      dot.dataset.state = 'live'
      const started = toUtcMs(activeSession.start)
      const tick = () => {
        const totalMins = Math.max(0, Math.floor((Date.now() - started) / 60000))
        let duration
        if (totalMins >= 60) {
          const h = Math.floor(totalMins / 60)
          const m = totalMins % 60
          duration = m > 0 ? `${h}h ${m}m` : `${h}h`
        } else {
          duration = `${totalMins}m`
        }
        if (meta) {
          meta.textContent = `${activeSession.topic} · ${duration}`
          applyTickerIfNeeded(meta)
        }
      }
      tick()
      liveBarTicker = setInterval(tick, 60_000)
    } else {
      dot.dataset.state = 'idle'
      if (meta) meta.textContent = ''
    }
  }

  // --- Live column ---

  let liveSessionTicker = null
  let hasSyncedInfoColumnHeight = false
  let lastTimelineSignature = null

  function syncInfoColumnHeightVar() {
    const layoutRow = document.querySelector('.phd-live-main')
    const infoCol = layoutRow?.querySelector('section.info-column') || document.querySelector('section.info-column')
    if (!infoCol) return

    const milestonesEl = infoCol.querySelector('.milestone-list')?.closest('.info-section') || infoCol.querySelector('.milestone-list')
    if (!milestonesEl) return

    const measuredHeight = Math.round(milestonesEl.getBoundingClientRect().bottom - infoCol.getBoundingClientRect().top)
    if (!Number.isFinite(measuredHeight) || measuredHeight <= 0) return

    const heightValue = `${measuredHeight}px`
    if (layoutRow) {
      layoutRow.style.setProperty('--info-column-height', heightValue)
    }
    document.documentElement.style.setProperty('--info-column-height', heightValue)
  }

  function isSameSession(a, b) {
    if (!a || !b) return false
    return String(a.source || '') === String(b.source || '')
      && String(a.start || '') === String(b.start || '')
      && String(a.topic || '') === String(b.topic || '')
  }

  function updateLiveColumn(allSessions, stream) {
    const nowMs = Date.now()
    const nowContainer = document.getElementById('live-now')
    const nextContainer = document.getElementById('live-next')
    const pastSessionsContainer = document.getElementById('live-past-sessions')
    const streamContainer = document.getElementById('live-stream')
    const liveHeading = document.getElementById('live-heading')

    const dashboardSessions = allSessions.filter(
      s => s.source !== 'study_companion' && s.source !== 'supervisor_bot'
    )

    let currentSession = dashboardSessions.find(isActive) || null

    // fall back to most recent if nothing active
    if (!currentSession && dashboardSessions.length > 0) {
      currentSession = dashboardSessions[0]
    }

    const nextSession = dashboardSessions.find(s => {
      const startMs = toUtcMs(s.start)
      return Number.isFinite(startMs) && startMs > nowMs
    }) || null

    const pastSessions = dashboardSessions
      .filter(s => {
        const startedMs = toUtcMs(s.start)
        return Number.isFinite(startedMs) && startedMs < nowMs && !isActive(s)
      })
      .slice(0, 20)

    const timelineItems = []
    if (currentSession) {
      timelineItems.push({
        type: 'session',
        variant: 'current',
        started: normalizeSessionTimestamp(currentSession.start),
        topic: currentSession.topic || 'Session',
        ended: normalizeSessionTimestamp(currentSession.end),
        url: currentSession.url || '',
        session: currentSession,
        timestampMs: toUtcMs(currentSession.start)
      })
    }
    if (nextSession && !isSameSession(nextSession, currentSession)) {
      timelineItems.push({
        type: 'session',
        variant: 'next',
        started: normalizeSessionTimestamp(nextSession.start),
        topic: nextSession.topic || 'Upcoming session',
        ended: normalizeSessionTimestamp(nextSession.end),
        url: nextSession.url || '',
        session: nextSession,
        timestampMs: toUtcMs(nextSession.start)
      })
    }
    pastSessions.forEach(s => {
      if (!isSameSession(s, currentSession) && !isSameSession(s, nextSession)) {
        timelineItems.push({
          type: 'session',
          variant: 'past',
          started: normalizeSessionTimestamp(s.start),
          topic: s.topic || 'Session',
          ended: normalizeSessionTimestamp(s.end),
          url: s.url || '',
          session: s,
          timestampMs: toUtcMs(s.start)
        })
      }
    })

    const streamTimelineItems = []
    for (const item of (stream || [])) {
      const sourceText = String(item?.text || '')
      const sourceUrl = item?.noteUrl || item?.url || ''
      const parsedSessions = parseSessionBlocksFromText(sourceText)

      if (parsedSessions.length) {
        parsedSessions.forEach(parsed => {
          streamTimelineItems.push({
            ...parsed,
            variant: 'past',
            url: sourceUrl,
            timestampMs: toUtcMs(parsed.started)
          })
        })
        continue
      }

      if (hasSessionFrontmatter(sourceText)) {
        continue
      }

      streamTimelineItems.push({
        type: 'stream',
        text: sourceText,
        url: sourceUrl,
        timestampMs: toUtcMs(item?.date),
        date: item?.date
      })
    }

    const streamItems = streamTimelineItems.filter(item => Number.isFinite(item.timestampMs))

    timelineItems.push(...streamItems)
    if (SHOW_BOT_SESSIONS) {
      const botItems = allSessions.filter(
        s => s.source === 'study_companion' || s.source === 'supervisor_bot'
      )
      botItems.forEach(s => {
        timelineItems.push({
          type: 'bot',
          source: s.source,
          started: s.start,
          summary: s.summary,
          status: s.status,
          timestampMs: toUtcMs(s.start)
        })
      })
    }

    timelineItems.sort((a, b) => {
      const bStart = b.timestampMs
      const aStart = a.timestampMs
      if (!Number.isFinite(bStart)) return -1
      if (!Number.isFinite(aStart)) return 1
      return bStart - aStart
    })

    // Without a cap, this list only grows as stream.json picks up bot
    // summaries — every 30s tick would then be rebuilding more HTML than
    // the last. Keep it to the most recent N regardless of source mix.
    const MAX_TIMELINE_ITEMS = 40
    if (timelineItems.length > MAX_TIMELINE_ITEMS) {
      timelineItems.length = MAX_TIMELINE_ITEMS
    }

    if (liveHeading) {
      const isMirrorActive = mirrorFeed && !mirrorFeed.hidden
      if (!isMirrorActive) {
        const isLive = currentSession && isActive(currentSession)
        if (isLive) {
          liveHeading.innerHTML = 'LIVE <span class="live-heading-meta">work happening now</span>'
          liveHeading.classList.add('is-live')
        } else {
          liveHeading.innerHTML = 'IN PROGRESS <span class="live-heading-meta">(latest activities)</span>'
          liveHeading.classList.remove('is-live')
        }
        savedLiveHeading = liveHeading.innerHTML
      }
    }

    // Cheap fingerprint of what would actually render. If it's identical to
    // last tick, skip rebuilding the whole <ul> — relative-time labels are
    // the only thing that could drift, and those are minutes-granularity
    // at most, not worth a full HTML rebuild every 30s.
    const timelineSignature = JSON.stringify(
      timelineItems.map(i => [i.type, i.variant, i.topic || i.text || '', i.timestampMs, i.url || ''])
    )
    const timelineUnchanged = timelineSignature === lastTimelineSignature
    lastTimelineSignature = timelineSignature

    if (timelineUnchanged && nowContainer && nowContainer.childElementCount > 0) {
      // no-op: identical content, leave existing DOM (and its running
      // activeTimerNode interval, if any) untouched
    } else if (nowContainer && timelineItems.length) {
      if (liveSessionTicker) {
        clearInterval(liveSessionTicker)
        liveSessionTicker = null
      }
      nowContainer.innerHTML = `
        <ul class="live-session-timeline">
          ${timelineItems.map(item => {
            if (item.type === 'bot') {
              const botName = item.source === 'supervisor_bot' ? 'supervisor bot' : 'study companion'
              const statusText = item.status === 'active' ? 'in progress' : (item.summary || '')
              return `
                <li class="session-item bot">
                  <span class="bot-name">${botName}</span>
                  <span class="session-meta-inline">${statusText}</span>
                  <span class="session-meta-inline">${relativeTime(item.started)}</span>
                </li>`
            }

            if (item.type === 'stream') {
              const streamText = parseLinks(String(item.text || '').trim())
              return `
                <li class="session-item stream">
                  <div class="stream-item-content">
                    <p class="stream-text-preview">${streamText}</p>
                  </div>
                  <div class="stream-meta-row">
                    ${relativeTime(item.date)}
                    ${item.url ? `· <a href="${item.url}" class="stream-link">view note</a>` : ''}
                  </div>
                  <div class="content-type-label">recent thinking</div>
                </li>`
            }

            if (item.type !== 'session') {
              return ''
            }

            const s = item.session || {
              start: item.started,
              end: item.ended,
              topic: item.topic,
              url: item.url,
              source: 'parsed-note-session',
              isLikelyActive: false,
            }

            if (item.variant === 'past') {
              const durationLabel = formatDurationMinutes(s.start || item.started, s.end || item.ended)
              const metaLabel = [relativeTime(s.start || item.started), durationLabel].filter(Boolean).join(' · ')
              return `
                <li class="session-item past">
                  <a href="${s.url || '#'}" class="session-link">${processWikilinks(s.topic || item.topic || 'Session')}</a>
                  <span class="session-meta-inline">${metaLabel}</span>
                </li>`
            }

            if (item.variant === 'next') {
              return `
                <li class="session-item next">
                  <div class="session-card upcoming">
                    <div class="session-header">
                      <h3>${processWikilinks(s.topic || item.topic || 'Upcoming session')}</h3>
                      <span class="status">Scheduled ${relativeTime(s.start || item.started)}</span>
                    </div>
                    ${s.url ? `<a href="${s.url}" class="session-link">View details →</a>` : ''}
                    <div class="content-type-label">session</div>
                  </div>
                </li>`
            }

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

            const activeTimer = isSessionActive && Number.isFinite(startMs)
              ? `<span data-live-mins data-start-ms="${startMs}">${Math.max(0, Math.floor((Date.now() - startMs) / 60000))}m and counting</span>`
              : duration

            return `
              <li class="session-item current">
                <div class="session-card ${isSessionActive ? 'active' : ''}">
                  <div class="session-header">
                    <h3>${processWikilinks(s.topic || 'Session')}</h3>
                    ${statusLabel}
                  </div>
                  <div class="session-meta">
                    <span>Started ${relativeTime(s.start)}</span>
                    ${activeTimer}
                    ${!isSessionActive && Number.isFinite(endMs) ? `<span>Ended ${relativeTime(s.end)}</span>` : ''}
                  </div>
                  ${s.url ? `<a href="${s.url}" class="session-link">View full session →</a>` : ''}
                  <div class="content-type-label">session</div>
                </div>
              </li>`
          }).join('')}
        </ul>`

      const activeTimerNode = nowContainer.querySelector('[data-live-mins]')
      if (activeTimerNode) {
        liveSessionTicker = setInterval(() => {
          const startMs = Number(activeTimerNode.getAttribute('data-start-ms'))
          if (!Number.isFinite(startMs)) return
          const mins = Math.max(0, Math.floor((Date.now() - startMs) / 60000))
          activeTimerNode.textContent = `${mins}m and counting`
        }, 60_000)
      }
    } else if (nowContainer) {
      nowContainer.innerHTML = '<p class="no-data">No recent work sessions</p>'
    }

    if (nextContainer) {
      nextContainer.innerHTML = ''
    }

    if (pastSessionsContainer) {
      pastSessionsContainer.innerHTML = ''
    }

    if (streamContainer) {
      streamContainer.innerHTML = ''
    }
  }

  // --- Main render ---

  async function render() {
    // Mirror data only changes once a day (00:30 UTC sync). No reason to
    // fetch and rebuild the live timeline every 30s while it's hidden.
    const mirrorFeedEl = document.getElementById('mirror-feed')
    if (mirrorFeedEl && !mirrorFeedEl.hidden) return

    const base = (window.BASE_URL || "/").replace(/\/+$/, "") + "/";

    const [supabaseSessions, obsidianSessions, stream] = await Promise.all([
      fetchSupabaseSessions(),
      fetchJson(`${base}data/sessions.json`),
      fetchJson(`${base}data/stream.json`)
    ])

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

    const activeSession = allSessions.find(isActive)

    updateLiveBar(activeSession)
    updateLiveColumn(allSessions, stream)

    if (!hasSyncedInfoColumnHeight) {
      hasSyncedInfoColumnHeight = true
      requestAnimationFrame(() => {
        syncInfoColumnHeightVar()
      })
    }
  }

  window.addEventListener('resize', syncInfoColumnHeightVar)

  if (document.readyState !== 'loading') render()
  else document.addEventListener('DOMContentLoaded', render)
  setInterval(render, 30_000)

  // --- Mirror toggle ---

  const mirrorToggle = document.getElementById('mirror-toggle')
  const liveFeed = document.getElementById('live-feed')
  const mirrorFeed = document.getElementById('mirror-feed')
  const mirrorWeeklyContent = document.getElementById('mirror-weekly-content')
  const mirrorDailyContent = document.getElementById('mirror-daily-content')

  let mirrorLoaded = false

  function parseListLines(text) {
    if (!text) return []
    return text.split('\n')
      .map(l => l.replace(/^-\s*/, '').trim())
      .filter(l => l && l !== 'none')
  }

  function parseMirrorSections(text) {
    const sections = {}
    let currentSection = null
    let currentLines = []
    let content = text
    if (text.startsWith('---')) {
      const end = text.indexOf('---', 3)
      if (end !== -1) content = text.slice(end + 3).trim()
    }
    for (const line of content.split('\n')) {
      if (line.startsWith('## ')) {
        if (currentSection !== null) {
          sections[currentSection] = currentLines.join('\n').trim()
        }
        currentSection = line.slice(3).trim().toLowerCase().replace(/\s+/g, '_')
        currentLines = []
      } else {
        currentLines.push(line)
      }
    }
    if (currentSection !== null) {
      sections[currentSection] = currentLines.join('\n').trim()
    }
    return sections
  }

  function renderMirrorWeekly(file) {
    if (!file) return '<p class="mirror-empty">no weekly digest yet</p>'
    const s = parseMirrorSections(file.raw)

    const synthesisRaw = s.synthesis || ''
    const groundedIdx = synthesisRaw.indexOf('grounded in:')
    const synthesisText = groundedIdx > -1
      ? synthesisRaw.slice(0, groundedIdx).trim()
      : synthesisRaw.trim()
    const groundedText = groundedIdx > -1
      ? synthesisRaw.slice(groundedIdx).trim()
      : ''

    const terms = parseListLines(s.recurring_terms).slice(0, 10).map(t => {
      const parts = t.split(' — ')
      return `<span class="mirror-term">
        ${parts[0]}
        <span class="mirror-term-count">${parts[1] || ''}</span>
      </span>`
    }).join('')

    const days = parseListLines(s.activity_by_day).map(d => {
      const inactive = d.includes('no activity')
      return `<span class="mirror-day ${inactive
        ? 'mirror-day--inactive' : ''}">${d}</span>`
    }).join('')

    const orphanLines = parseListLines(s.orphans_this_week)

    return `
      <div class="mirror-section">
        <p class="mirror-label">week ${file.week}</p>
        <div class="mirror-summary">
          ${parseListLines(s.summary).map(l =>
            `<span class="mirror-summary-item">${l}</span>`
          ).join('')}
        </div>
      </div>
      <div class="mirror-section">
        <p class="mirror-label">activity</p>
        <div class="mirror-days">${days}</div>
      </div>
      <div class="mirror-section">
        <p class="mirror-label">recurring terms</p>
        <div class="mirror-terms">${terms}</div>
      </div>
      ${orphanLines.length ? `
        <div class="mirror-section">
          <p class="mirror-label">orphans</p>
          ${orphanLines.map(o =>
            `<p class="mirror-orphan">${o}</p>`
          ).join('')}
        </div>` : ''}
      <div class="mirror-section mirror-section--synthesis">
        <p class="mirror-label">synthesis</p>
        <p class="mirror-synthesis-text">${synthesisText}</p>
        ${groundedText
          ? `<p class="mirror-grounded">${groundedText}</p>`
          : ''}
      </div>
      <div class="mirror-section">
        <p class="mirror-label">generated prompt</p>
        <p class="mirror-prompt">${s.generated_prompt || ''}</p>
      </div>`
  }

  function renderMirrorDaily(file) {
    if (!file) return '<p class="mirror-empty">no daily digest yet</p>'
    const s = parseMirrorSections(file.raw)
    const created = parseListLines(s.notes_created)
    const edited = parseListLines(s.notes_edited)
    const sessions = parseListLines(s.sessions)
    const orphans = parseListLines(s.orphans_flagged)
    return `
      <div class="mirror-section">
        <p class="mirror-label">today · ${file.date}</p>
        ${created.length ? `
          <p class="mirror-sublabel">created</p>
          ${created.map(n =>
            `<p class="mirror-item">${n}</p>`).join('')}` : ''}
        ${edited.length ? `
          <p class="mirror-sublabel">edited</p>
          ${edited.map(n =>
            `<p class="mirror-item">${n}</p>`).join('')}` : ''}
        ${sessions.length ? `
          <p class="mirror-sublabel">sessions</p>
          ${sessions.map(n =>
            `<p class="mirror-item">${n}</p>`).join('')}` : ''}
        ${orphans.length ? `
          <p class="mirror-sublabel">orphans</p>
          ${orphans.map(n =>
            `<p class="mirror-item mirror-item--muted">${n}</p>`
          ).join('')}` : ''}
      </div>`
  }

  async function loadMirrorData() {
    if (mirrorLoaded) return
    const base = (window.BASE_URL || "/").replace(/\/+$/, "") + "/"
    try {
      const [weeklyRes, dailyRes] = await Promise.all([
        fetch(`${base}mirror/mirror-weekly.json`),
        fetch(`${base}mirror/mirror-daily.json`)
      ])
      const weekly = await weeklyRes.json()
      const daily = await dailyRes.json()
      if (mirrorWeeklyContent) {
        mirrorWeeklyContent.innerHTML =
          renderMirrorWeekly(weekly.files && weekly.files[0])
      }
      if (mirrorDailyContent) {
        mirrorDailyContent.innerHTML =
          renderMirrorDaily(daily.files && daily.files[0])
      }
      mirrorLoaded = true
    } catch (e) {
      if (mirrorWeeklyContent) {
        mirrorWeeklyContent.innerHTML =
          '<p class="mirror-empty">mirror data unavailable</p>'
      }
    }
  }

  const liveHeadingEl = document.getElementById('live-heading')

  let savedLiveHeading = null

  function setMirrorMode(active) {
    const liveColumn = document.querySelector('.live-column')
    if (active) {
      if (liveFeed) liveFeed.hidden = true
      if (mirrorFeed) mirrorFeed.hidden = false
      mirrorToggle.setAttribute('aria-checked', 'true')
      mirrorToggle.classList.add('mirror-toggle-switch--on')
      if (liveHeadingEl) savedLiveHeading = liveHeadingEl.innerHTML
      if (liveHeadingEl) {
        liveHeadingEl.innerHTML = 'MIRROR <span class="live-heading-meta live-heading-meta--mirror">an automated layer that reads research activity and surfaces patterns</span>'
        liveHeadingEl.classList.add('mirror-mode-heading')
      }
      if (liveColumn) liveColumn.classList.add('live-column--mirror')
    } else {
      if (liveFeed) liveFeed.hidden = false
      if (mirrorFeed) mirrorFeed.hidden = true
      mirrorToggle.setAttribute('aria-checked', 'false')
      mirrorToggle.classList.remove('mirror-toggle-switch--on')
      if (liveHeadingEl) {
        liveHeadingEl.innerHTML = savedLiveHeading ||
          'IN PROGRESS <span class="live-heading-meta">(latest activities)</span>'
        liveHeadingEl.classList.remove('mirror-mode-heading')
        savedLiveHeading = null
      }
      if (liveColumn) liveColumn.classList.remove('live-column--mirror')
    }
  }

  if (mirrorToggle) {
    mirrorToggle.addEventListener('click', async () => {
      const showing = mirrorFeed && !mirrorFeed.hidden
      setMirrorMode(!showing)
      if (!showing) await loadMirrorData()
    })
  }

})();