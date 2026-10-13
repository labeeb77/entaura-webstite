import { anatomy } from '../../data/home.js'

function Marker({ n }) {
  return <span className="aa-marker" aria-hidden="true">{n}</span>
}

function AnswerAnatomy() {
  return (
    <section className="h-section h-soft h-anatomy">
      <div className="container">
        <div className="h-head reveal">
          <span className="eyebrow">Transparent answers</span>
          <h2>Built to be checked. <span className="muted">Not just believed.</span></h2>
          <p>Every EntAura answer shows its workings, so finance, audit, and operations teams can rely on it.</p>
        </div>

        <div className="aa-grid">
          <div className="aa-card reveal">
            <div className="aa-q">
              <Marker n={5} />
              <div>
                <small>EntAura asks first</small>
                <p>Which limit should I check: the department-head limit or the annual vendor cap?</p>
                <div className="aa-chips"><span className="on">Department-head limit</span><span>Annual vendor cap</span></div>
              </div>
            </div>
            <div className="aa-answer">
              <div className="aa-row">
                <p><strong>PO-4471 is not compliant.</strong> It exceeds the SAR 150,000 department-head limit and needs CFO approval.</p>
                <div className="aa-score"><Marker n={1} /><b>96%</b><small>confidence</small><b>0.92</b><small>relevance</small></div>
              </div>
              <div className="aa-block">
                <Marker n={2} />
                <div className="aa-sources">
                  <span><b>ERP</b>purchase_orders · PO-4471</span>
                  <span><b>Policy</b>Purchase Policy v3.1 · §4.2</span>
                </div>
              </div>
              <div className="aa-block">
                <Marker n={3} />
                <ol className="aa-reason">
                  <li>Found PO-4471 amount: SAR 186,400</li>
                  <li>Matched approval tier in §4.2: above SAR 150,000</li>
                  <li>Compared with recorded approver: department head</li>
                </ol>
              </div>
              <div className="aa-block">
                <Marker n={4} />
                <pre>{`SELECT po_no, amount, approver_role
FROM purchase_orders WHERE po_no = 'PO-4471';`}</pre>
              </div>
            </div>
          </div>

          <ul className="aa-list">
            {anatomy.map((item, index) => (
              <li key={item.n} className="reveal" style={{ '--delay': `${index * 70}ms` }}>
                <Marker n={item.n} />
                <div><strong>{item.title}</strong><p>{item.text}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default AnswerAnatomy
