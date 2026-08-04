import FadeIn from '../components/FadeIn'

const steps = [
  {
    title: 'Application Submission',
    description: 'Submit your application with your background, skills, and what makes you stand out.',
  },
  {
    title: 'Audition Evaluation',
    description: 'We review your performance and potential to see if you fit our development track.',
  },
  {
    title: 'Offline Audition for Shortlisted Candidates',
    description: 'Shortlisted applicants attend an in-person audition to demonstrate their best work.',
  },
  {
    title: 'Trial Training Phase',
    description: 'Selected candidates undergo a short training period to prove consistency and growth.',
  },
  {
    title: 'Final Selection into Development Program',
    description: 'The best performers are invited to join the development program and start building.',
  },
]

const ServicesSection = () => {
  return (
    <section
      id="auditions"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Selection Process
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <FadeIn key={step.title} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 sm:gap-8 md:gap-12 py-8 sm:py-10 md:py-12"
              style={{ borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }}
            >
              <span
                className="font-black text-[#0C0C0C] flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {`0${i + 1}`}
              </span>
              <div className="flex flex-col justify-center pt-2 sm:pt-4 md:pt-8">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60 mt-2"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={steps.length * 0.1} y={30}>
          <div className="py-8 sm:py-10 md:py-12">
            <p
              className="font-light leading-relaxed max-w-2xl text-[#0C0C0C] opacity-60 mt-2"
              style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
            >
              We have a <span className="font-black">0.11% Acceptance Rate</span>, can you get in?
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export default ServicesSection
