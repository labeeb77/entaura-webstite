import { useState } from 'react'
import { Link } from 'react-router-dom'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../try.css'

// The hosted entaura demo. Override with VITE_ENTAURA_DEMO_URL to show another one.
const DEMO_URL = import.meta.env.VITE_ENTAURA_DEMO_URL || 'https://insight.dev.entaura.ai/demo/fc5beae5-ef9e-47e0-97b0-0fde2825cf08'

function Try() {
  usePageMeta(pageMeta.try)
  const [loaded, setLoaded] = useState(false)

  return (
    <main className="try">
      <section className="try-hero container">
        <span className="try-pill"><i className="orb small classic" aria-hidden="true"></i>Try Entaura</span>
        <h1>Ask your business anything. <span className="gradient-text">See the proof.</span></h1>
        <p>A live demo on sample data for a fictional software company: pricing, policies, revenue, and invoices.</p>
      </section>

      <section className="container">
        <div className="try-chat">
          <i className="orb try-glow" aria-hidden="true"></i>
          <header className="tc-head">
            <div className="tc-title">
              <img src="/assets/entaura-mark.png" alt="" />
              <strong>entaura</strong>
              <span className="tc-status live"><i></i>Live</span>
            </div>
          </header>
          <div className={`tc-frame${loaded ? ' loaded' : ''}`}>
            <iframe src={DEMO_URL} title="Try Entaura" loading="lazy" allow="clipboard-write" onLoad={() => setLoaded(true)} />
          </div>
        </div>
        <p className="try-note">
          Answers are AI-generated from demo data.
          <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">Open the demo in a new tab ↗</a>
          <Link to="/contact.html">Talk to our team →</Link>
        </p>
      </section>
    </main>
  )
}

export default Try
