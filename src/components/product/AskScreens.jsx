import IntegrationIcon from '../IntegrationIcons.jsx'
import AppWindow from './AppWindow.jsx'

// HTML recreations of the entaura ask app, filled with sample Nuvora data.

const knowledgeBases = [
  { name: 'HR Policies', path: '/project/hr-policies', files: '14 files' },
  { name: 'Company Procedures', path: '/project/sales-db', files: '18 files' },
  { name: 'Product Docs', path: '/project/product-docs', files: '32 files' },
]

const sourceTypes = [
  ['document', 'Uploaded documents', 'PDF, Word, Excel and images.', 'Files'],
  ['cloud', 'Amazon S3', 'Connect approved files.'],
  ['cloud', 'Azure Blob Storage', 'Connect approved documents.', 'Azure Blob'],
  ['link', 'Gmail', 'Search approved email.'],
  ['document', 'Google Drive', 'Access approved documents.', 'Drive'],
]

function Sidebar({ active }) {
  return (
    <aside className="aw-side">
      <div className="aw-brand"><img src="/assets/entaura-mark-sm.png" alt="" />entaura</div>
      <small>Workspace</small>
      <span className={active === 'dashboard' ? 'on' : ''}><IntegrationIcon name="layers" />Dashboard</span>
      <span><IntegrationIcon name="document" />Knowledge bases</span>
      {knowledgeBases.map(base => (
        <span key={base.name} className={`sub${active === base.name ? ' on' : ''}`}><IntegrationIcon name="database" />{base.name}</span>
      ))}
      <small>Settings</small>
      <span><IntegrationIcon name="people" />Users and roles</span>
      <span><IntegrationIcon name="key" />API keys</span>
      <div className="aw-user"><b>NA</b><div><strong>Nuvora Admin</strong><em>admin@nuvora.example</em></div></div>
    </aside>
  )
}

function DashboardScreen() {
  const stats = [['document', 'Knowledge bases', '3'], ['people', 'Teams', '3'], ['database', 'Sources', '6'], ['document', 'Documents', '64']]
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

function ChatScreen() {
  return (
    <div className="aw-body">
      <Sidebar active="HR Policies" />
      <div className="aw-main aw-chat">
        <p className="aw-q">How many leave days can I carry over?</p>
        <p className="aw-a">You can carry over up to <b>10 unused days</b> into the next year, according to the leave policy <sup>1</sup>.</p>
        <div className="aw-visual">
          <small>Supporting document · illustrative example</small>
          <h4>HR Leave Policy</h4>
          <p>Section 3 · Carry-over</p>
          <blockquote>Employees may carry over a maximum of 10 unused leave days into the following calendar year.</blockquote>
        </div>
        <div className="aw-cite"><IntegrationIcon name="document" /><b>HR_Leave_Policy_v4.pdf</b><small>§3 · page 4</small><i>1</i></div>
        <div className="aw-input">Ask a follow-up about this policy…<i>➤</i></div>
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
          <div><h4>Add knowledge source</h4><p>Connect approved documents or upload files to your knowledge base.</p></div>
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

export function ProductWindow() {
  return <AppWindow screens={screens} start={1} />
}

// Small screens beside each "How it works" step.
export function StepScreen({ screen }) {
  if (screen === 'connect') {
    return (
      <div className="aw-mini">
        <div className="aw-upload"><IntegrationIcon name="cloud" />Upload files<small>PDF, Word, Excel, images</small></div>
        <SourceGrid compact />
      </div>
    )
  }
  if (screen === 'ask') {
    return (
      <div className="aw-mini aw-mini-ask">
        <div className="aw-input"><span>How many leave days carry over to next year?</span><i>➤</i></div>
        <div className="aw-chips">
          <span>Supported languages</span><span>🎙 Voice</span>
        </div>
        <p>Ask follow-up questions to explore the policy in more detail.</p>
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
