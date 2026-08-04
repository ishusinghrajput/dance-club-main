import { useRef, useEffect } from 'react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4'

const ScrollVideo = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const framesRef = useRef<ImageBitmap[]>([])
  const framesReadyRef = useRef(false)
  const lastFrameIndexRef = useRef(-1)
  const videoSeekingRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current!
    const video = videoRef.current!
    const ctx = canvas.getContext('2d')!
    let animId: number

    const isMobileDevice =
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
      window.matchMedia('(max-width: 767px)').matches

    if (isMobileDevice) {
      video.muted = true
      video.playsInline = true
      video.autoplay = true
      video.loop = true
      video.preload = 'auto'
      video.style.display = 'block'
      canvas.style.visibility = 'hidden'
      video.currentTime = 0
      void video.play().catch(() => undefined)
      return () => undefined
    }

    function resizeCanvas() {
      const dpr = Math.min(devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      const w = Math.round(rect.width * dpr)
      const h = Math.round(rect.height * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      lastFrameIndexRef.current = -1
    }

    function getProgress() {
      const vh = window.innerHeight
      const start = vh * 0.5
      const end = document.documentElement.scrollHeight - vh
      const range = end - start
      if (range <= 0) return 0
      return Math.max(0, Math.min(1, (window.scrollY - start) / range))
    }

    function drawFrame(frame: ImageBitmap) {
      const cw = canvas.width
      const ch = canvas.height
      const s = Math.max(cw / frame.width, ch / frame.height)
      const dw = frame.width * s
      const dh = frame.height * s
      ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
    }

    function videoTick() {
      const progress = getProgress()
      const frames = framesRef.current

      if (framesReadyRef.current && frames.length > 0) {
        const idx = Math.round(progress * (frames.length - 1))
        if (idx !== lastFrameIndexRef.current) {
          lastFrameIndexRef.current = idx
          if (frames[idx]) drawFrame(frames[idx])
        }
      } else if (
        video.duration &&
        isFinite(video.duration) &&
        video.readyState >= 1
      ) {
        const target = progress * video.duration
        if (
          !videoSeekingRef.current &&
          Math.abs(video.currentTime - target) > 0.001
        ) {
          videoSeekingRef.current = true
          video.currentTime = target
        }
      }
      animId = requestAnimationFrame(videoTick)
    }

    async function extractFrames() {
      try {
        const response = await fetch(VIDEO_URL, { mode: 'cors' })
        const blob = await response.blob()
        const objectUrl = URL.createObjectURL(blob)

        const tempVideo = document.createElement('video')
        tempVideo.muted = true
        tempVideo.playsInline = true
        tempVideo.crossOrigin = 'anonymous'
        tempVideo.preload = 'auto'
        tempVideo.src = objectUrl

        await new Promise<void>((resolve, reject) => {
          tempVideo.onloadedmetadata = () => resolve()
          tempVideo.onerror = () => reject()
          setTimeout(() => reject(), 15000)
        })

        const scale = Math.min(1, 1280 / tempVideo.videoWidth)
        const scaledWidth = Math.round(tempVideo.videoWidth * scale)
        const scaledHeight = Math.round(tempVideo.videoHeight * scale)
        const frameCount = Math.max(
          30,
          Math.min(120, Math.round(tempVideo.duration * 24))
        )
        const extractedFrames: ImageBitmap[] = []

        for (let i = 0; i < frameCount; i++) {
          const time =
            (i / (frameCount - 1)) * (tempVideo.duration - 0.05)
          tempVideo.currentTime = time
          await new Promise<void>((resolve, reject) => {
            const onSeeked = () => {
              tempVideo.removeEventListener('seeked', onSeeked)
              resolve()
            }
            tempVideo.addEventListener('seeked', onSeeked)
            setTimeout(() => {
              tempVideo.removeEventListener('seeked', onSeeked)
              reject()
            }, 3000)
          })
          const bitmap = await createImageBitmap(tempVideo, {
            resizeWidth: scaledWidth,
            resizeHeight: scaledHeight,
          })
          extractedFrames.push(bitmap)
        }

        if (extractedFrames.length > 0) {
          framesRef.current = extractedFrames
          framesReadyRef.current = true
          canvas.style.visibility = 'visible'
          video.style.display = 'none'
        }
        URL.revokeObjectURL(objectUrl)
      } catch {
        // Fallback to video seeking mode
      }
    }

    const handleSeeked = () => {
      videoSeekingRef.current = false
    }
    const handleStalled = () => {
      videoSeekingRef.current = false
    }
    const handleLoaded = () => {
      video.currentTime = 0
    }

    video.addEventListener('seeked', handleSeeked)
    video.addEventListener('stalled', handleStalled)
    video.addEventListener('loadeddata', handleLoaded)
    canvas.style.visibility = 'hidden'

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animId = requestAnimationFrame(videoTick)
    extractFrames()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resizeCanvas)
      video.removeEventListener('seeked', handleSeeked)
      video.removeEventListener('stalled', handleStalled)
      video.removeEventListener('loadeddata', handleLoaded)
    }
  }, [])

  return (
    <div id="scroll-video-container">
      <canvas ref={canvasRef} />
      <video
        ref={videoRef}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        crossOrigin="anonymous"
        src={VIDEO_URL}
      />
      <div className="overlay" />
    </div>
  )
}

export default ScrollVideo
