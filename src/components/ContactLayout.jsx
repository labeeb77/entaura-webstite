import { useState } from 'react'
import { contactEmail, contactPhone, interestOptions } from '../data/contact.js'
import IntegrationIcon from './IntegrationIcons.jsx'

// Enquiries go to reachus@entaura.ai through Web3Forms. Without a key (local
// development), the form falls back to opening the visitor's email app.
const formKey = import.meta.env.VITE_WEB3FORMS_KEY

function mailtoFor(data) {
  const subject = encodeURIComponent(`${data.get('interest')} enquiry from ${data.get('name')}`)
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`)
  return `mailto:${contactEmail}?subject=${subject}&body=${body}`
}

function ContactLayout({ messageRows }) {
  const [status, setStatus] = useState('idle')

  const submit = async event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    if (!formKey) {
      window.location.href = mailtoFor(data)
      return
    }
    data.append('access_key', formKey)
    data.append('subject', `${data.get('interest')} enquiry from ${data.get('name')}`)
    data.append('from_name', 'entaura.ai website')
    setStatus('sending')
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      const result = await response.json()
      setStatus(result.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact-layout">
      {status === 'sent' ? (
        <div className="contact-form contact-sent" role="status">
          <i aria-hidden="true"><IntegrationIcon name="check" /></i>
          <h3>Thanks, your enquiry is in.</h3>
          <p>We’ll get back to you shortly at the email you gave us.</p>
          <button className="button ghost" type="button" onClick={() => setStatus('idle')}>Send another enquiry</button>
        </div>
      ) : (
      <form className="contact-form" onSubmit={submit}>
        <input type="checkbox" name="botcheck" className="contact-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label>Name<input name="name" required placeholder="Your name" /></label>
        <label>Work email<input name="email" type="email" required placeholder="you@company.com" /></label>
        <label>Company<input name="company" placeholder="Company name" /></label>
        <label>
          Interested in
          <select name="interest">
            {interestOptions.map(option => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="full">Message<textarea name="message" rows={messageRows} required placeholder="What would you like to improve?"></textarea></label>
        <button className="button primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry ↗'}</button>
        {status === 'error' && (
          <p className="contact-error full" role="alert">
            Something went wrong sending your enquiry. Please try again, or email us at <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </p>
        )}
      </form>
      )}
      <p className="contact-or">Prefer email or a call?</p>
      <div className="contact-direct">
        <a href={`mailto:${contactEmail}`}>
          <IntegrationIcon name="mail" />
          <span><small>Email us</small><strong>{contactEmail}</strong><em>Write to us any time</em></span>
        </a>
        <a href={contactPhone.href}>
          <IntegrationIcon name="phone" />
          <span><small>Call us</small><strong>{contactPhone.label}</strong><em>Speak to our team</em></span>
        </a>
      </div>
    </div>
  )
}

export default ContactLayout
