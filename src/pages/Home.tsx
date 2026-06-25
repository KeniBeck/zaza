import { Suspense, useState, useMemo, useCallback, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import { Scene } from "../components/Scene"
import { ErrorBoundary } from "../components/ErrorBoundary"
import { Navbar } from "../components/Navbar"
import { About } from "../components/About"
import { Sabores } from "../components/Sabores"
import { QuienesSomos } from "../components/QuienesSomos"
import { ZazaLogo } from "../components/ZazaLogo"
import { FLAVORS } from "../data/flavors"
import { asset } from "../constants"

useGLTF.preload(asset("/textura-morada.glb"))
useGLTF.preload(asset("/textura-azul.glb"))

interface HomeProps {
  bgColor?: string
}

function Preloader({ onReady }: { onReady: () => void }) {
  useGLTF(asset("/textura-morada.glb"))
  useGLTF(asset("/textura-azul.glb"))

  useEffect(() => { onReady() }, [onReady])

  return null
}

function LoadingSplash() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F3E8FF]">
      <ZazaLogo
        size={160}
        color="#6B318B"
        gradientEnd="#A03B90"
        className="select-none pointer-events-none"
      />
      <div className="mt-10 h-1 w-24 rounded-full bg-gradient-to-r from-[#6B318B] via-[#C084FC] to-[#6B318B] animate-pulse" />
    </div>
  )
}

export function Home({ bgColor = "#F3E8FF" }: HomeProps) {
  const scrollYRef = useRef(0)
  const [firstCardEl, setFirstCardEl] = useState<HTMLElement | null>(null)
  const [modelReady, setModelReady] = useState(false)
  const [canvasKey, setCanvasKey] = useState(0)
  const retried = useRef(false)
  const flavorCardRef = useRef<HTMLElement | null>(null)
  const applyCanvasStyleRef = useRef<() => void>(() => {})
  const [activeFlavorIndex, setActiveFlavorIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const activeFlavor = FLAVORS[activeFlavorIndex]

  const heroThreshold = useMemo(() => window.innerHeight, [])

  useEffect(() => {
    if (!modelReady) return

    let triggerPoint = 0

    const calcBounds = () => {
      const el = document.getElementById('productos')
      if (!el) return
      triggerPoint = el.offsetTop + el.offsetHeight - window.innerHeight
    }

    const applyCanvasStyle = () => {
      const canvas = document.getElementById('scene-canvas')
      if (!canvas) return
      if (window.scrollY <= triggerPoint) {
        canvas.style.position = 'fixed'
        canvas.style.top = '0'
        canvas.style.left = '0'
        canvas.style.right = '0'
        canvas.style.bottom = '0'
        canvas.style.height = ''
      } else {
        canvas.style.position = 'absolute'
        canvas.style.top = `${triggerPoint}px`
        canvas.style.left = '0'
        canvas.style.right = '0'
        canvas.style.bottom = ''
        canvas.style.height = '100vh'
      }
    }
    applyCanvasStyleRef.current = applyCanvasStyle

    const handleScroll = () => {
      scrollYRef.current = window.scrollY
      applyCanvasStyle()
    }

    const handleResize = () => {
      calcBounds()
      applyCanvasStyle()
    }

    calcBounds()
    applyCanvasStyle()

    let scrollEndTimer: ReturnType<typeof setTimeout>
    const handleScrollEnd = () => {
      clearTimeout(scrollEndTimer)
      scrollEndTimer = setTimeout(() => {
        applyCanvasStyle()
      }, 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleScrollEnd, { passive: true })
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleScrollEnd)
      window.removeEventListener('resize', handleResize)
      clearTimeout(scrollEndTimer)
    }
  }, [modelReady])

  const handleFirstCardReady = useCallback((el: HTMLElement | null) => {
    setFirstCardEl(el)
    flavorCardRef.current = el
  }, [])

  const handleCanvasError = useCallback(() => {
    if (!retried.current) {
      retried.current = true
      setCanvasKey((k) => k + 1)
    }
  }, [])

  const isMobile = window.innerWidth < 768
  const deviceDpr = window.devicePixelRatio

  if (!modelReady) {
    return (
      <>
        <Suspense fallback={null}>
          <Preloader onReady={() => setModelReady(true)} />
        </Suspense>
        <LoadingSplash />
      </>
    )
  }

  return (
    <div className="relative w-full" style={{ backgroundColor: bgColor }}>
      <Navbar color={activeFlavor.color} gradientEnd={activeFlavor.gradientEnd} borderColor={activeFlavor.color} />

      <ErrorBoundary key={canvasKey} onError={handleCanvasError}>
        <div
          id="scene-canvas"
          className="z-40 pointer-events-none"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <Canvas
            key={canvasKey}
            camera={{ position: [0, 0.05, 4], fov: 45 }}
            gl={{ antialias: true, alpha: true, precision: "highp", powerPreference: "high-performance", logarithmicDepthBuffer: true }}
            dpr={isMobile
              ? Math.min(deviceDpr * 1.2, 2)
              : Math.min(deviceDpr * 2, 4)
            }
            performance={{ min: 0.9 }}

            style={{ pointerEvents: "none" }}
            onCreated={(state) => {
              state.gl.setClearColor(0x000000, 0)
            }}
          >
            <Scene
              scrollYRef={scrollYRef}
              heroThreshold={heroThreshold}
              firstCardEl={firstCardEl}
              glbUrl={activeFlavor.glb}
              isFlipped={isFlipped}
            />
          </Canvas>
        </div>
      </ErrorBoundary>

      <div className="relative z-10">
        <section id="inicio" className="min-h-screen flex flex-col items-center">
          <About
            gradientStart={activeFlavor.color}
            gradientMid={activeFlavor.gradientMid}
            gradientEnd={activeFlavor.gradientEnd}
            activeFlavorIndex={activeFlavorIndex}
          />
        </section>
        <Sabores
          onFirstCardReady={handleFirstCardReady}
          activeFlavorIndex={activeFlavorIndex}
          setActiveFlavorIndex={setActiveFlavorIndex}
          isFlipped={isFlipped}
          onFlip={setIsFlipped}
        />
        <QuienesSomos
          gradientStart={activeFlavor.color}
          gradientMid={activeFlavor.gradientMid}
          gradientEnd={activeFlavor.gradientEnd}
        />
      </div>
    </div>
  )
}
