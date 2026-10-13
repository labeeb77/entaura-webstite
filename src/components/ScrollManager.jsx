import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

// Reproduces what the browser did when every page was its own document:
// a new page starts at the top (or at its anchor), while an anchor on the
// current page scrolls there using the stylesheet's scroll-behavior.
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const navigationType = useNavigationType()
  const previousPath = useRef(null)

  useEffect(() => {
    const firstLoad = previousPath.current === null
    const samePage = previousPath.current === pathname
    previousPath.current = pathname

    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (firstLoad) {
      if (target) target.scrollIntoView({ behavior: 'instant' })
      return
    }
    if (navigationType === 'POP') return
    if (samePage && target) target.scrollIntoView()
    else if (target) target.scrollIntoView({ behavior: 'instant' })
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [key, pathname, hash, navigationType])

  return null
}

export default ScrollManager
