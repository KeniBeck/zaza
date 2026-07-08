import { useState, useCallback } from "react"
import { BackgroundBlobs } from "../../shared/BackgroundBlobs"
import { BubbleSvg } from "../../shared/BubbleSvg"
import { InstagramGrid } from "../../stories/InstagramGrid"
import { StoryModal } from "../../stories/StoryModal"
import { QuienesSomosDesktop } from "../desktop/QuienesSomosDesktop"

interface QuienesSomosProps {
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  nosotrosBg?: string
}

export function QuienesSomos({
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#C084FC",
  nosotrosBg = "linear-gradient(160deg, #2a0d3a 0%, #3d1560 100%)",
}: QuienesSomosProps) {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [activeStory, setActiveStory] = useState(0)

  const handleImageClick = useCallback((index: number) => {
    setActiveStory(index)
    setViewerOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setViewerOpen(false)
  }, [])

  return (
    <section id="nosotros" className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: nosotrosBg }}
      >
        <BackgroundBlobs
          gradientStart={gradientStart}
          gradientMid={gradientMid}
          gradientEnd={gradientEnd}
        />
        <BubbleSvg
          gradientStart={gradientStart}
          gradientMid={gradientMid}
          gradientEnd={gradientEnd}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <div className="md:hidden flex flex-col items-start gap-6 w-full max-w-sm">
          <p className="font-zaza text-4xl tracking-[4px] mt-2" style={{ color: gradientEnd }}>
            ¿Quiénes somos?
          </p>

          <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: "-1px" }}>
            Somos<br />
            <span
              style={{
                textShadow: `0 0 8px ${gradientStart}, 0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}`,
                WebkitTextStroke: `1px ${gradientStart}`,
                fontFamily: "var(--font-zaza)",
                fontSize: "62px",
              }}
            >
              parche.
            </span>
          </h2>

          <div
            className="relative rounded-[20px] p-5 backdrop-blur-xl bg-white/5 overflow-hidden"
            style={{ border: `1px solid ${gradientEnd}30` }}
          >
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
            <p className="text-sm leading-relaxed text-white/75">
              Nacimos para acompañar esos momentos que{" "}
              <strong className="font-bold" style={{ color: gradientEnd }}>
                no se planean
              </strong>{" "}
              pero terminan siendo los mejores. Creamos bebidas con sabor,
              actitud y la energía necesaria para convertir cualquier ocasión
              en una buena historia.
            </p>
          </div>

          <p className="text-base font-bold text-white leading-snug pl-4" style={{ borderLeft: `3px solid ${gradientEnd}` }}>
            Porque la vida sabe mejor cuando se vive a tu manera.
          </p>

          <div className="flex items-center justify-center w-full">
            <span className="font-zaza text-3xl tracking-[3px]" style={{ color: `${gradientEnd}80` }}>
              Galería
            </span>
          </div>

          <InstagramGrid
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            onImageClick={handleImageClick}
          />
        </div>

        <div className="hidden md:block w-full">
          <QuienesSomosDesktop
            gradientStart={gradientStart}
            gradientEnd={gradientEnd}
            onImageClick={handleImageClick}
          />
        </div>
      </div>

      <StoryModal
        open={viewerOpen}
        initialIndex={activeStory}
        gradientStart={gradientStart}
        gradientMid={gradientMid}
        gradientEnd={gradientEnd}
        onClose={handleClose}
      />
    </section>
  )
}
