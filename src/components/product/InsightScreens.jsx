import { useState } from 'react'
import IntegrationIcon from '../IntegrationIcons.jsx'
import AppWindow from './AppWindow.jsx'

// HTML recreations of the entaura insight app, filled with sample data for a
// fictional distributor.

const statuses = [
  { label: 'Confirmed', count: 10, colour: '#2f6be6' },
  { label: 'Out for delivery', count: 6, colour: '#e8a317' },
  { label: 'Awaiting stock', count: 6, colour: '#1e46b4' },
  { label: 'Rescheduled', count: 3, colour: '#7fa6f2' },
  { label: 'Pending', count: 1, colour: '#8457d4' },
]
const totalOrders = statuses.reduce((sum, status) => sum + status.count, 0)

const configure = [
  ['layers', 'Overview'], ['plug', 'Connections'], ['document', 'Documents'], ['database', 'Data model'],
  ['shield', 'Business definitions'], ['check', 'Report checks'], ['chart', 'Builds'], ['people', 'Access'],
]

const templates = [
  ['document', 'SAP-style billing', 'Credit memos, cancellations, multi-currency'],
  ['database', 'Order-based ERP', 'Statuses, salesmen, routes, monthly targets'],
  ['chart', 'Van sales (FMCG)', 'Routes and visits, pre-orders, promotions, stock'],
  ['people', 'HR and workforce', 'Headcount, people cost, attrition, recruitment'],
]

function Sidebar({ active }) {
  return (
    <aside className="aw-side">
      <div className="iw-kb"><i><IntegrationIcon name="layers" /></i><div><strong>Sales</strong><em>Live</em></div></div>
      <span className="iw-new">+ New chat</span>
      <small>Today</small>
      <span className={active === 'chat' ? 'on' : ''}>Where are today’s orders…</span>
      <span>Which SKUs are slow movers?</span>
      <small>Configure</small>
      {configure.map(([icon, label]) => (
        <span key={label} className={active === label ? 'on' : ''}><IntegrationIcon name={icon} />{label}</span>
      ))}
    </aside>
  )
}

// Donut drawn with one stroked circle per status; each segment starts where the last ended.
const segments = statuses.map((status, index) => ({
  ...status,
  length: (status.count / totalOrders) * 100,
  start: statuses.slice(0, index).reduce((sum, previous) => sum + (previous.count / totalOrders) * 100, 0),
}))

function Donut() {
  return (
    <div className="iw-donut">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        {segments.map(segment => (
          <circle key={segment.label} cx="60" cy="60" r="44" pathLength="100" fill="none" stroke={segment.colour} strokeWidth="16" strokeDasharray={`${segment.length - 0.8} ${100 - segment.length + 0.8}`} strokeDashoffset={-segment.start} />
        ))}
        <text x="60" y="58" textAnchor="middle">{totalOrders}</text>
        <text x="60" y="72" textAnchor="middle" className="sub">open orders</text>
      </svg>
      <ul>{statuses.map(status => <li key={status.label}><i style={{ background: status.colour }}></i>{status.label}<b>{status.count}</b></li>)}</ul>
    </div>
  )
}

function StatusView({ view }) {
  if (view === 'Donut') return <Donut />
  if (view === 'Bar') {
    return (
      <div className="iw-hbars">
        {statuses.map(status => (
          <div key={status.label}><span>{status.label}</span><b style={{ width: `${(status.count / statuses[0].count) * 100}%` }}></b><em>{status.count}</em></div>
        ))}
      </div>
    )
  }
  return (
    <table className="aw-table">
      <thead><tr><th>status</th><th>orders</th><th>share</th></tr></thead>
      <tbody>{statuses.map(status => <tr key={status.label}><td>{status.label}</td><td>{status.count}</td><td>{Math.round((status.count / totalOrders) * 100)}%</td></tr>)}</tbody>
    </table>
  )
}

function AnswerScreen() {
  const [view, setView] = useState('Donut')
  return (
    <div className="aw-body">
      <Sidebar active="chat" />
      <div className="aw-main aw-chat iw-chat">
        <p className="aw-q">Where are today’s orders getting stuck?</p>
        <div className="iw-answer">
          <p>Today’s open orders: <b>26 orders worth SAR 118,159.58</b>. The main bottlenecks are:</p>
          <ul>
            <li><b>Awaiting stock:</b> 6 orders, <b>SAR 29,815.86</b></li>
            <li><b>Rescheduled after a vehicle breakdown:</b> 3 orders, <b>SAR 17,511.41</b>, all overdue</li>
          </ul>
        </div>
        <div className="aw-visual">
          <div className="iw-chart-head">
            <div><strong>Open orders by status</strong><small>Delivery date 7–8 Oct 2026 · open orders only</small></div>
            <div className="iw-seg" role="group" aria-label="Chart view">
              {['Bar', 'Donut', 'Table'].map(name => (
                <button key={name} className={view === name ? 'on' : ''} aria-pressed={view === name} onClick={() => setView(name)}>{name}</button>
              ))}
            </div>
          </div>
          <StatusView view={view} />
        </div>
        <div className="iw-how"><span>{'<>'}</span>How this was computed<em>4 queries · 23 ms</em></div>
        <div className="aw-chips iw-suggest"><span>Which retailers are due for reorder?</span><span>Which vans are underperforming today?</span></div>
        <div className="aw-input">Ask a question…<span className="iw-model">Default model</span><i>➤</i></div>
      </div>
    </div>
  )
}

