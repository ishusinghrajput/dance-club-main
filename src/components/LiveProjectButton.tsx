interface LiveProjectButtonProps {
  label?: string
  href?: string
}

const LiveProjectButton = ({
  label = 'Live Project',
  href = '#',
}: LiveProjectButtonProps) => {
  return (
    <a
      href={href}
      className="inline-flex rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200"
    >
      {label}
    </a>
  )
}

export default LiveProjectButton
