function IndustryGrid({ items }) {
  return (
    <div className="industry-grid">
      {items.map(industry => (
        <article className="industry-card" key={industry.title}>
          <h3>{industry.title}</h3>
          <p>{industry.text}</p>
        </article>
      ))}
    </div>
  )
}

export default IndustryGrid
