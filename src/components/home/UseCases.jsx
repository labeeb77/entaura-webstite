import { Link } from 'react-router-dom'
import { useCases } from '../../data/home.js'
import ProductMark from '../ProductMark.jsx'

function UseCases() {
  return (
    <section className="h-section h-soft h-cases">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Use cases</span>
          <h2>Questions your teams <span className="muted">can ask today.</span></h2>
        </div>
        <div className="uc-grid">
          {useCases.map((group, index) => (
            <article key={group.product} className={`uc-card tone-${group.product} reveal`} style={{ '--delay': `${index * 80}ms` }}>
              <ProductMark product={group.product} />
              <ul>
                {group.questions.map(question => (
                  <li key={question}>
                    <Link to={`/try.html?q=${encodeURIComponent(question)}`}>
                      <span>“{question}”</span>
                      <i aria-hidden="true">↗</i>
                    </Link>
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
