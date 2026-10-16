// The product wordmark: lowercase "entaura" next to a grainy gradient pill
// holding the product name, e.g. entaura (ask).
function ProductMark({ product, size = 'md', className }) {
  const classes = ['pmark', `pmark-${product}`, `pmark-${size}`, className].filter(Boolean).join(' ')
  return (
    <span className={classes}>
      <span className="pmark-word">entaura</span>
      <span className="pmark-pill">{product}</span>
    </span>
  )
}

export default ProductMark
