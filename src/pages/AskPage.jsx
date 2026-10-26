import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ContactStrip from '../components/ContactStrip.jsx'
import PageHero from '../components/PageHero.jsx'
import ProductMark from '../components/ProductMark.jsx'
import { ProductWindow, StepScreen } from '../components/product/AskScreens.jsx'
import { Audience, Capabilities, Integrations, Problems, Screens, Steps, Trust } from '../components/product/ProductSections.jsx'
import { askPage } from '../data/askPage.js'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReveal } from '../hooks/useReveal.js'
import '../product.css'

function AskPage() {
  usePageMeta(pageMeta.ask)
  const main = useRef(null)
  useReveal(main)
  const { hero, audience, problems, steps, capabilities, screens, integrations, trust, cta } = askPage

  return (
    <main className="pp pp-ask" ref={main}>
      <PageHero className="pp-hero" {...hero} badge={<span className="pp-badge"><ProductMark product="ask" size="sm" />{hero.eyebrow}</span>}>
        <div className="pp-hero-actions">
          <Link className="button primary" to="/try.html">Try Entaura <span>↗</span></Link>
          <Link className="button ghost" to="/contact.html">Talk to our team</Link>
        </div>
      </PageHero>
      <Audience {...audience} />
      <Problems {...problems} />
      <Steps {...steps} Screen={StepScreen} />
      <Capabilities {...capabilities} />
      <Screens {...screens}><ProductWindow /></Screens>
      <Integrations {...integrations} />
      <Trust {...trust} />
      <ContactStrip title={cta.title} text={cta.text} secondary="Talk to our team" />
    </main>
  )
}

export default AskPage
