import { Link } from 'react-router-dom'
import IntegrationIcon from './IntegrationIcons.jsx'
import SectionHead from './SectionHead.jsx'

function SolutionDetail({ items }) {
  return (
    <section className="solution-detail section">
      <div className="container">
        <SectionHead eyebrow="How entaura.ai helps" title="Choose the product" gradient="for the problem in front of you." />
        <div className="solution-detail-grid">
          {items.map(solution => (
            <article id={solution.id} key={solution.id}>
              <span className="solution-icon"><IntegrationIcon name={solution.icon} /></span>
              <h3>{solution.title}</h3>
              <p><strong>{solution.lead}</strong>{` ${solution.text}`}</p>
              <ul>
                {solution.items.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link to={solution.to}>{solution.linkLabel}</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SolutionDetail
