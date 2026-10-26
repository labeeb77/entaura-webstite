import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import Contact from './pages/Contact.jsx'
import { legalPages } from './data/legal.js'
import Home from './pages/Home.jsx'
import InsightPage from './pages/InsightPage.jsx'
import Integration from './pages/Integration.jsx'
import Legal from './pages/Legal.jsx'
import AskPage from './pages/AskPage.jsx'
import Solutions from './pages/Solutions.jsx'
import Try from './pages/Try.jsx'
import WatchPage from './pages/WatchPage.jsx'

function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Home />} />
        <Route path="/ask.html" element={<AskPage />} />
        <Route path="/watch.html" element={<WatchPage />} />
        <Route path="/insight.html" element={<InsightPage />} />
        <Route path="/solutions.html" element={<Solutions />} />
        <Route path="/integration.html" element={<Integration />} />
        <Route path="/contact.html" element={<Contact />} />
        <Route path="/try.html" element={<Try />} />
        <Route path="/privacy.html" element={<Legal key="privacy" page={legalPages.privacy} />} />
        <Route path="/terms.html" element={<Legal key="terms" page={legalPages.terms} />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
