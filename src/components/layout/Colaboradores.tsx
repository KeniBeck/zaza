import { useEffect, useRef, useState } from "react"
import { BackgroundBlobs } from "../shared/BackgroundBlobs"
import { BubbleSvg } from "../shared/BubbleSvg"
import { COLABORADORES, type Colaborador } from "../../data/colaboradores"
import { asset } from "../../constants"
import { MiniCan } from "../scene/MiniCan"

interface ColaboradoresProps {
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  colabBg?: string
  glbUrl?: string
}

function ColaboradorCard({ colaborador, gradientEnd }: {
  colaborador: Colaborador
  gradientEnd: string
}) {
  return (
    <div
      className="relative rounded-[18px] backdrop-blur-xl bg-white/5 overflow-hidden flex items-stretch gap-4"
      style={{ border: `1px solid ${gradientEnd}30` }}
    >
      <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />

      <div
        className="w-28 self-stretch rounded-s-[18px] overflow-hidden flex-shrink-0 border-r"
        style={{ borderColor: `${gradientEnd}50` }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${gradientEnd}44, #6B318B88)` }}
        >
          <img
            src={asset(colaborador.foto)}
            alt={colaborador.nombre}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0 py-4 pr-4">
        <p className="font-black text-white text-[17px] leading-none tracking-tight">
          {colaborador.nombre}
        </p>
        <p className="text-[9.5px] font-semibold uppercase tracking-[1.5px]"
          style={{ color: gradientEnd }}>
          {colaborador.rol}
        </p>
        <div className="w-6 h-px my-1.5" style={{ background: `${gradientEnd}50` }} />
        <p className="text-[11.5px] leading-relaxed text-white/55">
          {colaborador.descripcion}
        </p>
        <a
          href={`https://instagram.com/${colaborador.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-0.5"
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
  )
}

export function Colaboradores({
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#C084FC",
  colabBg = "linear-gradient(160deg, #1c0828 0%, #280d45 100%)",
  glbUrl = "/textura-morada.glb",
}: ColaboradoresProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [canvasMounted, setCanvasMounted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasMounted(true)
        } else {
          setTimeout(() => setCanvasMounted(false), 300)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="colaboradores" className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 py-24 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: colabBg }}
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

      <div className="relative z-10 flex flex-col items-start gap-6 w-full max-w-sm">
        <p className="font-sans text-xs tracking-[4px] uppercase font-semibold" style={{ color: gradientEnd }}>
          Colaboradores
        </p>

        <div className="flex items-start w-full">
          <div style={{ flexShrink: 0, width: "160px" }}>
            <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: "-1px" }}>
              El<br />team<br />
              <span
                style={{
                  textShadow: `0 0 8px ${gradientStart}, 0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}`,
                  WebkitTextStroke: `1px ${gradientStart}`,
                  fontFamily: "var(--font-zaza)",
                  fontSize: "62px",
                }}
              >
                zaza.
              </span>
            </h2>
          </div>

          <div style={{ flex: 1, height: "194px" }}>
            {canvasMounted && <MiniCan glbUrl={glbUrl} scale={0.15} />}
          </div>
        </div>

        <p className="text-base font-bold text-white leading-snug pl-4"
          style={{ borderLeft: `3px solid ${gradientEnd}` }}>
          Los que hacen que esto sea real, todos los días.
        </p>

        <div className="flex items-center gap-3 w-full">
          <span className="text-[11px] tracking-[3px] uppercase font-semibold"
            style={{ color: `${gradientEnd}80` }}>
            El parche
          </span>
          <div className="flex-1 h-px" style={{ background: `${gradientEnd}20` }} />
        </div>

        <div className="flex flex-col gap-3 w-full">
          {COLABORADORES.map((c) => (
            <ColaboradorCard key={c.nombre} colaborador={c} gradientEnd={gradientEnd} />
          ))}
        </div>
      </div>
    </section>
  )
}
