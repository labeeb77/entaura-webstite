import ContactStrip from '../components/ContactStrip.jsx'
import PageHero from '../components/PageHero.jsx'
import SectionHead from '../components/SectionHead.jsx'
import { deployments, faqs, phases, security, weProvide, youBring } from '../data/integration.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function Integration() {
  usePageMeta(pageMeta.integration)

  return (
    <main className="int">
      <PageHero
        eyebrow="Integration"
        title="A partnership,"
        gradientLines={['not a download.']}
        text="Our team scopes, onboards, and deploys entaura with yours, in your infrastructure or ours."
      />

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="How it works" title="Five phases," gradient="from first call to go-live." />
          <ol className="int-phases">
            {phases.map((phase, index) => (
              <li key={phase.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{phase.title}</h3>
                <p>{phase.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section int-soft">
        <div className="container">
          <SectionHead eyebrow="Roles" title="What we provide," gradient="and what you bring." />
          <div className="int-split">
            <article>
              <span className="eyebrow">entaura provides</span>
              <ul>{weProvide.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
            <article>
              <span className="eyebrow">You bring</span>
              <ul>{youBring.map(item => <li key={item}>{item}</li>)}</ul>
            </article>
          </div>
          <p className="int-note">You bring the data and the domain expertise. We bring the platform and the team to turn it into trusted answers.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Deployment" title="Deployed" gradient="on your terms." />
          <div className="int-deploy">
            {deployments.map(option => (
              <article key={option.title}>
                <h3>{option.title}</h3>
                <p>{option.line}</p>
                <dl>
                  {option.rows.map(([label, value]) => (
                    <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                  ))}
                </dl>
                <small><b>Best for</b> {option.best}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section int-soft">
        <div className="container">
          <SectionHead eyebrow="Security and governance" title="Enterprise-grade" gradient="by default." />
          <div className="int-security">
            {security.map(item => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
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
