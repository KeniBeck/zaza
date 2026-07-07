import { desktopClamp } from "../../../hooks/useScreenSize"
import { GallerySlider } from "./GallerySlider"

interface QuienesSomosDesktopProps {
  gradientStart: string
  gradientEnd: string
  onImageClick: (index: number) => void
}

export function QuienesSomosDesktop({ gradientStart, gradientEnd, onImageClick }: QuienesSomosDesktopProps) {
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
          ¿Quiénes somos?
        </p>

        <h2
          className="font-black leading-none text-white"
          style={{
            fontSize: desktopClamp("3rem", "2rem + 2.5vw", "5rem"),
            letterSpacing: "-1px",
          }}
        >
          Somos<br />
          <span
            className="font-zaza"
            style={{
              fontSize: desktopClamp("3.5rem", "2.5rem + 3vw", "5.5rem"),
              textShadow: `0 0 8px ${gradientStart}, 0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}`,
              WebkitTextStroke: `1px ${gradientStart}`,
            }}
          >
            parche.
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
            Nacimos para acompañar esos momentos que{" "}
            <strong className="font-bold" style={{ color: gradientEnd }}>
              no se planean
            </strong>{" "}
            pero terminan siendo los mejores. Creamos bebidas con sabor,
            actitud y la energía necesaria para convertir cualquier ocasión
            en una buena historia.
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
          Porque la vida sabe mejor cuando se vive a tu manera.
        </p>
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
