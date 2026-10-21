import { useState } from 'react'
import ChannelIcon from '../ChannelIcon.jsx'
import IntegrationIcon from '../IntegrationIcons.jsx'
import AppWindow from './AppWindow.jsx'

// HTML recreations of the Notify me flow, filled with sample data for a
// fictional distributor.

const question = 'Which invoices are overdue today?'

const invoices = [
  ['INV-2041', 'Al Noor Trading', '48,200', '18 days'],
  ['INV-2057', 'Gulf Fresh Markets', '36,900', '11 days'],
  ['INV-2063', 'Riyadh Mini Mart', '29,450', '9 days'],
  ['INV-2070', 'Al Waha Stores', '21,300', '4 days'],
]

const channels = [['whatsapp', 'WhatsApp'], ['telegram', 'Telegram']]

const triggers = [
  { key: 'schedule', title: 'On a schedule', detail: 'Every day at 09:00' },
  { key: 'change', title: 'When the answer changes', detail: 'Only if the overdue list is different' },
  { key: 'limit', title: 'When a limit is crossed', detail: 'Total overdue above SAR 250,000' },
]

const bell = <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 2.5a5 5 0 0 0-5 5v3L3.5 13h13L15 10.5v-3a5 5 0 0 0-5-5zM8 15.5a2 2 0 0 0 4 0" /></svg>

function Sidebar() {
  return (
    <aside className="aw-side">
      <div className="iw-kb"><i><IntegrationIcon name="layers" /></i><div><strong>Finance</strong><em>Live</em></div></div>
      <span className="iw-new">+ New chat</span>
      <small>Today</small>
      <span className="on">Which invoices are overdue…</span>
      <span>Collections this week by branch</span>
      <small>Alerts</small>
      <span><IntegrationIcon name="bell" />Overdue invoices · daily</span>
      <span><IntegrationIcon name="bell" />Stock below minimum</span>
    </aside>
  )
}

