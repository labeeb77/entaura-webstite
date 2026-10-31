import { useEffect, useState } from 'react'
import { notifyChannels } from '../../data/heroDemos.js'
import ChannelIcon from '../ChannelIcon.jsx'

const typeSpeed = 22

// Watch: set up a watch (what, when, how), then the alert lands on each channel.
const flowDelays = [0, 550, 550, 650, 1500, 750, 900]
const doneStep = flowDelays.length

const icons = {
  what: <svg viewBox="0 0 20 20" width="16" height="16"><ellipse cx="10" cy="5" rx="6" ry="2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M4 5v10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V5M4 10c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>,
  when: <svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M10 6v4l2.5 2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  how: <svg viewBox="0 0 20 20" width="16" height="16"><path d="M3 5h14M6 10h8M8.5 15h3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
}

function SetupRow({ label, value, shown, icon }) {
  return (
    <li className={shown ? 'on' : ''}>
      <span className="hx-wf-icon" aria-hidden="true">{icon}</span>
      <div><small>{label}</small><strong>{shown ? value : '—'}</strong></div>
      <i className="hx-wf-check" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="12" height="12"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </i>
    </li>
  )
}

// One cropped phone on a lock screen; alerts arrive as glass notifications.
function LockScreen({ flow, step }) {
  const { alert } = flow
  const detail = alert.rows.slice(0, 2).map(row => row.value).join(' · ')
  const arrived = notifyChannels.filter((_, index) => step >= 5 + index).reverse()
  const island = step >= 5 ? 'got' : step === 4 ? 'live' : ''

  return (
    <div className="hx-ls" aria-label={`${alert.title}, sent to ${notifyChannels.map(channel => channel.name).join(' and ')}`} role="img">
      <div className="hx-ls-phone">
        <div className="hx-ls-screen">
          <div className="hx-ls-status">
            <span>9:41</span>
            <span className="hx-ls-icons" aria-hidden="true"><i></i><i></i><b></b></span>
          </div>
          <div className={`hx-ls-island ${island}`}>
            <i></i>
            <span>{step >= 5 ? 'Alert sent' : 'Watching…'}</span>
          </div>
          <div className="hx-ls-clock">
            <small>Thursday 16 October</small>
            <strong>9:41</strong>
          </div>
          <div className="hx-ls-stack">
            {arrived.map((channel, position) => (
              <div className="hx-ls-note" key={channel.key} style={{ '--pos': position }}>
                <div className="hx-ls-note-head">
                  <ChannelIcon channel={channel.key} size={18} />
                  <span>{channel.name}</span>
                  <time>now</time>
                </div>
                <strong>entaura.ai</strong>
                <p><b>{alert.title}</b> · {detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function WatchFlow({ flow, live, reduced, onDone, onStep }) {
  const [typed, setTyped] = useState(reduced ? flow.prompt.length : 0)
  const [step, setStep] = useState(reduced ? doneStep : 0)

  useEffect(() => {
    if (!live || step >= doneStep) return undefined
    let timer
    if (step > 0) timer = setTimeout(() => setStep(step + 1), flowDelays[step])
    else if (typed < flow.prompt.length) timer = setTimeout(() => setTyped(typed + 1), typeSpeed)
    else timer = setTimeout(() => setStep(1), 350)
    return () => clearTimeout(timer)
  }, [live, step, typed, flow.prompt.length])

  useEffect(() => {
    onStep?.(step)
    if (step >= doneStep) onDone()
  }, [step, onDone, onStep])

  const status = step < 4 ? 'draft' : step === 4 ? 'watching' : 'met'

  return (
    <div className="hx-wf">
      <div className="hx-wf-setup">
        <div className="hx-wf-top">
          <strong>Notify me</strong>
          <span className={`hx-wf-status ${status}`}>
            <i></i>{status === 'draft' ? 'Draft' : status === 'watching' ? 'Enabled · watching' : 'Condition met'}
          </span>
        </div>
        <p className="hx-wf-prompt">
          {flow.prompt.slice(0, typed)}
          {step === 0 && live && <i className="hx-caret"></i>}
        </p>
        <ul className="hx-wf-rows">
          <SetupRow label="Starts from" value={flow.what} shown={step >= 1} icon={icons.what} />
          <SetupRow label="When to tell me" value={flow.when} shown={step >= 2} icon={icons.when} />
          <SetupRow label="Condition" value={flow.how} shown={step >= 3} icon={icons.how} />
        </ul>
        <div className={`hx-wf-run ${status}`}>
          <span className="hx-wf-scan"><i></i></span>
          <small>
            {status === 'draft' && 'Waiting for setup'}
            {status === 'watching' && 'Re-checking the answer…'}
            {status === 'met' && 'Alert sent · reply STOP to cancel'}
          </small>
        </div>
      </div>
      <LockScreen flow={flow} step={step} />
    </div>
  )
}

export default WatchFlow
