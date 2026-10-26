import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ChannelIcon from '../components/ChannelIcon.jsx'
import ContactStrip from '../components/ContactStrip.jsx'
import IntegrationIcon from '../components/IntegrationIcons.jsx'
import PageHero from '../components/PageHero.jsx'
import ProductMark from '../components/ProductMark.jsx'
import SectionHead from '../components/SectionHead.jsx'
import SectionNav from '../components/SectionNav.jsx'
import { appIntegrations, checklist, connectors, deployments, faqGroups, glance, heroFacts, phases, sections, security, sourceGuides, weProvide, youBring } from '../data/integration.js'
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
        <span className="int-core-mark"><img src="/assets/entaura-mark-sm.png" alt="" /></span>
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
            <b><img src="/assets/entaura-mark-sm.png" alt="" />entaura</b>
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

// A logo from /assets/integrations, or a line icon for 'icon:<name>' marks.
function ConnectorLogo({ mark }) {
  if (mark === 'telegram') return <ChannelIcon channel="telegram" size={28} />
  if (mark.startsWith('icon:')) return <b aria-hidden="true"><IntegrationIcon name={mark.slice(5)} /></b>
  return <img src={`/assets/integrations/${mark}`} alt="" loading="lazy" />
}

// Every connector as a tile; opening one shows how it connects.
function ConnectorDirectory() {
  const [open, setOpen] = useState(null)
  const detail = connectors.find(([, name]) => name === open)

  return (
    <div className="int-dir">
      <div className="int-dir-grid">
        {connectors.map(([mark, name]) => (
          <button key={name} className={`int-tile${open === name ? ' on' : ''}`} aria-expanded={open === name} onClick={() => setOpen(open === name ? null : name)}>
            <ConnectorLogo mark={mark} />
            <span>{name}</span>
          </button>
        ))}
        <div className="int-tile more">
          <b aria-hidden="true">+</b>
          <span>600+ more connectors</span>
        </div>
      </div>
      {detail && (
        <div className="int-dir-detail" key={detail[1]}>
          <strong><ConnectorLogo mark={detail[0]} />{detail[1]}</strong>
          <dl>
            <div><dt>How it connects</dt><dd>{detail[3].how}</dd></div>
            <div><dt>Updates</dt><dd>{detail[3].sync}</dd></div>
            <div><dt>Used by</dt><dd>{detail[3].products.map(product => <ProductMark key={product} product={product} size="sm" />)}</dd></div>
          </dl>
        </div>
      )}
      <p className="int-dir-foot">These are the most common. Don’t see yours? <Link to="/contact.html">Request a connector →</Link></p>
    </div>
  )
}

function SourceGuides() {
  return (
    <div className="int-guides">
      {sourceGuides.map(guide => (
        <article key={guide.title}>
          <header><span className="int-step"><IntegrationIcon name={guide.icon} /></span><div><h3>{guide.title}</h3><p>{guide.lead}</p></div></header>
          <ol>{guide.steps.map(step => <li key={step}>{step}</li>)}</ol>
          <dl>
            <div><dt>What we access</dt><dd>{guide.access}</dd></div>
            <div className="never"><dt>What we never do</dt><dd>{guide.never}</dd></div>
          </dl>
        </article>
      ))}
    </div>
  )
}

function AppIntegrations() {
  return (
    <div className="int-apps">
      {appIntegrations.map(item => (
        <article key={item.title}>
          <IntegrationIcon name={item.icon} />
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
          {item.code && <pre aria-hidden="true">{item.code}</pre>}
          {item.channels && (
            <div className="int-apps-channels">
              <span><ChannelIcon channel="whatsapp" size={20} />WhatsApp</span>
              <span><ChannelIcon channel="telegram" size={20} />Telegram</span>
              <Link to={item.to}>About Watch →</Link>
            </div>
          )}
        </article>
      ))}
    </div>
  )
}

