interface ContactoBackgroundProps {
  gradientStart: string
  gradientMid: string
  gradientEnd: string
  bgLight: string
}

function lighten(hex: string, amount: number): string {
  const h = hex.replace("#", "")
  const r = parseInt(h.substring(0, 2), 16)
  const g = parseInt(h.substring(2, 4), 16)
  const b = parseInt(h.substring(4, 6), 16)
  return `#${[r, g, b].map(c => Math.round(c + (255 - c) * amount).toString(16).padStart(2, "0")).join("")}`
}

export function ContactoBackground({ gradientStart, gradientMid, gradientEnd, bgLight }: ContactoBackgroundProps) {
  const s15 = lighten(bgLight, 0.15)
  const s55 = lighten(bgLight, 0.55)
  const s92 = lighten(bgLight, 0.92)

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* degradado base: 0% bgLight (empalma con la ola), se aclara hacia abajo */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to bottom, ${bgLight} 0%, ${s15} 35%, ${s55} 75%, ${s92} 100%)`,
        }}
      />

      {/* lava-blobs — solo en la mitad inferior, con tamaño ajustado a la altura disponible */}
      <div className="absolute inset-x-0 bottom-0" style={{ top: "50%" }}>
        <div
          className="absolute"
          style={{
            width: "clamp(100px, 20vh, 160px)",
            height: "clamp(100px, 20vh, 160px)",
            bottom: "5%",
            left: "10%",
            background: `radial-gradient(ellipse, ${gradientStart}45 0%, transparent 80%)`,
            borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
            filter: "blur(45px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "clamp(80px, 16vh, 130px)",
            height: "clamp(80px, 16vh, 130px)",
            bottom: "18%",
            right: "2%",
            background: `radial-gradient(ellipse, ${gradientMid}3A 0%, transparent 80%)`,
            borderRadius: "70% 30% 60% 40% / 40% 60% 40% 60%",
            filter: "blur(38px)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: "clamp(60px, 13vh, 100px)",
            height: "clamp(60px, 13vh, 100px)",
            bottom: "40%",
            left: "45%",
            background: `radial-gradient(ellipse, ${gradientEnd}33 0%, transparent 80%)`,
            borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
            filter: "blur(32px)",
          }}
        />
      </div>

      {/* círculos SVG decorativos — pocos, sutiles, abajo */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="150" cy="550" r="20" fill="none" stroke={`${gradientStart}44`} strokeWidth="1.5" />
        <circle cx="150" cy="550" r="14" fill={`${gradientStart}18`} />
        <circle cx="850" cy="600" r="16" fill="none" stroke={`${gradientMid}40`} strokeWidth="1.5" />
        <circle cx="500" cy="700" r="12" fill={`${gradientEnd}22`} />
        <circle cx="300" cy="450" r="6" fill={`${gradientStart}30`} />
        <circle cx="700" cy="520" r="5" fill={`${gradientMid}28`} />
        <circle cx="900" cy="350" r="8" fill="none" stroke={`${gradientEnd}33`} strokeWidth="1" />
      </svg>

      {/* textura de grano */}
      <div className="absolute inset-0" style={{ mixBlendMode: "overlay" }}>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="contacto-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#contacto-grain)" opacity="0.035" />
        </svg>
      </div>
    </div>
  )
}
