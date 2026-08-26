import FadeIn from '../components/FadeIn'
import AnimatedText from '../components/AnimatedText'
import ContactButton from '../components/ContactButton'

import element1 from '../../element1.png'
import element2 from '../../element2.png'
import element4 from '../../element4.png'
import element3 from '../../element3.png'


const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 relative"
      style={{ background: '#000' }}
    >
      {/* Content */}
      <div className="relative w-full max-w-5xl mx-auto min-h-[320px] md:min-h-[420px]">
        <div className="absolute left-0 top-0 hidden md:block w-24 h-24 xl:w-32 xl:h-32   rotate-[-8deg] overflow-hidden">
          <img src={element1} alt="3D element" className="h-full w-full  " />
        </div>
        <div className="absolute right-0 top-0 hidden md:block w-24 h-24 xl:w-32 xl:h-32  rotate-[8deg] overflow-hidden">
          <img src={element2} alt="3D element" className="h-full w-full " />
        </div>
        <div className="absolute left-0 bottom-0 hidden md:block w-24 h-24 xl:w-32 xl:h-32  rotate-[7deg] overflow-hidden">
          <img src={element3} alt="3D element" className="h-full w-full " />
        </div>
        <div className="absolute right-0 bottom-0 hidden md:block w-29 h-24 xl:w-36 xl:h-32  rotate-[-6deg] overflow-hidden">
          <img src={element4} alt="3D element" className="h-full w-full " />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-10 w-full max-w-3xl mx-auto">
          <FadeIn delay={0} y={40}>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight text-center"
              style={{ fontSize: 'clamp(2.6rem, 8.2vw, 108px)' }}
            >
              About Us
            </h2>
          </FadeIn>

          <AnimatedText
            text="We are a structured entertainment and artist development company dedicated to building world-class performance talent from India. Through discipline, creativity, and continuous training, we discover and develop talented individuals for national and global stages working toward India's leading girl group and a professional, internationally competitive entertainment system."
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-full px-4 sm:px-0"
            style={{ fontSize: 'clamp(1.05rem, 1.7vw, 1.2rem)' }}
          />
        </div>
      </div>

      <div className="mt-16 sm:mt-20 md:mt-24 z-10">
        <ContactButton />
      </div>
    </section>
  )
}

export default AboutSection
