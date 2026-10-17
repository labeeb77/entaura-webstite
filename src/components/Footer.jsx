import { Link } from 'react-router-dom'
import { footerLinks } from '../data/nav.js'
import Brand from './Brand.jsx'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Brand />
          <span className="footer-powered">Powered by Texol</span>
        </div>
        <div className="footer-links">
          {footerLinks.map(link => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </div>
        <small className="legal">{`© ${year} entaura.ai`}</small>
      </div>
    </footer>
  )
}

export default Footer
