import { Suspense, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { MiniCan } from "./MiniCan"
import type { Flavor } from "../data/flavors"

interface FlavorCardProps {
  flavor: Flavor
  isFirst?: boolean
  onFirstCardRef?: (el: HTMLDivElement | null) => void
}

export function FlavorCard({ flavor, isFirst, onFirstCardRef }: FlavorCardProps) {
  const localRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={(el) => {
        localRef.current = el
        if (isFirst && onFirstCardRef) onFirstCardRef(el)
      }}
      id={isFirst ? "first-flavor-card" : undefined}
      className="group w-[260px] flex flex-col items-center gap-5 p-7 rounded-3xl bg-white/60 backdrop-blur-lg shadow-lg border border-white/30 transition-all duration-300 hover:bg-white/75 hover:shadow-xl hover:border-white/50"
      style={{ borderColor: `${flavor.color}20` }}
    >
      <div className="w-48 h-56">
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 28 }}
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 8, 6]} intensity={0.3} />
            <Environment preset="studio" environmentIntensity={1.2} />
            <MiniCan glbUrl={flavor.glb} />
          </Suspense>
        </Canvas>
      </div>

      <h3
        className="text-lg font-bold text-center"
        style={{ color: flavor.color }}
      >
        {flavor.name}
      </h3>
      <p className="text-xs text-gray-500 text-center -mt-2">
        {flavor.tagline}
      </p>
    </div>
  )
}
