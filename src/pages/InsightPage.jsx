import { useRef } from 'react'
import { Link } from 'react-router-dom'
import ContactStrip from '../components/ContactStrip.jsx'
import PageHero from '../components/PageHero.jsx'
import ProductMark from '../components/ProductMark.jsx'
import { ProductWindow, StepScreen } from '../components/product/InsightScreens.jsx'
import { Audience, Capabilities, Integrations, Problems, Screens, Steps, Trust } from '../components/product/ProductSections.jsx'
import SectionNav from '../components/SectionNav.jsx'
import { insightPage } from '../data/insightPage.js'
import { pageMeta } from '../data/pageMeta.js'
import { productSections } from '../data/productSections.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReveal } from '../hooks/useReveal.js'
import '../product.css'

function InsightPage() {
  usePageMeta(pageMeta.insight)
  const main = useRef(null)
  useReveal(main)
  const { hero, audience, problems, steps, capabilities, screens, integrations, trust, cta } = insightPage

  return (
    <main className="pp pp-insight" ref={main}>
      <PageHero className="pp-hero" {...hero} badge={<span className="pp-badge"><ProductMark product="insight" size="sm" />{hero.eyebrow}</span>}>
        <div className="pp-hero-actions">
          <Link className="button primary" to="/try.html">Try Entaura <span>↗</span></Link>
          <Link className="button ghost" to="/demo.html">Request a demo</Link>
        </div>
      </PageHero>
      <SectionNav sections={productSections} />
      <Audience id="for" {...audience} />
      <Problems id="why" {...problems} />
      <Steps id="how" {...steps} Screen={StepScreen} />
      <Capabilities id="features" {...capabilities} />
      <Screens id="see" {...screens}><ProductWindow /></Screens>
      <Integrations id="works-with" {...integrations} />
      <Trust id="security" {...trust} />
      <ContactStrip title={cta.title} text={cta.text} secondary="Request a demo" secondaryTo="/demo.html" />
    </main>
  )
}

export default InsightPage
