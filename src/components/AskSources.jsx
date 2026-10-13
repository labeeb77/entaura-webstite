import SectionHead from './SectionHead.jsx'

function AskSources({ eyebrow, title, gradient, text, items }) {
  return (
    <section className="ask-sources section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} text={text} />
        <div className="ask-source-grid">
          {items.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AskSources
