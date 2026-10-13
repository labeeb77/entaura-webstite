import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AskMock, InsightMock, WatchMock } from './ProductMocks.jsx'

const productMocks = { ask: AskMock, watch: WatchMock, insight: InsightMock }

function ProductCard({ product, tapToExpand }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const Mock = productMocks[product.key]

  const handleClick = event => {
    if (tapToExpand && !event.target.closest('a,button')) setMobileOpen(open => !open)
  }

  return (
    <article className={`product ${product.key}${mobileOpen ? ' mobile-open' : ''}`} onClick={handleClick}>
      <span className="product-tag">{product.tag}</span>
      <h3>{product.name}<span className={product.dotClass}>.</span></h3>
      <p>{product.text}</p>
      <div className="product-art">
        <div className="mock">
          <div className="dots"><i></i><i></i><i></i></div>
          <Mock />
        </div>
      </div>
      <div className="features">
        {product.features.map(feature => (
          <span key={feature}>{feature}</span>
        ))}
      </div>
      <Link className="product-link" to={product.to}>{`${product.linkLabel} `}<span>→</span></Link>
      <div className="product-hover-panel">
        <strong>{product.detail.title}</strong>
        <p>{product.detail.copy}</p>
        <ul>
          {product.detail.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <Link to={product.to}>{`${product.linkLabel} ↗`}</Link>
      </div>
    </article>
  )
}

export default ProductCard
