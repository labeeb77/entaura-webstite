import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { rememberLead, sendLead } from '../data/leads.js'
import IntegrationIcon from './IntegrationIcons.jsx'

const digits = value => value.replace(/\D/g, '').length

// Shown over the live demo until the visitor says who they are. The demo keeps
// loading underneath, so it is ready the moment the form is sent; saving the
// lead happens in the background and never holds the demo back.
function TryGate({ question, onStart }) {
  const [errors, setErrors] = useState({})
  const [leaving, setLeaving] = useState(false)
  const form = useRef(null)

  const submit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lead = {
      name: String(data.get('name') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      business: String(data.get('business') || '').trim(),
      website: String(data.get('website') || '').trim(),
      question,
      botcheck: data.get('botcheck') ? 'yes' : '',
    }
    const found = {}
    if (lead.name.length < 2) found.name = 'Please enter your name.'
    if (digits(lead.phone) < 7 || digits(lead.phone) > 15) found.phone = 'Please enter a valid phone number.'
    setErrors(found)
    if (Object.keys(found).length) {
      form.current?.querySelector(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    sendLead(lead)
    rememberLead(lead)
    setLeaving(true)
    setTimeout(onStart, 320)
  }

  const clearError = name => {
    if (errors[name]) setErrors(current => ({ ...current, [name]: undefined }))
  }

  return (
    <div className={`tg${leaving ? ' leaving' : ''}`}>
      <form className="tg-card" ref={form} onSubmit={submit} noValidate aria-labelledby="tg-title">
        <div className="tg-head">
          <span className="tg-badge"><i aria-hidden="true"></i>Live demo · ready in seconds</span>
          <h2 id="tg-title">Before you start, tell us who you are.</h2>
          <p>So we can tailor follow-ups to your business. It takes ten seconds.</p>
        </div>

        <input type="checkbox" name="botcheck" className="contact-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="tg-fields">
          <label className={errors.name ? 'bad' : undefined}>
            <span>Name</span>
            <input name="name" autoComplete="name" placeholder="Your full name" maxLength={120} required
              aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'tg-name-err' : undefined}
              onInput={() => clearError('name')} />
            {errors.name && <small id="tg-name-err" role="alert">{errors.name}</small>}
          </label>
          <label className={errors.phone ? 'bad' : undefined}>
            <span>Phone</span>
            <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" maxLength={40} required
              aria-invalid={errors.phone ? true : undefined} aria-describedby={errors.phone ? 'tg-phone-err' : undefined}
              onInput={() => clearError('phone')} />
            {errors.phone && <small id="tg-phone-err" role="alert">{errors.phone}</small>}
          </label>
          <label>
            <span>Business <em>Optional</em></span>
            <input name="business" autoComplete="organization" placeholder="Company name" maxLength={160} />
          </label>
          <label>
            <span>Website <em>Optional</em></span>
            <input name="website" inputMode="url" autoComplete="url" placeholder="company.com" maxLength={200} />
          </label>
        </div>

        <button className="button primary tg-go" type="submit">Start the live demo <span aria-hidden="true">→</span></button>

        <ul className="tg-trust">
          <li><IntegrationIcon name="lock" />Sample data only, nothing to connect</li>
          <li><IntegrationIcon name="check" />No spam. <Link to="/privacy.html">Privacy</Link></li>
        </ul>
      </form>
    </div>
  )
}

export default TryGate
