import { chainItems } from '../data/home.js'

function Statement() {
  return (
    <section className="statement" id="platform">
      <div className="container">
        <span className="eyebrow">One intelligent layer</span>
        <h2>From enterprise knowledge to <span className="gradient-text">business action.</span></h2>
        <p>Most organizations keep policies, tools, and transactional data in separate places. EntAura brings them together so every answer, analysis, and alert draws on the full picture.</p>
        <div className="chain">
          {chainItems.map(item => (
            <div className="chain-item" key={item.number}>
              <span className="number">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statement
