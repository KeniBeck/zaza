import { useState } from "react"
import { asset } from "../../constants"

interface GalleryImageProps {
  index: number
  gradientStart: string
  gradientEnd: string
  onClick: () => void
  className?: string
}

const ALT_TEXT = [
  "Latas de cócteles artesanales ZAZA con frutas frescas",
  "Amigos brindando con cócteles ZAZA",
  "Manos sosteniendo latas de ZAZA de distintos sabores",
  "Personas disfrutando cócteles ZAZA en un bar",
  "Cóctel ZAZA Lulay con lulo y hielo",
  "Mujeres disfrutando cócteles ZAZA en una fiesta",
]

export function GalleryImage({ index, gradientStart, gradientEnd, onClick, className = "" }: GalleryImageProps) {
  const [errored, setErrored] = useState(false)
  const src = asset(`/image/emprender/galeria-${index + 1}.webp`)

  if (errored) {
    return (
      <div
        className={`aspect-square flex items-center justify-center cursor-pointer ${className}`}
        style={{
          background: `${gradientStart}15`,
          border: index === 0 ? `2px dashed ${gradientEnd}30` : `1px solid ${gradientEnd}10`,
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
        aria-label={`Abrir historia ${index + 1}`}
      >
        <span style={{ fontSize: index === 0 ? "36px" : "20px", opacity: 0.2 }}>📷</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={ALT_TEXT[index] ?? `Galería de cócteles ZAZA ${index + 1}`}
      decoding="async"
      className={`aspect-square object-cover cursor-pointer transition-all duration-300 ease-out hover:scale-105 ${className}`}
      style={{
        border: index === 0 ? `2px dashed ${gradientEnd}30` : `1px solid ${gradientEnd}10`,
        boxShadow: `0 0 0px ${gradientEnd}00`,
        transition: "transform 300ms ease-out, box-shadow 300ms ease-out",
      }}
      onClick={onClick}
      onError={() => setErrored(true)}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 20px ${gradientEnd}40`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0px ${gradientEnd}00`
      }}
      loading="lazy"
    />
  )
}
