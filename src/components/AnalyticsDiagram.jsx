import { analyticsKpis, analyticsMonths } from '../data/productPages.js'

function AnalyticsDiagram() {
  return (
    <div className="analytics-diagram">
      <div className="diagram-heading">
        <span className="eyebrow">A clearer picture</span>
        <h3>From connected data<br />to the next move.</h3>
      </div>
      <div className="analytics-window">
        <div className="analytics-top">
          <span>Business performance</span>
          <b>Live view ↗</b>
        </div>
        <div className="analytics-kpis">
          {analyticsKpis.map(kpi => (
            <span key={kpi.label}>{kpi.label}<strong>{kpi.value}</strong></span>
          ))}
        </div>
        <div className="analytics-bars">
          {analyticsMonths.map(month => (
            <i key={month}></i>
          ))}
        </div>
        <div className="analytics-labels">
          {analyticsMonths.map(month => (
            <span key={month}>{month}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDiagram
