import { knowledgeNodes } from '../data/productPages.js'

function KnowledgeDiagram() {
  return (
    <div className="knowledge-diagram">
      <div className="diagram-heading">
        <span className="eyebrow">Knowledge, connected</span>
        <h3>Ask one place.<br />Find the source.</h3>
      </div>
      <div className="knowledge-flow">
        {knowledgeNodes.map(node => (
          <span className="knowledge-node" key={node}>{node}</span>
        ))}
        <div className="knowledge-core">
          <img src="/assets/entaura-mark.png" alt="" />
          <strong>EntAura<br />Ask</strong>
        </div>
        <span className="knowledge-answer">✦ Evidence-backed answer</span>
      </div>
    </div>
  )
}

export default KnowledgeDiagram
