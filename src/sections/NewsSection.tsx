import FadeIn from '../components/FadeIn'

const mediaItems = [
  {
    platform: 'Instagram',
    type: 'Profile',
    title: 'LabelX Instagram',
    embedUrl: 'https://www.instagram.com/_labelx/embed',
    platformUrl: 'https://www.instagram.com/_labelx/?hl=en',
  },
  {
    platform: 'YouTube',
    type: 'Video',
    title: 'Performance Highlight',
    embedUrl: 'https://www.youtube.com/embed/QFhSoVGiX9w',
    platformUrl: 'https://youtu.be/QFhSoVGiX9w?si=MyqaWLEnGFbDYJ0X',
  },
  {
    platform: 'YouTube',
    type: 'Video',
    title: 'LabelX Showcase',
    embedUrl: 'https://www.youtube.com/embed/Z_i8EcDD38Q',
    platformUrl: 'https://youtu.be/Z_i8EcDD38Q?si=qlICBhWXPJpCxqBo',
  },
]

const NewsSection = () => {
  return (
    <section
      id="news"
      className="px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative"
      style={{ background: '#0C0C0C' }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <FadeIn delay={0} y={30}>
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-[#D7E2EA]/70">
              Latest updates
            </p>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 8vw, 96px)' }}
            >
              News & Media
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-8">
          {mediaItems.map((item, index) => (
            <FadeIn key={`${item.platform}-${item.title}`} delay={index * 0.08} y={30}>
              <article className="overflow-hidden rounded-[36px] border border-[#D7E2EA]/15 bg-[#111111] p-3 sm:p-4 md:p-5">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#D7E2EA]">
                      {item.type}
                    </span>
                    <a
                      href={item.platformUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-[#D7E2EA]/20 px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#D7E2EA] transition hover:bg-[#D7E2EA] hover:text-black"
                    >
                      Open on {item.platform}
                    </a>
                  </div>
                </div>

                <div className="overflow-hidden rounded-[28px] border border-[#D7E2EA]/10 bg-black">
                  <iframe
                    src={item.embedUrl}
                    title={`${item.platform} ${item.title}`}
                    className="h-[420px] w-full sm:h-[520px] md:h-[620px]"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsSection
