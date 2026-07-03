import { useEffect, useState } from "react"

function hexToRgb(hex: string): string {
  const c = hex.replace("#", "")
  if (c.length !== 6) return "255,255,255"
  return `${parseInt(c.substring(0, 2), 16)},${parseInt(c.substring(2, 4), 16)},${parseInt(c.substring(4, 6), 16)}`
}

interface SectionBackgroundProps {
  gradientStart: string
  gradientMid: string
  gradientEnd: string
  activeFlavorIndex?: number
}

export function SectionBackground({
  gradientStart,
  gradientMid,
  gradientEnd,
  activeFlavorIndex = 0,
}: SectionBackgroundProps) {
  const blobRgb = hexToRgb(gradientStart)
  const blobMidRgb = hexToRgb(gradientMid)
  const blobEndRgb = hexToRgb(gradientEnd)
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768
  const bgGradient = `linear-gradient(180deg, ${gradientStart}20 0%, ${gradientMid}15 50%, ${gradientEnd}20 100%)`
  const [bgLayers, setBgLayers] = useState([bgGradient, bgGradient])
  const [activeBgLayer, setActiveBgLayer] = useState(0)

  useEffect(() => {
    const nextLayer = activeBgLayer === 0 ? 1 : 0
    setBgLayers(prev => {
      const next = [...prev]
      next[nextLayer] = bgGradient
      return next
    })
    setActiveBgLayer(nextLayer)
  }, [activeFlavorIndex])

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 transition-opacity duration-[800ms] ease" style={{ background: bgLayers[0], opacity: activeBgLayer === 0 ? 1 : 0 }} />
      <div className="absolute inset-0 transition-opacity duration-[800ms] ease" style={{ background: bgLayers[1], opacity: activeBgLayer === 1 ? 1 : 0 }} />

      <div
        className="lava-blob about-lava-1"
        style={{ backgroundColor: `rgba(${blobRgb},${isMobile ? 0.65 : 0.30})` }}
      />
      <div
        className="lava-blob about-lava-2"
        style={{ backgroundColor: `rgba(${blobMidRgb},${isMobile ? 0.55 : 0.25})` }}
      />
      <div
        className="lava-blob about-lava-3"
        style={{
          "--blob-rgb": blobEndRgb,
          background: `radial-gradient(
            circle,
            rgba(${blobEndRgb},${isMobile ? 0.45 : 0.20}) 0%,
            rgba(${blobEndRgb},${isMobile ? 0.25 : 0.10}) 45%,
            rgba(${blobEndRgb},0) 80%
          )`,
        } as React.CSSProperties}
      />

      <div
        className="absolute"
        style={{
          width: "70vw",
          height: "70vw",
          maxWidth: 700,
          maxHeight: 700,
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at 50% 40%, ${gradientStart}99 0%, ${gradientMid}66 40%, transparent 70%)`,
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          filter: "blur(30px)",
          transition: "background 0.5s ease",
        }}
      />

      <div
        className="absolute"
        style={{
          width: "40vw",
          height: "40vw",
          maxWidth: 380,
          maxHeight: 380,
          top: "20%",
          left: "-5%",
          background: `radial-gradient(ellipse, ${gradientEnd}66 0%, transparent 70%)`,
          borderRadius: "70% 30% 60% 40% / 40% 60% 40% 60%",
          filter: "blur(25px)",
          transition: "background 0.5s ease",
        }}
      />

      <div
        className="absolute"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: 320,
          maxHeight: 320,
          top: "30%",
          right: "-3%",
          background: `radial-gradient(ellipse, ${gradientMid}55 0%, transparent 70%)`,
          borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
          filter: "blur(20px)",
          transition: "background 0.5s ease",
        }}
      />

      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "50vw",
          maxWidth: 600,
          maxHeight: 450,
          bottom: "-8%",
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at 50% 60%, ${gradientStart}88 0%, ${gradientMid}55 40%, transparent 70%)`,
          borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
          filter: "blur(35px)",
          transition: "background 0.5s ease",
        }}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="120" cy="180" r="28" fill="none" stroke={`${gradientStart}60`} strokeWidth="2" />
        <circle cx="120" cy="180" r="22" fill={`${gradientStart}20`} />
        <circle cx="880" cy="250" r="22" fill="none" stroke={`${gradientMid}50`} strokeWidth="2" />
        <circle cx="880" cy="250" r="16" fill={`${gradientMid}20`} />
        <circle cx="200" cy="550" r="18" fill="none" stroke={`${gradientEnd}50`} strokeWidth="1.5" />
        <circle cx="820" cy="480" r="32" fill="none" stroke={`${gradientStart}44`} strokeWidth="2" />
        <circle cx="820" cy="480" r="25" fill={`${gradientStart}20`} />
        <circle cx="60" cy="320" r="8" fill={`${gradientEnd}40`} />
        <circle cx="940" cy="400" r="10" fill={`${gradientMid}40`} />
        <circle cx="320" cy="680" r="6" fill={`${gradientStart}40`} />
        <circle cx="700" cy="120" r="9" fill={`${gradientEnd}35`} />
        <circle cx="150" cy="420" r="5" fill={`${gradientStart}44`} />
        <circle cx="860" cy="600" r="7" fill={`${gradientMid}35`} />
        <circle cx="480" cy="720" r="5" fill={`${gradientStart}30`} />
        <circle cx="90" cy="500" r="7" fill={`${gradientStart}44`} />
        <circle cx="920" cy="300" r="6" fill={`${gradientMid}35`} />
        <circle cx="750" cy="650" r="8" fill={`${gradientEnd}35`} />
        <circle cx="250" cy="150" r="5" fill={`${gradientStart}35`} />
        <circle cx="350" cy="200" r="3" fill={`${gradientEnd}bb`} />
        <circle cx="680" cy="350" r="2" fill={`${gradientEnd}99`} />
        <circle cx="100" cy="650" r="2.5" fill={`${gradientEnd}88`} />
      </svg>
    </div>
  )
}
