import { Link } from 'react-router-dom'
import { footerLinks } from '../data/nav.js'
import Brand from './Brand.jsx'

const year = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Brand />
        <div className="footer-contact">
          <strong>iCohort Business Ventures Pvt. Ltd</strong>
          <span>Pantheerankavu, Kozhikode, Kerala, India, 673019</span>
          <span>Call Us: <a href="tel:+919037972444">+91 903 797 2444</a></span>
          <span>Email: <a href="mailto:aslam@texolgulf.com">aslam@texolgulf.com</a>, <a href="mailto:rj@texolgulf.com">rj@texolgulf.com</a></span>
          <span className="saudi-office">
            <strong>Saudi Arabia</strong>Office No. 17, Dammam Business Center<br />Dammam, Saudi Arabia<br />Call Us: <a href="tel:+966599823554">+966 59 982 3554</a>
          </span>
        </div>
        <div className="footer-links">
          {footerLinks.map(link => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </div>
        <small className="legal">{`© ${year} entaura.ai. Powered by Texol.`}</small>
      </div>
    </footer>
  )
}

export default Footer
