function ContactStrip({ title, text }) {
  return (
    <section className="contact-strip">
      <div className="container">
        <div className="streak strip-card">
          <h2>{title}</h2>
          <p>{text}</p>
          <a className="button primary" href="mailto:support@texolworld.com">Contact support@texolworld.com ↗</a>
        </div>
      </div>
    </section>
  )
}

export default ContactStrip
