import { useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { asset } from "../constants"

const MODEL_SCALE_DESKTOP = 0.098
const MODEL_SCALE_MOBILE = 0.075
const MOBILE_BREAKPOINT = 768

const HERO_X_DESKTOP = 0.011
const HERO_X_MOBILE = 0.05

const screenW = window.innerWidth
const screenH = window.innerHeight

const HERO_Y_DESKTOP = -0.01
const HERO_Y_MOBILE =
  screenW <= 360 && screenH >= 700 ? 0.28 :
    screenW < 376
      ? 0.18    // Mini/SE — funciona bien actualmente
      : screenW < 393
        ? 0.22     // iPhone 13/14 estándar
        : screenW < 430
          ? 0.30    // iPhone 14 Pro
          : 0.26    // Pro Max y más grandes
const SCROLL_X_RANGE_DESKTOP = 0.5
const SCROLL_X_RANGE_MOBILE = -0.01
const SCROLL_Y_RANGE_DESKTOP = 0.2
const SCROLL_Y_RANGE_MOBILE = screenW <= 360 && screenH >= 700 ? 0.3 :
  screenW > 410 ? 0.3 : 0.2
const DURATION = 0.8
const DROP_HEIGHT_DESKTOP = 0.6
const DROP_HEIGHT_MOBILE = 0.45

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

interface CanModelProps {
  scrollYRef?: React.MutableRefObject<number>
  heroThreshold?: number
  glbUrl?: string
  isFlipped?: boolean
}

export function CanModel({ scrollYRef, heroThreshold = 0, glbUrl, isFlipped }: CanModelProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotateRef = useRef<THREE.Group>(null)
  const startTime = useRef(0)
  const animDone = useRef(false)
  const flipProgress = useRef(0)
  const materialsRef = useRef<THREE.MeshStandardMaterial[]>([])
  const config = useMemo(() => {
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT
    return {
      isMobile,
      heroX: isMobile ? HERO_X_MOBILE : HERO_X_DESKTOP,
      heroY: isMobile ? HERO_Y_MOBILE : HERO_Y_DESKTOP,
      dropHeight: isMobile ? DROP_HEIGHT_MOBILE : DROP_HEIGHT_DESKTOP,
      scrollXRange: isMobile ? SCROLL_X_RANGE_MOBILE : SCROLL_X_RANGE_DESKTOP,
      scrollYRange: isMobile ? SCROLL_Y_RANGE_MOBILE : SCROLL_Y_RANGE_DESKTOP,
    }
  }, [])

  const pos = useRef(new THREE.Vector3(config.heroX, config.heroY + config.dropHeight, 0))

  const modelUrl = glbUrl ? asset(glbUrl) : asset("/textura-morada.glb")
  const { scene } = useGLTF(modelUrl)

  useEffect(() => {
    materialsRef.current = []
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mat = mesh.material as THREE.MeshStandardMaterial
        mesh.renderOrder = 1
        if (mat) {
          mat.alphaToCoverage = true
          mat.needsUpdate = true
          if (mat.map) {
            mat.map.anisotropy = 16
            mat.map.minFilter = THREE.LinearMipmapLinearFilter
            mat.map.generateMipmaps = true
            mat.map.needsUpdate = true
          }
          materialsRef.current.push(mat)
        }
      }
    })
  }, [scene])

  const modelScale = useMemo(
    () => (window.innerWidth < MOBILE_BREAKPOINT ? MODEL_SCALE_MOBILE : MODEL_SCALE_DESKTOP),
    [],
  )

  const [rotateOrigin, sceneOffset] = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene.clone())
    const c = new THREE.Vector3()
    box.getCenter(c)
    const origin = new THREE.Vector3(0, -0.77, 0).add(c)
    const offset = new THREE.Vector3().copy(c).negate()
    return [origin, offset]
  }, [])

  const initialPos = useMemo(
    () => new THREE.Vector3(config.heroX, config.heroY + config.dropHeight, 0),
    [],
  )

  useEffect(() => {
    startTime.current = 0
    animDone.current = false
    pos.current.set(config.heroX, config.heroY + config.dropHeight, 0)
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current || !rotateRef.current) return
    if (startTime.current === 0) startTime.current = clock.elapsedTime

    // Animar flip sincronizado con la card
    const flipTarget = isFlipped ? 1 : 0
    flipProgress.current += (flipTarget - flipProgress.current) * 0.08
    const flipAngle = flipProgress.current * Math.PI

    groupRef.current.rotation.y = flipAngle

    const scaleMultiplier = 1 - Math.sin(flipAngle) * 0.15
    groupRef.current.scale.setScalar(modelScale * scaleMultiplier)

    const elapsed = clock.elapsedTime - startTime.current

    if (!animDone.current) {
      const t = Math.min(elapsed / DURATION, 1)
      const ease = easeOutCubic(t)
      pos.current.y = config.heroY + config.dropHeight * (1 - ease)
      groupRef.current.position.y = pos.current.y
      if (t >= 1) {
        pos.current.y = config.heroY
        groupRef.current.position.y = config.heroY
        animDone.current = true
      }
    }

    const rawScrollY = scrollYRef?.current ?? 0
    const scrollY = Math.min(rawScrollY, heroThreshold)
    const scrollProgress = Math.min(scrollY / Math.max(heroThreshold, 1), 1)

    const rawEnvelope = Math.sin(Math.min(scrollProgress * Math.PI, Math.PI))
    const envelope = config.isMobile ? 0.25 + 0.75 * rawEnvelope : rawEnvelope
    const tiltFactor = config.isMobile ? 0.15 + envelope * 0.5 : 0.08 + envelope * 0.8
    const rad = scrollY * 0.004
    rotateRef.current.rotation.x = Math.sin(rad) * tiltFactor
    rotateRef.current.rotation.z = Math.cos(rad) * tiltFactor
    rotateRef.current.rotation.y = envelope * Math.sin(rad * 0.5) * 1.2

    if (animDone.current) {
      pos.current.x = config.heroX + scrollProgress * (-config.scrollXRange - config.heroX)
      pos.current.y = config.heroY + scrollProgress * (-config.scrollYRange)
    }

    groupRef.current.position.copy(pos.current)

    const flipShouldHide = flipProgress.current > 0.5
    const targetOpacity = flipShouldHide ? 0 : 1

    materialsRef.current.forEach(mat => {
      mat.transparent = true
      mat.opacity += (targetOpacity - mat.opacity) * 0.15
      mat.needsUpdate = true
    })

    groupRef.current.visible = materialsRef.current.some(m => m.opacity > 0.01)
  })

  return (
    <group ref={groupRef} position={initialPos}>
      <group ref={rotateRef} position={rotateOrigin}>
        <primitive object={scene} position={sceneOffset} />
      </group>
    </group>
  )
}