function Answer() {
  return (
    <>
      <p className="aw-q">{question}</p>
      <p className="aw-a"><b>7 invoices</b> are past their 30-day term, worth <b>SAR 214,600</b> in total. The largest is <b>INV-2041</b> from Al Noor Trading, 18 days overdue.</p>
      <div className="aw-visual">
        <table className="aw-table">
          <thead><tr><th>invoice</th><th>customer</th><th>amount (SAR)</th><th>overdue by</th></tr></thead>
          <tbody>{invoices.map(row => <tr key={row[0]}>{row.map(cell => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </>
  )
}

function AnswerScreen() {
  return (
    <div className="aw-body">
      <Sidebar />
      <div className="aw-main aw-chat iw-chat">
        <Answer />
        <div className="ww-actions">
          <span><IntegrationIcon name="document" />Copy</span>
          <span>↻ Retry</span>
          <b className="ww-notify">{bell}Notify me</b>
          <em>Answered in 3s</em>
        </div>
        <div className="aw-input">Ask a question…<i>➤</i></div>
      </div>
    </div>
  )
}

function SetupSheet() {
  const [channel, setChannel] = useState('whatsapp')
  const [trigger, setTrigger] = useState('schedule')
  return (
    <div className="ww-sheet" role="group" aria-label="Notify me">
      <header><b>{bell}</b><div><strong>Notify me about this answer</strong><small>“{question}”</small></div></header>
      <small className="ww-label">Send to</small>
      <div className="ww-channels">
        {channels.map(([key, name]) => (
          <button key={key} className={channel === key ? 'on' : ''} aria-pressed={channel === key} onClick={() => setChannel(key)}>
            <ChannelIcon channel={key} size={20} />{name}
          </button>
        ))}
      </div>
      <small className="ww-label">When</small>
      <div className="ww-triggers">
        {triggers.map(item => (
          <button key={item.key} className={trigger === item.key ? 'on' : ''} aria-pressed={trigger === item.key} onClick={() => setTrigger(item.key)}>
            <i></i><span><strong>{item.title}</strong><small>{item.detail}</small></span>
          </button>
        ))}
      </div>
      <span className="aw-btn ww-start">Start watching</span>
      <p className="ww-note">Reply STOP in the chat to cancel any time.</p>
    </div>
  )
}

function SetupScreen() {
  return (
    <div className="aw-body">
      <Sidebar />
      <div className="aw-main aw-chat iw-chat ww-dim">
        <Answer />
      </div>
      <SetupSheet />
    </div>
  )
}

function Chat({ compact }) {
  return (
    <div className={`ww-chat${compact ? ' compact' : ''}`}>
      <div className="ww-chat-head"><ChannelIcon channel="whatsapp" size={compact ? 18 : 26} /><div><strong>entaura watch</strong>{!compact && <small>Business account</small>}</div></div>
      <div className="ww-thread">
        <div className="ww-in">
          <b>{bell} Overdue invoices · daily 09:00</b>
          {compact ? <p><strong>7 invoices</strong> · <strong>SAR 214,600</strong></p> : (
            <>
              <p><strong>7 invoices</strong> are past their term, worth <strong>SAR 214,600</strong> (+2 since yesterday).</p>
              <p>Largest: INV-2041 · Al Noor Trading · SAR 48,200</p>
            </>
          )}
          <small>Reply STOP to cancel · 09:00</small>
        </div>
        <div className="ww-out">STOP<small>09:02 ✓✓</small></div>
        <div className="ww-in ok"><p>{compact ? '✓ Alert cancelled.' : '✓ Alert cancelled. You won’t get “Overdue invoices” updates any more.'}</p><small>09:02</small></div>
      </div>
    </div>
  )
}

function MessageScreen() {
  return (
    <div className="aw-body ww-split">
      <div className="ww-live">
        <span className="ww-pill">{bell}Alert is live</span>
        <h4>Overdue invoices</h4>
        <dl>
          <div><dt>Question</dt><dd>“{question}”</dd></div>
          <div><dt>Send to</dt><dd><ChannelIcon channel="whatsapp" size={16} />WhatsApp</dd></div>
          <div><dt>When</dt><dd>Every day at 09:00</dd></div>
          <div><dt>Answers from</dt><dd>Finance knowledge base</dd></div>
        </dl>
        <p>Each morning Watch re-runs the question and sends the fresh answer. Reply STOP to end it.</p>
      </div>
      <div className="ww-phone"><Chat /></div>
    </div>
  )
}

const screens = [
  { key: 'answer', label: 'Answer', Screen: AnswerScreen },
  { key: 'setup', label: 'Notify me', Screen: SetupScreen },
  { key: 'message', label: 'The alert', Screen: MessageScreen },
]

export function ProductWindow() {
  return <AppWindow screens={screens} />
}

// Small screens beside each "How it works" step.
export function StepScreen({ screen }) {
  if (screen === 'ask') {
    return (
      <div className="aw-mini">
        <p className="aw-q">{question}</p>
        <p className="aw-a"><b>7 invoices</b> are past their term, worth <b>SAR 214,600</b>.</p>
        <div className="ww-actions"><span>Copy</span><span>↻ Retry</span><b className="ww-notify">{bell}Notify me</b></div>
      </div>
    )
  }
  if (screen === 'setup') {
    return (
      <div className="aw-mini ww-mini-setup">
        <div className="ww-channels">
          {channels.map(([key, name], index) => <span key={key} className={index === 0 ? 'on' : ''}><ChannelIcon channel={key} size={18} />{name}</span>)}
        </div>
        <div className="ww-triggers">
          {triggers.map((item, index) => <span key={item.key} className={index === 0 ? 'on' : ''}><i></i><strong>{item.title}</strong></span>)}
        </div>
      </div>
    )
  }
  return <div className="aw-mini"><Chat compact /></div>
}
