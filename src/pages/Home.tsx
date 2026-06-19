import { Suspense, useState, useMemo, useCallback, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { Scene } from "../components/Scene"
import { Navbar } from "../components/Navbar"
import { About } from "../components/About"
import { Sabores } from "../components/Sabores"

interface HomeProps {
  bgColor?: string
}

export function Home({ bgColor = "#F3E8FF" }: HomeProps) {
  const [scrollY, setScrollY] = useState(0)
  const [firstCardEl, setFirstCardEl] = useState<HTMLElement | null>(null)

  const heroThreshold = useMemo(() => window.innerHeight, [])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFirstCardReady = useCallback((el: HTMLElement | null) => {
    setFirstCardEl(el)
  }, [])

  return (
    <div className="relative w-full" style={{ backgroundColor: bgColor }}>
      <Navbar />

      <div id="scene-canvas" className="fixed inset-0 z-40 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0.05, 4], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          style={{ pointerEvents: "none" }}
        >
          <Suspense fallback={null}>
            <Scene
              scrollY={scrollY}
              heroThreshold={heroThreshold}
              firstCardEl={firstCardEl}
            />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        <section id="inicio" className="min-h-screen flex flex-col items-center">
          <About />
        </section>
        <Sabores onFirstCardReady={handleFirstCardReady} />
      </div>
    </div>
  )
}
