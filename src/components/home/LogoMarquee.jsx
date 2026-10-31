import { logos } from '../../data/home.js'

function LogoRow({ hidden }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {logos.map(logo => (
        <li key={logo.name}>
          <img src={`/assets/integrations/${logo.file}`} alt="" loading="lazy" />
          <span>{logo.name}</span>
        </li>
      ))}
    </ul>
  )
}

function LogoMarquee() {
  return (
    <section className="h-logos" aria-label="Integrations">
      <p className="container">Works with the systems you already run · <strong>600+ connectors</strong></p>
      <div className="h-marquee">
        <div className="h-marquee-track">
          <LogoRow />
          <LogoRow hidden />
        </div>
      </div>
    </section>
  )
}

export default LogoMarquee
