import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"
import { asset } from "../../constants"

interface DragState {
  isDragging: boolean
  lastX: number
  lastY: number
  velocityX: number
  velocityY: number
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function CanMini({ glbUrl, scale = 0.15 }: { glbUrl: string; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const drag = useRef<DragState>({
    isDragging: false,
    lastX: 0,
    lastY: 0,
    velocityX: 0,
    velocityY: 0,
  })
  const startTime = useRef(0)
  const animDone = useRef(false)
  const TARGET_X = -1.25
  const ENTER_FROM_X = TARGET_X + 8
  const ENTER_DURATION = 0.9

  const { scene } = useGLTF(asset(glbUrl))
  const cloned = useMemo(() => scene.clone(true), [scene])

  useEffect(() => {
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        const mat = (mesh.material as THREE.MeshStandardMaterial).clone()
        mat.alphaToCoverage = true
        mat.needsUpdate = true
        if (mat.map) {
          mat.map.anisotropy = 16
          mat.map.generateMipmaps = true
          mat.map.needsUpdate = true
        }
        mesh.material = mat
      }
    })
  }, [cloned])

  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(cloned.clone())
    const c = new THREE.Vector3()
    box.getCenter(c)
    return c.clone().negate()
  }, [cloned])

  useEffect(() => {
    const canvas = document.getElementById("mini-can-canvas")
    if (!canvas) return

    const onStart = (x: number, y: number) => {
      drag.current.isDragging = true
      drag.current.lastX = x
      drag.current.lastY = y
      drag.current.velocityX = 0
      drag.current.velocityY = 0
      document.body.style.overflow = 'hidden'
    }

    const onMove = (x: number, y: number) => {
      if (!drag.current.isDragging) return
      const dx = x - drag.current.lastX
      const dy = y - drag.current.lastY
      drag.current.velocityX = dx
      drag.current.velocityY = dy
      drag.current.lastX = x
      drag.current.lastY = y
    }

    const onEnd = () => {
      drag.current.isDragging = false
      document.body.style.overflow = ''
    }

    const onMouseDown = (e: MouseEvent) => onStart(e.clientX, e.clientY)
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY)
    const onMouseUp = () => onEnd()

    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault()
      onStart(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      onMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const onTouchEnd = () => onEnd()

    canvas.addEventListener("mousedown", onMouseDown)
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
    canvas.addEventListener("touchstart", onTouchStart, { passive: false })
    canvas.addEventListener("touchmove", onTouchMove, { passive: false })
    canvas.addEventListener("touchend", onTouchEnd)

    ;(canvas as HTMLElement).style.cursor = "grab"
    canvas.addEventListener("mousedown", () => {
      ;(canvas as HTMLElement).style.cursor = "grabbing"
    })
    canvas.addEventListener("mouseup", () => {
      ;(canvas as HTMLElement).style.cursor = "grab"
    })

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
      canvas.removeEventListener("touchstart", onTouchStart)
      canvas.removeEventListener("touchmove", onTouchMove)
      canvas.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    if (startTime.current === 0) startTime.current = clock.elapsedTime

    if (!animDone.current) {
      const elapsed = clock.elapsedTime - startTime.current
      const t = Math.min(elapsed / ENTER_DURATION, 1)
      const ease = easeOutCubic(t)
      groupRef.current.position.x = ENTER_FROM_X + (TARGET_X - ENTER_FROM_X) * ease
      if (t >= 1) {
        groupRef.current.position.x = TARGET_X
        animDone.current = true
      }
      return
    }

    if (drag.current.isDragging) {
      groupRef.current.rotation.y += drag.current.velocityX * 0.01
      groupRef.current.rotation.x += drag.current.velocityY * 0.01
    } else {
      drag.current.velocityX *= 0.92
      drag.current.velocityY *= 0.92
      groupRef.current.rotation.y += drag.current.velocityX * 0.01
      groupRef.current.rotation.x += drag.current.velocityY * 0.01
    }
  })

  return (
    <group ref={groupRef} scale={scale} position={[ENTER_FROM_X, -0.2, 0]}>
      <primitive object={cloned} position={centerOffset} />
    </group>
  )
}

interface MiniCanProps {
  glbUrl: string
  scale?: number
}

export function MiniCan({ glbUrl, scale = 0.85 }: MiniCanProps) {
  const isMobile = window.innerWidth < 768
  const dpr = Math.min(window.devicePixelRatio * (isMobile ? 1.2 : 2), isMobile ? 2 : 4)

  return (
    <Canvas
      id="mini-can-canvas"
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{
        antialias: true,
        alpha: true,
        precision: "highp",
        powerPreference: "high-performance",
      }}
      dpr={dpr}
      style={{
        background: "transparent",
        touchAction: "none",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 8, 6]} intensity={0.1} />
      <Environment preset="studio" environmentIntensity={1.8} />
      <CanMini glbUrl={glbUrl} scale={scale} />
    </Canvas>
  )
}
