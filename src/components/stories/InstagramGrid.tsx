import { GalleryImage } from "./GalleryImage"

interface InstagramGridProps {
  gradientStart: string
  gradientEnd: string
  onImageClick: (index: number) => void
}

export function InstagramGrid({ gradientStart, gradientEnd, onImageClick }: InstagramGridProps) {
  return (
    <div className="grid grid-cols-3 gap-[3px] rounded-2xl overflow-hidden w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <GalleryImage
          key={i}
          index={i}
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
          onClick={() => onImageClick(i)}
          className={i === 0 ? "col-span-2 row-span-2" : ""}
        />
      ))}
    </div>
  )
}
