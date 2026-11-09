import { useRef } from 'react'
import CtaBand from '../components/home/CtaBand.jsx'
import Partnership from '../components/home/Partnership.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReveal } from '../hooks/useReveal.js'
import '../home.css'

// Partner programme: the home page's partner section as its own page, linked
// from the top menu. Reuses the home styles (scoped to .home).
function Partners() {
  usePageMeta(pageMeta.partners)
  const main = useRef(null)
  useReveal(main)

  return (
    <main className="home partners-page" ref={main}>
      <Partnership page />
      <CtaBand />
    </main>
  )
}

export default Partners
