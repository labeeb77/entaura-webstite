import { Link } from 'react-router-dom'
import { partnerBenefits, partnerSteps, partnerTypes } from '../../data/home.js'
import IntegrationIcon from '../IntegrationIcons.jsx'

const applyLink = '/contact.html?interest=partner'

function Partnership() {
  return (
    <section className="h-section h-partners" id="partners" aria-labelledby="partners-title">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Partner with us</span>
          <h2 id="partners-title">Grow with entaura.ai.<br /> <span className="muted">Sell, deliver and build together.</span></h2>
          <p>Join the consultancies, integrators and platforms helping businesses get trusted answers from their own data.</p>
        </div>

        <div className="pt-grid">
          {partnerTypes.map((type, index) => (
            <article key={type.key} className={`pt-card tone-${type.tone} reveal`} style={{ '--delay': `${index * 80}ms` }}>
              <header>
                <i aria-hidden="true"><IntegrationIcon name={type.icon} /></i>
                <span>{type.label}</span>
              </header>
              <h3>{type.title}</h3>
              <p className="pt-for">{type.for}</p>
              <p>{type.text}</p>
              <ul>
                {type.points.map(point => (
                  <li key={point}><IntegrationIcon name="check" />{point}</li>
                ))}
              </ul>
              <Link className="pt-link" to={applyLink}>Become a partner <span aria-hidden="true">↗</span></Link>
            </article>
          ))}
        </div>

        <div className="pt-program reveal">
          <div className="pt-benefits">
            <span className="eyebrow">What partners get</span>
            <ul>
              {partnerBenefits.map(benefit => (
                <li key={benefit.title}>
                  <i aria-hidden="true"><IntegrationIcon name={benefit.icon} /></i>
                  <div>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-join">
            <i className="orb" aria-hidden="true"></i>
            <span className="eyebrow">How to join</span>
            <ol>
              {partnerSteps.map((step, index) => (
                <li key={step.title}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="h-actions">
              <Link className="button primary" to={applyLink}>Apply to partner <span>↗</span></Link>
              <Link className="button ghost" to="/integration.html">See integrations</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Partnership
