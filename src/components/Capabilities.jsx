import { capabilities } from '../data/home.js'

function Capabilities() {
  return (
    <div className="capabilities">
      {capabilities.map(capability => (
        <div className="capability" key={capability.title}>
          <span className="cap-icon">{capability.icon}</span>
          <div>
            <h3>{capability.title}</h3>
            <p>{capability.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Capabilities
