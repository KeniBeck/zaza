interface WaveDividerProps {
  /** Color claro al que se hace la transición (el fondo de la siguiente sección) */
  toColor: string
  /** Color de acento para teñir las olas intermedias (usa gradientEnd o gradientMid) */
  accentColor?: string
  /** Alto total de la zona de transición en px */
  height?: number
  className?: string
}

/**
 * Franja de olas apilada al fondo de un contenedor (position: absolute, bottom: 0).
 * Colócalo como último hijo del div que pinta el fondo oscuro de la sección
 * (el que tiene `absolute inset-0` con colabBg / sectionBg), para que las olas
 * "revelen" el color claro de la siguiente sección de forma orgánica.
 *
 * - El glow difuminado (blur) suaviza el arranque de la transición.
 * - Las burbujas son <div> HTML con border-radius, no <circle> de SVG,
 *   para que nunca se deformen en óvalos por el stretch del viewBox.
 * - El contenedor se solapa 2px hacia abajo (bottom: -2px) para evitar
 *   una línea de costura cuando la sección siguiente cambia de alto (padding).
 */
export function WaveDivider({
  toColor,
  accentColor,
  height = 240,
  className = "",
}: WaveDividerProps) {
  const tint = accentColor ?? toColor

  return (
    <div
      className={`absolute left-0 w-full pointer-events-none ${className}`}
      style={{ height: height + 2, bottom: -2 }}
    >
      {/* glow difuminado: suaviza el punto donde arrancan las olas */}
      <div
        className="absolute left-0 w-full"
        style={{
          top: 0,
          height: height * 0.55,
          background: `radial-gradient(ellipse 70% 100% at 50% 0%, ${tint}55 0%, ${tint}00 70%)`,
          filter: "blur(28px)",
        }}
      />

      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ola 1: sutil, más alta, tiñe el fondo oscuro con el acento */}
        <path
          d="M0,60 C160,100 320,20 480,55 C640,90 800,30 960,65 C1120,100 1280,40 1440,70 L1440,320 L0,320 Z"
          fill={tint}
          opacity="0.22"
        />
        {/* ola 2: intermedia, más opaca */}
        <path
          d="M0,130 C160,172 320,102 480,136 C640,170 800,110 960,144 C1120,178 1280,118 1440,150 L1440,320 L0,320 Z"
          fill={tint}
          opacity="0.45"
        />
        {/* ola 3: casi el color final, ya cubre gran parte */}
        <path
          d="M0,170 C160,212 320,144 480,178 C640,212 800,152 960,186 C1120,220 1280,160 1440,192 L1440,320 L0,320 Z"
          fill={toColor}
          opacity="0.75"
        />
        {/* ola 4: sólida, garantiza que el borde inferior ya sea 100% el color de la siguiente sección */}
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