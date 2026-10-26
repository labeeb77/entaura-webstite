import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { megaItems } from '../data/nav.js'
import Brand from './Brand.jsx'
import NavDropdown from './NavDropdown.jsx'
import ProductMark from './ProductMark.jsx'

const closedDropdowns = { products: false, solutions: false }

function Header() {
  const { pathname, hash, key } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdowns, setDropdowns] = useState(closedDropdowns)
  const [atTop, setAtTop] = useState(true)
  const previousPath = useRef(pathname)

  const isHome = pathname === '/' || pathname === '/index.html'
  const isContact = pathname === '/contact.html'

  // Every page used to be a fresh document, so menus start closed after a
  // navigation. In-page anchor jumps did not reload and leave them as they are.
  useEffect(() => {
    if (previousPath.current !== pathname || !hash) {
      setMenuOpen(false)
      setDropdowns(closedDropdowns)
    }
    previousPath.current = pathname
  }, [key, pathname, hash])

  useEffect(() => {
    const closeOnOutsideClick = event => {
      if (!event.target.closest('.nav-dropdown')) setDropdowns(closedDropdowns)
    }
    document.addEventListener('click', closeOnOutsideClick)
    return () => document.removeEventListener('click', closeOnOutsideClick)
  }, [])

  useEffect(() => {
    const update = () => setAtTop(window.scrollY < 8)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  const toggleDropdown = name => setDropdowns(current => ({ ...current, [name]: !current[name] }))

  return (
    <header className={`topbar${isHome && atTop && !menuOpen ? ' at-top' : ''}`}>
      <nav className="container nav" aria-label={isHome || isContact ? 'Main navigation' : undefined}>
        <Brand />
        <button
          className="menu-button"
          aria-label="Toggle navigation"
          aria-expanded={String(menuOpen)}
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <div className={menuOpen ? 'navlinks open' : 'navlinks'}>
          <NavDropdown
            open={dropdowns.products}
            trigger={
              <button className="nav-dropdown-trigger" onClick={() => toggleDropdown('products')}>
                Products <span>⌄</span>
              </button>
            }
          >
            <div className="nav-mega">
              {megaItems.map(item => (
                <Link key={item.to} to={item.to}>
                  <span>
                    <strong><ProductMark product={item.key} size="sm" /></strong>
                    <small>{item.text}</small>
                  </span>
                </Link>
              ))}
            </div>
          </NavDropdown>
          <NavDropdown
            className="solutions-dropdown"
            open={dropdowns.solutions}
            trigger={
              <Link className="nav-dropdown-trigger" to="/solutions.html" onClick={() => toggleDropdown('solutions')}>
                Solutions
              </Link>
            }
          />
          <Link to="/integration.html">Integration</Link>
          <Link to="/index.html#platform">Platform</Link>
          <Link to="/contact.html" aria-current={isContact ? 'page' : undefined}>Contact</Link>
          <Link className="button primary nav-try" to="/try.html">Try Entaura <span>↗</span></Link>
        </div>
        <Link className="button primary navcta" to="/contact.html">
          {isHome || isContact ? <>Talk to our team <span>↗</span></> : 'Talk to our team ↗'}
        </Link>
      </nav>
    </header>
  )
}

export default Header