function KnowledgeBasesScreen() {
  return (
    <div className="aw-body">
      <Sidebar active="Overview" />
      <div className="aw-main">
        <div className="aw-head">
          <div><h4>Knowledge bases</h4><p>Each one is an isolated workspace with its own data, business definitions and tested numbers.</p></div>
          <span className="aw-btn">+ New knowledge base</span>
        </div>
        <div className="iw-kbs">
          <div className="iw-kbcard">
            <div className="iw-wave"><span>Live</span><svg viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50 C60 40 100 20 160 22 S250 30 300 8" fill="none" stroke="#7fa6f2" strokeWidth="1.5" strokeDasharray="4 4" /><path d="M0 56 C80 52 140 40 200 44 S270 40 300 30" fill="none" stroke="#2f6be6" strokeWidth="1.5" /></svg></div>
            <strong>Sales</strong>
            <p>A distributor of beverages, dairy, snacks and staples, with van sales across 12 branches.</p>
            <div className="iw-tags"><span>sales</span><span className="ok">44/44 checks passed</span></div>
            <dl><div><dt>Connections</dt><dd>1</dd></div><div><dt>Published</dt><dd>2 days ago</dd></div><div><dt>Documents</dt><dd>2</dd></div></dl>
          </div>
          <div className="iw-templates">
            <small>Start from a data model</small>
            {templates.map(([icon, title, note]) => (
              <div key={title}><i><IntegrationIcon name={icon} /></i><div><strong>{title}</strong><span>{note}</span></div></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ConnectionsScreen() {
  return (
    <div className="aw-body">
      <Sidebar active="Connections" />
      <div className="aw-main">
        <div className="aw-head">
          <div><h4>Connections</h4><p>Source databases this knowledge base copies from. Data never leaves this knowledge base.</p></div>
          <div className="iw-actions"><span>Run checks</span><span className="aw-btn">Sync + build</span></div>
        </div>
        <div className="iw-conn">
          <i><IntegrationIcon name="database" /></i>
          <div><strong>erp <span>PostgreSQL</span><span className="ok">synced</span></strong><code>readonly@erp-db:5432/erp · schema sales</code></div>
          <dl><div><dt>Tables</dt><dd>28</dd></div><div><dt>Last sync</dt><dd>2 min ago</dd></div><div><dt>Schedule</dt><dd>Nightly</dd></div></dl>
        </div>
        <div className="iw-build">
          <small>Latest build</small>
          {['Sync 28 tables', 'Build data model', 'Checked against your reports · 44/44', 'Published to live'].map(step => (
            <span key={step}><IntegrationIcon name="check" />{step}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const screens = [
  { key: 'answer', label: 'Answer with chart', Screen: AnswerScreen },
  { key: 'kbs', label: 'Knowledge bases', Screen: KnowledgeBasesScreen },
  { key: 'connections', label: 'Connections', Screen: ConnectionsScreen },
]

export function ProductWindow() {
  return <AppWindow screens={screens} />
}

// Small screens beside each "How it works" step.
export function StepScreen({ screen }) {
  if (screen === 'connect') {
    return (
      <div className="aw-mini">
        <div className="iw-conn mini">
          <i><IntegrationIcon name="database" /></i>
          <div><strong>erp <span>PostgreSQL</span></strong><code>28 tables selected</code></div>
        </div>
        <div className="iw-conn mini">
          <i><IntegrationIcon name="server" /></i>
          <div><strong>finance <span>SQL Server</span></strong><code>12 tables selected</code></div>
        </div>
        <span className="iw-test"><IntegrationIcon name="check" />Connection tested · read-only</span>
      </div>
    )
  }
  if (screen === 'certify') {
    return (
      <div className="aw-mini iw-build mini">
        <small>Sync + build</small>
        {['Sync 28 tables', 'Build data model', 'Checked against your reports · 44/44', 'Published to live'].map((step, index) => (
          <span key={step} style={{ '--d': `${index * 120}ms` }}><IntegrationIcon name="check" />{step}</span>
        ))}
      </div>
    )
  }
  return (
    <div className="aw-mini">
      <p className="aw-q">Open orders by status today</p>
      <div className="aw-visual"><Donut /></div>
      <div className="iw-how"><span>{'<>'}</span>How this was computed<em>4 queries</em></div>
    </div>
  )
}
