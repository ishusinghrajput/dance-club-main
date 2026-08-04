import { useNavigate } from 'react-router-dom'

const ContactPage = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 2) navigate(-1)
    else navigate('/')
  }

  const contactDetails = [
    {
      label: 'Official',
      email: 'official.labelx@gmail.com',
    },
    {
      label: 'Auditions / Profiles',
      email: 'auditions.labelx@gmail.com',
    },
    {
      label: 'Songwriters / Submissions',
      email: 'submissions.labelx@gmail.com',
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#060606] px-6 py-16 text-[#F4F2EF] sm:px-8 md:px-10 lg:px-14">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-8%] h-56 w-56 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-8%] h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="text-sm font-semibold uppercase tracking-[0.3em] text-[#D7E2EA] transition hover:text-white"
          >
            ← Back
          </button>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[0.7rem] uppercase tracking-[0.35em] text-[#D7E2EA]/70">
            Studio Contact
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-10">
            <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-[#C48BFF]">
              Reach out
            </p>
            <h1 className="text-3xl font-semibold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
              BUILDING INDIA'S NEXT POP STAR
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-[#D7E2EA]/80 sm:text-lg">
              Reach out for auditions, collaborations, demo submissions, and press. We welcome creators who are ready to build with intention.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Auditions', 'Collaborations', 'Press', 'Submissions'].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-[#0F0F0F] px-4 py-2 text-[0.72rem] font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/80"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0D0D0D]/90 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:p-10">
            <div className="mb-8">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.35em] text-[#C48BFF]">
                Contact details
              </p>
              <h2 className="mt-2 text-2xl font-semibold uppercase tracking-[0.2em] text-white">
                Direct lines
              </h2>
            </div>

            <div className="space-y-4">
              {contactDetails.map((detail) => (
                <a
                  key={detail.email}
                  href={`mailto:${detail.email}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-[#C48BFF]/40 hover:bg-white/10"
                >
                  <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#D7E2EA]/60">
                    {detail.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">{detail.email}</p>
                </a>
              ))}
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="space-y-3 text-sm text-[#D7E2EA]/80">
                <p>
                  <span className="font-semibold text-white">Instagram:</span>{' '}
                  <a href="https://instagram.com/_labelx" target="_blank" rel="noreferrer" className="underline decoration-[#C48BFF]/60 underline-offset-4">
                    @_labelx
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white">Location:</span> Delhi, India
                </p>
                <p>
                  <span className="font-semibold text-white">Company:</span> MUSIC LABELX PVT. LTD.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#C48BFF]">Response</p>
            <p className="mt-2 text-sm text-[#D7E2EA]/80">We aim to respond within 5–10 business days.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#C48BFF]">Focus</p>
            <p className="mt-2 text-sm text-[#D7E2EA]/80">Serious enquiries and long-term creative partnerships.</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-[0.7rem] uppercase tracking-[0.3em] text-[#C48BFF]">Studio</p>
            <p className="mt-2 text-sm text-[#D7E2EA]/80">Built around discipline, artistry, and growth.</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ContactPage
