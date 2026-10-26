import { Link } from 'react-router-dom'
import { useCases } from '../../data/home.js'
import ProductMark from '../ProductMark.jsx'

function UseCases() {
  return (
    <section className="h-section h-soft h-cases">
      <div className="container">
        <div className="uc-head">
          <div className="h-head reveal">
            <span className="eyebrow">Use cases</span>
            <h2>Questions your teams <span className="muted">can ask today.</span></h2>
          </div>
          <Link className="button primary uc-cta reveal" to="/try.html">Try Entaura <span>↗</span></Link>
        </div>
        <div className="uc-grid">
          {useCases.map((group, index) => (
            <article key={group.product} className={`uc-card tone-${group.product} reveal`} style={{ '--delay': `${index * 80}ms` }}>
              <ProductMark product={group.product} />
              <ul>
                {group.questions.map(({ q, before, now }) => (
                  <li key={q}>
                    <Link to={`/try.html?q=${encodeURIComponent(q)}`}>
                      <span>“{q}”</span>
                      <i aria-hidden="true">↗</i>
                    </Link>
                    <p className="uc-change"><b>Before:</b> {before}. <b className="now">Now:</b> {now}.</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
