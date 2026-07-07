import { useState, useEffect } from "react"

export function useCrossfade<T>(item: T): [T[], number] {
  const [layers, setLayers] = useState<T[]>([item, item])
  const [activeLayer, setActiveLayer] = useState(0)

  useEffect(() => {
    const nextLayer = activeLayer === 0 ? 1 : 0
    setLayers(prev => {
      const next = [...prev]
      next[nextLayer] = item
      return next
    })
    setActiveLayer(nextLayer)
  }, [item])

  return [layers, activeLayer]
}
