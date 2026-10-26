import { Link } from 'react-router-dom'

function Brand() {
  return (
    <Link className="brand" to="/index.html">
      <img src="/assets/entaura-mark-sm.png" alt="entaura.ai" />
      <span>entaura.ai</span>
    </Link>
  )
}

export default Brand
