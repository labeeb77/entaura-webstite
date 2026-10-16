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
              <i>{index + 1}</i>
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

// Watch: a line of stock on hand that crosses the minimum, then the projection.
function Trend({ trend }) {
  const width = 320
  const height = 100
  const points = [...trend.history, ...trend.projected.slice(1)]
  const top = Math.max(...points) * 1.1
  const x = index => (index / (points.length - 1)) * width
  const y = value => height - (value / top) * height
  const line = list => list.map((value, index) => `${index ? 'L' : 'M'}${x(index).toFixed(1)} ${y(value).toFixed(1)}`).join(' ')
  const past = line(trend.history)
  const offset = trend.history.length - 1
  const future = trend.projected.map((value, index) => `${index ? 'L' : 'M'}${x(offset + index).toFixed(1)} ${y(value).toFixed(1)}`).join(' ')
  const now = { x: x(offset), y: y(trend.history[offset]) }

  const pct = (value, total) => `${(value / total) * 100}%`

  return (
    <div className="hx-trend">
      <div className="hx-trend-plot">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="hx-trend-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="var(--watch)" stopOpacity=".22" />
              <stop offset="1" stopColor="var(--watch)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line className="min" x1="0" x2={width} y1={y(trend.minimum)} y2={y(trend.minimum)} />
          <path className="area" d={`${past} L${now.x} ${height} L0 ${height} Z`} fill="url(#hx-trend-fill)" />
          <path className="past" d={past} />
          <path className="future" d={future} />
        </svg>
        <small className="hx-trend-min" style={{ top: pct(y(trend.minimum), height) }}>Minimum {trend.minimum}</small>
        <i className="hx-trend-now" style={{ left: pct(now.x, width), top: pct(now.y, height) }}></i>
      </div>
      <div className="hx-trend-axis">
        <span>6 days ago</span>
        <span style={{ left: pct(now.x, width) }}>Today</span>
        <span>+4 days</span>
      </div>
    </div>
  )
}

function Timeline({ timeline }) {
  const last = timeline.steps[timeline.steps.length - 1].day
  return (
    <div className="hx-timeline">
      <div className="hx-tl-track">
        <i className="hx-tl-fill" style={{ width: `${(timeline.steps[1].day / last) * 100}%` }}></i>
        <i className="hx-tl-over" style={{ left: `${(timeline.steps[1].day / last) * 100}%` }}></i>
        {timeline.steps.map(step => (
          <span key={step.label} style={{ left: `${(step.day / last) * 100}%` }}>
            <b></b>
            <strong>{step.label}</strong>
            <small>{step.date}</small>
          </span>
        ))}
      </div>
    </div>
  )
}

function WatchResult({ item, notify, onNotify, onChoose }) {
  const visual = item.trend || item.timeline
  return (
    <div className="hx-watch">
      <ul className={`hx-gauges${item.items.length === 1 ? ' one' : ''}`}>
        {item.items.map((entry, index) => (
          <li key={entry.name} style={{ '--d': `${index * 90}ms` }}>
            <svg className="hx-ring" viewBox="0 0 48 48" aria-hidden="true">
              <circle cx="24" cy="24" r="19" pathLength="100" />
              <circle className="val" cx="24" cy="24" r="19" pathLength="100" style={{ '--off': 100 - entry.level * 100 }} />
              <text x="24" y="28" textAnchor="middle">{entry.ring}</text>
            </svg>
            <div><strong>{entry.name}</strong><small>{entry.note}</small></div>
            <b>{entry.value}</b>
          </li>
        ))}
      </ul>
      <div className="hx-visual">
        <span className="hx-visual-title">{visual.title}</span>
        {item.trend ? <Trend trend={item.trend} /> : <Timeline timeline={item.timeline} />}
        <p><Rich text={visual.caption} /></p>
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

  const typing = phase === 'typing'
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
          <div className="hx-side">
            <span className="hx-badge"><i aria-hidden="true"></i>Enterprise agentic AI platform</span>
            <p className="hx-desc">One intelligent layer turning your documents and live ERP data into verified answers.</p>
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
            <div className="hx-log" ref={log} key={`${key}-${questionIndex}-${run}`}>
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
