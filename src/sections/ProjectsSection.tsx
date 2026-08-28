import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import FadeIn from '../components/FadeIn'
import LiveProjectButton from '../components/LiveProjectButton'
import modelImage from '../../model.png'
import project1 from '../../project1.jpg'

const projects = [
  {
    number: '01',
    category: 'Talent Search',
    name: 'North East India Talent Search',
    description: 'A focused search to find talents in the North East Region of our Country.',
    image: project1,
  },
  {
    number: '02',
    category: 'Open Auditions',
    name: 'Nationwide Auditions',
    description: 'Open to Indians living anywhere. Applicants from Nepal are also welcome.',
    image: modelImage,
  },
]

interface ProjectCardProps {
  project: (typeof projects)[0]
  index: number
  totalCards: number
  range: [number, number]
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}

const ProjectCard = ({ project, index, totalCards, range, progress }: ProjectCardProps) => {
  const animatedProgress = useTransform(progress, range, [0, 1])
  const smoothProgress = useSpring(animatedProgress, { stiffness: 90, damping: 24 })
  const scale = useTransform(smoothProgress, [0, 1], [0.96, 1])
  const y = useTransform(smoothProgress, [0, 1], [76, -16])
  const opacity = useTransform(smoothProgress, [0, 1], [0.82, 1])

  return (
    <div
      className="h-[85vh] sticky"
      style={{ top: `calc(6rem + ${index * 28}px)`, zIndex: totalCards - index }}
    >
      <motion.div
        className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-4 sm:p-6 md:p-8 h-full flex flex-col"
        style={{
          background: '#0C0C0C',
          scale,
          y,
          opacity,
          transformOrigin: 'top center',
          boxShadow: '0 18px 50px rgba(0,0,0,0.35)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8 flex-wrap">
            <span
              className="hero-heading font-black"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <span
              className="text-[#D7E2EA] font-light uppercase tracking-widest text-sm sm:text-base"
            >
              {project.category}
            </span>
            <span
              className="text-[#D7E2EA] font-medium uppercase tracking-wide"
              style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
            >
              {project.name}
            </span>
          </div>
          <div className="flex-shrink-0 hidden sm:block">
            <LiveProjectButton label="Audition Closed" href="#audition-form" />
          </div>
        </div>

        <div className="mb-6">
          <p
            className="text-[#D7E2EA] font-light leading-relaxed opacity-70 max-w-3xl"
            style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)' }}
          >
            {project.description}
          </p>
        </div>

        {/* Single image */}
        <div className="flex-1 min-h-0 overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border border-white/10 bg-[#111]">
          <img
            src={project.image}
            alt={`${project.name} main`}
            className="h-full w-full object-cover object-center"
            loading="lazy"
          />
        </div>
      </motion.div>
    </div>
  )
}

const ProjectsSection = () => {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  return (
    <section
      ref={containerRef}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10 -mt-10 sm:-mt-12 md:-mt-14"
      //style={{ background: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Current Auditions
        </h2>
      </FadeIn>

      {projects.map((project, i) => {
        const start = i / projects.length
        const end = (i + 1) / projects.length
        return (
          <ProjectCard
            key={project.number}
            project={project}
            index={i}
            totalCards={projects.length}
            range={[start, end]}
            progress={scrollYProgress}
          />
        )
      })}
    </section>
  )
}

export default ProjectsSection
