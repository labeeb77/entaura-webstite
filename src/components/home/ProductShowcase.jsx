import { useState } from 'react'
import { Link } from 'react-router-dom'
import { askRecord, quarterTable, showcase, watchAlerts, watchRecipe } from '../../data/home.js'
import ChannelIcon from '../ChannelIcon.jsx'
import ProductMark from '../ProductMark.jsx'

function Question({ text }) {
  return <p className="sp-question"><span>Q</span>{text}</p>
}

function AskPanel({ product }) {
  return (
    <div className="sp-ask">
      <Question text={product.question} />
      <div className="sp-card">
        <header><b>Policy</b> Credit Policy v2 · page 4</header>
        <p className="sp-doc">
          <small>§4.1 Customer credit limits</small>
          Each customer is assigned a credit limit by the finance committee.{' '}
          <mark>Orders that take a customer above 90% of its limit require approval from the Finance Manager</mark>{' '}
          before dispatch.
        </p>
      </div>
      <div className="sp-card">
        <header><b>ERP</b> customers · live record</header>
        <dl>
          {askRecord.map(([key, value]) => (
            <div key={key} className={key === 'Utilisation' ? 'hit' : ''}><dt>{key}</dt><dd>{value}</dd></div>
          ))}
        </dl>
      </div>
      <div className="sp-verdict">
        <span className="sp-badge">Needs approval</span>
        Al Noor Trading is at 93% of its limit. New orders need Finance Manager approval.
      </div>
    </div>
  )
}

function InsightPanel({ product }) {
  const max = Math.max(...quarterTable.map(row => row.cost))
  return (
    <div className="sp-insight">
      <Question text={product.question} />
      <div className="sp-card sp-table">
        <header><b>Table</b> SAR millions</header>
        <table>
          <thead><tr><th>Quarter</th><th>Profit</th><th>Margin</th><th>Cost</th><th>Tax</th></tr></thead>
          <tbody>
            {quarterTable.map(row => (
              <tr key={row.quarter} className={row.quarter === 'Q3 2026' ? 'top' : ''}>
                <td>{row.quarter}</td><td>{row.profit.toFixed(2)}</td><td>{row.margin}</td><td>{row.cost.toFixed(2)}</td><td>{row.tax.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sp-card">
        <header><b>Chart</b> Profit and cost by quarter</header>
        <div className="sp-qchart" role="img" aria-label="Profit and cost by quarter">
          {quarterTable.map(row => (
            <div key={row.quarter} className={row.quarter === 'Q3 2026' ? 'top' : ''}>
              <span className="bars">
                <i style={{ height: `${(row.profit / max) * 100}%` }}></i>
                <i className="cost" style={{ height: `${(row.cost / max) * 100}%` }}></i>
              </span>
              <small>{row.quarter.replace(' 20', " '")}</small>
            </div>
          ))}
        </div>
        <div className="sp-legend"><span><i></i>Profit</span><span><i className="cost"></i>Cost</span></div>
      </div>
      <div className="sp-card">
        <header><b>SQL</b> Generated and verified</header>
        <pre>{`SELECT date_trunc('quarter', d.document_date) AS quarter,
  SUM(l.gross_profit) AS profit,
  SUM(l.gross_profit) / SUM(l.paid_value) AS margin,
  SUM(l.paid_value - l.gross_profit) AS cost,
  SUM(d.tax_amount) AS tax
FROM sales_documents d JOIN sales_lines l USING (document_id)
WHERE d.status <> 'cancelled'
GROUP BY 1 ORDER BY 1;`}</pre>
      </div>
    </div>
  )
}

function WatchPanel({ product }) {
  return (
    <div className="sp-watch">
      <Question text={product.question} />
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
        {watchAlerts.map(alert => (
          <div className="sp-msg" key={alert.title}>
            <ChannelIcon channel={alert.channel} size={30} />
            <div>
              <small>{alert.meta}</small>
              <strong>{alert.title}</strong>
              <span>{alert.text}</span>
            </div>
          </div>
        ))}
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
                  <span className="sn-tag">0{index + 1} / {item.tag}</span>
                  <ProductMark product={item.key} size="lg" />
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
              <Link to={product.to}>Explore entaura {product.key} →</Link>
            </div>
            <div className="stage-body" key={product.key}><Panel product={product} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase
