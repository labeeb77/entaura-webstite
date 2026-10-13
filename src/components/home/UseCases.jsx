import { useState } from 'react'
import { useCases } from '../../data/home.js'

const productNames = { ask: 'Ask', insight: 'Insight', watch: 'Watch' }

function UseCases() {
  const [active, setActive] = useState(0)
  const current = useCases[active]

  return (
    <section className="h-section h-cases">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Use cases</span>
          <h2>Questions your teams <span className="muted">can ask today.</span></h2>
        </div>
        <div className="uc-tabs reveal" role="tablist" aria-label="Teams">
          {useCases.map((item, index) => (
            <button key={item.team} role="tab" aria-selected={index === active} className={index === active ? 'active' : ''} onClick={() => setActive(index)}>
              {item.team}
            </button>
          ))}
        </div>
        <div className="uc-grid" key={current.team}>
          {current.prompts.map(prompt => (
            <article key={prompt.text} className={`uc-card tone-${prompt.product}`}>
              <span>{productNames[prompt.product]}</span>
              <p>“{prompt.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default UseCases
