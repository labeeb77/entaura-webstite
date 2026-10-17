import { Link } from 'react-router-dom'

function ContactStrip({ title, text }) {
  return (
    <section className="contact-strip">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="contact-strip-actions">
          <Link className="button primary" to="/try.html">Try Entaura</Link>
          <Link className="button ghost" to="/contact.html">Contact sales</Link>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip
