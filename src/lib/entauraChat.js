// WebSocket client for the EntAura Ask demo bot (`/bot/ws`).
//
// Protocol (EntAura developer guide, section 14):
//   server → {type: 'ready'}
//   client → {type: 'auth', api_key, project_key}          (must be first)
//   server → {type: 'authenticated', ...} | {type: 'error', code, error}
//   client → {type: 'query', query, system_prompt, chat_id?, stream, ...}
//   server → {type: 'event', event: 'start' | 'agent_step' | 'evidence_found' | 'token', data}
//   server → {type: 'complete' | 'result', data: {answer, citations, followups, chat_id}}
//            | {type: 'error', code, error}

const env = import.meta.env

export const chatConfig = {
  url: env.VITE_ENTAURA_WS_URL || 'wss://ask.dev.entaura.ai/bot/ws',
  apiKey: env.VITE_ENTAURA_API_KEY || '',
  projectKey: env.VITE_ENTAURA_PROJECT_KEY || 'demo-texol',
}

const errorMessages = {
  authentication_failed: 'The demo could not sign in to EntAura. Please try again later.',
  insufficient_credits: 'The demo has used its free credits for now. Please try again later.',
}

// Citations become short source labels, e.g. "[1] Pricing_Policy.pdf".
function sourcesFrom(citations) {
  if (!Array.isArray(citations)) return []
  const seen = new Set()
  return citations
    .map(citation => {
      const name = citation?.document_name || citation?.source_name || citation?.project_name
      if (!name) return null
      return citation.label ? `${citation.label} ${name}` : name
    })
    .filter(label => label && !seen.has(label) && seen.add(label))
}

const followupsFrom = list => (Array.isArray(list) ? list.filter(item => typeof item === 'string') : [])

// Opens the socket lazily, authenticates, and reconnects once if it drops.
// `onEvent` receives { type: 'status' | 'chunk' | 'final' | 'progress' | 'error', ... }.
export function createChatConnection({ onEvent }) {
  let socket = null
  let authenticated = false
  let pending = []
  let inFlight = null
  let streaming = false
  let chatId = null
  let retried = false
  let closedByUs = false

  const status = state => onEvent({ type: 'status', state })
  const send = frame => socket.send(JSON.stringify(frame))

  function sendQuery(frame) {
    inFlight = frame
    streaming = false
    send(chatId ? { ...frame, chat_id: chatId } : frame)
  }

  function handle(frame) {
    const data = frame.data || {}
    switch (frame.type) {
      case 'ready':
        return
      case 'authenticated':
        authenticated = true
        retried = false
        status('live')
        pending.forEach(sendQuery)
        pending = []
        return
      case 'event':
        if (frame.event === 'start') {
          if (data.chat_id) chatId = data.chat_id
        } else if (frame.event === 'agent_step' && data.step) {
          onEvent({ type: 'progress', text: data.step })
        } else if (frame.event === 'evidence_found') {
          onEvent({ type: 'progress', text: 'Evidence found, writing the answer' })
        } else if (frame.event === 'token' && typeof data.content === 'string') {
          streaming = true
          onEvent({ type: 'chunk', text: data.content })
        }
        return
      case 'complete':
      case 'result':
        if (data.chat_id) chatId = data.chat_id
        inFlight = null
        onEvent({ type: 'final', text: data.answer || null, followups: followupsFrom(data.followups), sources: sourcesFrom(data.citations) })
        return
      case 'error':
        inFlight = null
        if (frame.code === 'authentication_failed') {
          authenticated = false
          closedByUs = true
          status('offline')
          socket?.close()
        }
        onEvent({ type: 'error', message: errorMessages[frame.code] || frame.error || frame.message || 'The assistant could not answer this question.' })
        return
      default:
    }
  }

  function open() {
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return
    closedByUs = false
    authenticated = false
    status('connecting')
    try {
      socket = new WebSocket(chatConfig.url)
    } catch {
      status('offline')
      onEvent({ type: 'error', message: 'Could not reach the EntAura demo.' })
      return
    }
    // Auth must be the first frame; sending it on open is fine before `ready`.
    socket.addEventListener('open', () => send({ type: 'auth', api_key: chatConfig.apiKey, project_key: chatConfig.projectKey }))
    socket.addEventListener('message', event => {
      try {
        handle(JSON.parse(event.data))
      } catch {
        // Ignore frames that are not JSON.
      }
    })
    socket.addEventListener('close', () => {
      authenticated = false
      if (closedByUs) return
      if (!retried) {
        retried = true
        // Resend a question that had not started answering yet.
        if (inFlight && !streaming) pending.unshift(inFlight)
        inFlight = null
        setTimeout(open, 800)
        return
      }
      status('offline')
      if (inFlight || pending.length) onEvent({ type: 'error', message: 'The connection to the EntAura demo was lost.' })
      inFlight = null
      pending = []
    })
  }

  return {
    open,
    ask(query, systemPrompt) {
      const frame = {
        type: 'query',
        query,
        system_prompt: systemPrompt,
        stream: true,
        include_followups: true,
        retrieval_depth: 'normal',
        web_search_enabled: false,
        progress_id: `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      }
      if (authenticated && socket?.readyState === WebSocket.OPEN) sendQuery(frame)
      else {
        pending.push(frame)
        open()
      }
    },
    // Starts a fresh conversation on the server side.
    reset() {
      chatId = null
    },
    retry() {
      retried = false
      if (!socket || socket.readyState === WebSocket.CLOSED || socket.readyState === WebSocket.CLOSING) {
        socket = null
        open()
      }
    },
    close() {
      closedByUs = true
      socket?.close()
    },
  }
}
