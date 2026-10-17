import { useRef } from 'react'
import CtaBand from '../components/home/CtaBand.jsx'
import Hero from '../components/home/Hero.jsx'
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
      <Hero />
      <LogoMarquee />
      <VisionBand />
      <ProductShowcase />
      <PlatformFlow />
      <UseCases />
      <CtaBand />
    </main>
  )
}

export default Home
