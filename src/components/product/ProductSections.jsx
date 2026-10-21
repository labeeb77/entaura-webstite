import { Link } from 'react-router-dom'
import IntegrationIcon from '../IntegrationIcons.jsx'
import SectionHead from '../SectionHead.jsx'

// Sections shared by the product pages. Each one answers a visitor question.

export function Audience({ eyebrow, title, gradient, text, items }) {
  return (
    <section className="section pp-section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} text={text} />
        <div className="pp-audience">
          {items.map((item, index) => (
            <div key={item.team} className="reveal" style={{ '--delay': `${index * 60}ms` }}>
              <span><IntegrationIcon name={item.icon} />{item.team}</span>
              <p>{item.example}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Problems({ eyebrow, title, gradient, items }) {
  return (
    <section className="section pp-section pp-soft">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} />
        <div className="pp-problems">
          {items.map((item, index) => (
            <article key={item.problem} className="reveal" style={{ '--delay': `${index * 90}ms` }}>
              <small>Problem</small>
              <p>{item.problem}</p>
              <small className="ok">With Ask</small>
              <h3>{item.outcome}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Steps({ eyebrow, title, gradient, items, Screen }) {
  return (
    <section className="section pp-section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} />
        <ol className="pp-steps">
          {items.map((item, index) => (
            <li key={item.title} className="reveal" style={{ '--delay': `${index * 110}ms` }}>
              <div className="pp-step-screen"><Screen screen={item.screen} /></div>
              <small>{String(index + 1).padStart(2, '0')}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Capabilities({ eyebrow, title, gradient, items }) {
  return (
    <section className="section pp-section pp-soft">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} />
        <div className="pp-caps">
          {items.map((item, index) => (
            <div key={item.title} className="reveal" style={{ '--delay': `${(index % 3) * 70}ms` }}>
              <i><IntegrationIcon name={item.icon} /></i>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function Screens({ eyebrow, title, gradient, text, children }) {
  return (
    <section className="section pp-section pp-screens">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} text={text} />
        <div className="reveal">{children}</div>
        <p className="pp-demo-link">Prefer to click around yourself? <Link to="/try.html">Try the live demo →</Link></p>
      </div>
    </section>
  )
}

// A logo when there is one in /assets/integrations, a file badge otherwise.
function Logo({ mark, name }) {
  if (mark.includes('.')) return <img src={`/assets/integrations/${mark}`} alt="" loading="lazy" />
  return <b className="pp-glyph" aria-hidden="true">{name.slice(0, 2)}</b>
}

export function Integrations({ eyebrow, title, gradient, groups, models, setup }) {
  return (
    <section className="section pp-section pp-soft">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} />
        <div className="pp-int">
          {groups.map((group, index) => (
            <article key={group.title} className="reveal" style={{ '--delay': `${index * 90}ms` }}>
              <h3>{group.title}</h3>
              <p>{group.note}</p>
              <ul>
                {group.items.map(([mark, name]) => <li key={name}><Logo mark={mark} name={name} />{name}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="pp-int-foot reveal">
          <div>
            <small>Works with your AI provider</small>
            <ul>{models.map(([mark, name]) => <li key={name}><Logo mark={mark} name={name} />{name}</li>)}</ul>
          </div>
          <p>{setup} <Link to="/integration.html">How integration works →</Link></p>
        </div>
      </div>
    </section>
  )
}

export function Trust({ eyebrow, title, gradient, items }) {
  return (
    <section className="section pp-section">
      <div className="container">
        <SectionHead eyebrow={eyebrow} title={title} gradient={gradient} />
        <div className="pp-trust">
          {items.map(item => (
            <div key={item.title} className="reveal">
              <IntegrationIcon name={item.icon} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
