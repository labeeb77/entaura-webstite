import { useState, useSyncExternalStore } from 'react'
import { Link } from 'react-router-dom'
import TryGate from '../components/TryGate.jsx'
import { savedLead } from '../data/leads.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../try.css'

// The hosted entaura demo. Override with VITE_ENTAURA_DEMO_URL to show another one.
const DEMO_URL = import.meta.env.VITE_ENTAURA_DEMO_URL || 'https://insight.dev.entaura.ai/demo/fc5beae5-ef9e-47e0-97b0-0fde2825cf08'

// A question picked elsewhere on the site arrives as ?q=. The demo is a
// separate app, so we show it ready to copy rather than typing it in. The
// pre-rendered page has no question; the browser fills it in after loading.
const noSubscribe = () => () => {}
const askedQuestion = () => new URLSearchParams(window.location.search).get('q')?.slice(0, 200) || ''
// Visitors who already filled in the form on this browser go straight in.
const knownVisitor = () => Boolean(savedLead())

function Try() {
  usePageMeta(pageMeta.try)
  const [loaded, setLoaded] = useState(false)
  const question = useSyncExternalStore(noSubscribe, askedQuestion, () => '')
  const [copied, setCopied] = useState(false)
  const [started, setStarted] = useState(false)
  const known = useSyncExternalStore(noSubscribe, knownVisitor, () => false)
  const open = started || known

  const copy = () => {
    navigator.clipboard?.writeText(question).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  return (
    <main className="try">
      <section className="try-hero container">
        <span className="try-pill"><i className="orb small classic" aria-hidden="true"></i>Try Entaura</span>
        <h1>Ask your business anything. <span className="gradient-text">See the proof.</span></h1>
        <p>A live demo on sample data for a fictional FMCG distributor: sales, orders, routes and stock.</p>
        {question && (
          <div className="try-ask">
            <span>Try asking</span>
            <strong>“{question}”</strong>
            <button type="button" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          </div>
        )}
      </section>

      <section className="container">
        <div className="try-chat">
          <i className="orb try-glow" aria-hidden="true"></i>
          <header className="tc-head">
            <div className="tc-title">
              <img src="/assets/entaura-mark-sm.png" alt="" />
              <strong>entaura</strong>
              <span className={`tc-status${open ? ' live' : ''}`}><i></i>{open ? 'Live' : 'Ready'}</span>
            </div>
          </header>
          <div className={`tc-frame${loaded ? ' loaded' : ''}${open ? '' : ' locked'}`}>
            <iframe src={DEMO_URL} title="Try Entaura" allow="clipboard-write" onLoad={() => setLoaded(true)}
              inert={!open} aria-hidden={open ? undefined : true} tabIndex={open ? undefined : -1} />
            {!open && <TryGate question={question} onStart={() => setStarted(true)} />}
          </div>
        </div>
        <div className="try-own">
          <p><strong>Like what you see?</strong> Run it on your own policies and ERP data.</p>
          <Link className="button primary" to="/contact.html?interest=pilot">Run this on your own data <span>↗</span></Link>
        </div>
        <p className="try-note">
          Answers are AI-generated from demo data.
          {open && <a href={DEMO_URL} target="_blank" rel="noopener noreferrer">Open the demo in a new tab ↗</a>}
          <Link to="/demo.html">Request a demo →</Link>
        </p>
      </section>
    </main>
  )
}

export default Try
