import { Link } from 'react-router-dom'
import IntegrationIcon from './IntegrationIcons.jsx'

function IndustryGrid({ items }) {
  return (
    <div className="industry-grid">
      {items.map(industry => (
        <article className="industry-card" key={industry.title}>
          <header>
            <span><IntegrationIcon name={industry.icon} /></span>
            <small>Ready-made template</small>
          </header>
          <h3>{industry.title}</h3>
          <p>{industry.text}</p>
          <ul>
            {industry.questions.map(question => (
              <li key={question}>
                <Link to={`/try.html?q=${encodeURIComponent(question)}`}>“{question}”<span aria-hidden="true">↗</span></Link>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}

export default IndustryGrid
