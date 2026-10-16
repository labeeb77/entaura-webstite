import { connectorColumns } from '../data/productPages.js'

function ToolChips({ items }) {
  return items.map(chip => (
    <span className={`tool-chip ${chip.type}`} key={chip.type}><i>{chip.badge}</i>{chip.label}</span>
  ))
}

function ConnectorDiagram() {
  return (
    <div className="connector-diagram">
      <div className="diagram-heading">
        <span className="eyebrow">Connected ecosystem</span>
        <h3>One pulse across your business.</h3>
        <p>Bring your operational signals into one visual workspace.</p>
      </div>
      <div className="diagram-stage">
        <div className="connector-column left">
          <ToolChips items={connectorColumns.left} />
        </div>
        <div className="diagram-core">
          <img src="/assets/entaura-mark.png" alt="" />
          <strong>entaura<br />watch</strong>
          <small>monitoring intelligence</small>
        </div>
        <div className="connector-column right">
          <ToolChips items={connectorColumns.right} />
        </div>
      </div>
      <div className="diagram-foot">
        <span><b></b> 600+ connection paths</span>
        <span><b></b> Alerts via instant messengers</span>
      </div>
    </div>
  )
}

export default ConnectorDiagram
