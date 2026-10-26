import IntegrationIcon from './IntegrationIcons.jsx'

function ProblemGrid({ items }) {
  return (
    <div className="problem-grid">
      {items.map(problem => (
        <article className="problem-card" key={problem.title}>
          <span><IntegrationIcon name={problem.icon} /></span>
          <h3>{problem.title}</h3>
          <p>{problem.text}</p>
        </article>
      ))}
    </div>
  )
}

export default ProblemGrid
