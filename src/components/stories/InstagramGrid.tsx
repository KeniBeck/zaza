import { useState } from "react"
import { asset } from "../../constants"

function GridImage({ index, gradientStart, gradientEnd, onClick }: {
  index: number
  gradientStart: string
  gradientEnd: string
  onClick: () => void
}) {
  const [errored, setErrored] = useState(false)
  const src = asset(`/image/nosotros/galeria-${index + 1}.webp`)
  const isMain = index === 0

  if (errored) {
    return (
      <div
        className={`${isMain ? "col-span-2 row-span-2" : ""} aspect-square flex items-center justify-center cursor-pointer`}
        style={{
          background: `${gradientStart}15`,
          border: isMain ? `2px dashed ${gradientEnd}30` : `1px solid ${gradientEnd}10`,
        }}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick() }}
        aria-label={`Abrir historia ${index + 1}`}
      >
        <span style={{ fontSize: isMain ? "36px" : "20px", opacity: 0.2 }}>📷</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`Galería ${index + 1}`}
      className={`${isMain ? "col-span-2 row-span-2" : ""} aspect-square object-cover w-full h-full cursor-pointer
        transition-all duration-300 ease-out hover:scale-105`}
      style={{
        border: isMain ? `2px dashed ${gradientEnd}30` : `1px solid ${gradientEnd}10`,
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

interface InstagramGridProps {
  gradientStart: string
  gradientEnd: string
  onImageClick: (index: number) => void
}

export function InstagramGrid({ gradientStart, gradientEnd, onImageClick }: InstagramGridProps) {
  return (
    <div className="grid grid-cols-3 gap-[3px] rounded-2xl overflow-hidden w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <GridImage
          key={i}
          index={i}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  )
}
