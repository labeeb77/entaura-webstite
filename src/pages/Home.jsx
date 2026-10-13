import { useState } from 'react'
import Capabilities from '../components/Capabilities.jsx'
import ContactLayout from '../components/ContactLayout.jsx'
import Hero from '../components/Hero.jsx'
import IntegrationSection from '../components/IntegrationSection.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionHead from '../components/SectionHead.jsx'
import Statement from '../components/Statement.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { products } from '../data/products.js'
import { usePageMeta } from '../hooks/usePageMeta.js'

function Home() {
  usePageMeta(pageMeta.home)
  // Tap-to-expand on product cards is decided once, from the width at load.
  const [tapToExpand] = useState(() => Boolean(window.matchMedia?.('(max-width: 850px)').matches))

  return (
    <main>
      <Hero />
      <section className="section" id="products">
        <div className="container">
          <SectionHead
            eyebrow="The EntAura product family"
            title="Three products."
            gradient="One intelligent layer."
            text="Ask verifies, Insight explains, and Watch safeguards. Each works on the same connected foundation of policies, documents, and transactional data."
          />
          <div className="products">
            {products.map(product => (
              <ProductCard key={product.key} product={product} tapToExpand={tapToExpand} />
            ))}
          </div>
        </div>
      </section>
      <Statement />
      <IntegrationSection />
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="Why teams trust the answers" title="Built to be checked." gradient="Not just believed." />
          <Capabilities />
        </div>
      </section>
      <section className="contact-section container" id="contact">
        <div className="contact-heading">
          <span className="eyebrow">Start a smarter conversation</span>
          <h2>Tell us what your team<br /><span className="gradient-text">needs to know.</span></h2>
          <p>Share your goals, systems, or business challenge. Our team will help you find the right EntAura starting point.</p>
        </div>
        <ContactLayout messageRows={5} />
      </section>
    </main>
  )
}

export default Home
