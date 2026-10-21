import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'

// A browser-style window that cycles through app screens until someone picks one.
// `screens` is a list of { key, label, Screen }.
function AppWindow({ screens, start = 0 }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(start)
  const [picked, setPicked] = useState(false)
  const { Screen } = screens[active]

  useEffect(() => {
    if (reduced || picked) return undefined
    const timer = setTimeout(() => setActive(index => (index + 1) % screens.length), 7000)
    return () => clearTimeout(timer)
  }, [active, picked, reduced, screens.length])

  return (
    <div className="aw-wrap">
      <div className="aw-tabs" role="tablist" aria-label="Product screens">
        {screens.map((screen, index) => (
          <button key={screen.key} role="tab" aria-selected={index === active} className={index === active ? 'on' : ''} onClick={() => { setActive(index); setPicked(true) }}>
            {screen.label}
          </button>
        ))}
      </div>
      <div className="aw-window">
        <div className="aw-bar"><i></i><i></i><i></i><span>app.entaura.ai</span></div>
        <div className="aw-scroll"><Screen key={active} /></div>
      </div>
    </div>
  )
}

export default AppWindow
