import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import NewsSection from './sections/NewsSection'
import FooterSection from './sections/FooterSection'
import ContactPage from './pages/ContactPage'

function Home() {
  return (
    <main
      style={{
        position: 'relative',
        zIndex: 5,
        overflowX: 'clip',
        backgroundColor: '#000',
      }}
    >
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <NewsSection />
      <FooterSection />
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
