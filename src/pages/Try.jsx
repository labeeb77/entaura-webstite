import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatMessage from '../components/try/ChatMessage.jsx'
import Composer from '../components/try/Composer.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { suggestionGroups, systemPrompt } from '../data/tryChat.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { createChatConnection } from '../lib/entauraChat.js'
import '../try.css'

const answerTimeout = 60000
const statusLabels = { idle: 'Ready', connecting: 'Connecting', live: 'Live', offline: 'Offline' }

let nextId = 0
const newId = () => `m${(nextId += 1)}`

// Applies one connection event to the newest assistant message.
function applyEvent(messages, event) {
  const last = messages[messages.length - 1]
  if (!last || last.role !== 'bot' || last.status === 'done' || last.status === 'error') return messages
  const update = changes => [...messages.slice(0, -1), { ...last, ...changes }]

  switch (event.type) {
    case 'progress':
      return update({ progress: event.text })
    case 'chunk':
      return update({ text: last.text + event.text, status: 'streaming' })
    case 'meta':
      return update({ followups: event.followups.length ? event.followups : last.followups, sources: event.sources.length ? event.sources : last.sources })
    case 'final':
      return update({
        text: event.text || last.text || 'No answer was returned for this question.',
        status: 'done',
        followups: event.followups.length ? event.followups : last.followups,
        sources: event.sources.length ? event.sources : last.sources,
      })
    case 'error':
      return update({ text: event.message, status: 'error' })
    default:
      return messages
  }
}

function Try() {
  usePageMeta(pageMeta.try)
  const [messages, setMessages] = useState([])
  const [connection, setConnection] = useState('idle')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const chat = useRef(null)
  const log = useRef(null)

  useEffect(() => {
    const client = createChatConnection({
      onEvent: event => {
        if (event.type === 'status') setConnection(event.state)
        else setMessages(current => applyEvent(current, event))
      },
    })
    chat.current = client
    client.open()
    return () => client.close()
  }, [])

  const last = messages[messages.length - 1]
  const busy = last?.role === 'bot' && (last.status === 'waiting' || last.status === 'streaming')

  // Give up on an answer that never arrives.
  useEffect(() => {
    if (!busy) return undefined
    const timer = setTimeout(() => {
      setMessages(current => applyEvent(current, { type: 'error', message: 'The demo took too long to answer. Please try again.' }))
    }, answerTimeout)
    return () => clearTimeout(timer)
  }, [busy, last?.id])

  useEffect(() => {
    const element = log.current
    if (element) element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const ask = useCallback(query => {
    if (busy) return
    setShowSuggestions(false)
    setMessages(current => [
      ...current,
      { id: newId(), role: 'user', text: query },
      { id: newId(), role: 'bot', text: '', status: 'waiting', followups: [], sources: [], query },
    ])
    chat.current?.ask(query, systemPrompt)
  }, [busy])

  // A question linked from the home page (/try.html?q=…) is asked once on arrival.
  const prefilled = useRef(false)
  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get('q')?.trim()
    if (!query || prefilled.current) return undefined
    const timer = setTimeout(() => {
      prefilled.current = true
      ask(query)
    }, 0)
    return () => clearTimeout(timer)
  }, [ask])

  const retry = () => {
    const failed = messages[messages.length - 1]
    if (!failed?.query) return
    setMessages(current => current.slice(0, -2))
    chat.current?.retry()
    setTimeout(() => ask(failed.query), 0)
  }

  const reset = () => {
    chat.current?.reset()
    setMessages([])
    setShowSuggestions(false)
  }

  const empty = messages.length === 0

  return (
    <main className="try">
      <section className="try-hero container">
        <span className="try-pill"><i className="orb small classic" aria-hidden="true"></i>Try entaura ask</span>
        <h1>Ask your business anything. <span className="gradient-text">See the proof.</span></h1>
        <p>A live demo on sample data for TEXOL, a fictional software company: pricing, policies, revenue, and invoices.</p>
      </section>

      <section className="container">
        <div className="try-chat">
          <i className="orb try-glow" aria-hidden="true"></i>
          <header className="tc-head">
            <div className="tc-title">
              <img src="/assets/entaura-mark.png" alt="" />
              <strong>entaura ask</strong>
              <span className={`tc-status ${connection}`}><i></i>{statusLabels[connection]}</span>
            </div>
            {!empty && <button className="tc-new" onClick={reset}>New chat</button>}
          </header>

          <div className="tc-log" ref={log} aria-live="polite">
            {empty ? (
              <div className="tc-empty">
                <h2>What would you like to know?</h2>
                <p>Pick a question to start, or type your own below.</p>
                <div className="tc-groups">
                  {suggestionGroups.map(group => (
                    <div className="tc-group" key={group.label}>
                      <span>{group.label}</span>
                      <div className="tc-qs">
                        {group.questions.map(question => (
                          <button key={question} onClick={() => ask(question)}>{question}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} isLast={index === messages.length - 1} onFollowup={ask} />
              ))
            )}
            {last?.status === 'error' && (
              <div className="tc-recover">
                <button className="button ghost" onClick={retry}>Retry</button>
                <Link className="tc-link" to="/contact.html">Talk to our team instead →</Link>
              </div>
            )}
          </div>

          <footer className="tc-foot">
            {!empty && showSuggestions && (
              <div className="tc-chips">
                {suggestionGroups.flatMap(group => group.questions).map(question => (
                  <button key={question} onClick={() => ask(question)} disabled={busy}>{question}</button>
                ))}
              </div>
            )}
            <Composer onSend={ask} disabled={busy} />
            <div className="tc-hint">
              {!empty && (
                <button className={showSuggestions ? 'on' : ''} onClick={() => setShowSuggestions(open => !open)}>
                  {showSuggestions ? 'Hide suggestions' : 'Suggestions'}
                </button>
              )}
              <span>Answers are AI-generated from demo data. Enter to send, Shift + Enter for a new line.</span>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}

export default Try
