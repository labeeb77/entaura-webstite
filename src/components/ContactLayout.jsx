import { interestOptions } from '../data/contact.js'

function submitContact(event) {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const subject = encodeURIComponent(`${data.get('interest')} enquiry from ${data.get('name')}`)
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\nInterest: ${data.get('interest')}\n\n${data.get('message')}`)
  window.location.href = `mailto:aslam@texolgulf.com?cc=rj@texolgulf.com&subject=${subject}&body=${body}`
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
      <aside className="contact-office">
        <span className="eyebrow">Find us</span>
        <h3>iCohort Business Ventures Pvt. Ltd</h3>
        <p>Pantheerankavu, Kozhikode,<br />Kerala, India, 673019</p>
        <p><strong>India</strong><br /><a href="tel:+919037972444">+91 903 797 2444</a></p>
        <p><strong>Saudi Arabia</strong><br />Office No. 17, Dammam Business Center<br />Dammam, Saudi Arabia<br /><a href="tel:+966599823554">+966 59 982 3554</a></p>
        <p><strong>Email</strong><br /><a href="mailto:aslam@texolgulf.com">aslam@texolgulf.com</a><br /><a href="mailto:rj@texolgulf.com">rj@texolgulf.com</a></p>
      </aside>
    </div>
  )
}

export default ContactLayout
