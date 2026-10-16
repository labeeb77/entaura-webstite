import { knowledgeOrbits } from '../data/productPages.js'

// Ask's sources orbiting the entaura core. Each ring turns slowly; each logo
// turns back the other way so it stays upright.
function KnowledgeDiagram() {
  const names = knowledgeOrbits.flatMap(ring => ring.logos.map(([, name]) => name))
  return (
    <div className="knowledge-diagram">
      <div className="diagram-heading">
        <span className="eyebrow">Knowledge, connected</span>
        <h3>Ask one place.<br />Find the source.</h3>
      </div>
      <div className="orbit" role="img" aria-label={`entaura ask connected to ${names.join(', ')}, and more`}>
        {knowledgeOrbits.map((ring, ringIndex) => (
          <div
            key={ring.size}
            className={`orbit-ring${ringIndex % 2 ? ' reverse' : ''}`}
            style={{ '--s': ring.size, '--d': `${ring.duration}s`, '--offset': `${ringIndex * 22}deg` }}
          >
            {ring.logos.map(([file, name], index) => (
              <span key={file} className="orbit-item" style={{ '--a': `${(360 / ring.logos.length) * index}deg` }}>
                <span className="orbit-logo" title={name}>
                  <img src={`/assets/integrations/${file}`} alt="" loading="lazy" />
                </span>
              </span>
            ))}
          </div>
        ))}
        <div className="orbit-core">
          <i aria-hidden="true"></i>
          <i aria-hidden="true"></i>
          <img src="/assets/entaura-mark.png" alt="" />
        </div>
      </div>
      <span className="knowledge-answer">✦ Evidence-backed answer</span>
    </div>
  )
}

export default KnowledgeDiagram
