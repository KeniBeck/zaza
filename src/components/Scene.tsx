import { Suspense } from "react"
import { Environment } from "@react-three/drei"
import { CanModel } from "./CanModel"

interface SceneProps {
  scrollYRef?: React.MutableRefObject<number>
  heroThreshold?: number
  glbUrl?: string
  isFlipped?: boolean
}

export function Scene({ scrollYRef, heroThreshold = 0, glbUrl, isFlipped }: SceneProps) {

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 8, 6]} intensity={0.1} />
      <Environment preset="studio" environmentIntensity={1.8} />

      <CanModel
        scrollYRef={scrollYRef}
        heroThreshold={heroThreshold}
        glbUrl={glbUrl}
        isFlipped={isFlipped}
      />
    </Suspense>
  )
}
