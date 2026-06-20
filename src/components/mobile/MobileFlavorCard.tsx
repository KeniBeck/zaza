import type { Flavor } from "../../data/flavors"
import { LiaInfoSolid } from "react-icons/lia"
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti"

interface MobileFlavorCardProps {
  flavor: Flavor
  cardRef: (el: HTMLDivElement | null) => void
  onInfo: () => void
  onPrev: () => void
  onNext: () => void
}

export function MobileFlavorCard({ flavor, cardRef, onInfo, onPrev, onNext }: MobileFlavorCardProps) {
  return (
    <div className="md:hidden flex flex-col items-center gap-6">
      <div
        ref={cardRef}
        id="first-flavor-card"
        className="w-[280px] h-[380px] flex flex-col items-center justify-end gap-6 px-7 pb-7 rounded-3xl
          bg-white/10 backdrop-blur-xl border shadow-xl
          transition-all duration-300 relative overflow-hidden"
        style={{
          borderColor: `${flavor.color}40`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        {/* Glass shine top edge */}
        <div className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-full pointer-events-none" />

        <div className="flex items-center gap-3">
          <h3
            className="text-3xl font-zaza"
            style={{
              color: '#fff',
              textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
              WebkitTextStroke: `1px ${flavor.color}`,
            }}
          >
            {flavor.name}
          </h3>
          <button
            onClick={onInfo}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:text-white hover:bg-white/20 transition-all text-xl leading-none relative overflow-hidden"
            aria-label="Información del sabor"
          >
            <span className="absolute top-0 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />
            <LiaInfoSolid />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={onPrev}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:text-white hover:bg-white/20 transition-all text-xl leading-none relative overflow-hidden"
            aria-label="Sabor anterior"
          >
            <span className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />
            <TiArrowLeftOutline />
          </button>
          <button
            onClick={onNext}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/25 transition-all text-xl leading-none relative overflow-hidden"
            aria-label="Siguiente sabor"
          >
            <span className="absolute top-0 left-3 right-3 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent rounded-full pointer-events-none" />
            <TiArrowRightOutline />
          </button>
        </div>
      </div>
    </div>
  )
}
