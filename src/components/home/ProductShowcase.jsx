import { useState } from 'react'
import { Link } from 'react-router-dom'
import { askRecord, heroScenes, insightTable, showcase, watchRecipe } from '../../data/home.js'
import Aura from '../Aura.jsx'

function AskPanel() {
  return (
    <div className="sp-ask">
      <div className="sp-card">
        <header><b>ERP</b> purchase_orders · live record</header>
        <dl>
          {askRecord.map(([key, value]) => (
            <div key={key} className={key === 'Amount' ? 'hit' : ''}><dt>{key}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </div>
      <div className="sp-card">
        <header><b>Policy</b> Purchase Policy v3.1 · page 6</header>
        <p className="sp-doc">
          <small>§4.2 Approval limits</small>
          Purchase orders raised by a department are subject to tiered approval.{' '}
          <mark>Orders above SAR 150,000 require approval from the Chief Financial Officer</mark>{' '}
          before release to the vendor.
        </p>
      </div>
      <div className="sp-verdict">
        <span className="sp-badge">Not compliant</span>
        PO-4471 exceeds the department-head limit by SAR 36,400. Route to CFO.
        <strong>96%</strong>
      </div>
    </div>
  )
}

function InsightPanel() {
  const { bars, cap } = heroScenes[1]
  return (
    <div className="sp-insight">
      <div className="sp-card sp-chart-card">
        <header><b>Chart</b> Overtime cost vs. policy cap</header>
        <div className="sp-chart">
          <span className="hc-cap" style={{ bottom: `${cap}%` }}><small>Cap 70%</small></span>
          {bars.map(bar => (
            <div key={bar.label} className={bar.value > cap ? 'over' : ''}>
              <i style={{ height: `${bar.value}%` }}></i>
              <small>{bar.label}</small>
            </div>
          ))}
        </div>
      </div>
      <div className="sp-card">
        <header><b>Table</b> Exceptions</header>
        <table>
          <tbody>
            {insightTable.map(([dept, value, status]) => (
              <tr key={dept}><td>{dept}</td><td>{value}</td><td className={status === 'Within' ? 'ok' : 'bad'}>{status}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sp-card">
        <header><b>SQL</b> Generated query</header>
        <pre>{`SELECT p.dept,
  SUM(p.ot_cost) / SUM(p.base) AS ot_ratio
FROM payroll p
WHERE p.month = '2026-09'
GROUP BY p.dept
HAVING ot_ratio > :policy_cap;`}</pre>
      </div>
      <div className="sp-card">
        <header><b>Reasoning</b> How this was reached</header>
        <ol className="sp-steps">
          <li>Read the overtime cap from HR Policy §7.1</li>
          <li>Aggregated September payroll by department</li>
          <li>Flagged departments above the cap</li>
        </ol>
      </div>
    </div>
  )
}

function WatchPanel() {
  return (
    <div className="sp-watch">
      <div className="sp-recipe">
        {watchRecipe.map(column => (
          <div key={column.step} className="sp-card">
            <header>{column.step}</header>
            <ul>
              {column.items.map((item, index) => (
                <li key={item} className={index === column.active ? 'on' : ''}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="sp-feed">
        <div className="sp-msg">
          <img src="/assets/integrations/teams.png" alt="" />
          <div>
            <small>EntAura Watch · Warehouse channel · 02:14</small>
            <strong>Cold room CS-02 above 8°C for 12 minutes</strong>
            <span>Peak 9.4°C. Not a defrost cycle (SOP-12). Shift lead assigned.</span>
          </div>
        </div>
        <div className="sp-msg">
          <img src="/assets/integrations/whatsapp.png" alt="" />
          <div>
            <small>EntAura Watch · Finance · 08:00 daily</small>
            <strong>3 POs pending above approval limit</strong>
            <span>Combined SAR 412,900. Oldest waiting 4 days.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const panels = { ask: AskPanel, insight: InsightPanel, watch: WatchPanel }

function ProductShowcase() {
  const [active, setActive] = useState(0)
  const product = showcase[active]
  const Panel = panels[product.key]

  return (
    <section className="h-section h-products" id="products">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Ask • Insight • Watch</span>
          <h2>Three products. <span className="gradient-text">One intelligent layer.</span></h2>
          <p>Ask verifies, Insight explains, and Watch safeguards, all on the same connected foundation of policies, documents, and transactional data.</p>
        </div>

        <div className="h-showcase reveal">
          <div className="h-showcase-nav" role="tablist" aria-label="Products">
            {showcase.map((item, index) => (
              <div key={item.key} className={`sn-item tone-${item.key}${index === active ? ' active' : ''}`}>
                <button
                  role="tab"
                  id={`tab-${item.key}`}
                  aria-selected={index === active}
                  aria-controls="showcase-panel"
                  onClick={() => setActive(index)}
                >
                  <Aura variant={item.key} size={38} />
                  <span>
                    <span className="sn-tag">0{index + 1} / {item.tag}</span>
                    <strong>EntAura {item.name}</strong>
                  </span>
                </button>
                {index === active && (
                  <div className="sn-detail">
                    <p>{item.text}</p>
                    <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className={`h-showcase-stage tone-${product.key}`} id="showcase-panel" role="tabpanel" aria-labelledby={`tab-${product.key}`}>
            <div className="stage-head">
              <h3>{product.title}</h3>
              <Link to={product.to}>Explore {product.name} →</Link>
            </div>
            <div className="stage-body" key={product.key}><Panel /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
