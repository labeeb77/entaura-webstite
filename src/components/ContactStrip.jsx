function ContactStrip({ title, text }) {
  return (
    <section className="contact-strip">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <a className="button primary" href="mailto:support@texolworld.com">Contact support@texolworld.com ↗</a>
      </div>
    </section>
  )
}

export default ContactStrip
