import { useState } from 'react'
import { Link } from 'react-router-dom'
import IntegrationIcon from '../components/IntegrationIcons.jsx'
import { calendarEmbedUrl } from '../data/booking.js'
import { contactEmail } from '../data/contact.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../demo.css'

const points = [
  { icon: 'people', title: '30 minutes on Google Meet', text: 'With someone from the entaura team.' },
  { icon: 'search', title: 'Your own questions', text: 'See Ask, Insight and Watch answer the questions your team asks every day.' },
  { icon: 'check', title: 'Invite straight away', text: 'Google Calendar emails you the invite and the Meet link as soon as you book.' },
]

// Request a demo: a short intro, and the team's Google Calendar booking page,
// where visitors pick a time and fill in Google's booking form.
function Demo() {
  usePageMeta(pageMeta.demo)
  const [loaded, setLoaded] = useState(false)

  return (
    <main className="dm">
      <div className="container dm-wrap">
        <div className="dm-intro">
          <span className="eyebrow">Request a demo</span>
          <h1>See entaura on your own questions.</h1>
          <p>Pick a time that suits you. We’ll show how entaura connects your policies, documents and data, and answer your questions.</p>
          <ul>
            {points.map(point => (
              <li key={point.title}>
                <IntegrationIcon name={point.icon} />
                <div><strong>{point.title}</strong><span>{point.text}</span></div>
              </li>
            ))}
          </ul>
          <p className="dm-alt">Prefer email? Write to <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.</p>
        </div>

        <div className={`dm-booking${loaded ? ' loaded' : ''}`}>
          {calendarEmbedUrl ? (
            <iframe title="Book a demo with the entaura team" src={calendarEmbedUrl} loading="lazy" onLoad={() => setLoaded(true)}></iframe>
          ) : (
            <div className="dm-offline">
              <IntegrationIcon name="mail" />
              <h2>The booking calendar isn’t connected yet.</h2>
              <p>Email <a href={`mailto:${contactEmail}?subject=Demo%20request`}>{contactEmail}</a> or use the <Link to="/contact.html">contact form</Link>, and we’ll find a time with you.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Demo
