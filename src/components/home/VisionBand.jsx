import { vision } from '../../data/home.js'

function VisionBand() {
  return (
    <section className="h-section h-vision">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Enterprise document knowledge</span>
          <h2>Find the knowledge you need. <span className="muted">Understand it with confidence.</span></h2>
        </div>
        <ol className="h-vision-steps">
          {vision.map((item, index) => (
            <li key={item.label} className="reveal" style={{ '--delay': `${index * 90}ms` }}>
              {index === 1 && <i className="orb" aria-hidden="true"></i>}
              <span>{String(index + 1).padStart(2, '0')} · {item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default VisionBand
