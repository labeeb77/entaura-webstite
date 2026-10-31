import { Link } from 'react-router-dom'

function ContactStrip({ title, text, secondary = 'Contact sales', secondaryTo = '/contact.html' }) {
  return (
    <section className="contact-strip">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="contact-strip-actions">
          <Link className="button primary" to="/try.html">Try Entaura</Link>
          <Link className="button ghost" to={secondaryTo}>{secondary}</Link>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip
