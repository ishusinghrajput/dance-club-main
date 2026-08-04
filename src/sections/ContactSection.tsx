const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-6 md:px-10 bg-[#050505] text-[#D7E2EA]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-wider mb-4">Contact</h2>
        <p className="mb-6 max-w-2xl">Get in touch — we respond to serious enquiries about auditions, collaborations, submissions and press.</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-semibold uppercase mb-2">Email</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Official:</strong>{' '}
                <a href="mailto:official.labelx@gmail.com" className="text-[#fff] underline">official.labelx@gmail.com</a>
              </li>
              <li>
                <strong>Auditions / Profiles:</strong>{' '}
                <a href="mailto:auditions.labelx@gmail.com" className="text-[#fff] underline">auditions.labelx@gmail.com</a>
              </li>
              <li>
                <strong>Songwriters / Demo Submissions:</strong>{' '}
                <a href="mailto:submissions.labelx@gmail.com" className="text-[#fff] underline">submissions.labelx@gmail.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold uppercase mb-2">Social & Location</h3>
            <p className="text-sm mb-2">
              <strong>Instagram:</strong>{' '}
              <a href="https://instagram.com/_labelx" target="_blank" rel="noreferrer" className="text-[#fff] underline">@_labelx</a>
            </p>
            <p className="text-sm mb-2"><strong>Location:</strong> Delhi, India (On-Ground Training System)</p>
            <p className="text-sm"><strong>Company:</strong> MUSIC LABELX PVT. LTD.</p>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm">For auditions and professional enquiries, please use the Auditions email above. We aim to reply within 5–10 business days.</p>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
