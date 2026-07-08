import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"
import { asset } from "../../constants"

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

function CanMini({ glbUrl, scale = 0.85 }: { glbUrl: string; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const startTime = useRef(0)

  const TARGET_X = -0.7         // posición X final — ajustar al gusto
  const TARGET_Y = -0.45         // posición Y de reposo — ajustar si sube/baja
  const ENTER_DURATION = 1.2    // segundos que dura la entrada
  const ENTRY_START_ANGLE = Math.PI * 0.2  // rotación Y inicial de entrada (sutil)
  const IDLE_SPEED = 0.07       // velocidad de giro continuo post-entrada

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

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    // Registrar tiempo de inicio una sola vez
    if (startTime.current === 0) startTime.current = clock.elapsedTime
    const t = clock.elapsedTime - startTime.current  // tiempo local desde que montó

    // ── Curva de entrada (0 → 1 en ENTER_DURATION segundos) ──
    const entryProgress = Math.min(t / ENTER_DURATION, 1)
    const entryEase = easeOutCubic(entryProgress)

    // ── Posición X — viene de la derecha, termina en TARGET_X ──
    const fromX = TARGET_X + 8
    groupRef.current.position.x = fromX + (TARGET_X - fromX) * entryEase

    // ── Posición Y fija ──
    groupRef.current.position.y = TARGET_Y

    // ── Rotación Y de entrada: arranca torcida con ENTRY_START_ANGLE
    //    y se asienta suavemente a 0 durante la entrada ──
    const entryRotY = ENTRY_START_ANGLE * (1 - entryEase)

    // ── Giro continuo sutil después de la entrada ──
    let idleRotY = 0
    let idleTiltX = 0
    if (entryProgress >= 1) {
      const idleT = t - ENTER_DURATION
      idleRotY = idleT * IDLE_SPEED
      idleTiltX = Math.sin(idleT * 0.4) * 0.03
    }

    groupRef.current.rotation.y = entryRotY + idleRotY
    groupRef.current.rotation.x = idleTiltX
  })

  return (
    // position inicial en X fuera de pantalla, Y en TARGET_Y
    // useFrame lo mueve desde el primer frame
    <group ref={groupRef} scale={scale} position={[TARGET_X + 8, TARGET_Y, 0]}>
      <primitive object={cloned} position={centerOffset} />
    </group>
  )
}

interface MiniCanProps {
  glbUrl: string
  scale?: number
  cameraZ?: number
}

export function MiniCan({ glbUrl, scale = 0.85, cameraZ = 3.5 }: MiniCanProps) {
  const isMobile = window.innerWidth < 768
  const dpr = Math.min(window.devicePixelRatio * (isMobile ? 1.2 : 2), isMobile ? 2 : 4)

  return (
    <Canvas
      id="mini-can-canvas"
      camera={{ position: [0, 0, cameraZ], fov: 45 }}
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