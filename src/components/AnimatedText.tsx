import { useRef } from 'react'
import type { CSSProperties } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  style?: CSSProperties
}

const AnimatedText = ({ text, className = '', style }: AnimatedTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const segments = text.split(/(\s+)/)
  const totalChars = text.replace(/\s+/g, '').length
  let charIndex = 0

  return (
    <p ref={ref} className={`${className} relative`} style={style} aria-label={text}>
      {segments.map((segment, segIndex) => {
        if (/^\s+$/.test(segment)) {
          return (
            <span key={`space-${segIndex}`} className="whitespace-pre">
              {segment}
            </span>
          )
        }

        const wordChars = segment.split('')
        const word = (
          <span key={`word-${segIndex}`} className="inline-block whitespace-nowrap">
            {wordChars.map((char) => {
              const currentIndex = charIndex
              charIndex += 1
              return (
                <CharSpan
                  key={`${char}-${currentIndex}`}
                  char={char}
                  index={currentIndex}
                  total={totalChars}
                  progress={scrollYProgress}
                />
              )
            })}
          </span>
        )

        return word
      })}
    </p>
  )
}

interface CharSpanProps {
  char: string
  index: number
  total: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}

const CharSpan = ({ char, index, total, progress }: CharSpanProps) => {
  const start = index / total
  const end = (index + 1) / total
  const opacity = useTransform(progress, [start, end], [0.2, 1])
  const displayChar = char === ' ' ? ' ' : char

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible whitespace-pre">{displayChar}</span>
      <motion.span
        className="absolute left-0 top-0 whitespace-pre"
        style={{ opacity }}
      >
        {displayChar}
      </motion.span>
    </span>
  )
}

export default AnimatedText
