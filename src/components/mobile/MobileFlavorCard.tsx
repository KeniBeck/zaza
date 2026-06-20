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
          transition-all duration-300"
        style={{
          borderColor: `${flavor.color}40`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <h3 className="text-3xl font-zaza text-white">
            {flavor.name}
          </h3>
          <button
            onClick={onInfo}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/60 hover:text-white hover:bg-white/20 transition-all text-xl leading-none"
            aria-label="Información del sabor"
          >
            <LiaInfoSolid />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={onPrev}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white/70 hover:text-white hover:bg-white/20 transition-all text-xl leading-none"
            aria-label="Sabor anterior"
          >
            <TiArrowLeftOutline />
          </button>
          <button
            onClick={onNext}
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/25 transition-all text-xl leading-none"
            aria-label="Siguiente sabor"
          >
            <TiArrowRightOutline />
          </button>
        </div>
      </div>
    </div>
  )
}
