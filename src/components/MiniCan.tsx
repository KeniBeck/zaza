import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import * as THREE from "three"

interface MiniCanProps {
  glbUrl: string
}

export function MiniCan({ glbUrl }: MiniCanProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF(glbUrl)

  const sceneOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const c = new THREE.Vector3()
    box.getCenter(c)
    return new THREE.Vector3().copy(c).negate()
  }, [scene])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y += delta * 0.5
  })

  return (
    <group ref={groupRef} scale={0.0047}>
      <primitive object={scene} position={sceneOffset} />
    </group>
  )
}
