import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroScenes } from '../../data/home.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

const sceneDuration = 9000
const typeSpeed = 26

function AskBody({ scene }) {
  return (
    <>
      <p className="hc-answer">{scene.answer}</p>
      <div className="hc-evidence">
        {scene.evidence.map(item => (
          <span key={item.kind}><b>{item.kind}</b>{item.text}</span>
        ))}
      </div>
      <div className="hc-meter">
        <span>Confidence</span>
        <i><em style={{ width: `${scene.confidence}%` }}></em></i>
        <strong>{scene.confidence}%</strong>
      </div>
    </>
  )
}

function InsightBody({ scene }) {
  return (
    <>
      <div className="hc-chart" role="img" aria-label="Overtime cost by department against the policy cap">
        <span className="hc-cap" style={{ bottom: `${scene.cap}%` }}><small>Policy cap</small></span>
        {scene.bars.map(bar => (
          <div key={bar.label} className={bar.value > scene.cap ? 'over' : ''}>
            <i style={{ height: `${bar.value}%` }}></i>
            <small>{bar.label}</small>
          </div>
        ))}
      </div>
      <pre className="hc-sql">{scene.sql}</pre>
      <p className="hc-finding">{scene.finding}</p>
    </>
  )
}

function WatchBody({ scene }) {
  return (
    <>
      <div className="hc-rules">
        {scene.rules.map(rule => (
          <div key={rule.label}><small>{rule.label}</small><span>{rule.value}</span></div>
        ))}
      </div>
      <div className="hc-alert">
        <img src="/assets/integrations/teams.png" alt="" />
        <div>
          <small>{scene.alert.channel} · {scene.alert.time}</small>
          <strong>Monitor triggered</strong>
          <span>{scene.alert.text}</span>
        </div>
      </div>
    </>
  )
}

const bodies = { ask: AskBody, insight: InsightBody, watch: WatchBody }

function Console({ scene, animate }) {
  const [typed, setTyped] = useState(animate ? 0 : scene.question.length)
  const [answered, setAnswered] = useState(!animate)
  const done = typed >= scene.question.length

  useEffect(() => {
    if (done) return undefined
    const timer = setTimeout(() => setTyped(count => count + 1), typeSpeed)
    return () => clearTimeout(timer)
  }, [typed, done])

  useEffect(() => {
    if (!done || answered) return undefined
    const timer = setTimeout(() => setAnswered(true), 550)
    return () => clearTimeout(timer)
  }, [done, answered])

  const Body = bodies[scene.key]
  return (
    <div className={`hc-body tone-${scene.key}`}>
      <div className="hc-prompt">
        <span className="hc-avatar">You</span>
        <p>{scene.question.slice(0, typed)}{!done && <i className="hc-caret"></i>}</p>
      </div>
      <div className="hc-reply">
        <img className="hc-avatar mark" src="/assets/entaura-mark.png" alt="" />
        {answered ? (
          <div className="hc-result"><Body scene={scene} /></div>
        ) : (
          done && <div className="hc-thinking"><i></i><i></i><i></i><span>Searching records and policies</span></div>
        )}
      </div>
    </div>
  )
}

function HeroConsole() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduced || paused) return undefined
    const timer = setTimeout(() => setActive(index => (index + 1) % heroScenes.length), sceneDuration)
    return () => clearTimeout(timer)
  }, [active, paused, reduced])

  const scene = heroScenes[active]

  return (
    <section className="h-hero">
      <div className="aurora" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
      <div className="container h-hero-grid">
        <div className="h-hero-copy">
          <span className="h-pill"><i></i>Enterprise agentic AI platform</span>
          <h1>Turn enterprise knowledge <span className="gradient-text">into action.</span></h1>
          <p>EntAura connects your policies, documents, and live transactional data in one intelligent layer. Verify facts, analyse performance against the rules, and act before issues become incidents.</p>
          <div className="h-actions">
            <Link className="button primary" to="/contact.html">Book a demo <span>↗</span></Link>
            <Link className="button ghost" to="#products">Explore the products</Link>
          </div>
          <div className="h-trio" aria-label="Products">
            {heroScenes.map((item, index) => (
              <span key={item.key} className={`tone-${item.key}`}>{index > 0 && <b>•</b>}{item.label}</span>
            ))}
          </div>
        </div>

        <div className="h-console" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="hc-bar">
            <span className="hc-dots"><i></i><i></i><i></i></span>
            <div className="hc-tabs" role="tablist" aria-label="Product demos">
              {heroScenes.map((item, index) => (
                <button
                  key={item.key}
                  role="tab"
                  aria-selected={index === active}
                  className={`tone-${item.key}${index === active ? ' active' : ''}`}
                  onClick={() => setActive(index)}
                >
                  {item.label}
                  {index === active && !reduced && !paused && <i className="hc-progress" style={{ animationDuration: `${sceneDuration}ms` }}></i>}
                </button>
              ))}
            </div>
            <span className="hc-caption">{scene.caption}</span>
          </div>
          <Console key={scene.key} scene={scene} animate={!reduced} />
        </div>
      </div>
    </section>
  )
}

export default HeroConsole
