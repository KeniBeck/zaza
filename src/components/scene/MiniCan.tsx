import { useRef, useMemo, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"
import { asset } from "../../constants"

function CanMini({ glbUrl, scale = 0.85 }: { glbUrl: string; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const startTime = useRef(0)

  const TARGET_X = -1.0         // posición X final — ajustar al gusto
  const TARGET_Y = -0.25         // posición Y de reposo — ajustar si sube/baja
  const ENTER_DURATION = 1.2    // segundos que dura la entrada

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
    // ease out expo — arranca rápido, frena muy suave al final
    const entryEase = entryProgress === 1 ? 1 : 1 - Math.pow(2, -10 * entryProgress)

    // ── Posición X — viene de la derecha, termina en TARGET_X ──
    const fromX = TARGET_X + 8
    groupRef.current.position.x = fromX + (TARGET_X - fromX) * entryEase

    // ── Posición Y — el idle de flotación arranca desde 0 y crece
    //    con entryEase como multiplicador — no hay salto ──
    groupRef.current.position.y = TARGET_Y          // Y fija, no flota
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.45  // sin inclinación


    // ── Rotación Y — gira desde el principio, siempre constante ──
    groupRef.current.rotation.y = t * 0.4
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