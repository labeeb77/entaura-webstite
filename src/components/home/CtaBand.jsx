import { Link } from 'react-router-dom'

function CtaBand() {
  return (
    <section className="container h-cta streak reveal">
      <span className="eyebrow">Ask • Insight • Watch</span>
      <h2>Transform your enterprise today.</h2>
      <p>See EntAura working on your own policies, documents, and transactional data.</p>
      <div className="h-actions">
        <Link className="button primary" to="/contact.html">Book a demo <span>↗</span></Link>
        <Link className="button ghost" to="#contact">Send us a message</Link>
      </div>
    </section>
  )
}

export default CtaBand
