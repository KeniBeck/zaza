import { useState, useCallback } from "react"
import { FaWhatsapp, FaPaperPlane } from "react-icons/fa"
import { BackgroundBlobs } from "../../shared/BackgroundBlobs"
import { BubbleSvg } from "../../shared/BubbleSvg"
import { InstagramGrid } from "../../stories/InstagramGrid"
import { StoryModal } from "../../stories/StoryModal"
import { EmprenderDesktop } from "../desktop/EmprenderDesktop"
import { WHATSAPP_URL } from "../../../constants"

interface EmprenderProps {
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  emprenderBg?: string
}

export function Emprender({
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#C084FC",
  emprenderBg = "linear-gradient(160deg, #2a0d3a 0%, #3d1560 100%)",
}: EmprenderProps) {
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
    <section id="emprender" className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: emprenderBg }}
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
            ¿Quieres asociarte con Zaza?
          </p>

          <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: "-1px" }}>
            Emprende<br />
            <span
              style={{
                textShadow: `0 0 8px ${gradientStart}, 0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}`,
                WebkitTextStroke: `1px ${gradientStart}`,
                fontFamily: "var(--font-zaza)",
                fontSize: "62px",
              }}
            >
              con zaza.
            </span>
          </h2>

          <div
            className="relative rounded-[20px] p-5 backdrop-blur-xl bg-white/5 overflow-hidden"
            style={{ border: `1px solid ${gradientEnd}30` }}
          >
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
            <p className="text-sm leading-relaxed text-white/75">
              Aquí nos enfocamos en darte{" "}
              <strong className="font-bold" style={{ color: gradientEnd }}>
                la facilidad
              </strong>{" "}
              para llevar Zaza a tu negocio, convertirte en nuestro socio comercial y generar ingresos con nuestros productos.
                 {" "} <strong className="font-bold" style={{ color: gradientEnd }}>
                No importa
              </strong>{" "}si tienes una tienda, un bar, un pequeño negocio, una unidad residencial o estás buscando una nueva oportunidad para crecer. Queremos que Zaza sea parte de tu negocio.
            </p>
          </div>

          <p className="text-base font-bold text-white leading-snug pl-4" style={{ borderLeft: `3px solid ${gradientEnd}` }}>
            Escríbenos ahora y haz parte de esto.
            Te queremos apoyar, queremos {" "}
            <strong className="font-bold" style={{ color: gradientEnd }}>
              crecer contigo
            </strong>{" "}
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center rounded-xl px-4 py-2 text-white"
              style={{ background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})` }}
            >
              <FaWhatsapp size={18} />
            </a>
            <a
              href="https://www.instagram.com/zaza.latam"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Enviar mensaje por Instagram"
              className="inline-flex items-center justify-center rounded-xl border px-4 py-2 text-white/90 hover:bg-white/10 transition-colors"
              style={{ borderColor: `${gradientEnd}60` }}
            >
              <FaPaperPlane size={16} />
            </a>
          </div>

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
          <EmprenderDesktop
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
