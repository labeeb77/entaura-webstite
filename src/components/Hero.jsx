import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { heroFoot, orbitLabels } from '../data/home.js'

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div>
          <span className="pill"><i></i> Enterprise agentic AI platform</span>
          <h1>Turn knowledge<br /><span className="gradient-text">into action.</span></h1>
          <p className="hero-copy">EntAura connects your policies, documents, and live transactional data in one intelligent layer, so teams can verify facts, analyse performance against the rules, and act before issues become incidents.</p>
          <div className="hero-actions">
            <Link className="button primary" to="#products">Explore the products <span>↗</span></Link>
            <Link className="button ghost" to="#platform">See how it works ↓</Link>
          </div>
          <div className="hero-foot">
            {heroFoot.map((label, index) => (
              <Fragment key={label}>{index > 0 && <b></b>}<span>{label}</span></Fragment>
            ))}
          </div>
        </div>
        <div className="hero-orbit">
          <img src="/assets/entaura-mark.png" alt="EntAura multicolor infinity mark" />
          {orbitLabels.map(item => (
            <span className={`orbit-label ${item.className}`} key={item.className}>{item.label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
