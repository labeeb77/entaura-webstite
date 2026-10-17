import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroDemos, heroWords, notifyChannels } from '../../data/heroDemos.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import ChannelIcon from '../ChannelIcon.jsx'
import HeroRibbon from './HeroRibbon.jsx'
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
const holdFor = { ask: 4200, insight: 6500, watch: 4500 }

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

// Splits a word into letters so each can slide on its own.
function Letters({ word, mode }) {
  return (
    <span className={`hx-word ${mode}`}>
      {[...word].map((letter, index) => (
        <span key={index} className="hx-ch" style={{ '--i': index }}>{letter === ' ' ? '\u00a0' : letter}</span>
      ))}
    </span>
  )
}

// The rotating word: letters of the old word slide up and out while the new ones cascade in.
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
    const timer = setTimeout(() => setPrevious(null), 1100)
    return () => clearTimeout(timer)
  }, [previous])

  return (
    <span className="hx-rot">
      {previous !== null && <Letters key={`out-${previous}-${index}`} word={heroWords[previous]} mode="out" />}
      <Letters key={`in-${index}`} word={heroWords[index]} mode={previous !== null ? 'in' : 'still'} />
    </span>
  )
}

// Ask: the key facts as tiles, and the documents they came from.
function AskResult({ item }) {
  return (
    <div className="hx-ask">
      <div className="hx-facts">
        {item.facts.map((fact, index) => (
          <div key={fact.label} style={{ '--d': `${index * 90}ms` }}>
            <strong>{fact.value}</strong>
            <span>{fact.label}</span>
          </div>
        ))}
      </div>
      <div className="hx-docs">
        {item.sources.map((source, index) => {
          const [name, section] = source.replace(/^\[\d+\]\s*/, '').split(' · ')
          return (
            <span key={source} style={{ '--d': `${300 + index * 90}ms` }}>
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true"><path d="M5 2.5h6.5L15 6v11.5H5z M11.5 2.5V6H15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              <b>{name}</b>{section && <small>{section}</small>}
              <i>[{index + 1}]</i>
            </span>
          )
        })}
      </div>
    </div>
  )
}

function InsightResult({ item }) {
  return (
    <div className="hx-insight">
      <div className="hx-facts">
        {item.kpis.map((kpi, index) => (
          <div key={kpi.label} className={kpi.up ? 'up' : ''} style={{ '--d': `${index * 90}ms` }}>
            <strong>{kpi.value}</strong>
            <span>{kpi.label}</span>
          </div>
        ))}
      </div>
      <InsightChart chart={item.chart} />
    </div>
  )
}

// Watch: set up a watch (what, when, how), then the alert lands on each channel.
const flowDelays = [0, 550, 550, 650, 1500, 750, 900]
const doneStep = flowDelays.length

const icons = {
  what: <svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="6" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4 5v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>,
  when: <svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l2.5 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  how: <svg viewBox="0 0 20 20" width="16" height="16"><path d="M3 5h14M6 10h8M8.5 15h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
}

function SetupRow({ label, value, shown, icon }) {
  return (
    <li className={shown ? 'on' : ''}>
      <span className="hx-wf-icon" aria-hidden="true">{icon}</span>
      <div><small>{label}</small><strong>{shown ? value : '—'}</strong></div>
      <i className="hx-wf-check" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </i>
    </li>
  )
}

