function SectionHead({ eyebrow, title, gradient, text }) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}<br /><span className="gradient-text">{gradient}</span></h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export default SectionHead
