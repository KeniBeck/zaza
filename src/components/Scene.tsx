import { useRef, useMemo, Suspense } from "react"
import { useThree } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import { CanModel } from "./CanModel"
import * as THREE from "three"

interface SceneProps {
  scrollYRef?: React.MutableRefObject<number>
  heroThreshold?: number
  firstCardEl?: HTMLElement | null
  glbUrl?: string
  isFlipped?: boolean
}

export function Scene({ scrollYRef, heroThreshold = 0, firstCardEl = null, glbUrl, isFlipped }: SceneProps) {
  const camera = useThree((s) => s.camera)
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), [])

  const targetPosition = useMemo(() => {
    if (!firstCardEl) return null

    const rect = firstCardEl.getBoundingClientRect()
    const cy = rect.top + rect.height / 2

    mouse.current.set(0, -(cy / window.innerHeight) * 2 + 1)
    raycaster.current.setFromCamera(mouse.current, camera)
    const pt = new THREE.Vector3()
    raycaster.current.ray.intersectPlane(plane, pt)
    pt.x = -4.0
    return pt
  }, [firstCardEl, camera, plane])

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 8, 6]} intensity={0.1} />
      <Environment preset="studio" environmentIntensity={1.8} />

      <CanModel
        scrollYRef={scrollYRef}
        heroThreshold={heroThreshold}
        targetPosition={targetPosition}
        glbUrl={glbUrl}
        isFlipped={isFlipped}
      />
    </Suspense>
  )
}
