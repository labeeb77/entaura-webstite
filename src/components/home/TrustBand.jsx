import { trustPoints } from '../../data/home.js'
import IntegrationIcon from '../IntegrationIcons.jsx'

function TrustBand() {
  return (
    <section className="h-section h-trust">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Built for trust</span>
          <h2>Answers you can trace. <span className="muted">Access you can control.</span></h2>
          <p>Review supporting sources and give teams access to approved knowledge.</p>
        </div>
        <div className="h-trust-grid">
          {trustPoints.map((point, index) => (
            <div key={point.title} className="reveal" style={{ '--delay': `${(index % 3) * 80}ms` }}>
              <i aria-hidden="true"><IntegrationIcon name={point.icon} /></i>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrustBand
