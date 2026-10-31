import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import IntegrationIcon from '../components/IntegrationIcons.jsx'
import ProductMark from '../components/ProductMark.jsx'
import { pageMeta } from '../data/pageMeta.js'
import { comparison, plans, pricingFaq, safety } from '../data/pricing.js'
import { usePageMeta } from '../hooks/usePageMeta.js'
import { useReveal } from '../hooks/useReveal.js'
import '../pricing.css'

const billing = [
  { key: 'monthly', label: 'Monthly' },
  { key: 'yearly', label: 'Yearly · save 15%' },
]

// One product shows its full wordmark; a bundle shows just the coloured pills.
function PlanProducts({ products }) {
  if (products.length === 1) return <ProductMark product={products[0]} />
  return (
    <span className="pr-pills">
      {products.map((product, index) => (
        <span key={product}>
          {index > 0 && <i aria-hidden="true">+</i>}
          <b className={`pr-pill ${product}`}>{product}</b>
        </span>
      ))}
    </span>
  )
}

function PlanCard({ plan, period }) {
  return (
    <article className={`pr-card ${plan.key}${plan.badge ? ' featured' : ''}`}>
      {plan.badge && <span className="pr-badge">{plan.badge}</span>}
      <span className="eyebrow">{plan.name}</span>
      <div className="pr-products"><PlanProducts products={plan.products} /></div>
      <p className="pr-text">{plan.text}</p>
      {plan.price ? (
        <div className="pr-price">
          <strong>SAR {plan.price[period].toLocaleString('en-US')}</strong><span>/ month</span>
          <small>{period === 'yearly' ? 'Billed yearly' : 'Billed monthly'}</small>
        </div>
      ) : (
        <div className="pr-price">
          <strong>Custom</strong>
          <small>Priced for your organization</small>
        </div>
      )}
      <Link className={`button ${plan.badge ? 'primary' : 'ghost'} pr-plan-cta`} to={plan.cta.to}>
        {plan.cta.label}{plan.cta.arrow && <span>↗</span>}
      </Link>
      <h3>{plan.lead}</h3>
      <ul>
        {plan.features.map(feature => <li key={feature}><IntegrationIcon name="check" />{feature}</li>)}
      </ul>
    </article>
  )
}

function Pricing() {
  usePageMeta(pageMeta.pricing)
  const main = useRef(null)
  useReveal(main)
  const [period, setPeriod] = useState('yearly')
  const active = billing.findIndex(item => item.key === period)

  return (
    <main className="pr" ref={main}>
      <section className="pr-hero">
        <div className="container">
          <span className="eyebrow">Pricing</span>
          <h1>Start with Ask. <span className="gradient-text">Grow into Insight and Watch.</span></h1>
          <p>Every plan starts with a free pilot on your own data, so you only pay once you have seen it work.</p>
          <div className="int-toggle pr-toggle" role="group" aria-label="Billing period" style={{ '--i': active }}>
            <i aria-hidden="true"></i>
            {billing.map(item => (
              <button key={item.key} aria-pressed={item.key === period} onClick={() => setPeriod(item.key)}>{item.label}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="pr-plans">
        <div className="container">
          <div className="pr-grid">
            {plans.map(plan => <PlanCard key={plan.key} plan={plan} period={period} />)}
          </div>
          <p className="pr-note">
            Prices exclude AI model usage, which your own AI provider bills you for directly. Setup, training and support are included.
            {' '}Not sure which plan pays off? <Link to="/contact.html?interest=pilot">Ask us for a payback estimate on your own data.</Link>
          </p>
        </div>
      </section>

      <section className="section pr-compare" id="compare">
        <div className="container">
          <h2 className="pr-title reveal">Compare plans</h2>
          <div className="pr-table-wrap reveal">
            <table className="pr-table">
              <thead>
                <tr><th scope="col">Feature</th>{plans.map(plan => <th key={plan.key} scope="col">{plan.name}</th>)}</tr>
              </thead>
              <tbody>
                {comparison.map(([feature, ...values]) => (
                  <tr key={feature}>
                    <th scope="row">{feature}</th>
                    {values.map((value, index) => (
                      <td key={plans[index].key} data-plan={plans[index].name}>
                        {value ?? <span className="pr-dash" aria-label="Not included">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pr-safety reveal">
            <strong><IntegrationIcon name="shield" />Safe by default, on every plan</strong>
            <ul>{safety.map(item => <li key={item}><IntegrationIcon name="check" />{item}</li>)}</ul>
          </div>
          <p className="pr-foot">Every plan includes certified answers, tested publishing, role-based access and the full audit log.</p>
        </div>
      </section>

      <section className="section pr-faq-section" id="faq">
        <div className="container pr-faq-wrap">
          <h2 className="pr-title reveal">Pricing questions</h2>
          <div className="int-faq pr-faq">
            {pricingFaq.map(item => (
              <details key={item.q}>
                <summary>{item.q}<i aria-hidden="true"></i></summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container pr-cta reveal">
        <i className="orb" aria-hidden="true"></i>
        <h2>Not sure which plan fits?</h2>
        <p>Tell us your systems and team size. We’ll recommend a plan and show where it pays back in your business.</p>
        <div className="contact-strip-actions">
          <Link className="button primary" to="/contact.html">Talk to our team <span>↗</span></Link>
          <Link className="button ghost" to="/index.html#platform">See the products</Link>
        </div>
      </section>
    </main>
  )
}

export default Pricing
