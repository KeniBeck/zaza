import { useRef, useCallback } from "react"
import { FlavorCard } from "./FlavorCard"
import { FLAVORS } from "../data/flavors"

interface SaboresProps {
  onFirstCardReady?: (el: HTMLElement | null) => void
}

export function Sabores({ onFirstCardReady }: SaboresProps) {
  const sectionRef = useRef<HTMLElement>(null)

  const handleFirstCardRef = useCallback(
    (el: HTMLDivElement | null) => {
      if (onFirstCardReady) onFirstCardReady(el)
    },
    [onFirstCardReady],
  )

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-5xl w-full">
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6B318B]">
            Nuestros Sabores
          </h2>
          <p className="mt-3 text-gray-500 text-sm md:text-base">
            Elige el tuyo y déjate llevar
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {FLAVORS.map((flavor, i) => (
            <FlavorCard
              key={flavor.id}
              flavor={flavor}
              isFirst={i === 0}
              onFirstCardRef={handleFirstCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
