import React, { useEffect, useRef } from 'react'

type Props = {
  src: string
  className?: string
  style?: React.CSSProperties
  poster?: string
  loop?: boolean
  autoPlay?: boolean
  muted?: boolean
  playsInline?: boolean
  crossOrigin?: string
  preload?: 'auto' | 'metadata' | 'none'
}

const VideoBackground: React.FC<Props> = ({
  src,
  className,
  style,
  poster,
  loop = true,
  autoPlay = true,
  muted = true,
  playsInline = true,
  crossOrigin = 'anonymous',
  preload = 'auto',
}) => {
  const ref = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return

    try {
      v.muted = !!muted
      if (playsInline) {
        v.setAttribute('playsinline', '')
        v.setAttribute('webkit-playsinline', '')
      }

      if (autoPlay) {
        const p = v.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      }
    } catch (e) {
      // ignore
    }
  }, [autoPlay, muted, playsInline])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      style={style}
      loop={loop}
      autoPlay={autoPlay}
      muted={muted}
      playsInline={playsInline}
      preload={preload}
    />
  )
}

export default VideoBackground
