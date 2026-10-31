import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import SlotPicker from '../components/demo/SlotPicker.jsx'
import ProductMark from '../components/ProductMark.jsx'
import { bookingEnabled, bookSlot, emailLead, saveAnswers, saveLead } from '../data/booking.js'
import { countries, flagOf, guessCountry } from '../data/countries.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../demo.css'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const freeMail = /@(gmail|googlemail|yahoo|hotmail|outlook|live|icloud|aol|proton|protonmail|mail|yandex|zoho)\./i
const sources = ['Search engine', 'LinkedIn', 'A colleague or friend', 'An event', 'Texol', 'Other']

const emptyLead = { email: '', firstName: '', lastName: '', company: '', country: 'IN', dialCode: '+91', phone: '', consent: false }

function Field({ label, error, children, wide }) {
  return (
    <label className={`dm-field${wide ? ' wide' : ''}${error ? ' bad' : ''}`}>
      <span>{label}</span>
      {children}
      {error && <em>{error}</em>}
    </label>
  )
}

function EmailStep({ lead, onNext }) {
  const [email, setEmail] = useState(lead.email)
  const [error, setError] = useState('')

  const submit = event => {
    event.preventDefault()
    const value = email.trim()
    if (!emailPattern.test(value)) return setError('Enter a valid email address.')
    onNext(value)
  }

  return (
    <form className="dm-form" onSubmit={submit} noValidate>
      <h1>What’s your work email?</h1>
      <Field label="Work email" error={error} wide>
        <input type="email" name="email" autoComplete="email" autoFocus value={email} onChange={event => { setEmail(event.target.value); setError('') }} placeholder="you@company.com" />
      </Field>
      {!error && freeMail.test(email) && <p className="dm-hint">A work email helps us prepare a demo for your company.</p>}
      <button className="dm-submit" type="submit">Next</button>
    </form>
  )
}

function DetailsStep({ lead, onBack, onNext }) {
  const [form, setForm] = useState(lead)
  const [errors, setErrors] = useState({})
  const set = (key, value) => {
    setForm(current => ({ ...current, [key]: value }))
    setErrors(current => ({ ...current, [key]: '' }))
  }

  const pickCountry = code => {
    const country = countries.find(([iso]) => iso === code)
    setForm(current => ({ ...current, country: code, dialCode: country[2] }))
  }

  const submit = event => {
    event.preventDefault()
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Enter your first name.'
    if (!form.lastName.trim()) next.lastName = 'Enter your last name.'
    if (!form.company.trim()) next.company = 'Enter your company name.'
    const digits = form.phone.replace(/[\s()-]/g, '')
    if (!/^\d{6,14}$/.test(digits)) next.phone = 'Enter a valid phone number.'
    setErrors(next)
    if (Object.keys(next).length) return
    onNext({ ...form, firstName: form.firstName.trim(), lastName: form.lastName.trim(), company: form.company.trim(), phone: digits })
  }

  return (
    <form className="dm-form" onSubmit={submit} noValidate>
      <h1>We need a few more details to continue.</h1>
      <div className="dm-grid">
        <Field label="Work email" wide>
          <input value={form.email} readOnly className="locked" />
          <button type="button" className="dm-change" onClick={onBack}>Change</button>
        </Field>
        <Field label="First name" error={errors.firstName}>
          <input name="firstName" autoComplete="given-name" autoFocus value={form.firstName} onChange={event => set('firstName', event.target.value)} />
        </Field>
        <Field label="Last name" error={errors.lastName}>
          <input name="lastName" autoComplete="family-name" value={form.lastName} onChange={event => set('lastName', event.target.value)} />
        </Field>
        <Field label="Company name" error={errors.company} wide>
          <input name="company" autoComplete="organization" value={form.company} onChange={event => set('company', event.target.value)} />
        </Field>
        <Field label="Country code">
          <select value={form.country} onChange={event => pickCountry(event.target.value)} aria-label="Country code">
            {countries.map(([code, name, dial]) => <option key={code} value={code}>{`${flagOf(code)} ${name} (${dial})`}</option>)}
          </select>
        </Field>
        <Field label="Phone number" error={errors.phone}>
          <div className="dm-phone">
            <b>{form.dialCode}</b>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={form.phone} onChange={event => set('phone', event.target.value)} placeholder="50 123 4567" />
          </div>
        </Field>
      </div>
      <label className="dm-check">
        <input type="checkbox" checked={form.consent} onChange={event => set('consent', event.target.checked)} />
        <span>I agree to receive product updates from entaura (optional)</span>
      </label>
      <button className="dm-submit" type="submit">Next</button>
    </form>
  )
}

