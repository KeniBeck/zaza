interface WaveDividerProps {
  /** Color claro al que se hace la transición (el fondo de la siguiente sección) */
  toColor: string
  /** Color de acento para teñir las burbujas decorativas (usa gradientEnd) */
  accentColor?: string
  /** Color oscuro de anclaje (usa gradientStart / activeFlavor.color) — con él se
   *  mezclan las olas superiores para evitar grises sucios sobre colabBg */
  darkColor?: string
  /** Alto total de la zona de transición en px */
  height?: number
  className?: string
}

function mixHex(a: string, b: string, t: number): string {
  const ca = [parseInt(a.substring(1, 3), 16), parseInt(a.substring(3, 5), 16), parseInt(a.substring(5, 7), 16)]
  const cb = [parseInt(b.substring(1, 3), 16), parseInt(b.substring(3, 5), 16), parseInt(b.substring(5, 7), 16)]
  return `#${[0, 1, 2].map(i => Math.round(ca[i] + (cb[i] - ca[i]) * t).toString(16).padStart(2, "0")).join("")}`
}

export function WaveDivider({
  toColor,
  accentColor,
  darkColor: darkColorProp,
  height = 240,
  className = "",
}: WaveDividerProps) {
  const tint = accentColor ?? toColor
  const dark = darkColorProp ?? accentColor ?? toColor
  const mid = mixHex(dark, toColor, 0.5)

  return (
    <div
      className={`absolute left-0 w-full pointer-events-none ${className}`}
      style={{ height: height + 2, bottom: -10 }}
    >
      {/* glow difuminado: arranca oscuro (empata con colabBg) y se desvanece */}
      <div
        className="absolute left-0 w-full"
        style={{
          top: 0,
          height: height * 0.55,
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${dark}44 0%, ${dark}00 60%)`,
          filter: "blur(28px)",
        }}
      />

      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="waveBlur1">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
          </filter>
          <filter id="waveBlur2">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" />
          </filter>
          <linearGradient id="waveGrad1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={dark} stopOpacity="0.22" />
            <stop offset="50%" stopColor={dark} stopOpacity="0.38" />
            <stop offset="100%" stopColor={dark} stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={mid} stopOpacity="0.35" />
            <stop offset="50%" stopColor={mid} stopOpacity="0.55" />
            <stop offset="100%" stopColor={mid} stopOpacity="0.35" />
          </linearGradient>
          <style>{`@keyframes wDrift{0%{transform:translateX(0)}100%{transform:translateX(14px)}}`}</style>
        </defs>
        {/* ola 1: oscura, se funde con colabBg — blur fuerte */}
        <path
          d="M0,60 C160,100 320,20 480,55 C640,90 800,30 960,65 C1120,100 1280,40 1440,70 L1440,320 L0,320 Z"
          fill="url(#waveGrad1)"
          filter="url(#waveBlur1)"
          opacity="0.35"
          style={{ animation: "wDrift 12s ease-in-out infinite alternate" }}
        />
        {/* ola 2: punto intermedio, mezcla oscuro→claro */}
        <path
          d="M0,130 C160,172 320,102 480,136 C640,170 800,110 960,144 C1120,178 1280,118 1440,150 L1440,320 L0,320 Z"
          fill="url(#waveGrad2)"
          filter="url(#waveBlur2)"
          opacity="0.55"
        />
        {/* ola 3: casi el color final, ya cubre gran parte — nítida */}
        <path
          d="M0,170 C160,212 320,144 480,178 C640,212 800,152 960,186 C1120,220 1280,160 1440,192 L1440,320 L0,320 Z"
          fill={toColor}
          opacity="0.75"
        />
        {/* ola 4: sólida, garantiza borde inferior 100% = toColor */}
        <path
          d="M0,200 C160,240 320,176 480,208 C640,240 800,184 960,216 C1120,248 1280,192 1440,220 L1440,320 L0,320 Z"
          fill={toColor}
          opacity="1"
        />
      </svg>

      {/* burbujas decorativas: divs HTML, siempre círculos perfectos */}
      <div
        className="absolute rounded-full"
        style={{
          left: "12%", top: "80%", width: 26, height: 26,
          border: `1.5px solid ${tint}55`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: "87%", top: "72%", width: 18, height: 18,
          border: `1.5px solid ${tint}48`,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          left: "53%", top: "88%", width: 10, height: 10,
          background: `${tint}38`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}