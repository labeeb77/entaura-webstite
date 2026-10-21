import { Link } from 'react-router-dom'
import { contactEmail, contactPhone } from '../data/contact.js'
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
        <div className="footer-contact">
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          <a href={contactPhone.href}>{contactPhone.label}</a>
        </div>
        <small className="legal">{`© ${year} entaura.ai`}</small>
      </div>
    </footer>
  )
}

export default Footer
