import { useEffect } from 'react'

// Adds `in` to every `.reveal` element inside the container once it scrolls
// into view. Without IntersectionObserver everything is shown at once.
export function useReveal(ref) {
  useEffect(() => {
    const items = ref.current?.querySelectorAll('.reveal') ?? []
    if (!('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('in'))
      return undefined
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Elements already scrolled past (an anchor jump) are shown too.
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return
        entry.target.classList.add('in')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [ref])
}
