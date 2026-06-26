import type { Flavor } from "../../../data/flavors"
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti"
import { useScreenSize } from "../../../hooks/useScreenSize"
import { TbHandClick, TbShoppingCart } from "react-icons/tb"

interface MobileFlavorCardProps {
  flavor: Flavor
  onPrev: () => void
  onNext: () => void
  isFlipped?: boolean
  onFlip?: (flipped: boolean) => void
}

export function MobileFlavorCard({ flavor, onPrev, onNext, isFlipped, onFlip }: MobileFlavorCardProps) {
  const { mobileScale } = useScreenSize()

  const cardHeight = mobileScale("410px", "410px", "430px", "500px", "410px")

  return (
    <div className="md:hidden flex flex-col items-center gap-6" style={{ perspective: "1000px" }}>
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          width: "100%",
          height: cardHeight,
        }}
      >
        {/* CARA FRONTAL */}
        <div
          id="first-flavor-card"
          className="w-full flex flex-col items-center justify-end gap-6 px-7 pb-7 rounded-3xl
            bg-white/10 backdrop-blur-xl border shadow-xl
            transition-all duration-300 relative overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            position: "absolute",
            inset: 0,
            height: cardHeight,
            borderColor: `${flavor.color}40`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Glass shine top edge */}
          <div className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-full pointer-events-none" />

          <div className="flex items-center gap-3">
            <h3
              className="text-3xl font-zaza text-white"
              style={{
                textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
                WebkitTextStroke: `1px ${flavor.color}`,
              }}
            >
              {flavor.name}
            </h3>
            <button
              onClick={() => { onFlip?.(true) }}
              aria-label="Información del sabor"
              className="btn-info-glow w-9 h-9 flex items-center justify-center
                         rounded-full bg-white/10 border border-white/20
                         text-white relative overflow-hidden"
            >
              <span className="absolute top-0 left-2 right-2 h-px
                               bg-gradient-to-r from-transparent via-white/80
                               to-transparent pointer-events-none rounded-full" />
              <span className="shimmer-sweep absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)"
                }}
              />
              <TbHandClick />
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

        {/* CARA TRASERA */}
        <div
          className="w-full flex flex-col items-center justify-center gap-6 px-7 pb-7 rounded-3xl
            bg-white/10 backdrop-blur-xl border shadow-xl
            transition-all duration-300 relative overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            inset: 0,
            height: cardHeight,
            borderColor: `${flavor.color}40`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
          }}
        >
          {/* Glass shine top edge */}
          <div className="absolute top-0 left-4 right-4 h-[1.5px] bg-gradient-to-r from-transparent via-white/90 to-transparent rounded-full pointer-events-none" />

          <h2 className="font-zaza text-4xl text-center text-white"
            style={{
              textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
              WebkitTextStroke: `1px ${flavor.color}`,
            }}>
            {flavor.name}
          </h2>

          <p className="text-sm text-white/80 text-center leading-relaxed px-4">
            {flavor.description}
          </p>

          <div className="text-sm text-white/70 text-center">
            <p className="font-zaza text-3xl mb-1 text-white" style={{
              textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
              WebkitTextStroke: `1px ${flavor.color}`,
            }}>Ingredientes</p>
            <p>{flavor.ingredients.join(", ")}</p>
          </div>

          <p className="font-zaza text-4xl text-center text-white"
            style={{
              textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
              WebkitTextStroke: `1px ${flavor.color}`,
            }}>
            {flavor.price}
          </p>

          <div className="flex items-center gap-3 w-full">
            <button
              className="snake-border flex-1 py-3 rounded-2xl text-white bg-white/10 font-semibold active:scale-95"
              style={{
                ["--g1" as any]: flavor.color,
                ["--g2" as any]: `${flavor.color}AA`,
                ["--speed" as any]: "4s",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <TbShoppingCart />
                Pedir
              </span>
            </button>

            <button
              onClick={() => onFlip?.(false)}
              aria-label="Volver"
              className="btn-info-glow w-12 h-12 flex items-center justify-center
             rounded-full bg-white/10 border border-white/20
             text-white relative overflow-hidden active:scale-95"
            >
              <span className="absolute top-0 left-2 right-2 h-px
                   bg-gradient-to-r from-transparent via-white/80
                   to-transparent pointer-events-none rounded-full" />
              <span className="shimmer-sweep absolute inset-0 pointer-events-none"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)"
                }}
              />
              <TbHandClick />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
