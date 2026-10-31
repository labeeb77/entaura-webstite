import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroWords } from '../../data/heroDemos.js'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import HeroRibbon from './HeroRibbon.jsx'
import ProductDemo from './ProductDemo.jsx'

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

function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="hx">
      <HeroRibbon reduced={reduced} />
      <div className="container">
        <div className="hx-top">
          <span className="hx-badge"><img src="/assets/entaura-mark-sm.png" alt="" />Enterprise Agentic AI Platform</span>
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

        <ProductDemo />
      </div>
    </section>
  )
}

export default Hero
