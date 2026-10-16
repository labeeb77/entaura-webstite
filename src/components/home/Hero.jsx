import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroDemos, heroWords, notifyChannels } from '../../data/heroDemos.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import ChannelIcon from '../ChannelIcon.jsx'
import ProductMark from '../ProductMark.jsx'
import InsightChart from './InsightChart.jsx'

const products = ['ask', 'insight', 'watch']
const typeSpeed = 22
const streamStep = 3
const thinkingText = {
  ask: 'Searching policies and documents…',
  insight: 'Running 1 query on sales_invoices…',
  watch: 'Checking live levels against your limits…',
}
// How long a finished answer stays before the demo moves on.
const holdFor = { ask: 4200, insight: 6500, watch: 6200 }

// Splits "**bold**" and "==highlight==" markers into segments.
function parseRich(text) {
  return text.split(/(\*\*[^*]+\*\*|==[^=]+==)/g).filter(Boolean).map(part => {
    if (part.startsWith('**')) return { kind: 'b', text: part.slice(2, -2) }
    if (part.startsWith('==')) return { kind: 'mark', text: part.slice(2, -2) }
    return { kind: 'text', text: part }
  })
}

// Renders rich text, cut off after `limit` characters for streaming.
function Rich({ text, limit = Infinity }) {
  let left = limit
  return parseRich(text).map((segment, index) => {
    if (left <= 0) return null
    const shown = segment.text.slice(0, left)
    left -= segment.text.length
    if (segment.kind === 'b') return <strong key={index}>{shown}</strong>
    if (segment.kind === 'mark') return <mark key={index}>{shown}</mark>
    return <Fragment key={index}>{shown}</Fragment>
  })
}

const richLength = text => parseRich(text).reduce((total, segment) => total + segment.text.length, 0)

function Rotator({ reduced }) {
  const [index, setIndex] = useState(0)
  const [previous, setPrevious] = useState(null)

  useEffect(() => {
    if (reduced) return undefined
    const timer = setTimeout(() => {
      setPrevious(index)
      setIndex((index + 1) % heroWords.length)
    }, 2600)
    return () => clearTimeout(timer)
  }, [index, reduced])

  useEffect(() => {
    if (previous === null) return undefined
    const timer = setTimeout(() => setPrevious(null), 700)
    return () => clearTimeout(timer)
  }, [previous])

  return (
    <span className="hx-rot">
      {previous !== null && <span key={`out-${previous}-${index}`} className="hx-word out">{heroWords[previous]}</span>}
      <span key={`in-${index}`} className={`hx-word${reduced ? '' : ' in'}`}>{heroWords[index]}</span>
    </span>
  )
}

function WatchResult({ item, notify, onNotify, onChoose }) {
  return (
    <div className="hx-watch">
      <ul className="hx-items">
        {item.items.map(entry => (
          <li key={entry.name}>
            <div><strong>{entry.name}</strong><small>{entry.note}</small></div>
            <span className="hx-level"><i style={{ width: `${entry.level * 100}%` }}></i></span>
            <b>{entry.value}</b>
          </li>
        ))}
      </ul>
      <div className="hx-alert">
        <span className="hx-alert-icon" aria-hidden="true">!</span>
        <p><strong>Important.</strong> <Rich text={item.alert} /></p>
      </div>
      {notify.state === 'idle' && (
        <button className="hx-notify" onClick={onNotify}>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M10 2.5a5 5 0 0 0-5 5v3l-1.5 2.5h13L15 10.5v-3a5 5 0 0 0-5-5zM8 15.5a2 2 0 0 0 4 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          {item.notify}
        </button>
      )}
      {notify.state === 'choose' && (
        <div className="hx-channels">
          <span>Send alerts to</span>
          {notifyChannels.map(channel => (
            <button key={channel.key} onClick={() => onChoose(channel.key)} className={notify.highlight === channel.key ? 'hint' : ''}>
              <ChannelIcon channel={channel.key} />{channel.name}
            </button>
          ))}
        </div>
      )}
      {notify.state === 'done' && (
        <div className="hx-toast">
          <ChannelIcon channel={notify.channel} />
          <span><strong>Watching.</strong> You’ll get an alert on {notifyChannels.find(channel => channel.key === notify.channel).name} as soon as this happens.</span>
        </div>
      )}
    </div>
  )
}

