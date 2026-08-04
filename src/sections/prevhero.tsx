import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import logo from '../../logo.png'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260517_222138_3e3205be-3364-417b-a64a-bfe087acbec4.mp4'

const ACCENT = '#5E0ED7'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Auditions', href: '#auditions' },
  { label: 'News', href: '#news' },
  { label: 'Contact', to: '/contact' },
]

const HEADING_PRIMARY = ["BUILDING", "INDIA'S NEXT", "POPSTARS"]
const HEADING_SECONDARY = ["GIRL GROUP", "DEBUT 2026"]

/* ─── animation variants ─── */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const fadeDown = {
  initial: { opacity: 0, y: -20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
}

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: '#000',
        minHeight: '100vh',
      }}
    >
      {/* ─── black hero background ─── */}
      <div className="absolute inset-0 z-0" style={{ backgroundColor: '#000' }} />

      {/* ─── background video (left-aligned) ─── */}
      <video
        className="hidden md:block absolute z-[1] top-24 -translate-y-0 left-1/2 -translate-x-1/2 w-11/12 sm:w-10/12 md:top-1/2 md:left-0 md:-translate-x-0 md:-translate-y-1/2 md:w-3/4 lg:w-2/3"
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          backgroundColor: '#000',
          filter: 'invert(1) hue-rotate(180deg) saturate(1.15) contrast(1.2) brightness(0.8)',
          mixBlendMode: 'lighten',
          objectFit: 'cover',
          opacity: 0.9,
          clipPath: 'inset(0 0 6% 0 round 0px)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      />
      {/* subtle dark overlay to increase contrast and hide video edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: 'rgba(0,0,0,0.18)', zIndex: 2 }}
      />

      {/* ─── content layer ─── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ═══════ NAVIGATION ═══════ */}
        <nav className="relative z-20 w-full flex items-center justify-between px-6 sm:px-10 md:px-16 pt-0 md:pt-0 mt-8 md:mt-6 backdrop-blur-md bg-black/20 rounded-none sm:rounded-xl mx-0 sm:mx-4 md:mx-0">
          {/* logo – bigger & shifted right */}
          <motion.div
            variants={fadeDown}
            initial="initial"
            animate="animate"
            custom={0}
            className="absolute left-6 md:relative ml-2 sm:ml-4 md:ml-6 flex-shrink-0"
          >
            <img src={logo} alt="Logo" className="h-12 w-auto sm:h-14 md:h-16" />
          </motion.div>

          {/* center nav links – hidden on mobile */}
          <div className="hidden md:flex items-center justify-end gap-10 flex-1 mr-6 sm:mr-8">
            {NAV_LINKS.map((link, idx) =>
              link.to ? (
                <motion.div
                  key={link.label}
                  variants={fadeDown}
                  initial="initial"
                  animate="animate"
                  custom={idx + 1}
                >
                  <Link
                    to={link.to}
                    className="text-lg font-semibold tracking-widest uppercase text-white hover:opacity-70 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  variants={fadeDown}
                  initial="initial"
                  animate="animate"
                  custom={idx + 1}
                  className="text-lg font-semibold tracking-widest uppercase text-white hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </motion.a>
              )
            )}
          </div>

          {/* hamburger – hidden on desktop */}
          <motion.button
            variants={fadeDown}
            initial="initial"
            animate="animate"
            custom={5}
            onClick={() => setMenuOpen(true)}
            className="absolute right-6 md:relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 backdrop-blur-md transition-colors hover:border-white/60 md:hidden"
            style={{ boxShadow: '0 6px 20px rgba(0,0,0,0.6)' }}
            aria-label="Open menu"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="block h-0.5 w-6 bg-white transition-all duration-200" />
              <span className="block h-0.5 w-6 bg-white transition-all duration-200" />
              <span className="block h-0.5 w-6 bg-white transition-all duration-200" />
            </div>
          </motion.button>
        </nav>

        <div className="flex-1 flex items-center">
          <div className="w-full px-8 sm:px-10 md:px-16 lg:px-20 xl:px-24 py-10 sm:py-14 lg:py-0">
            <div className="mx-auto flex w-full max-w-7xl justify-end">
              <div className="w-full max-w-[820px] ml-auto text-center md:text-right lg:pl-2 xl:pl-10 px-2 sm:px-4 mt-28 md:mt-0">
                {/* Primary heading */}
                <h1 className="mb-3 sm:mb-4 lg:mb-5 w-full">
                  {HEADING_PRIMARY.map((line, i) => (
                    <span key={line} className="block overflow-hidden">
                      <motion.span
                        className="block font-bold uppercase text-white text-center md:text-right mobile-only-glow"
                          style={{
                            fontSize: 'clamp(2.8rem, 8.5vw, 7.2rem)',
                            lineHeight: 0.9,
                            letterSpacing: '-0.035em',
                            width: '100%',
                            maxWidth: '100%',
                            textShadow: '0 10px 30px rgba(0,0,0,0.6)'
                          }}
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.4 + i * 0.14,
                          duration: 0.7,
                          ease,
                        }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Secondary heading */}
                <div className="flex flex-col items-center md:items-end w-full">
                  {HEADING_SECONDARY.map((line, i) => (
                    <span key={line} className="block overflow-hidden">
                      <motion.span
                        className="block font-bold uppercase mobile-only-glow"
                        style={{
                          fontSize: 'clamp(0.95rem, 2.8vw, 2rem)',
                          lineHeight: 1,
                          letterSpacing: '0.05em',
                          color: '#7c3aed',
                          textShadow: '0 6px 18px rgba(0,0,0,0.45)'
                        }}
                        initial={{ y: '110%' }}
                        animate={{ y: 0 }}
                        transition={{
                          delay: 0.8 + i * 0.14,
                          duration: 0.7,
                          ease,
                        }}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════ MOBILE MENU OVERLAY ═══════ */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col"
          style={{ backgroundColor: '#000', fontFamily: "'Inter', sans-serif" }}
        >
          {/* ── subtle gradient accent ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 70% 20%, ${ACCENT}15 0%, transparent 50%)`,
            }}
          />

          {/* ── top row: logo + close ── */}
          <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 pt-5">
            <img src={logo} alt="Logo" className="h-9 w-auto sm:h-10" />
            <button
              onClick={() => setMenuOpen(false)}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-200"
              style={{ backgroundColor: ACCENT }}
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* ── nav links ── */}
          <div className="relative z-10 flex flex-col gap-2 mt-12 px-5 sm:px-8 flex-1">
            {NAV_LINKS.map((link, idx) => {
              const content = (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-center justify-between py-4"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                >
                  <span
                    className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </span>
                  <ArrowUpRight
                    className="w-5 h-5 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                    style={{ color: ACCENT }}
                  />
                </motion.div>
              )

              return link.to ? (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="no-underline"
                >
                  {content}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="no-underline"
                >
                  {content}
                </a>
              )
            })}
          </div>

          {/* ── bottom info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="relative z-10 px-5 sm:px-8 pb-8"
          >
            <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>
              © {new Date().getFullYear()} Label X — All Rights Reserved
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default HeroSection
