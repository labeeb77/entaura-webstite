import { flow, showcase } from '../../data/home.js'

function PlatformFlow() {
  return (
    <section className="h-section h-flow" id="platform">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">How it works</span>
          <h2>From enterprise data <span className="muted">to business action.</span></h2>
          <p>EntAura blends unstructured policy documents with structured transactional data, then puts RAG and agentic AI to work on top of it.</p>
        </div>

        <div className="fl-grid reveal">
          <div className="fl-col">
            <span className="fl-label">Your sources</span>
            {flow.sources.map(item => <div key={item} className="fl-node">{item}</div>)}
          </div>
          <div className="fl-wire" aria-hidden="true"><i></i></div>
          <div className="fl-col fl-core">
            <img src="/assets/entaura-mark.png" alt="" />
            <strong>EntAura intelligence layer</strong>
            {flow.core.map(item => <span key={item}>{item}</span>)}
          </div>
          <div className="fl-wire" aria-hidden="true"><i></i></div>
          <div className="fl-col">
            <span className="fl-label">Products</span>
            {showcase.map(item => (
              <div key={item.key} className={`fl-node fl-product tone-${item.key}`}>
                <strong>{item.name}</strong><small>{item.tag}</small>
              </div>
            ))}
          </div>
          <div className="fl-wire" aria-hidden="true"><i></i></div>
          <div className="fl-col">
            <span className="fl-label">Where teams act</span>
            {flow.channels.map(item => <div key={item} className="fl-node">{item}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PlatformFlow
