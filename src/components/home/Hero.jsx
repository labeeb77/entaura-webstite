import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroWords } from '../../data/heroDemos.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import HeroRibbon from './HeroRibbon.jsx'
import ProductDemo from './ProductDemo.jsx'

// Each word's pill colour: knowledge, analytics, then data.
const pillTones = ['ask', 'insight', 'peach']

// The rotating word in a coloured pill: the word fades in while the pill
// eases to its width and colour.
function Rotator({ reduced }) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(null)
  const sizer = useRef(null)

  useEffect(() => {
    if (reduced) return undefined
    const timer = setTimeout(() => {
      setIndex((index + 1) % heroWords.length)
    }, 2600)
    return () => clearTimeout(timer)
  }, [index, reduced])

  // Measured after render (and again once fonts load or the window resizes),
  // so the pre-rendered page simply sizes the pill to its first word.
  useEffect(() => {
    const measure = () => sizer.current && setWidth(sizer.current.offsetWidth)
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [index])

  return (
    <span className={`hx-pill tone-${pillTones[index]}`} style={width ? { '--w': `${width}px` } : undefined}>
      <i className="hx-pill-dot" aria-hidden="true"></i>
      <span className="hx-word" key={index}>{heroWords[index]}</span>
      <span className="hx-pill-sizer" ref={sizer} aria-hidden="true">{heroWords[index]}</span>
    </span>
  )
}

function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="hx">
      <HeroRibbon reduced={reduced} />
      <div className="container">
        <div className="hx-top">
          <span className="hx-badge"><img src="/assets/entaura-mark-sm.png" alt="" />Enterprise Agentic AI Platform</span>
          <h1 aria-label="Turn enterprise policies, documents, and transactional data into actionable insights.">
            <span aria-hidden="true">
              <span className="hx-line"><span>Turn enterprise <Rotator reduced={reduced} /></span></span>
              <span className="hx-line muted"><span>into actionable insights.</span></span>
            </span>
          </h1>
          <p className="hx-sub">Ask, Insight and Watch connect your policies, documents and data in one intelligent layer.</p>
          <div className="hx-actions">
            <Link className="button primary" to="/try.html">Try Entaura</Link>
            <Link className="button ghost" to="/contact.html">Contact sales</Link>
          </div>
        </div>

        <ProductDemo />
      </div>
    </section>
  )
}

export default Hero
