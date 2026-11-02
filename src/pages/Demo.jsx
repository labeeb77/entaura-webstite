import { useState } from 'react'
import { Link } from 'react-router-dom'
import IntegrationIcon from '../components/IntegrationIcons.jsx'
import { calendarEmbedUrl } from '../data/booking.js'
import { contactEmail } from '../data/contact.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../demo.css'

const facts = [
  { icon: 'people', text: '30 minutes with our team' },
  { icon: 'link', text: 'On Google Meet' },
  { icon: 'search', text: 'Built around your questions' },
]

const nextSteps = [
  { icon: 'mail', title: 'Invite in your inbox', text: 'Google Calendar emails you the invite and the Meet link straight away.' },
  { icon: 'document', title: 'We prepare', text: 'We look at what you told us and set the demo up around your questions.' },
  { icon: 'bell', title: 'A reminder', text: 'You get a reminder before the call. Reschedule or cancel from the invite.' },
]

// Request a demo: a short intro, the team's Google Calendar booking page
// (Google shows the times, the booking form and its own confirmation), and
// what happens after booking.
function Demo() {
  usePageMeta(pageMeta.demo)
  const [loaded, setLoaded] = useState(false)

  return (
    <main className="dm">
      <section className="container dm-head">
        <span className="eyebrow">Request a demo</span>
        <h1>See entaura on your own questions.</h1>
        <p>Pick a time below. We’ll show how entaura connects your policies, documents and data.</p>
        <ul className="dm-facts">
          {facts.map(fact => <li key={fact.text}><IntegrationIcon name={fact.icon} />{fact.text}</li>)}
        </ul>
      </section>

      <section className="container dm-stage">
        <div className={`dm-frame${loaded ? ' loaded' : ''}`}>
          {calendarEmbedUrl ? (
            <div className="dm-crop">
              <iframe title="Book a demo with the entaura team" src={calendarEmbedUrl} loading="lazy" onLoad={() => setLoaded(true)}></iframe>
            </div>
          ) : (
            <div className="dm-offline">
              <IntegrationIcon name="mail" />
              <h2>The booking calendar isn’t connected yet.</h2>
              <p>Email <a href={`mailto:${contactEmail}?subject=Demo%20request`}>{contactEmail}</a> or use the <Link to="/contact.html">contact form</Link>, and we’ll find a time with you.</p>
            </div>
          )}
        </div>
      </section>

      <section className="container dm-next">
        <h2>After you book</h2>
        <ol>
          {nextSteps.map((step, index) => (
            <li key={step.title}>
              <span className="dm-next-icon"><IntegrationIcon name={step.icon} /><b>{index + 1}</b></span>
              <strong>{step.title}</strong>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="dm-alt">Prefer email? Write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
      </section>
    </main>
  )
}

export default Demo