// A list IT can tick through; ticks are kept on this page only.
function Checklist() {
  const [done, setDone] = useState(() => new Set())
  const toggle = index => setDone(previous => {
    const next = new Set(previous)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    return next
  })

  return (
    <div className="int-check">
      <div className="int-check-head">
        <strong>{done.size} of {checklist.length} ready</strong>
        <span className="int-check-bar"><i style={{ width: `${(done.size / checklist.length) * 100}%` }}></i></span>
      </div>
      <ul>
        {checklist.map((item, index) => (
          <li key={item.title}>
            <label className={done.has(index) ? 'on' : ''}>
              <input type="checkbox" checked={done.has(index)} onChange={() => toggle(index)} />
              <i aria-hidden="true"><IntegrationIcon name="check" /></i>
              <span><strong>{item.title}</strong><small>{item.note}</small></span>
            </label>
          </li>
        ))}
      </ul>
      <p>Our team helps with every item, and confirms the details during discovery.</p>
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
      >
        <ul className="int-facts-strip">
          {heroFacts.map(([icon, label]) => <li key={label}><IntegrationIcon name={icon} />{label}</li>)}
        </ul>
      </PageHero>
      <SectionNav sections={sections} />

      <section className="section int-glance-section">
        <div className="container">
          <Glance />
          <p className="int-caption">We read from your systems and never write back.</p>
        </div>
      </section>

      <section className="section int-soft" id="connectors">
        <div className="container">
          <SectionHead eyebrow="Connectors" title="Connect what you" gradient="already use." text="Databases, business apps, files, email and AI models. Pick one to see how it connects." />
          <ConnectorDirectory />
        </div>
      </section>

      <section className="section" id="how">
        <div className="container">
          <SectionHead eyebrow="How it connects" title="Simple to connect," gradient="clear about access." text="Each kind of source takes a few steps, and you choose exactly what entaura can read." />
          <SourceGuides />
        </div>
      </section>

      <section className="section int-soft" id="apps">
        <div className="container">
          <SectionHead eyebrow="Into your apps" title="Answers wherever" gradient="your team works." text="Use the same answers outside entaura, with the same access rules and checks." />
          <AppIntegrations />
        </div>
      </section>

      <section className="section" id="checklist">
        <div className="container int-check-wrap">
          <SectionHead eyebrow="Before you start" title="What your IT team" gradient="prepares." text="A short list for the technical side. Tick items off as you go." />
          <Checklist />
        </div>
      </section>

      <section className="section int-soft" id="rollout">
        <div className="container">
          <SectionHead eyebrow="Rollout" title="Five steps," gradient="from first call to go-live." />
          <div className="int-pilot reveal">
            <span className="int-step"><IntegrationIcon name="rocket" /></span>
            <div>
              <h3>Start with a small pilot</h3>
              <p>One business area, a few documents and read-only access to your ERP. Our team sets it up and checks the first answers against your own figures.</p>
            </div>
            <Link className="button primary" to="/contact.html?interest=pilot">Plan a pilot <span>↗</span></Link>
          </div>
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

      <section className="section" id="security">
        <div className="container">
          <SectionHead eyebrow="Security and governance" title="Enterprise-grade" gradient="by default." />
          <div className="int-security">
            {security.map(item => (
              <div key={item.title}>
                <IntegrationIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <small>{item.detail}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section int-faq-section" id="faq">
        <div className="container int-faq-wrap">
          <SectionHead eyebrow="FAQ" title="Questions," gradient="answered." />
          <div>
            {faqGroups.map(group => (
              <div key={group.title} className="int-faq-group">
                <h3>{group.title}</h3>
                <div className="int-faq">
                  {group.items.map(item => (
                    <details key={item.q}>
                      <summary>{item.q}<i aria-hidden="true"></i></summary>
                      <p>{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactStrip title="Start with a discovery call." text="We’ll scope a deployment with you and send a clear proposal." />
    </main>
  )
}

export default Integration
