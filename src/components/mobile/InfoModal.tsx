import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import type { Flavor } from "../../data/flavors"
import { PRODUCT_PRICE } from "../../constants"

interface InfoModalProps {
  flavor: Flavor
  onClose: () => void
}

export function InfoModal({ flavor, onClose }: InfoModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      style={{ animation: "fadeIn 0.15s ease" }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative w-[320px] p-6 rounded-2xl bg-white/25 backdrop-blur-2xl border border-white/20 shadow-xl"
        style={{ animation: "scaleIn 0.2s ease" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white/70 hover:text-white hover:bg-white/40 transition-all text-sm leading-none"
          aria-label="Cerrar"
        >
          ✕
        </button>

        {/* Nombre */}
        <h4
          className="font-zaza text-3xl mb-3 pr-8"
          style={{
            color: '#fff',
            textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
            WebkitTextStroke: `1px ${flavor.color}`,
          }}
        >
          {flavor.name}
        </h4>

        {/* Ingredientes */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {flavor.ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full"
              style={{
                backgroundColor: `${flavor.color}35`,
                color: '#fff',
              }}
            >
              {ingredient}
            </span>
          ))}
        </div>

        {/* Descripción como tagline */}
        <p className="text-white/80 text-sm leading-relaxed mb-4">
          {flavor.description}
        </p>

        {/* Precio badge */}
        <div
          className="inline-block px-4 py-1.5 rounded-xl text-white font-semibold text-sm tracking-wide shadow-sm"
          style={{ backgroundColor: flavor.color }}
        >
          {PRODUCT_PRICE}
        </div>
      </div>
    </div>,
    document.body,
  )
}
