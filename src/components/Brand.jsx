import { Link } from 'react-router-dom'

function Brand() {
  return (
    <Link className="brand" to="/index.html">
      <img src="/assets/entaura-mark.png" alt="EntAura" />
      <span>EntAura</span>
    </Link>
  )
}

export default Brand
