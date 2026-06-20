import { useRef, useState, useCallback } from "react"
import { FlavorCard } from "./FlavorCard"
import { InfoModal } from "./mobile/InfoModal"
import { MobileFlavorCard } from "./mobile/MobileFlavorCard"
import { FLAVORS } from "../data/flavors"

interface SaboresProps {
  onFirstCardReady?: (el: HTMLElement | null) => void
  activeFlavorIndex: number
  setActiveFlavorIndex: React.Dispatch<React.SetStateAction<number>>
}

export function Sabores({ onFirstCardReady, activeFlavorIndex, setActiveFlavorIndex }: SaboresProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [showInfo, setShowInfo] = useState(false)
  const activeFlavor = FLAVORS[activeFlavorIndex]

  const handleCardRef = useCallback((el: HTMLDivElement | null) => {
    cardRef.current = el
    if (onFirstCardReady) onFirstCardReady(el)
  }, [onFirstCardReady])

  const handleNext = useCallback(() => {
    setShowInfo(false)
    setActiveFlavorIndex((prev) => (prev + 1) % FLAVORS.length)
  }, [setActiveFlavorIndex])

  const handlePrev = useCallback(() => {
    setShowInfo(false)
    setActiveFlavorIndex((prev) => (prev - 1 + FLAVORS.length) % FLAVORS.length)
  }, [setActiveFlavorIndex])

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
      style={{
        background: activeFlavor.sectionBg,
        transition: "background 0.5s ease",
      }}
    >
      {/* Subtle light blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-10 w-[32rem] h-[28rem] rounded-full opacity-30"
          style={{
            background: `radial-gradient(circle, ${activeFlavor.gradientEnd}18, transparent 70%)`,
            filter: "blur(80px)",
            transition: "background 0.5s ease",
          }}
        />
        <div
          className="absolute top-1/4 -right-16 w-80 h-96 rounded-full opacity-25"
          style={{
            background: `radial-gradient(circle, ${activeFlavor.gradientMid}12, transparent 70%)`,
            filter: "blur(70px)",
            transition: "background 0.5s ease",
          }}
        />
        <div
          className="absolute -bottom-20 left-1/3 w-64 h-64 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${activeFlavor.gradientEnd}10, transparent 70%)`,
            filter: "blur(60px)",
            transition: "background 0.5s ease",
          }}
        />
        <div className="absolute top-12 right-8 w-3 h-3 rounded-full bg-white/8" />
        <div className="absolute bottom-32 left-12 w-2 h-2 rounded-full bg-white/6" />
        <div className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-white/5" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-zaza text-white">
            Nuestros Sabores
          </h2>
          <p className="mt-3 text-[#C4B5FD] text-sm md:text-base">
            Elige el tuyo y déjate llevar
          </p>
        </div>

        <MobileFlavorCard
          flavor={activeFlavor}
          cardRef={handleCardRef}
          onInfo={() => setShowInfo(true)}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Desktop: current card grid */}
        <div className="hidden md:flex flex-wrap justify-center gap-6">
          {FLAVORS.map((flavor, i) => (
            <FlavorCard
              key={flavor.id}
              flavor={flavor}
              isFirst={i === 0}
              onFirstCardRef={
                i === 0
                  ? (el) => { if (onFirstCardReady) onFirstCardReady(el) }
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {/* Info modal */}
      {showInfo && (
        <InfoModal flavor={activeFlavor} onClose={() => setShowInfo(false)} />
      )}
    </section>
  )
}
