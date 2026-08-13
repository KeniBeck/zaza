import { useRef, useState, useEffect, useCallback } from "react"
import { desktopClamp } from "../../../hooks/useScreenSize"
import { MiniCan } from "../../scene/MiniCan"
import { COLABORADORES, type Colaborador } from "../../../data/colaboradores"
import { asset } from "../../../constants"

function lightenHex(hex: string, amount = 0.45): string {
  const h = hex.replace("#", "")
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h
  const num = parseInt(full, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  const lr = Math.round(r + (255 - r) * amount)
  const lg = Math.round(g + (255 - g) * amount)
  const lb = Math.round(b + (255 - b) * amount)
  return `#${((1 << 24) + (lr << 16) + (lg << 8) + lb).toString(16).slice(1)}`
}

interface ColaboradoresDesktopProps {
  gradientStart: string
  gradientMid: string
  gradientEnd: string
  glbUrl: string
  canvasMounted: boolean
}

function PosterCard({ colaborador, gradientEnd }: { colaborador: Colaborador; gradientEnd: string }) {
  const [revealed, setRevealed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const hasHover = useRef(true)

  useEffect(() => {
    hasHover.current = window.matchMedia("(hover: hover)").matches
  }, [])

  const show = useCallback(() => setRevealed(true), [])
  const hide = useCallback(() => setRevealed(false), [])

  const handleMouseEnter = () => { setHovered(true); if (hasHover.current) show() }
  const handleMouseLeave = () => { setHovered(false); if (hasHover.current) hide() }
  const handleFocus = () => { setHovered(true); show() }
  const handleBlur = (e: React.FocusEvent) => {
    setHovered(false)
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      if (!hasHover.current || !e.currentTarget.matches(":hover")) hide()
    }
  }
  const handleClick = () => { if (!hasHover.current) setRevealed(v => !v) }

  return (
    <div
      ref={cardRef}
      role="article"
      tabIndex={0}
      className="relative cursor-pointer outline-none transition-all duration-300 ease-out"
      style={{
        aspectRatio: "3/4",
        transform: hovered ? "scale(1.03)" : "scale(1)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    >
      <img
        src={asset(colaborador.foto)}
        alt={colaborador.nombre}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out"
        style={{
          WebkitMaskImage: [
            "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          ].join(", "),
          WebkitMaskComposite: "source-in",
          maskImage: [
            "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          ].join(", "),
          maskComposite: "intersect",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
        loading="lazy"
        decoding="async"
      />

      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          background: revealed || hovered
            ? "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.3) 75%, transparent 100%)"
            : "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, transparent 70%)",
          WebkitMaskImage: [
            "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          ].join(", "),
          WebkitMaskComposite: "source-in",
          maskImage: [
            "linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%)",
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          ].join(", "),
          maskComposite: "intersect",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col"
        style={{ padding: `0 ${desktopClamp("0.75rem", "0.5rem + 0.4vw", "1.5rem")} ${desktopClamp("0.5rem", "0.4rem + 0.3vw", "1rem")}` }}
      >
        <p
          className="font-black text-white leading-tight"
          style={{
            fontSize: desktopClamp("1.1rem", "0.8rem + 0.5vw", "1.5rem"),
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {colaborador.nombre}
        </p>
        <p
          className="font-semibold uppercase tracking-[1.5px]"
          style={{
            fontSize: desktopClamp("0.6rem", "0.42rem + 0.25vw", "0.8rem"),
            color: lightenHex(gradientEnd, 0.5),
            textShadow: `0 1px 6px rgba(0,0,0,0.9), 0 3px 14px ${gradientEnd}`,
          }}
        >
          {colaborador.rol}
        </p>

        <div
          className="overflow-hidden transition-all duration-[400ms] ease-out"
          style={{
            maxHeight: revealed ? "200px" : "0",
            opacity: revealed ? 1 : 0,
            marginTop: revealed ? "0.5rem" : "0",
          }}
        >
          <div className="w-6 h-px mb-2" style={{ background: `${gradientEnd}50` }} />
          <p
            className="font-normal leading-relaxed text-white/70"
            style={{
              fontSize: desktopClamp("0.85rem", "0.55rem + 0.4vw", "1rem"),
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {colaborador.descripcion}
          </p>
          <a
            href={`https://instagram.com/${colaborador.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2"
            onClick={(e) => e.stopPropagation()}
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
          >
            <img
              src={asset("/decor/ig.png")}
              alt="Instagram"
              className="w-3.5 h-3.5"
            />
            <span className="text-[10px] font-medium tracking-tight text-white/40 hover:text-white/70 transition-colors">
              @{colaborador.instagram}
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export function ColaboradoresDesktop({
  gradientStart,
  gradientEnd,
  glbUrl,
  canvasMounted,
}: ColaboradoresDesktopProps) {
  return (
    <div
      className="flex items-center justify-center px-5 py-8 flex-1 min-h-0"
      style={{ gap: desktopClamp("3rem", "2rem + 3vw", "6rem") }}
    >
      <div
        className="sticky flex flex-col flex-1 min-w-0 self-start"
        style={{
          top: desktopClamp("80px", "60px + 3vw", "120px"),
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
          Colaboradores
        </p>

        <div className="flex items-start w-full">
          <div style={{ flexShrink: 0, width: desktopClamp("160px", "100px + 8vw", "220px") }}>
            <h2
              className="font-black leading-none text-white"
              style={{
                fontSize: desktopClamp("3rem", "2rem + 2.5vw", "5rem"),
                letterSpacing: "-1px",
              }}
            >
              El<br />team<br />
              <span
                className="font-zaza"
                style={{
                  fontSize: desktopClamp("3.5rem", "2.5rem + 3vw", "5.5rem"),
                  textShadow: `0 0 8px ${gradientStart}, 0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}`,
                  WebkitTextStroke: `1px ${gradientStart}`,
                }}
              >
                zaza.
              </span>
            </h2>
          </div>

          <div
            style={{
              flex: 1,
              height: desktopClamp("200px", "140px + 10vw", "340px"),
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                right: desktopClamp("-60px", "-3rem + -3vw", "-140px"),
                pointerEvents: "none",
              }}
            >
              {canvasMounted && <MiniCan glbUrl={glbUrl} scale={0.25} cameraZ={5.5} />}
            </div>
          </div>
        </div>

        <p
          className="font-bold text-white leading-snug"
          style={{
            fontSize: desktopClamp("1rem", "0.65rem + 0.6vw", "1.25rem"),
            borderLeft: `3px solid ${gradientEnd}`,
            paddingLeft: desktopClamp("0.75rem", "0.5rem + 0.4vw", "1rem"),
          }}
        >
          Los que hacen que esto sea real, todos los días.
        </p>
      </div>
      <div
        className="flex-1 min-w-0 text-center"
        style={{
          maxWidth: desktopClamp("450px", "60vw + 200px", "1400px"),
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
          el parche
        </p>
        <div
          className="grid grid-cols-3"
          style={{ gap: desktopClamp("0.75rem", "0.5rem + 0.5vw", "1.5rem") }}
        >
          {COLABORADORES.map((c) => (
            <PosterCard key={c.nombre} colaborador={c} gradientEnd={gradientEnd} />
          ))}
        </div>
      </div>
    </div>
  )
}
