import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const OrbitBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const frameIdRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Skip initializing the 3D scene on small screens (mobile)
    const isMobileViewport = typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    if (isMobileViewport) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 4.2
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create orbit rings
    const orbitGroup = new THREE.Group()
    // Position and scale — will adjust for mobile vs desktop
    const setOrbitPositionForViewport = () => {
      // Keep the orbit centered horizontally (x = 0) so it appears centered
      // above the hero text. Slight vertical offset to sit above text baseline.
      const isMobile = window.innerWidth < 768
      if (isMobile) {
        orbitGroup.position.set(0, -0.15, 0)
        orbitGroup.scale.set(1.05, 1.05, 1.05)
      } else {
        orbitGroup.position.set(0, -0.15, 0)
        orbitGroup.scale.set(1.15, 1.15, 1.15)
      }
    }

    setOrbitPositionForViewport()
    scene.add(orbitGroup)

    const ringCount = 5
    const rings: THREE.Line[] = []
    const ringData: {
      speed: number
      tiltX: number
      tiltY: number
      radius: number
      phaseOffset: number
    }[] = []

    // Color palette — purple/violet theme
    const colors = [
      new THREE.Color('#7c3aed'), // violet-600
      new THREE.Color('#8b5cf6'), // violet-500
      new THREE.Color('#a78bfa'), // violet-400
      new THREE.Color('#6d28d9'), // violet-700
      new THREE.Color('#c4b5fd'), // violet-300
    ]

    for (let i = 0; i < ringCount; i++) {
      const radius = 2.1 + i * 0.55
      const segments = 180
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array((segments + 1) * 3)

      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2
        positions[j * 3] = Math.cos(angle) * radius
        positions[j * 3 + 1] = Math.sin(angle) * radius
        positions[j * 3 + 2] = 0
      }

      geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3)
      )

      const material = new THREE.LineBasicMaterial({
        color: colors[i % colors.length],
        transparent: true,
        opacity: 0.35 + (i % 3) * 0.12,
        linewidth: 1,
      })

      const ring = new THREE.Line(geometry, material)
      rings.push(ring)
      orbitGroup.add(ring)

      ringData.push({
        speed: 0.15 + i * 0.06,
        tiltX: (Math.PI / 4) * (0.5 + i * 0.2),
        tiltY: (Math.PI / 6) * i,
        radius,
        phaseOffset: (i * Math.PI) / ringCount,
      })
    }

    // Create orbital dots (particles on the rings)
    const dotCount = 20
    const dotGeometry = new THREE.BufferGeometry()
    const dotPositions = new Float32Array(dotCount * 3)
    const dotColors = new Float32Array(dotCount * 3)
    const dotSizes = new Float32Array(dotCount)
    const dotMeta: { ringIndex: number; angleOffset: number; speed: number }[] = []

    for (let i = 0; i < dotCount; i++) {
      const ringIndex = i % ringCount
      const angleOffset = Math.random() * Math.PI * 2
      const speed = 0.3 + Math.random() * 0.5

      dotMeta.push({ ringIndex, angleOffset, speed })

      dotPositions[i * 3] = 0
      dotPositions[i * 3 + 1] = 0
      dotPositions[i * 3 + 2] = 0

      const color = colors[ringIndex % colors.length]
      dotColors[i * 3] = color.r
      dotColors[i * 3 + 1] = color.g
      dotColors[i * 3 + 2] = color.b

      dotSizes[i] = 3.2 + Math.random() * 3.2
    }

    dotGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(dotPositions, 3)
    )
    dotGeometry.setAttribute('color', new THREE.BufferAttribute(dotColors, 3))
    dotGeometry.setAttribute('size', new THREE.BufferAttribute(dotSizes, 1))

    // Custom shader for glowing dots
    const dotMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * uPixelRatio * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          glow = pow(glow, 1.8);
          gl_FragColor = vec4(vColor, glow * 0.9);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const dotPoints = new THREE.Points(dotGeometry, dotMaterial)
    orbitGroup.add(dotPoints)

    // Create a glowing center sphere
    const centerGeometry = new THREE.SphereGeometry(0.35, 32, 32)
    const centerMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#7c3aed') },
        uColor2: { value: new THREE.Color('#a78bfa') },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 color = mix(uColor1, uColor2, intensity + sin(uTime * 0.5) * 0.2);
          float alpha = 0.3 + intensity * 0.6;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const centerSphere = new THREE.Mesh(centerGeometry, centerMaterial)
    orbitGroup.add(centerSphere)

    // Outer glow sphere
    const glowGeometry = new THREE.SphereGeometry(0.55, 32, 32)
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#7c3aed') },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
          gl_FragColor = vec4(uColor, intensity * 0.4);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const glowSphere = new THREE.Mesh(glowGeometry, glowMaterial)
    orbitGroup.add(glowSphere)

    // Animation loop
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      // Subtle mouse-follow rotation
      const targetRotX = mouseRef.current.y * 0.15
      const targetRotY = mouseRef.current.x * 0.15
      orbitGroup.rotation.x += (targetRotX - orbitGroup.rotation.x) * 0.02
      orbitGroup.rotation.y += (targetRotY - orbitGroup.rotation.y) * 0.02

      // Animate each ring
      for (let i = 0; i < ringCount; i++) {
        const data = ringData[i]
        const ring = rings[i]
        ring.rotation.x = data.tiltX + Math.sin(elapsed * data.speed * 0.5 + data.phaseOffset) * 0.2
        ring.rotation.y = data.tiltY + elapsed * data.speed
        ring.rotation.z = Math.cos(elapsed * data.speed * 0.3 + data.phaseOffset) * 0.15

        // Pulse opacity
        const mat = ring.material as THREE.LineBasicMaterial
        mat.opacity = 0.25 + Math.sin(elapsed * 0.8 + i) * 0.12
      }

      // Animate orbital dots
      const positions = dotGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < dotCount; i++) {
        const meta = dotMeta[i]
        const data = ringData[meta.ringIndex]
        const ring = rings[meta.ringIndex]

        const angle = meta.angleOffset + elapsed * meta.speed
        const localX = Math.cos(angle) * data.radius
        const localY = Math.sin(angle) * data.radius

        // Apply ring rotation to get world-ish position
        const vec = new THREE.Vector3(localX, localY, 0)
        vec.applyEuler(ring.rotation)

        positions[i * 3] = vec.x
        positions[i * 3 + 1] = vec.y
        positions[i * 3 + 2] = vec.z
      }
      dotGeometry.attributes.position.needsUpdate = true

      // Center sphere animation
      centerMaterial.uniforms.uTime.value = elapsed
      centerSphere.rotation.y = elapsed * 0.3
      centerSphere.rotation.x = elapsed * 0.15

      // Pulse the center
      const pulse = 1 + Math.sin(elapsed * 1.2) * 0.05
      centerSphere.scale.setScalar(pulse)
      glowSphere.scale.setScalar(pulse * 1.1)

      renderer.render(scene, camera)
      frameIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      // Update orbit position/scale responsively
      setOrbitPositionForViewport()
    }
    window.addEventListener('resize', handleResize)

    // Handle mouse move for subtle interactivity
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(frameIdRef.current)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)

      // Cleanup
      renderer.dispose()
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement)
      }

      // Dispose geometries and materials
      rings.forEach((ring) => {
        ring.geometry.dispose()
        ;(ring.material as THREE.Material).dispose()
      })
      dotGeometry.dispose()
      dotMaterial.dispose()
      centerGeometry.dispose()
      centerMaterial.dispose()
      glowGeometry.dispose()
      glowMaterial.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  )
}

export default OrbitBackground
