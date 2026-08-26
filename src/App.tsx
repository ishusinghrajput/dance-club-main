import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ParticlesCanvas from './components/ParticlesCanvas'
import HeroSection from './sections/HeroSection'
import AboutSection from './sections/AboutSection'
import ServicesSection from './sections/ServicesSection'
import ProjectsSection from './sections/ProjectsSection'
import NewsSection from './sections/NewsSection'
import FooterSection from './sections/FooterSection'
import ContactPage from './pages/ContactPage'

function Home() {
  return (
    <div style={{ position: 'relative', backgroundColor: '#000', overflow: 'hidden' }}>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <ParticlesCanvas />
      </div>

      <main
        style={{
          position: 'relative',
          zIndex: 1,
          overflowX: 'clip',
          backgroundColor: 'transparent',
        }}
      >
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <NewsSection />
        <FooterSection />
      </main>
    </div>
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
