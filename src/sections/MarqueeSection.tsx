import { useRef, useState, useEffect } from 'react'

const videoSrc = '/3d%20video.mp4'

const row1Videos = Array(11).fill(videoSrc)
const row2Videos = Array(10).fill(videoSrc)

const MarqueeSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const sectionTop = sectionRef.current.offsetTop
      const rawOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(rawOffset)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const tripled1 = [...row1Videos, ...row1Videos, ...row1Videos]
  const tripled2 = [...row2Videos, ...row2Videos, ...row2Videos]

  return (
    <section
      ref={sectionRef}
      className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
      style={{ background: '#0C0C0C' }}
    >
      <div className="flex flex-col gap-3">
        {/* Row 1 - moves right */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {tripled1.map((src, i) => (
            <video
              key={`r1-${i}`}
              src={src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="rounded-2xl object-cover flex-shrink-0 bg-black"
              style={{ width: '420px', height: '270px' }}
            />
          ))}
        </div>

        {/* Row 2 - moves left */}
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {tripled2.map((src, i) => (
            <video
              key={`r2-${i}`}
              src={src}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              className="rounded-2xl object-cover flex-shrink-0 bg-black"
              style={{ width: '420px', height: '270px' }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MarqueeSection
