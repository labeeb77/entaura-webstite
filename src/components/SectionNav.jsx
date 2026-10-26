import { useEffect, useRef, useState } from 'react'

// Sticky chips that jump to each section and mark the one in view.
// `sections` is a list of [element id, label].
function SectionNav({ sections }) {
  const [current, setCurrent] = useState(sections[0][0])
  const row = useRef(null)

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setCurrent(entry.target.id) })
    }, { rootMargin: '-30% 0px -60% 0px' })
    sections.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element) })
    return () => observer.disconnect()
  }, [sections])

  // On narrow screens the row scrolls sideways; keep the current chip in view.
  useEffect(() => {
    const container = row.current
    const chip = container?.querySelector('a.on')
    if (!chip || container.scrollWidth <= container.clientWidth) return
    container.scrollTo({ left: chip.offsetLeft - (container.clientWidth - chip.offsetWidth) / 2, behavior: 'smooth' })
  }, [current])

  return (
    <nav className="int-nav" aria-label="On this page">
      <div className="container" ref={row}>
        {sections.map(([id, label]) => <a key={id} href={`#${id}`} className={current === id ? 'on' : ''}>{label}</a>)}
      </div>
    </nav>
  )
}

export default SectionNav
