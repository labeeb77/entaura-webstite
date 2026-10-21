import { useEffect, useState } from 'react'
import IntegrationIcon from '../IntegrationIcons.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

// HTML recreations of the entaura ask app, filled with sample TEXOL data.

const knowledgeBases = [
  { name: 'HR Policies', path: '/project/hr-policies', files: '14 files' },
  { name: 'Sales Database', path: '/project/sales-db', files: 'Live database' },
  { name: 'Product Docs', path: '/project/product-docs', files: '32 files' },
]

const sales = [
  ['2026-10-01', 362726.43],
  ['2026-10-03', 326944.19],
  ['2026-10-04', 342121.29],
  ['2026-10-05', 390072.46],
  ['2026-10-06', 417138.47],
  ['2026-10-07', 307970.9],
]

const sourceTypes = [
  ['database', 'Connect database', 'Sync rows or query live.', 'Database'],
  ['cloud', 'AWS S3', 'Sync files from private buckets.'],
  ['cloud', 'Azure Blob Storage', 'Sync files from containers.', 'Azure Blob'],
  ['link', 'Gmail', 'Import support threads.'],
  ['document', 'Google Drive', 'Connect shared drives.', 'Drive'],
  ['layers', 'GitHub', 'Index docs and issues.'],
  ['layers', 'GitLab', 'Index project docs.'],
  ['document', 'Manual FAQ / text', 'Add custom Q&A.'],
]

const money = value => value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

function Sidebar({ active }) {
  return (
    <aside className="aw-side">
      <div className="aw-brand"><img src="/assets/entaura-mark.png" alt="" />entaura</div>
      <small>Workspace</small>
      <span className={active === 'dashboard' ? 'on' : ''}><IntegrationIcon name="layers" />Dashboard</span>
      <span><IntegrationIcon name="document" />Knowledge bases</span>
      {knowledgeBases.map(base => (
        <span key={base.name} className={`sub${active === base.name ? ' on' : ''}`}><IntegrationIcon name="database" />{base.name}</span>
      ))}
      <small>Settings</small>
      <span><IntegrationIcon name="people" />Users and roles</span>
      <span><IntegrationIcon name="key" />API keys</span>
      <div className="aw-user"><b>TA</b><div><strong>TEXOL Admin</strong><em>admin@texol.example</em></div></div>
    </aside>
  )
}

