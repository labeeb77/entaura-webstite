import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroDemos, heroStory } from '../../data/heroDemos.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import ProductMark from '../ProductMark.jsx'
import AskAnswer, { RichDoc } from './AskAnswer.jsx'
import InsightChart from './InsightChart.jsx'
import { docLength } from './richText.js'
import WatchFlow from './WatchDemo.jsx'

const products = ['ask', 'insight', 'watch']
// A turn's stages, in order. Story points light up as each one is reached.
const stages = ['typing', 'thinking', 'answer', 'extras', 'proof', 'done']
const typeSpeed = 22
const streamStep = 3
// How long each reasoning step takes to tick off while the demo thinks.
const stepTime = 380
// How long the panels or chart get before the demo moves on.
const extrasFor = { ask: 2600, insight: 1800 }
// How long a finished answer stays before the next question or product.
const holdFor = { ask: 3200, insight: 3600, watch: 1500 }
// The pause before the demo taps a follow-up, and how long a tap shows.
const followAfter = 1600
const tapFor = 850
// Earlier turns are folded away once the thread grows past this.
const maxTurns = 4

const tick = <svg viewBox="0 0 16 16" width="10" height="10" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>

// The steps behind an answer: ticked off one by one while thinking, then
// folded into a single line that can be opened again.
function Reasoning({ steps, thinking, reduced }) {
  const [shown, setShown] = useState(reduced ? steps.length : 0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!thinking || shown >= steps.length) return undefined
    const timer = setTimeout(() => setShown(shown + 1), stepTime)
    return () => clearTimeout(timer)
  }, [thinking, shown, steps.length])

  const list = (count, running) => (
    <ol className="hx-reason-steps">
      {steps.slice(0, count).map((step, index) => (
        <li key={step} className={running && index === count - 1 && shown < steps.length ? 'run' : 'done'}>
          <i aria-hidden="true">{tick}</i>{step}
        </li>
      ))}
    </ol>
  )

  if (thinking) return <div className="hx-reason live">{list(Math.min(shown + 1, steps.length), true)}</div>

  return (
    <div className={`hx-reason${open ? ' open' : ''}`}>
      <button onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <i aria-hidden="true">{tick}</i>Reasoned in {steps.length} steps · {(steps.length * stepTime / 1000 + 0.1).toFixed(1)}s
        <svg className="chev" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && list(steps.length, false)}
    </div>
  )
}

// Insight: the answer in words, then the chart and how it was computed.
// Earlier turns keep the words and a one-line note of the chart.
function InsightAnswer({ item, limit, stage, compact, reduced, proof, onProof, tapping }) {
  const showChart = stage === 'extras' || stage === 'proof' || stage === 'done'
  return (
    <div className="pd-insight">
      <RichDoc text={item.answer} limit={limit} />
      {showChart && (compact
        ? <span className="pd-chart-note">{item.chart.result}</span>
        : <div className="pd-chart"><InsightChart chart={item.chart} reduced={reduced} proof={proof} onProof={onProof} tapping={tapping} /></div>)}
    </div>
  )
}

