import { useRef, useState, useCallback } from "react"
import { InfoModal } from "./mobile/InfoModal"
import { MobileFlavorCard } from "./mobile/MobileFlavorCard"
import { FeaturedFlavor } from "./desktop/FeaturedFlavor"
import { useCrossfade } from "../../hooks/useCrossfade"
import { FLAVORS } from "../../data/flavors"

interface SaboresProps {
  activeFlavorIndex: number
  setActiveFlavorIndex: React.Dispatch<React.SetStateAction<number>>
  isFlipped?: boolean
  onFlip?: (flipped: boolean) => void
}

function hexToRgb(hex: string): string {
  const c = hex.replace('#', '')
  if (c.length !== 6) return '255,255,255'
  return `${parseInt(c.substring(0,2),16)},${parseInt(c.substring(2,4),16)},${parseInt(c.substring(4,6),16)}`
}

export function Sabores({ activeFlavorIndex, setActiveFlavorIndex, isFlipped, onFlip }: SaboresProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [showInfo, setShowInfo] = useState(false)
  const activeFlavor = FLAVORS[activeFlavorIndex]
  const blobRgb = hexToRgb(activeFlavor.color)
  const blobMidRgb = hexToRgb(activeFlavor.gradientMid)
  const blobEndRgb = hexToRgb(activeFlavor.gradientEnd)
  const isMobile = window.innerWidth < 768

  const [bgLayers, activeBgLayer] = useCrossfade(activeFlavor.sectionBg)

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
    >
      {/* Crossfade background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 transition-opacity duration-[800ms] ease" style={{ background: bgLayers[0], opacity: activeBgLayer === 0 ? 1 : 0 }} />
        <div className="absolute inset-0 transition-opacity duration-[800ms] ease" style={{ background: bgLayers[1], opacity: activeBgLayer === 1 ? 1 : 0 }} />
      </div>

      {/* Lava blobs — main background visual */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="lava-blob sabores-lava-1"
          style={{ backgroundColor: `rgba(${blobRgb},${isMobile ? 0.70 : 0.35})` }}
        />
        <div
          className="lava-blob sabores-lava-2"
          style={{ backgroundColor: `rgba(${blobMidRgb},${isMobile ? 0.60 : 0.30})` }}
        />
        <div
          className="lava-blob sabores-lava-3"
          style={{ backgroundColor: `rgba(${blobEndRgb},${isMobile ? 0.55 : 0.25})` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl w-full">
        <div className="mb-12 text-center">
          <h2
            className="text-4xl font-zaza"
            style={{
              color: '#fff',
              textShadow: `0 0 8px ${activeFlavor.color}, 0 0 20px ${activeFlavor.color}, 0 0 40px ${activeFlavor.color}`,
              WebkitTextStroke: `1px ${activeFlavor.color}`,
            }}
          >
            Nuestros Sabores
          </h2>
          <p className="mt-3 text-white/85 text-sm md:text-base">
            Elige el tuyo y déjate llevar
          </p>
        </div>

        <MobileFlavorCard
          flavor={activeFlavor}
          onPrev={handlePrev}
          onNext={handleNext}
          isFlipped={isFlipped}
          onFlip={onFlip}
        />

        {/* Desktop: featured card with selector */}
        <FeaturedFlavor
          flavors={FLAVORS}
          activeIndex={activeFlavorIndex}
          onSelect={(i) => setActiveFlavorIndex(i)}
        />
      </div>

      {/* Info modal */}
      {showInfo && (
        <InfoModal flavor={activeFlavor} onClose={() => setShowInfo(false)} />
      )}
    </section>
  )
}
