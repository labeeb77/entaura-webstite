import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Built pages arrive pre-rendered, so attach to that HTML; the dev server
// sends an empty root, so render from scratch there.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
