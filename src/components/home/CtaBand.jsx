import { Link } from 'react-router-dom'

function CtaBand() {
  return (
    <section className="container h-cta reveal">
      <i className="orb" aria-hidden="true"></i>
      <span className="eyebrow">Ask • Insight • Watch</span>
      <h2>Start with a free pilot on your own data.</h2>
      <p>See entaura.ai on your own policies, documents and ERP data. You only pay once you’ve seen it work.</p>
      <div className="h-actions">
        <Link className="button primary" to="/try.html">Try Entaura <span>↗</span></Link>
        <Link className="button ghost" to="/demo.html">Request a demo</Link>
      </div>
    </section>
  )
}

export default CtaBand
