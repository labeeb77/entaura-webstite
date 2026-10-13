import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import { productPages } from './data/productPages.js'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Solutions from './pages/Solutions.jsx'

function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/ask.html" element={<ProductPage key="ask" page={productPages.ask} />} />
        <Route path="/watch.html" element={<ProductPage key="watch" page={productPages.watch} />} />
        <Route path="/insight.html" element={<ProductPage key="insight" page={productPages.insight} />} />
        <Route path="/solutions.html" element={<Solutions />} />
        <Route path="/contact.html" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
