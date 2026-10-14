// WebSocket client for the EntAura Ask demo bot.
//
// The socket's message format is not documented here yet, so everything that
// depends on it lives in this file: the request sent for each question and
// the tolerant reading of replies. Adjust `buildRequest` and `readFrame` once
// the format is confirmed.

const env = import.meta.env

export const chatConfig = {
  url: env.VITE_ENTAURA_WS_URL || 'wss://ask.dev.entaura.ai/bot/ws',
  apiKey: env.VITE_ENTAURA_API_KEY || '',
  projectKey: env.VITE_ENTAURA_PROJECT_KEY || 'demo-texol',
}

function socketUrl() {
  // Browsers cannot set headers on a WebSocket, so the keys go in the URL.
  const url = new URL(chatConfig.url)
  if (chatConfig.apiKey) url.searchParams.set('api_key', chatConfig.apiKey)
  url.searchParams.set('project_key', chatConfig.projectKey)
  return url.toString()
}

function buildRequest({ query, systemPrompt, progressId }) {
  return {
    api_key: chatConfig.apiKey,
    project_key: chatConfig.projectKey,
    query,
    system_prompt: systemPrompt,
    language: 'en',
    include_followups: true,
    retrieval_depth: 'normal',
    web_search_enabled: false,
    progress_id: progressId,
    stream: true,
  }
}

const textKeys = ['answer', 'response', 'result', 'message', 'text', 'output']
const chunkKeys = ['token', 'delta', 'chunk', 'content']
const finalTypes = ['final', 'complete', 'completed', 'done', 'answer', 'result', 'end']
const progressTypes = ['progress', 'status', 'thinking', 'step']

const firstString = (data, keys) => keys.map(key => data?.[key]).find(value => typeof value === 'string')

function toList(value) {
  if (!Array.isArray(value)) return []
  return value
    .map(item => (typeof item === 'string' ? item : item?.question || item?.title || item?.name || item?.source || item?.text))
    .filter(Boolean)
}

// Turns one socket frame into zero or more chat events.
function readFrame(raw) {
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    return [{ type: 'chunk', text: String(raw) }]
  }
  if (typeof data === 'string') return [{ type: 'chunk', text: data }]
  const body = data?.data && typeof data.data === 'object' ? { ...data, ...data.data } : data
  const type = String(body?.type || body?.event || '').toLowerCase()

  if (type === 'error' || body?.error) {
    return [{ type: 'error', message: firstString(body, ['error', 'message', 'detail']) || 'The assistant could not answer.' }]
  }
  if (progressTypes.includes(type) && !body.done) {
    const text = firstString(body, ['message', 'status', 'progress', 'step', 'text'])
    return text ? [{ type: 'progress', text }] : []
  }

  const followups = toList(body.followups || body.follow_ups || body.follow_up_questions || body.suggested_questions)
  const sources = toList(body.sources || body.evidence || body.citations || body.references)
  const isFinal = finalTypes.includes(type) || body.done === true || body.final === true || body.is_final === true
  const chunk = firstString(body, chunkKeys)
  const text = firstString(body, textKeys)

  if (isFinal || (!chunk && text)) {
    return [{ type: 'final', text: text ?? chunk ?? null, followups, sources }]
  }
  if (chunk) return [{ type: 'chunk', text: chunk }]
  if (followups.length || sources.length) return [{ type: 'meta', followups, sources }]
  return []
}

// Opens the socket lazily and reconnects once if it drops. `onEvent` receives
// { type: 'status' | 'chunk' | 'final' | 'meta' | 'progress' | 'error', ... }.
export function createChatConnection({ onEvent }) {
  let socket = null
  let pending = []
  let retried = false
  let closedByUs = false

  const status = state => onEvent({ type: 'status', state })

  function open() {
    if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return
    closedByUs = false
    status('connecting')
    try {
      socket = new WebSocket(socketUrl())
    } catch {
      status('offline')
      onEvent({ type: 'error', message: 'Could not reach the EntAura demo.' })
      return
    }
    socket.addEventListener('open', () => {
      retried = false
      status('live')
      pending.forEach(message => socket.send(message))
      pending = []
    })
    socket.addEventListener('message', event => readFrame(event.data).forEach(onEvent))
    socket.addEventListener('close', () => {
      if (closedByUs) return
      if (!retried) {
        retried = true
        setTimeout(open, 800)
        return
      }
      status('offline')
      onEvent({ type: 'error', message: 'The connection to the EntAura demo was lost.' })
    })
  }

  return {
    open,
    ask(query, systemPrompt) {
      const progressId = `web-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
      const message = JSON.stringify(buildRequest({ query, systemPrompt, progressId }))
      if (socket?.readyState === WebSocket.OPEN) socket.send(message)
      else {
        pending.push(message)
        open()
      }
    },
    retry() {
      retried = false
      socket = null
      open()
    },
    close() {
      closedByUs = true
      socket?.close()
    },
  }
}