// One cropped phone on a lock screen; alerts arrive as glass notifications.
function LockScreen({ flow, step }) {
  const { alert } = flow
  const detail = alert.rows.slice(0, 2).map(row => row.value).join(' · ')
  const arrived = notifyChannels.filter((_, index) => step >= 5 + index).reverse()
  const island = step >= 5 ? 'got' : step === 4 ? 'live' : ''

  return (
    <div className="hx-ls" aria-label={`${alert.title}, sent to ${notifyChannels.map(channel => channel.name).join(' and ')}`} role="img">
      <div className="hx-ls-phone">
        <div className="hx-ls-screen">
          <div className="hx-ls-status">
            <span>9:41</span>
            <span className="hx-ls-icons" aria-hidden="true"><i></i><i></i><b></b></span>
          </div>
          <div className={`hx-ls-island ${island}`}>
            <i></i>
            <span>{step >= 5 ? 'Alert sent' : 'Watching…'}</span>
          </div>
          <div className="hx-ls-clock">
            <small>Thursday 16 October</small>
            <strong>9:41</strong>
          </div>
          <div className="hx-ls-stack">
            {arrived.map((channel, position) => (
              <div className="hx-ls-note" key={channel.key} style={{ '--pos': position }}>
                <div className="hx-ls-note-head">
                  <ChannelIcon channel={channel.key} size={18} />
                  <span>{channel.name}</span>
                  <time>now</time>
                </div>
                <strong>entaura.ai</strong>
                <p><b>{alert.title}</b> · {detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WatchFlow({ flow, live, reduced, onDone }) {
  const [typed, setTyped] = useState(reduced ? flow.prompt.length : 0)
  const [step, setStep] = useState(reduced ? doneStep : 0)

  useEffect(() => {
    if (!live || step >= doneStep) return undefined
    let timer
    if (step > 0) timer = setTimeout(() => setStep(step + 1), flowDelays[step])
    else if (typed < flow.prompt.length) timer = setTimeout(() => setTyped(typed + 1), typeSpeed)
    else timer = setTimeout(() => setStep(1), 350)
    return () => clearTimeout(timer)
  }, [live, step, typed, flow.prompt.length])

  useEffect(() => {
    if (step >= doneStep) onDone()
  }, [step, onDone])

  const status = step < 4 ? 'draft' : step === 4 ? 'watching' : 'met'

  return (
    <div className="hx-wf">
      <div className="hx-wf-setup">
        <div className="hx-wf-top">
          <strong>New watch</strong>
          <span className={`hx-wf-status ${status}`}>
            <i></i>{status === 'draft' ? 'Draft' : status === 'watching' ? 'Enabled · watching' : 'Condition met'}
          </span>
        </div>
        <p className="hx-wf-prompt">
          {flow.prompt.slice(0, typed)}
          {step === 0 && live && <i className="hx-caret"></i>}
        </p>
        <ul className="hx-wf-rows">
          <SetupRow label="What to watch" value={flow.what} shown={step >= 1} icon={icons.what} />
          <SetupRow label="When to check" value={flow.when} shown={step >= 2} icon={icons.when} />
          <SetupRow label="How to decide" value={flow.how} shown={step >= 3} icon={icons.how} />
        </ul>
        <div className={`hx-wf-run ${status}`}>
          <span className="hx-wf-scan"><i></i></span>
          <small>
            {status === 'draft' && 'Waiting for setup'}
            {status === 'watching' && 'Checking live data against your logic…'}
            {status === 'met' && `Alert sent to ${notifyChannels.length} channels`}
          </small>
        </div>
      </div>
      <LockScreen flow={flow} step={step} />
    </div>
  )
}

function Hero() {
  const reduced = useReducedMotion()
  const card = useRef(null)
  const [product, setProduct] = useState(0)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [run, setRun] = useState(0)
  const [phase, setPhase] = useState(reduced ? 'done' : 'typing')
  const [typed, setTyped] = useState(0)
  const [streamed, setStreamed] = useState(0)
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)

  const key = products[product]
  const demo = heroDemos[key]
  const entries = demo.questions || demo.flows
  const item = entries[questionIndex]
  const question = item.q || ''
  const answerLength = item.answer ? richLength(item.answer) : 0
  const live = inView && !reduced

  const play = useCallback((nextProduct, nextQuestion, byUser) => {
    if (byUser) setAuto(false)
    setProduct(nextProduct)
    setQuestionIndex(nextQuestion)
    setTyped(0)
    setStreamed(0)
    setPhase(reduced ? 'done' : products[nextProduct] === 'watch' ? 'flow' : 'typing')
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
      timer = typed < question.length
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
  }, [live, phase, typed, streamed, question.length, answerLength, run])

  // Then move to the next question, and to the next product after the last.
  useEffect(() => {
    if (!live || !auto || paused || phase !== 'done') return undefined
    const timer = setTimeout(() => {
      if (questionIndex + 1 < entries.length) play(product, questionIndex + 1)
      else play((product + 1) % products.length, 0)
    }, holdFor[key])
    return () => clearTimeout(timer)
  }, [live, auto, paused, phase, key, questionIndex, product, run, play, entries.length])

  const flowDone = useCallback(() => setPhase('done'), [])

  const typing = phase === 'typing'
  const finished = phase === 'done'

  return (
    <section className="hx">
      <HeroRibbon reduced={reduced} />
      <div className="container">
        <div className="hx-top">
          <span className="hx-badge"><img src="/assets/entaura-mark.png" alt="" />Enterprise Agentic AI Platform</span>
          <h1 aria-label="Transform enterprise policies, documents, and transactional data into actionable insights.">
            <span aria-hidden="true">
              <span className="hx-line"><span>Transform enterprise</span></span>
              <span className="hx-line"><span><Rotator reduced={reduced} /></span></span>
              <span className="hx-line muted"><span>into actionable insights.</span></span>
            </span>
          </h1>
          <div className="hx-actions">
            <Link className="button primary" to="/try.html">Try Entaura</Link>
            <Link className="button ghost" to="/contact.html">Contact sales</Link>
          </div>
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
            {key === 'watch' ? (
              <WatchFlow key={`${questionIndex}-${run}`} flow={item} live={live} reduced={reduced} onDone={flowDone} />
            ) : (
              <div className="hx-log" key={`${key}-${questionIndex}-${run}`}>
                {(!typing || typed > 0) && (
                  <p className={`hx-q${typing ? ' typing' : ''}`}>
                    {typing ? item.q.slice(0, typed) : item.q}
                    {typing && live && <i className="hx-caret"></i>}
                  </p>
                )}
                {phase === 'thinking' && (
                  <div className="hx-thinking"><i></i><i></i><i></i><span>{thinkingText[key]}</span></div>
                )}
                {(phase === 'answer' || finished) && (
                  <div className="hx-a">
                    <p><Rich text={item.answer} limit={finished ? Infinity : streamed} /></p>
                    {finished && key === 'ask' && <div className="hx-extra"><AskResult item={item} /></div>}
                    {finished && key === 'insight' && <div className="hx-extra"><InsightResult item={item} /></div>}
                  </div>
                )}
              </div>
            )}

            <div className="hx-dock">
              <div className="hx-chips">
                {entries.map((entry, index) => (
                  <button key={entry.q || entry.label} className={index === questionIndex ? 'on' : ''} onClick={() => play(product, index, true)}>{entry.q || entry.label}</button>
                ))}
              </div>
              <Link className="hx-dock-cta" to="/try.html">Try Entaura</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
