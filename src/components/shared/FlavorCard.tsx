import { useRef } from "react"
import type { Flavor } from "../../data/flavors"

interface FlavorCardProps {
  flavor: Flavor
  isFirst?: boolean
}

export function FlavorCard({ flavor, isFirst }: FlavorCardProps) {
  const localRef = useRef<HTMLDivElement>(null)
  const isMobile = window.innerWidth < 768

  return (
    <div
      ref={(el) => { localRef.current = el }}
      id={isFirst ? "first-flavor-card" : undefined}
      className="group w-[260px] flex-shrink-0 snap-center flex flex-col items-center justify-center gap-4 px-7 py-16 rounded-3xl
        bg-white/10 md:bg-white/60
        backdrop-blur-xl md:backdrop-blur-lg
        shadow-xl md:shadow-lg
        border
        transition-all duration-300
        md:hover:bg-white/75 md:hover:shadow-xl md:hover:border-white/50"
      style={{
        borderColor: isMobile ? `${flavor.color}40` : `${flavor.color}20`,
        boxShadow: isMobile
          ? "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)"
          : undefined,
      }}
    >
      <h3
        className="text-3xl font-zaza text-center"
        style={{
          color: '#fff',
          textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
          WebkitTextStroke: `1px ${flavor.color}`,
        }}
      >
        {flavor.name}
      </h3>
      <p className="text-xs text-center" style={{ color: isMobile ? "#C4B5FD" : "#6B7280" }}>
        {flavor.tagline}
      </p>
    </div>
  )
}
