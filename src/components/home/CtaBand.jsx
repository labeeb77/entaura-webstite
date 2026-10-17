import { Link } from 'react-router-dom'

function CtaBand() {
  return (
    <section className="container h-cta reveal">
      <i className="orb" aria-hidden="true"></i>
      <span className="eyebrow">Ask • Insight • Watch</span>
      <h2>Transform your enterprise today.</h2>
      <p>See entaura.ai working on your own policies, documents, and transactional data.</p>
      <div className="h-actions">
        <Link className="button primary" to="/try.html">Try Entaura <span>↗</span></Link>
        <Link className="button ghost" to="/contact.html">Contact sales</Link>
      </div>
    </section>
  )
}

export default CtaBand
