import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import { productPages } from './data/productPages.js'
import Contact from './pages/Contact.jsx'
import Home from './pages/Home.jsx'
import Integration from './pages/Integration.jsx'
import AskPage from './pages/AskPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import Solutions from './pages/Solutions.jsx'
import Try from './pages/Try.jsx'

function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/ask.html" element={<AskPage />} />
        <Route path="/watch.html" element={<ProductPage key="watch" page={productPages.watch} />} />
        <Route path="/insight.html" element={<ProductPage key="insight" page={productPages.insight} />} />
        <Route path="/solutions.html" element={<Solutions />} />
        <Route path="/integration.html" element={<Integration />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="/try.html" element={<Try />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
