import { contactEmail, contactPhone, interestOptions } from '../data/contact.js'
import IntegrationIcon from './IntegrationIcons.jsx'

function submitContact(event) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const subject = encodeURIComponent(`${data.get('interest')} enquiry from ${data.get('name')}`)
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`)
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
}

function ContactLayout({ messageRows }) {
  return (
    <div className="contact-layout">
      <form className="contact-form" onSubmit={submitContact}>
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
        <button className="button primary" type="submit">Send enquiry ↗</button>
      </form>
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
