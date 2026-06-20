import { useState, useEffect } from "react"
import { ZazaLogo } from "./ZazaLogo"
import { WHATSAPP_URL } from "../constants"

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
]

interface NavbarProps {
  borderColor?: string
  color?: string
  gradientEnd?: string
}

export function Navbar({ borderColor = "#722f96", color = "#6B318B", gradientEnd = "#A03B90" }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const elements = NAV_LINKS
      .map(l => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        let bestId = ""
        let bestRatio = 0
        for (const entry of entries) {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio
            bestId = entry.target.id
          }
        }
        if (bestId) setActiveSection(bestId)
      },
      { threshold: [0.2, 0.4, 0.6, 0.8] }
    )

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl will-change-transform">
      <div className="relative flex items-center justify-between px-5 py-3 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 overflow-hidden">
        <ZazaLogo size={36} color={color} gradientEnd={gradientEnd} className="select-none" />

        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-xl transition-all"
                  style={{
                    color: isActive ? "#FFF" : undefined,
                    background: isActive ? `linear-gradient(to right, ${color}, ${gradientEnd})` : undefined,
                    boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.05)" : undefined,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = color
                      e.currentTarget.style.backgroundColor = `${color}0d`
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#6B7280"
                      e.currentTarget.style.backgroundColor = "transparent"
                    }
                  }}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-block px-5 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: `linear-gradient(to right, ${color}, ${gradientEnd})` }}
          >
            Pedir
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600 transition-colors"
            style={{ color: `#6B7280`, '--hover-color': color } as React.CSSProperties}
            onMouseEnter={(e) => e.currentTarget.style.color = color}
            onMouseLeave={(e) => e.currentTarget.style.color = '#6B7280'}
            aria-label="Menú"
          >
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full h-[10px]"
          viewBox="0 0 1440 20"
          preserveAspectRatio="none"
        >
          <path
            d="M0,10 C120,20 240,0 360,10 C480,20 600,0 720,10 C840,20 960,0 1080,10 C1200,20 1320,0 1440,10 L1440,20 L0,20 Z"
            fill={borderColor}
            opacity="0.2"
          />
        </svg>
      </div>

      {open && (
        <div className="mt-2 px-5 py-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-white/20 md:hidden">
          <ul className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium transition-colors"
                    style={{ color: isActive ? color : undefined, fontWeight: isActive ? 600 : undefined }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = color }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#6B7280" }}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full text-center px-5 py-2 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ background: `linear-gradient(to right, ${color}, ${gradientEnd})` }}
          >
            Pedir
          </a>
        </div>
      )}
    </nav>
  )
}
