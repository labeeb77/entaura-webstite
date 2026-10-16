import ContactLayout from '../components/ContactLayout.jsx'
import PageHero from '../components/PageHero.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function Contact() {
  usePageMeta(pageMeta.contact)

  return (
    <main>
      <PageHero
        eyebrow="Start a smarter conversation"
        title="Tell us what your team"
        gradientLines={['needs to know.']}
        text="Share your goals, systems, or business challenge. We’ll help you find the right entaura.ai starting point."
      />
      <section className="contact-section container">
        <ContactLayout messageRows={6} />
      </section>
    </main>
  )
}

export default Contact
