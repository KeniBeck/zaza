import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

const START_Y = 0.3
const FINAL_Y = 0.3
const DURATION = 0.8
const MODEL_SCALE = 0.010
const TRANSITION_RANGE = 600
const HERO_X_START = 0.011
const HERO_X_END = -2.0
const HERO_Y_START = -0.01
const HERO_Y_END = -0.3
const CARD_X = -1.5
const CARD_Y = -0.1

interface CanModelProps {
  scrollY?: number
  heroThreshold?: number
  targetPosition?: THREE.Vector3 | null
}

export function CanModel({ scrollY = 0, heroThreshold = 0, targetPosition = null }: CanModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotateRef = useRef<THREE.Group>(null)
  const startTime = useRef(0)
  const dropDone = useRef(false)
  const heroPos = useRef(new THREE.Vector3(HERO_X_START, FINAL_Y + START_Y, 0))
  const lerpTarget = useRef(new THREE.Vector3())

  const { scene } = useGLTF("/textura-morada.glb")

  const [rotateOrigin, sceneOffset] = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const c = new THREE.Vector3()
    box.getCenter(c)
    const origin = new THREE.Vector3(0, -0.77, 0).add(c)
    const offset = new THREE.Vector3().copy(c).negate()
    return [origin, offset]
  }, [scene])

  useFrame(({ clock }) => {
    if (!groupRef.current || !rotateRef.current) return
    if (startTime.current === 0) startTime.current = clock.elapsedTime

    if (!dropDone.current) {
      const elapsed = clock.elapsedTime - startTime.current
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      heroPos.current.y = FINAL_Y + START_Y * (1 - eased)
      if (progress >= 1) dropDone.current = true
    }

    const scrollProgress = Math.min(scrollY / Math.max(heroThreshold, 1), 1)
    const envelope = Math.sin(Math.min(scrollProgress * Math.PI, Math.PI))
    const tiltFactor = 0.08 + envelope * 0.8
    const rad = scrollY * 0.004
    rotateRef.current.rotation.x = Math.sin(rad) * tiltFactor
    rotateRef.current.rotation.z = Math.cos(rad) * tiltFactor
    rotateRef.current.rotation.y = envelope * Math.sin(rad * 0.5) * 1.2

    heroPos.current.x = HERO_X_START + scrollProgress * (HERO_X_END - HERO_X_START)
    if (dropDone.current) {
      heroPos.current.y = HERO_Y_START + scrollProgress * (HERO_Y_END - HERO_Y_START)
    }

    if (targetPosition && scrollY > heroThreshold) {
      const t = Math.min((scrollY - heroThreshold) / TRANSITION_RANGE, 1)
      const smoothT = 1 - Math.pow(1 - t, 3)
      lerpTarget.current.copy(targetPosition)
      lerpTarget.current.x = CARD_X
      lerpTarget.current.y = CARD_Y
      groupRef.current.position.lerpVectors(heroPos.current, lerpTarget.current, smoothT)
    } else {
      groupRef.current.position.copy(heroPos.current)
    }
  })

  return (
    <group ref={groupRef} scale={MODEL_SCALE}>
      <group ref={rotateRef} position={rotateOrigin}>
        <primitive object={scene} position={sceneOffset} />
      </group>
    </group>
  )
}
