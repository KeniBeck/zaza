import { desktopClamp } from "../../../hooks/useScreenSize"
import { GallerySlider } from "./GallerySlider"
import { FaWhatsapp, FaPaperPlane } from "react-icons/fa"
import { WHATSAPP_URL } from "../../../constants"

interface EmprenderDesktopProps {
  gradientStart: string
  gradientEnd: string
  onImageClick: (index: number) => void
}

export function EmprenderDesktop({ gradientStart, gradientEnd, onImageClick }: EmprenderDesktopProps) {
  return (
    <div
      className="flex items-start justify-center"
      style={{
        gap: desktopClamp("3rem", "2.5rem + 3vw", "7rem"),
      }}
    >
      <div
        className="flex flex-col flex-1 min-w-0"
        style={{
          maxWidth: desktopClamp("360px", "28vw + 100px", "560px"),
          gap: desktopClamp("1.25rem", "0.75rem + 1vw", "2.5rem"),
        }}
      >
        <p
          className="font-zaza"
          style={{
            fontSize: desktopClamp("2rem", "1.5rem + 1vw", "2.8rem"),
            color: gradientEnd,
            textShadow: `0 0 6px ${gradientStart}50, 0 0 14px ${gradientStart}25`,
            WebkitTextStroke: `0.5px ${gradientStart}60`,
            letterSpacing: "0.02em",
          }}
        >
          ¿Quieres asociarte con Zaza?
        </p>

        <h2
          className="font-black leading-none text-white"
          style={{
            fontSize: desktopClamp("3rem", "2rem + 2.5vw", "5rem"),
            letterSpacing: "-1px",
          }}
        >
          Emprende<br />
          <span
            className="font-zaza"
            style={{
              fontSize: desktopClamp("3.5rem", "2.5rem + 3vw", "5.5rem"),
              textShadow: `0 0 8px ${gradientStart}, 0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}`,
              WebkitTextStroke: `1px ${gradientStart}`,
            }}
          >
            con zaza.
          </span>
        </h2>

        <div
          className="relative rounded-[20px] backdrop-blur-xl bg-white/5 overflow-hidden"
          style={{
            border: `1px solid ${gradientEnd}30`,
            padding: desktopClamp("1.25rem", "0.75rem + 0.8vw", "2rem"),
          }}
        >
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
          <p
            className="leading-relaxed text-white/75"
            style={{ fontSize: desktopClamp("0.9rem", "0.6rem + 0.5vw", "1.05rem") }}
          >
            Aquí nos enfocamos en darte{" "}
            <strong className="font-bold" style={{ color: gradientEnd }}>
              la facilidad
            </strong>{" "}
            para llevar Zaza a tu negocio, convertirte en nuestro socio comercial y generar ingresos con nuestros productos.
            No importa si tienes una tienda, un bar, un pequeño negocio, una unidad residencial o estás buscando una nueva oportunidad para crecer. Queremos que Zaza sea parte de tu negocio.
          </p>
        </div>

        <p
          className="font-bold text-white leading-snug"
          style={{
            fontSize: desktopClamp("1rem", "0.65rem + 0.6vw", "1.25rem"),
            borderLeft: `3px solid ${gradientEnd}`,
            paddingLeft: desktopClamp("0.75rem", "0.5rem + 0.4vw", "1rem"),
          }}
        >
          Escríbenos ahora y haz parte de esto.
          Te queremos apoyar, queremos {" "}
          <strong className="font-bold" style={{ color: gradientEnd }}>
            crecer contigo
          </strong>{" "}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white"
            style={{ background: `linear-gradient(to right, ${gradientStart}, ${gradientEnd})` }}
          >
            <FaWhatsapp size={20} />
          </a>
          <a
            href="https://www.instagram.com/zaza.latam"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enviar mensaje por Instagram"
            className="inline-flex items-center justify-center rounded-xl border px-5 py-2.5 text-white/90 hover:bg-white/10 transition-colors"
            style={{ borderColor: `${gradientEnd}60` }}
          >
            <FaPaperPlane size={18} />
          </a>
        </div>
      </div>

      <div
        className="flex flex-col flex-1 min-w-0 justify-center"
        style={{
          maxWidth: desktopClamp("400px", "30vw + 100px", "580px"),
          gap: desktopClamp("0.35rem", "0.2rem + 0.2vw", "0.6rem"),
        }}
      >
        <p
          className="font-zaza text-center"
          style={{
            fontSize: desktopClamp("2rem", "1.5rem + 1vw", "2.8rem"),
            color: gradientEnd,
            textShadow: `0 0 6px ${gradientStart}50, 0 0 14px ${gradientStart}25`,
            WebkitTextStroke: `0.5px ${gradientStart}60`,
            letterSpacing: "0.02em",
          }}
        >
          Galería
        </p>
        <GallerySlider
          gradientStart={gradientStart}
          gradientEnd={gradientEnd}
          onImageClick={onImageClick}
        />
      </div>
    </div>
  )
}
