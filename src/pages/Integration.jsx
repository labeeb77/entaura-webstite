import { useRef, useState } from 'react'
import ContactStrip from '../components/ContactStrip.jsx'
import IntegrationIcon from '../components/IntegrationIcons.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { deployments, faqs, glance, phases, security, weProvide, youBring } from '../data/integration.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReveal } from '../hooks/useReveal.js'

function GlanceNode({ title, items }) {
  return (
    <div className="int-node">
      <strong>{title}</strong>
      <ul>
        {items.map(([icon, label]) => (
          <li key={label}><IntegrationIcon name={icon} />{label}</li>
        ))}
      </ul>
    </div>
  )
}

// Your systems → entaura → your team, with the two promises on the links.
function Glance() {
  return (
    <div className="int-glance reveal">
      <GlanceNode title="Your systems" items={glance.systems} />
      <div className="int-link"><span>read-only</span><i></i></div>
      <div className="int-core">
        <span className="int-core-mark"><img src="/assets/entaura-mark.png" alt="" /></span>
        <strong>entaura</strong>
        <small>Connect · Model · Certify</small>
      </div>
      <div className="int-link"><span>cited answers</span><i></i></div>
      <GlanceNode title="Your team" items={glance.team} />
    </div>
  )
}

function ItemList({ items }) {
  return (
    <ul className="int-items">
      {items.map(item => (
        <li key={item.title}>
          <IntegrationIcon name={item.icon} />
          <div><strong>{item.title}</strong><small>{item.note}</small></div>
        </li>
      ))}
    </ul>
  )
}

function Deployment() {
  const [active, setActive] = useState(0)
  const option = deployments[active]

  return (
    <div className="int-deploy">
      <div className="int-toggle" role="group" aria-label="Deployment model" style={{ '--i': active }}>
        <i aria-hidden="true"></i>
        {deployments.map((item, index) => (
          <button key={item.key} aria-pressed={index === active} onClick={() => setActive(index)}>{item.label}</button>
        ))}
      </div>
      <div className="int-deploy-body" key={option.key}>
        <div className={`int-place ${option.key}`}>
          <span><IntegrationIcon name={option.icon} />{option.place}</span>
          <div>
            <b><img src="/assets/entaura-mark.png" alt="" />entaura</b>
            <b><IntegrationIcon name="database" />Your data</b>
          </div>
        </div>
        <div className="int-facts">
          <dl>
            {option.rows.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <p><b>Best for</b> {option.best}</p>
        </div>
      </div>
    </div>
  )
}

function Integration() {
  usePageMeta(pageMeta.integration)
  const main = useRef(null)
  useReveal(main)

  return (
    <main className="int" ref={main}>
      <PageHero
        eyebrow="Integration"
        title="A partnership,"
        gradientLines={['not a download.']}
        text="Our team scopes, onboards, and deploys entaura with yours, in your infrastructure or ours."
      />

      <section className="section int-glance-section">
        <div className="container">
          <Glance />
          <p className="int-caption">We read from your systems and never write back.</p>
        </div>
      </section>

      <section className="section int-soft">
        <div className="container">
          <SectionHead eyebrow="How it works" title="Five steps," gradient="from first call to go-live." />
          <ol className="int-phases reveal">
            {phases.map((phase, index) => (
              <li key={phase.title} style={{ '--d': `${index * 120}ms` }}>
                <span className="int-step"><IntegrationIcon name={phase.icon} /></span>
                <small>{String(index + 1).padStart(2, '0')}</small>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
                <em>{phase.term}</em>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Roles" title="What we provide," gradient="and what you bring." />
          <div className="int-split">
            <article>
              <span className="eyebrow">entaura provides</span>
              <ItemList items={weProvide} />
            </article>
            <article>
              <span className="eyebrow">You bring</span>
              <ItemList items={youBring} />
            </article>
          </div>
          <p className="int-note">You bring the data and the domain expertise. <span>We bring the platform and the team.</span></p>
        </div>
      </section>

      <section className="section int-soft">
        <div className="container">
          <SectionHead eyebrow="Deployment" title="Deployed" gradient="on your terms." />
          <Deployment />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Security and governance" title="Enterprise-grade" gradient="by default." />
          <div className="int-security">
            {security.map(item => (
              <div key={item.title}>
                <IntegrationIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section int-faq-section">
        <div className="container int-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions," gradient="answered." />
          <div className="int-faq">
            {faqs.map(item => (
              <details key={item.q}>
                <summary>{item.q}<i aria-hidden="true"></i></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip title="Start with a discovery call." text="We’ll scope a deployment with you and send a clear proposal." />
    </main>
  )
}

export default Integration
