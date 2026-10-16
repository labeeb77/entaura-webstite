// The product wordmark, e.g. "entaura" + an "ask" pill, from the brand images
// in /assets/products.
function ProductMark({ product, size = 'md', className }) {
  const classes = ['pmark', `pmark-${size}`, className].filter(Boolean).join(' ')
  return <img className={classes} src={encodeURI(`/assets/products/entaura ${product}.png`)} alt={`entaura ${product}`} draggable="false" />
}

export default ProductMark
