import { insightBarHeights } from '../data/products.js'

export function AskMock() {
  return (
    <>
      <div className="bubble">✦ Is this purchase order within the approved limit?</div>
      <div className="answer">
        Yes. It is within the procurement policy limit. The record and clause are shown below.
        <div className="mockline"></div>
        <div className="mockline short"></div>
        <span className="teal">◈ Evidence attached</span>
      </div>
    </>
  )
}

export function WatchMock() {
  return (
    <>
      <div className="rule">✦ Alert me when overdue invoices cross the threshold.</div>
      <div className="alert">
        <span className="signal">↗</span>
        <span><strong>Monitor triggered</strong><br />Important change detected · Notify team</span>
      </div>
      <div className="mockline short"></div>
    </>
  )
}

export function InsightMock() {
  return (
    <>
      <div className="mock-metrics">
        <span>Revenue<strong>↑ 18.4%</strong></span>
        <span>Performance<strong>↗ Strong</strong></span>
      </div>
      <div className="bars">
        {insightBarHeights.map(height => (
          <i key={height} style={{ height }}></i>
        ))}
      </div>
    </>
  )
}