const longDate = iso => new Date(iso).toLocaleString([], { weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' })

function SlotStep({ lead }) {
  const navigate = useNavigate()
  const [slot, setSlot] = useState(null)
  const [state, setState] = useState(bookingEnabled ? 'pick' : 'sending')
  const [notice, setNotice] = useState('')

  // If the booking service can't be reached, the team arranges a time by email.
  const fallBack = useCallback(async () => {
    setState('sending')
    const sent = await emailLead(lead)
    setState(sent ? 'manual' : 'failed')
  }, [lead])

  useEffect(() => {
    if (!bookingEnabled) fallBack()
  }, [fallBack])

  const confirm = async () => {
    setState('booking')
    setNotice('')
    try {
      const result = await bookSlot(lead, slot)
      if (result.ok) return navigate(`/demo.html?step=4&at=${encodeURIComponent(slot)}`, { replace: true })
      if (result.error === 'taken') {
        setSlot(null)
        setNotice('That time was just booked. Please pick another.')
        return setState('pick')
      }
      throw new Error(result.error)
    } catch {
      setState('sending')
      const sent = await emailLead(lead, `Tried to book ${longDate(slot)} (${slot}), but confirmation could not be received. Check the calendar before arranging another meeting.`)
      setState(sent ? 'uncertain' : 'uncertain-failed')
    }
  }

  if (state === 'sending') return <div className="dm-form" role="status">Sending your request…</div>

  if (state === 'failed' || state === 'uncertain-failed') return (
    <div className="dm-form" role="alert">
      <h1>We couldn’t confirm your request.</h1>
      <p>{state === 'uncertain-failed' ? 'Your booking may have been created. Check your email for a calendar invite before trying again.' : 'Your request has not been sent. Please try again.'}</p>
      <button type="button" className="dm-submit" onClick={fallBack}>Send a follow-up request</button>
      <Link className="dm-back" to="/">Return to entaura.ai →</Link>
    </div>
  )

  if (state === 'manual' || state === 'uncertain') {
    return (
      <div className="dm-form dm-done">
        <h1>Thanks, {lead.firstName}.</h1>
        {state === 'uncertain' && <p>We couldn’t confirm the booking response. Check your inbox for an invite; the team has received a request to verify your booking.</p>}
        <p>We’ll email <strong>{lead.email}</strong> within one working day to find a time for your demo.</p>
        <Link className="dm-back" to="/">Return to entaura.ai →</Link>
      </div>
    )
  }

  return (
    <div className="dm-card">
      <div className="dm-card-head">
        <span className="dm-avatar" aria-hidden="true"><img src="/assets/entaura-mark-sm.png" alt="" /></span>
        <div><small>Pick a time with</small><strong>the entaura team</strong></div>
      </div>
      <SlotPicker selected={slot} onPick={setSlot} notice={notice} onError={fallBack} />
      <div className={`dm-confirm${slot ? ' on' : ''}`}>
        <span>{slot ? longDate(slot) : 'Choose a time above'}</span>
        <button type="button" className="dm-submit" disabled={!slot || state === 'booking'} onClick={confirm}>
          {state === 'booking' ? 'Booking…' : 'Confirm booking'}
        </button>
      </div>
    </div>
  )
}

function DoneStep({ lead, at }) {
  const [answers, setAnswers] = useState({ goals: '', source: '' })
  const [sent, setSent] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const submit = async event => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      await saveAnswers(lead.email, answers)
      setSent(true)
    } catch {
      setError('Your answers could not be saved. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="dm-form dm-done" onSubmit={submit}>
      <h1>Talk to you soon.</h1>
      <p>
        Your demo is booked{at && <> for <strong>{longDate(at)}</strong></>}. We’ve sent a calendar invite with a Google Meet link to <strong>{lead.email}</strong>.
      </p>
      {sent ? (
        <p className="dm-thanks">Thanks, that helps us prepare.</p>
      ) : (
        <>
          <p>While you wait, tell us a little more so we can make the most of the session.</p>
          <Field label="What would you like to see in the demo?" wide>
            <textarea rows={5} value={answers.goals} onChange={event => setAnswers({ ...answers, goals: event.target.value })} />
          </Field>
          <Field label="How did you hear about entaura?" wide>
            <select value={answers.source} onChange={event => setAnswers({ ...answers, source: event.target.value })}>
              <option value="">Select…</option>
              {sources.map(source => <option key={source}>{source}</option>)}
            </select>
          </Field>
          <button className="dm-submit" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Submit'}</button>
          {error && <p role="alert">{error}</p>}
        </>
      )}
      <Link className="dm-back" to="/">Return to entaura.ai →</Link>
    </form>
  )
}

function Art() {
  return (
    <div className="dm-art" aria-hidden="true">
      <i className="orb"></i>
      <div className="dm-art-card one"><ProductMark product="ask" /><span>Verified answers</span></div>
      <div className="dm-art-card two"><ProductMark product="insight" /><span>Numbers you can trust</span></div>
      <div className="dm-art-card three"><ProductMark product="watch" /><span>Alerts that matter</span></div>
    </div>
  )
}

// Request a demo: email, then details, then a time from the team's Google
// Calendar. Each step is its own URL (?step=) so the back button works.
function Demo() {
  usePageMeta(pageMeta.demo)
  const navigate = useNavigate()
  const [params] = useSearchParams()
  // The dial code defaults to the visitor's country; it's first shown on step
  // 2, after the page is running, so the pre-rendered page isn't affected.
  const [lead, setLead] = useState(() => {
    const match = countries.find(([code]) => code === guessCountry())
    return match ? { ...emptyLead, country: match[0], dialCode: match[2] } : emptyLead
  })
  const requestedStep = Number(params.get('step'))
  const step = [1, 2, 3, 4].includes(requestedStep) ? requestedStep : 1
  const at = params.get('at')

  // Later steps need the earlier answers; after a refresh, start again.
  useEffect(() => {
    if (step > 1 && !lead.email) navigate('/demo.html', { replace: true })
  }, [step, lead.email, navigate])

  const go = next => navigate(`/demo.html?step=${next}`)

  const toDetails = email => {
    setLead(current => ({ ...current, email }))
    go(2)
  }

  // The lead is saved as soon as the details are in, booked or not. Without
  // the booking service it's emailed to the team instead.
  const toSlots = details => {
    setLead(details)
    if (bookingEnabled) saveLead(details).catch(() => {})
    go(3)
  }

  const wide = step === 3

  return (
    <main className={`dm${wide ? ' wide' : ''}`}>
      <div className="container dm-wrap">
        <div className="dm-main">
          <ol className="dm-steps" aria-label="Progress">
            {['Email', 'Details', 'Time'].map((label, index) => (
              <li key={label} className={index + 1 < step ? 'done' : index + 1 === step ? 'on' : ''}>{label}</li>
            ))}
          </ol>
          {step === 1 && <EmailStep lead={lead} onNext={toDetails} />}
          {step === 2 && lead.email && <DetailsStep lead={lead} onBack={() => go(1)} onNext={toSlots} />}
          {step === 3 && lead.email && <SlotStep lead={lead} />}
          {step === 4 && lead.email && <DoneStep lead={lead} at={at} />}
        </div>
        {!wide && <Art />}
      </div>
    </main>
  )
}

export default Demo
