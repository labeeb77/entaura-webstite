import { useRef } from 'react'
import ContactLayout from '../components/ContactLayout.jsx'
import AnswerAnatomy from '../components/home/AnswerAnatomy.jsx'
import CtaBand from '../components/home/CtaBand.jsx'
import HeroConsole from '../components/home/HeroConsole.jsx'
import LogoMarquee from '../components/home/LogoMarquee.jsx'
import PlatformFlow from '../components/home/PlatformFlow.jsx'
import ProductShowcase from '../components/home/ProductShowcase.jsx'
import UseCases from '../components/home/UseCases.jsx'
import VisionBand from '../components/home/VisionBand.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReveal } from '../hooks/useReveal.js'
import '../home.css'

function Home() {
  usePageMeta(pageMeta.home)
  const main = useRef(null)
  useReveal(main)

  return (
    <main className="home" ref={main}>
      <HeroConsole />
      <LogoMarquee />
      <VisionBand />
      <ProductShowcase />
      <AnswerAnatomy />
      <PlatformFlow />
      <UseCases />
      <CtaBand />
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