function DashboardScreen() {
  const stats = [['document', 'Knowledge bases', '3'], ['layers', 'Knowledge groups', '1'], ['database', 'Sources', '6'], ['link', 'Languages', '9']]
  return (
    <div className="aw-body">
      <Sidebar active="dashboard" />
      <div className="aw-main">
        <div className="aw-head">
          <div><h4>Dashboard <em>overview</em></h4><p>Your organization’s knowledge and AI workspace.</p></div>
          <span className="aw-btn">+ New knowledge base</span>
        </div>
        <div className="aw-stats">
          {stats.map(([icon, label, value]) => (
            <div key={label}><i><IntegrationIcon name={icon} /></i><span>{label}<b>{value}</b></span></div>
          ))}
        </div>
        <div className="aw-kbs">
          {knowledgeBases.map(base => (
            <div key={base.name}>
              <i><IntegrationIcon name="layers" /></i>
              <strong>{base.name}</strong>
              <code>{base.path}</code>
              <small>{base.files}</small>
              <em>Open workspace →</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SalesView({ view }) {
  const top = Math.max(...sales.map(([, value]) => value))
  if (view === 'Bar') {
    return (
      <div className="aw-bars">
        {sales.map(([date, value]) => (
          <div key={date}><b style={{ height: `${(value / top) * 100}%` }} title={money(value)}></b><span>{date.slice(5)}</span></div>
        ))}
      </div>
    )
  }
  return (
    <table className="aw-table">
      <thead><tr><th>sales_date</th><th>total_sales</th></tr></thead>
      <tbody>{sales.map(([date, value]) => <tr key={date}><td>{date}</td><td>{money(value)}</td></tr>)}</tbody>
    </table>
  )
}

function ChatScreen() {
  const [view, setView] = useState('Table')
  return (
    <div className="aw-body">
      <Sidebar active="Sales Database" />
      <div className="aw-main aw-chat">
        <p className="aw-q">Show daily sales for the first week of October.</p>
        <div className="aw-think">
          <strong><IntegrationIcon name="eye" />Thinking summary</strong>
          <p>I read this as a request for daily sales totals, so I checked the connected Sales database. I found 6 matching days for 1–7 October and used those rows as evidence. No sales were recorded on 2 October.</p>
        </div>
        <p className="aw-a">Sales peaked on <b>6 October at SAR 417,138</b>, and the week totalled <b>SAR 2.15M</b> across 6 trading days <sup>1</sup>.</p>
        <div className="aw-visual">
          <small>Visual answer</small>
          <strong>Sales Database</strong>
          <div className="aw-views" role="group" aria-label="Answer view">
            {['Table', 'Bar'].map(name => (
              <button key={name} className={view === name ? 'on' : ''} aria-pressed={view === name} onClick={() => setView(name)}>{name}</button>
            ))}
            <span>Line</span><span>Pie</span><span>CSV</span>
          </div>
          <SalesView view={view} />
        </div>
        <div className="aw-meta"><span><IntegrationIcon name="document" />Sources <i>1</i></span>Answered in 4s</div>
        <div className="aw-input">Ask anything or browse your knowledge…<i>➤</i></div>
      </div>
    </div>
  )
}

function SourceGrid({ compact }) {
  return (
    <div className={`aw-sources${compact ? ' compact' : ''}`}>
      {sourceTypes.slice(0, compact ? 6 : sourceTypes.length).map(([icon, title, note, short]) => (
        <div key={title}><i><IntegrationIcon name={icon} /></i><strong>{compact ? short ?? title : title}</strong>{!compact && <small>{note}</small>}</div>
      ))}
    </div>
  )
}

function SourcesScreen() {
  return (
    <div className="aw-body">
      <Sidebar active="Product Docs" />
      <div className="aw-main">
        <div className="aw-head">
          <div><h4>Add knowledge source</h4><p>Choose a database or connector. Files are uploaded from the knowledge base panel.</p></div>
        </div>
        <SourceGrid />
        <p className="aw-hint">Select a source type to continue. You can add several sources one after another.</p>
      </div>
    </div>
  )
}

const screens = [
  { key: 'dashboard', label: 'Dashboard', Screen: DashboardScreen },
  { key: 'chat', label: 'Cited answer', Screen: ChatScreen },
  { key: 'sources', label: 'Add a source', Screen: SourcesScreen },
]

// A browser-style window that cycles through the screens until someone picks one.
export function ProductWindow() {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(1)
  const [picked, setPicked] = useState(false)
  const { Screen } = screens[active]

  useEffect(() => {
    if (reduced || picked) return undefined
    const timer = setTimeout(() => setActive(index => (index + 1) % screens.length), 7000)
    return () => clearTimeout(timer)
  }, [active, picked, reduced])

  return (
    <div className="aw-wrap">
      <div className="aw-tabs" role="tablist" aria-label="Product screens">
        {screens.map((screen, index) => (
          <button key={screen.key} role="tab" aria-selected={index === active} className={index === active ? 'on' : ''} onClick={() => { setActive(index); setPicked(true) }}>
            {screen.label}
          </button>
        ))}
      </div>
      <div className="aw-window">
        <div className="aw-bar"><i></i><i></i><i></i><span>app.entaura.ai</span></div>
        <div className="aw-scroll"><Screen key={active} /></div>
      </div>
    </div>
  )
}

// Small screens beside each "How it works" step.
export function StepScreen({ screen }) {
  if (screen === 'connect') {
    return (
      <div className="aw-mini">
        <div className="aw-upload"><IntegrationIcon name="cloud" />Upload files<small>PDF, DOCX, PPTX, XLSX, TXT, images</small></div>
        <SourceGrid compact />
      </div>
    )
  }
  if (screen === 'ask') {
    return (
      <div className="aw-mini aw-mini-ask">
        <div className="aw-input"><span>How many leave days carry over to next year?</span><i>➤</i></div>
        <div className="aw-chips">
          <span>English</span><span>العربية</span><span>हिन्दी</span><span>🎙 Voice</span>
        </div>
        <p>Power users can narrow a question with <code>@source</code>, <code>#tag</code> or <code>/compare</code>.</p>
      </div>
    )
  }
  return (
    <div className="aw-mini aw-mini-answer">
      <div className="aw-think small"><strong><IntegrationIcon name="eye" />Thinking summary</strong><p>Checked HR policies and found the carry-over rule in §3.</p></div>
      <p className="aw-a">Up to <b>10 unused days</b> can be carried into the next year <sup>1</sup>.</p>
      <div className="aw-cite"><IntegrationIcon name="document" /><b>HR_Leave_Policy_v4.pdf</b><small>§3 · page 4</small><i>1</i></div>
    </div>
  )
}