function Hero() {
  const reduced = useReducedMotion()
  const card = useRef(null)
  const log = useRef(null)
  const [product, setProduct] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [phase, setPhase] = useState(reduced ? 'done' : 'typing')
  const [typed, setTyped] = useState(0)
  const [streamed, setStreamed] = useState(0)
  const [notify, setNotify] = useState({ state: 'idle' })
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)

  const key = products[product]
  const demo = heroDemos[key]
  const item = demo.questions[questionIndex]
  const answerLength = richLength(item.answer)
  const live = inView && !reduced

  const play = useCallback((nextProduct, nextQuestion, byUser) => {
    if (byUser) setAuto(false)
    setProduct(nextProduct)
    setQuestionIndex(nextQuestion)
    setTyped(0)
    setStreamed(0)
    setNotify({ state: 'idle' })
    setPhase(reduced ? 'done' : 'typing')
    setRun(count => count + 1)
  }, [reduced])

  useEffect(() => {
    const target = card.current
    if (!target || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  // The demo's timeline: type the question, think, stream the answer, hold.
  useEffect(() => {
    if (!live) return undefined
    let timer
    if (phase === 'typing') {
      timer = typed < item.q.length
        ? setTimeout(() => setTyped(typed + 1), typeSpeed)
        : setTimeout(() => setPhase('thinking'), 380)
    } else if (phase === 'thinking') {
      timer = setTimeout(() => setPhase('answer'), 950)
    } else if (phase === 'answer') {
      timer = streamed < answerLength
        ? setTimeout(() => setStreamed(Math.min(answerLength, streamed + streamStep)), 16)
        : setTimeout(() => setPhase('done'), 150)
    }
    return () => clearTimeout(timer)
  }, [live, phase, typed, streamed, item.q.length, answerLength, run])

  // Watch shows its notify flow on its own while the demo plays itself.
  useEffect(() => {
    if (!live || !auto || key !== 'watch' || phase !== 'done') return undefined
    let timer
    if (notify.state === 'idle') timer = setTimeout(() => setNotify({ state: 'choose', highlight: 'whatsapp' }), 1300)
    else if (notify.state === 'choose') timer = setTimeout(() => setNotify({ state: 'done', channel: 'whatsapp' }), 1400)
    return () => clearTimeout(timer)
  }, [live, auto, key, phase, notify.state])

  // Then move to the next question, and to the next product after the last.
  useEffect(() => {
    if (!live || !auto || paused || phase !== 'done') return undefined
    if (key === 'watch' && notify.state !== 'done') return undefined
    const timer = setTimeout(() => {
      if (questionIndex + 1 < demo.questions.length) play(product, questionIndex + 1)
      else play((product + 1) % products.length, 0)
    }, holdFor[key])
    return () => clearTimeout(timer)
  }, [live, auto, paused, phase, key, notify.state, questionIndex, product, run, play, demo.questions.length])

  // Keep the newest part of the answer in view as it streams.
  useEffect(() => {
    const element = log.current
    if (element) element.scrollTop = element.scrollHeight
  }, [phase, streamed])

  const showQuestion = phase !== 'typing'
  const inputText = phase === 'typing' ? item.q.slice(0, typed) : ''
  const finished = phase === 'done'

  return (
    <section className="hx">
      <div className="container">
        <div className="hx-top">
          <div className="hx-copy">
            <h1 aria-label="Transform Enterprise Policies, Documents, and Transactional Data into Actionable Insights">
              <span aria-hidden="true">
                <span className="hx-line">Transform Enterprise</span>
                <span className="hx-line"><Rotator reduced={reduced} /></span>
                <span className="hx-line">into Actionable Insights</span>
              </span>
            </h1>
            <div className="hx-actions">
              <Link className="button primary" to="/try.html">Try for free</Link>
              <Link className="button ghost" to="/contact.html">Contact sales</Link>
            </div>
          </div>
          <p className="hx-desc">
            One intelligent layer connecting enterprise knowledge with business action. entaura.ai blends your policy documents with live ERP and transactional data, so teams can ask, analyse, and watch with answers they can verify.
          </p>
        </div>

        <div className="hx-card" ref={card} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="hx-tabs" role="tablist" aria-label="entaura.ai products" style={{ '--i': product }}>
            <span className="hx-tab-pill" aria-hidden="true"></span>
            {products.map((name, index) => (
              <button key={name} role="tab" aria-selected={index === product} className={index === product ? 'on' : ''} onClick={() => play(index, 0, true)}>
                <ProductMark product={name} />
              </button>
            ))}
          </div>

          <div className={`hx-stage tone-${key}`}>
            <div className="hx-log" ref={log} key={`${key}-${questionIndex}-${run}`}>
              {showQuestion && <p className="hx-q">{item.q}</p>}
              {phase === 'thinking' && (
                <div className="hx-thinking"><i></i><i></i><i></i><span>{thinkingText[key]}</span></div>
              )}
              {(phase === 'answer' || finished) && (
                <div className="hx-a">
                  <p><Rich text={item.answer} limit={finished ? Infinity : streamed} /></p>
                  {finished && key === 'ask' && (
                    <div className="hx-extra">
                      <div className="hx-sources">{item.sources.map(source => <em key={source}>{source}</em>)}</div>
                    </div>
                  )}
                  {finished && key === 'insight' && <div className="hx-extra"><InsightChart chart={item.chart} /></div>}
                  {finished && key === 'watch' && (
                    <div className="hx-extra">
                      <WatchResult
                        item={item}
                        notify={notify}
                        onNotify={() => { setAuto(false); setNotify({ state: 'choose' }) }}
                        onChoose={channel => { setAuto(false); setNotify({ state: 'done', channel }) }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="hx-dock">
              <div className="hx-chips">
                {demo.questions.map((entry, index) => (
                  <button key={entry.q} className={index === questionIndex ? 'on' : ''} onClick={() => play(product, index, true)}>{entry.q}</button>
                ))}
              </div>
              <div className={`hx-input${phase === 'typing' && typed > 0 ? ' typing' : ''}`}>
                <span className={inputText ? 'text' : 'placeholder'}>{inputText || 'Ask a question…'}{phase === 'typing' && live && <i className="hx-caret"></i>}</span>
                <Link className="hx-send" to="/try.html" aria-label="Try it with your own question">
                  <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M10 15V5M5 10l5-5 5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
              <div className="hx-note">
                <span>Sample data · TEXOL demo</span>
                <Link to="/try.html">Ask your own question →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
