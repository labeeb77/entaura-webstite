import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import '../product.css'

const destinations = [
  { to: '/ask.html', label: 'entaura ask', text: 'Answers from your policies and records' },
  { to: '/insight.html', label: 'entaura insight', text: 'Numbers you can trust, with the query' },
  { to: '/watch.html', label: 'entaura watch', text: 'Alerts from your answers' },
  { to: '/integration.html', label: 'Integration', text: 'How entaura connects to your systems' },
]

function NotFound() {
  usePageMeta(pageMeta.notFound)

  return (
    <main>
      <PageHero eyebrow="Page not found" title="This page doesn’t exist." gradientLines={['Let’s get you back on track.']} text="The link may be old or mistyped. Here are the places most people are looking for.">
        <div className="pp-hero-actions">
          <Link className="button primary" to="/index.html">Go to the home page</Link>
          <Link className="button ghost" to="/try.html">Try Entaura</Link>
        </div>
      </PageHero>
      <section className="section nf-links">
        <div className="container">
          {destinations.map(item => (
            <Link key={item.to} to={item.to}>
              <strong>{item.label}</strong>
              <span>{item.text}</span>
              <i aria-hidden="true">→</i>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default NotFound
