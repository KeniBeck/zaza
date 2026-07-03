interface SocialLinkProps {
  href: string
  label: string
  gradientStart: string
  children: React.ReactNode
}

export function SocialLink({ href, label, gradientStart, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="transition-all duration-300 hover:scale-110"
      onMouseEnter={(e) => {
        const icon = e.currentTarget.querySelector("svg") as SVGElement | null
        if (icon) {
          icon.style.filter = `drop-shadow(0 0 8px ${gradientStart}) drop-shadow(0 0 24px ${gradientStart}) drop-shadow(0 0 48px ${gradientStart}88)`
        }
      }}
      onMouseLeave={(e) => {
        const icon = e.currentTarget.querySelector("svg") as SVGElement | null
        if (icon) {
          icon.style.filter = `drop-shadow(0 0 8px ${gradientStart}) drop-shadow(0 0 20px ${gradientStart}cc) drop-shadow(0 0 40px ${gradientStart}66)`
        }
      }}
    >
      {children}
    </a>
  )
}
