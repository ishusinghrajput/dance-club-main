import FadeIn from '../components/FadeIn'

const FooterSection = () => {
  return (
    <footer
      className="px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40"
      style={{ /*background: '#0C0C0C',*/ borderTop: '1px solid rgba(215, 226, 234, 0.1)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Philosophy Section */}
        <FadeIn delay={0} y={40}>
          <div className="mb-20 sm:mb-28 md:mb-36">
            <h3
              className="font-black uppercase text-[#D7E2EA] mb-6 sm:mb-8 md:mb-10"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              Training Philosophy
            </h3>
            <blockquote
              className="font-light text-[#D7E2EA] mb-6 sm:mb-8 italic"
              style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)' }}
            >
              "We Don't Rush. We Train."
            </blockquote>
            <div className="space-y-4 sm:space-y-6 max-w-3xl">
              <p
                className="font-light text-[#D7E2EA] opacity-80 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
              >
                At MUSIC LABELX, development comes before debut.
              </p>
              <p
                className="font-light text-[#D7E2EA] opacity-80 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
              >
                Our system is designed to help artists improve through structured practice, guidance, evaluation, and real performance preparation.
              </p>
              <p
                className="font-light text-[#D7E2EA] opacity-80 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
              >
                We focus on building strong foundations, professional discipline, and long-term artistic growth.
              </p>
              <p
                className="font-light text-[#D7E2EA] opacity-80 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
              >
                <span className="font-medium">Discipline and Passion</span> is our highest requirement. We believe talent and skills are trainable, if you have the intent.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-b border-[#D7E2EA]/10 my-16 sm:my-20 md:my-28"></div>

        {/* Support & Stipend */}
        <FadeIn delay={0.1} y={40}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 md:gap-20 mb-16 sm:mb-20 md:mb-28">
            {/* Trainee Support */}
            <div>
              <h3
                className="font-black uppercase text-[#D7E2EA] mb-6 sm:mb-8"
                style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
              >
                Trainee Support
              </h3>
              <p
                className="font-light text-[#D7E2EA] opacity-80 leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
              >
                Selected trainees may receive support during training, including accommodation assistance or monthly stipend depending on the development stage and program requirements.
              </p>
            </div>

          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-b border-[#D7E2EA]/10 my-16 sm:my-20 md:my-28"></div>

        {/* Accountability System */}
        <FadeIn delay={0.2} y={40}>
          <div className="mb-16 sm:mb-20 md:mb-28">
            <h3
              className="font-black uppercase text-[#D7E2EA] mb-8 sm:mb-10 md:mb-12"
              style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
            >
              Development System
            </h3>
            <p
              className="font-light text-[#D7E2EA] opacity-80 leading-relaxed mb-8 sm:mb-10"
              style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
            >
              To maintain professional standards, our development system includes:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8">
              {['Attendance Tracking', 'Weekly Evaluations', 'Performance Monitoring', 'Training Documentation', 'Still Training', 'Rap', 'Vocals', 'Dance', 'Media', 'Personlity'].map((item, i) => (
                <FadeIn key={item} delay={0.2 + i * 0.05} y={20}>
                  <div
                    className="rounded-[20px] sm:rounded-[30px] p-4 sm:p-6 border border-[#D7E2EA]/20 hover:border-[#D7E2EA]/40 transition-colors duration-300"
                    style={{ background: 'rgba(215, 226, 234, 0.02)' }}
                  >
                    <p
                      className="font-medium text-[#D7E2EA] text-center leading-tight"
                      style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
                    >
                      {item}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-b border-[#D7E2EA]/10 my-16 sm:my-20 md:my-28"></div>



        {/* Contact */}
        <FadeIn delay={0.4} y={40}>
          <div>
            <h3
              className="font-black uppercase text-[#D7E2EA] mb-8 sm:mb-10 md:mb-12"
              style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
            >
              Get In Touch
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16 mb-12 sm:mb-16 md:mb-20">
              {/* Email */}
              <div>
                <p
                  className="font-medium uppercase text-[#D7E2EA] mb-4 sm:mb-6 tracking-widest text-sm"
                >
                  Email
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <p className="text-xs uppercase text-[#D7E2EA] opacity-60 mb-1">Official</p>
                    <a
                      href="mailto:official.labelx@gmail.com"
                      className="text-[#D7E2EA] hover:text-white transition-colors"
                      style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
                    >
                      official.labelx@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-[#D7E2EA] opacity-60 mb-1">Auditions / Profiles</p>
                    <a
                      href="mailto:auditions.labelx@gmail.com"
                      className="text-[#D7E2EA] hover:text-white transition-colors"
                      style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
                    >
                      auditions.labelx@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-[#D7E2EA] opacity-60 mb-1">Submissions</p>
                    <a
                      href="mailto:submissions.labelx@gmail.com"
                      className="text-[#D7E2EA] hover:text-white transition-colors"
                      style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
                    >
                      submissions.labelx@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div>
                <p
                  className="font-medium uppercase text-[#D7E2EA] mb-4 sm:mb-6 tracking-widest text-sm"
                >
                  Instagram
                </p>
                <a
                  href="https://instagram.com/_labelx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D7E2EA] hover:text-white transition-colors"
                  style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
                >
                  @_labelx
                </a>
              </div>

              {/* Location */}
              <div>
                <p
                  className="font-medium uppercase text-[#D7E2EA] mb-4 sm:mb-6 tracking-widest text-sm"
                >
                  Location
                </p>
                <p
                  className="text-[#D7E2EA] opacity-80"
                  style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}
                >
                  Delhi, India
                  <br />
                  <span className="text-xs opacity-60">(On-Ground Training System)</span>
                </p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Divider */}
        <div className="border-b border-[#D7E2EA]/10 my-16 sm:my-20 md:my-24"></div>

        {/* Copyright */}
        <FadeIn delay={0.5} y={20}>
          <div className="text-center pt-8 sm:pt-10 md:pt-12">
            <p
              className="font-medium uppercase text-[#D7E2EA] tracking-wider"
              style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
            >
              MUSIC LABELX PVT. LTD.
            </p>
            <p
              className="text-[#D7E2EA] opacity-50 mt-3 sm:mt-4"
              style={{ fontSize: 'clamp(0.8rem, 1vw, 0.9rem)' }}
            >
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  )
}

export default FooterSection
