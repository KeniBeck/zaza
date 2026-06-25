interface QuienesSomosProps {
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
}

export function QuienesSomos({
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#C084FC",
}: QuienesSomosProps) {
  return (
    <section id="nosotros" className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 py-24 overflow-hidden">
      {/* FONDO */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, #1a0a2e 0%, #2d1155 50%, #1a0a2e 100%)" }}
      >
        {/* Blobs */}
        <div
          className="absolute"
          style={{
            width: "60vw",
            height: "60vw",
            maxWidth: 500,
            maxHeight: 500,
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            background: `radial-gradient(ellipse at 50% 40%, ${gradientStart}55 0%, ${gradientMid}33 40%, transparent 70%)`,
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "35vw",
            height: "35vw",
            maxWidth: 280,
            maxHeight: 280,
            top: "25%",
            left: "-8%",
            background: `radial-gradient(ellipse, ${gradientEnd}44 0%, transparent 70%)`,
            borderRadius: "70% 30% 60% 40% / 40% 60% 40% 60%",
            filter: "blur(30px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "30vw",
            height: "30vw",
            maxWidth: 240,
            maxHeight: 240,
            bottom: "20%",
            right: "-5%",
            background: `radial-gradient(ellipse, ${gradientMid}33 0%, transparent 70%)`,
            borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
            filter: "blur(25px)",
          }}
        />

        {/* Burbujas SVG */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <circle cx="100" cy="150" r="20" fill="none" stroke={`${gradientStart}40`} strokeWidth="1.5" />
          <circle cx="100" cy="150" r="15" fill={`${gradientStart}15`} />
          <circle cx="700" cy="200" r="16" fill="none" stroke={`${gradientMid}35`} strokeWidth="1.5" />
          <circle cx="700" cy="200" r="11" fill={`${gradientMid}15`} />
          <circle cx="150" cy="600" r="14" fill="none" stroke={`${gradientEnd}35`} strokeWidth="1.5" />
          <circle cx="650" cy="550" r="22" fill="none" stroke={`${gradientStart}30`} strokeWidth="1.5" />
          <circle cx="650" cy="550" r="17" fill={`${gradientStart}15`} />
          <circle cx="80" cy="400" r="7" fill={`${gradientEnd}30`} />
          <circle cx="720" cy="450" r="8" fill={`${gradientMid}30`} />
          <circle cx="400" cy="700" r="5" fill={`${gradientStart}30`} />
          <circle cx="200" cy="300" r="4" fill={`${gradientEnd}25`} />
          <circle cx="600" cy="120" r="6" fill={`${gradientMid}25`} />
        </svg>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-start gap-6 w-full max-w-sm">
        {/* Eyebrow */}
        <p className="font-sans text-xs tracking-[4px] uppercase font-semibold" style={{ color: gradientEnd }}>
          ¿Quiénes somos?
        </p>

        {/* Título */}
        <h2 style={{ fontSize: "52px", fontWeight: 900, lineHeight: 1, color: "#fff", letterSpacing: "-1px" }}>
          Somos<br />
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: `2px ${gradientEnd}`,
              fontFamily: "var(--font-zaza)",
            }}
          >
            parche.
          </span>
        </h2>

        {/* Card glassmorphism */}
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

        {/* Cita */}
        <p className="text-base font-bold text-white leading-snug pl-4" style={{ borderLeft: `3px solid ${gradientEnd}` }}>
          Porque la vida sabe mejor cuando se vive a tu manera.
        </p>

        {/* Label galería */}
        <div className="flex items-center gap-3 w-full">
          <span className="text-[11px] tracking-[3px] uppercase font-semibold" style={{ color: `${gradientEnd}80` }}>
            Galería
          </span>
          <div className="flex-1 h-px" style={{ background: `${gradientEnd}20` }} />
        </div>

        {/* Grid Instagram 3x2 */}
        <div className="grid grid-cols-3 gap-[3px] rounded-2xl overflow-hidden w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className={`${i === 0 ? "col-span-2 row-span-2" : ""} aspect-square flex items-center justify-center`}
              style={{
                background: `${gradientStart}15`,
                border: i === 0 ? `2px dashed ${gradientEnd}30` : `1px solid ${gradientEnd}10`,
              }}
            >
              <span style={{ fontSize: i === 0 ? "36px" : "20px", opacity: 0.2 }}>
                📷
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