function Story({ product, onPick, isLit, progress }) {
  return (
    <div className="pd-story" role="tablist" aria-label="entaura.ai products">
      {products.map((name, index) => {
        const on = index === product
        const story = heroStory[name]
        return (
          <div key={name} className={`pd-item ${name}${on ? ' on' : ''}`}>
            <button role="tab" aria-selected={on} onClick={() => onPick(index)}>
              <ProductMark product={name} />
              <small>{heroDemos[name].tag}</small>
            </button>
            <div className="pd-body" aria-hidden={!on}>
              <div>
                <p>{story.tagline}</p>
                <ul>
                  {story.points.map(point => (
                    <li key={point.text} className={on && isLit(point) ? 'lit' : ''}><i aria-hidden="true">{tick}</i>{point.text}</li>
                  ))}
                </ul>
                <span className="pd-progress" aria-hidden="true"><i style={{ width: on ? `${progress * 100}%` : 0 }}></i></span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProductDemo() {
  const reduced = useReducedMotion()
  const windowRef = useRef(null)
  const logRef = useRef(null)
  const threadRef = useRef(null)
  const follow = useRef(true)
  const turnId = useRef(1)
  // Opens on Insight, the most visual answer; autoplay continues from there.
  const [product, setProduct] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [thread, setThread] = useState(() => [{ id: 0, entry: heroDemos.insight.questions[0] }])
  const [run, setRun] = useState(0)
  const [phase, setPhase] = useState('typing')
  const [typed, setTyped] = useState(0)
  const [streamed, setStreamed] = useState(0)
  const [proof, setProof] = useState(false)
  // 'proof' while the demo taps "How this was computed", or the index of the
  // follow-up chip it is tapping.
  const [tapping, setTapping] = useState(null)
  const [watchStep, setWatchStep] = useState(0)
  const [auto, setAuto] = useState(true)
  // Set once a visitor picks a follow-up: the demo then waits for them.
  const [held, setHeld] = useState(false)
  const [inView, setInView] = useState(false)
  const [paused, setPaused] = useState(false)

  const key = products[product]
  const demo = heroDemos[key]
  const entries = demo.questions || demo.flows
  const latest = thread[thread.length - 1]?.entry
  const live = inView && !reduced
  const answerLength = latest ? docLength(latest.answer) : 0

  const start = useCallback((nextProduct, nextQuestion, byUser) => {
    const nextKey = products[nextProduct]
    const next = heroDemos[nextKey]
    if (byUser) setAuto(false)
    setHeld(false)
    setProduct(nextProduct)
    setQuestionIndex(nextQuestion)
    setThread(next.questions ? [{ id: turnId.current++, entry: next.questions[nextQuestion] }] : [])
    setTyped(0)
    setStreamed(0)
    setProof(false)
    setTapping(null)
    setWatchStep(0)
    setPhase(reduced ? 'done' : nextKey === 'watch' ? 'flow' : 'typing')
    setRun(count => count + 1)
    follow.current = true
  }, [reduced])

  const askFollowup = useCallback((entry, byUser) => {
    if (byUser) setHeld(true)
    setThread(current => [...current, { id: turnId.current++, entry }].slice(-maxTurns))
    setTyped(0)
    setStreamed(0)
    setProof(false)
    setTapping(null)
    setPhase(reduced ? 'done' : 'typing')
    follow.current = true
  }, [reduced])

  useEffect(() => {
    const target = windowRef.current
    if (!target || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 })
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  // A turn's timeline: type the question, think, stream the answer, show the
  // panels or chart, then (insight) tap open the SQL.
  useEffect(() => {
    if (!live || key === 'watch' || !latest) return undefined
    let timer
    if (phase === 'typing') {
      timer = typed < latest.q.length
        ? setTimeout(() => setTyped(typed + 1), typeSpeed)
        : setTimeout(() => setPhase('thinking'), 420)
    } else if (phase === 'thinking') {
      timer = setTimeout(() => setPhase('answer'), latest.steps.length * stepTime + 350)
    } else if (phase === 'answer') {
      timer = streamed < answerLength
        ? setTimeout(() => setStreamed(Math.min(answerLength, streamed + streamStep)), 16)
        : setTimeout(() => setPhase('extras'), 200)
    } else if (phase === 'extras') {
      timer = setTimeout(() => setPhase(key === 'insight' ? 'proof' : 'done'), extrasFor[key])
    } else if (phase === 'proof') {
      if (proof) timer = setTimeout(() => setPhase('done'), 2600)
      else if (tapping === 'proof') timer = setTimeout(() => { setTapping(null); setProof(true) }, tapFor)
      else timer = setTimeout(() => setTapping('proof'), 200)
    }
    return () => clearTimeout(timer)
  }, [live, key, latest, phase, typed, streamed, answerLength, proof, tapping])

  // Then tap one follow-up, so the thread continues once on its own, and
  // after that move on: next question, or next product while left alone.
  // Hovering pauses ask and insight so answers can be read.
  useEffect(() => {
    if (!live || phase !== 'done' || held || (paused && key !== 'watch')) return undefined
    const next = latest?.followups?.[0]
    let timer
    if (key !== 'watch' && thread.length === 1 && next) {
      timer = tapping === 0
        ? setTimeout(() => askFollowup(next), tapFor)
        : setTimeout(() => setTapping(0), followAfter)
    } else {
      timer = setTimeout(() => {
        if (questionIndex + 1 < entries.length) start(product, questionIndex + 1)
        else if (auto) start((product + 1) % products.length, 0)
        else start(product, 0)
      }, holdFor[key])
    }
    return () => clearTimeout(timer)
  }, [live, phase, held, paused, key, latest, thread.length, tapping, questionIndex, entries.length, product, auto, start, askFollowup])

  // Keep the newest turn in view as it grows, unless the visitor scrolled up.
  useEffect(() => {
    const log = logRef.current
    const inner = threadRef.current
    if (!log || !inner || !('ResizeObserver' in window)) return undefined
    const observer = new ResizeObserver(() => {
      if (follow.current) log.scrollTo({ top: log.scrollHeight, behavior: 'smooth' })
    })
    observer.observe(inner)
    return () => observer.disconnect()
  }, [key])

  const onWheel = event => {
    const log = logRef.current
    if (event.deltaY < 0) follow.current = false
    else if (log && log.scrollHeight - log.scrollTop - log.clientHeight < 60) follow.current = true
  }

  const flowDone = useCallback(() => setPhase('done'), [])

  // With reduced motion the demo doesn't play, so show each answer complete.
  const shownPhase = reduced && key !== 'watch' ? 'done' : phase
  const stageIndex = stages.indexOf(shownPhase)
  const followed = thread.length > 1
  const isLit = point => {
    if (key === 'watch') return watchStep >= point.at
    if (point.at === 'followup') return followed
    return followed || stageIndex >= stages.indexOf(point.at)
  }
  const progress = key === 'watch'
    ? (questionIndex + Math.min(1, watchStep / 7)) / entries.length
    : (questionIndex + (followed ? 0.5 : 0) + ((stageIndex + 1) / stages.length) * 0.5) / entries.length

  const typing = shownPhase === 'typing'
  const followups = key !== 'watch' && shownPhase === 'done' ? latest?.followups ?? [] : []

  return (
    <div className="pd">
      <i className="pd-glow" aria-hidden="true"></i>
      <div className={`pd-window tone-${key}`} ref={windowRef} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="pd-bar">
          <span className="pd-lights" aria-hidden="true"><i></i><i></i><i></i></span>
          <span className="pd-title"><img src="/assets/entaura-mark-sm.png" alt="" />Nuvora workspace</span>
          <span className="pd-mode"><ProductMark product={key} size="sm" /></span>
        </div>

        <div className="pd-main">
          <aside className="pd-side">
            <Story product={product} onPick={index => start(index, 0, true)} isLit={isLit} progress={progress} />
            <p className="pd-tagline">{heroStory[key].tagline}</p>
          </aside>
          <div className="pd-screen" key={key}>
            {key === 'watch' ? (
              <div className="pd-watch">
                <WatchFlow key={`${questionIndex}-${run}`} flow={entries[questionIndex]} live={live} reduced={reduced} onDone={flowDone} onStep={setWatchStep} />
              </div>
            ) : (
              <div className="pd-log" ref={logRef} onWheel={onWheel} onTouchMove={() => { follow.current = false }}>
                <div className="pd-thread" ref={threadRef}>
                  {thread.map((turn, index) => {
                    const isLatest = index === thread.length - 1
                    const turnPhase = isLatest ? shownPhase : 'done'
                    if (isLatest && turnPhase === 'typing') return null
                    const answerProps = {
                      item: turn.entry,
                      limit: turnPhase === 'answer' ? streamed : Infinity,
                      stage: turnPhase,
                      compact: !isLatest,
                      reduced,
                    }
                    return (
                      <Fragment key={turn.id}>
                        <p className="pd-q">{turn.entry.q}</p>
                        <div className={`pd-turn${isLatest ? '' : ' past'}`}>
                          <span className="pd-avatar" aria-hidden="true"><img src="/assets/entaura-mark-sm.png" alt="" /></span>
                          <div className="pd-a">
                            <div className="hx-meta">
                              <Reasoning steps={turn.entry.steps} thinking={turnPhase === 'thinking'} reduced={reduced} />
                              {turnPhase === 'done' && isLatest && turn.entry.worth && <span className="hx-worth">{turn.entry.worth}</span>}
                            </div>
                            {turnPhase !== 'thinking' && (key === 'ask'
                              ? <AskAnswer {...answerProps} />
                              : <InsightAnswer {...answerProps} proof={isLatest && proof} onProof={() => setProof(value => !value)} tapping={isLatest && tapping === 'proof'} />)}
                          </div>
                        </div>
                      </Fragment>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="pd-dock">
              <div className="pd-chips">
                {followups.length > 0 ? (
                  <>
                    <span className="pd-chips-label">Follow up</span>
                    {followups.map((entry, index) => (
                      <button key={entry.q} className={`follow${tapping === index ? ' tapping' : ''}`} onClick={() => askFollowup(entry, true)}>
                        {entry.q}
                        {tapping === index && <i className="pd-pointer" aria-hidden="true"></i>}
                      </button>
                    ))}
                  </>
                ) : (
                  entries.map((entry, index) => (
                    <button key={entry.q || entry.label} className={index === questionIndex ? 'on' : ''} onClick={() => start(product, index, true)}>{entry.q || entry.label}</button>
                  ))
                )}
              </div>
              {key !== 'watch' && (
                <div className={`pd-composer${typing ? ' typing' : ''}`}>
                  <span className={typing && typed > 0 ? '' : 'empty'}>
                    {typing && typed > 0 ? latest.q.slice(0, typed) : 'Ask about your policies, documents or data…'}
                    {typing && live && <i className="hx-caret"></i>}
                  </span>
                  <b className={typing && latest && typed >= latest.q.length ? 'send' : ''} aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="14" height="14"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </b>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pd-foot">
        <span>Sample data for a fictional company, Nuvora.</span>
        <Link to="/try.html">Try it on the live demo <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
  )
}

export default ProductDemo
