interface IconCircleProps {
  children: React.ReactNode
  href: string
  label: string
  gradientStart: string
}

export function IconCircle({ children, href, label, gradientStart }: IconCircleProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center justify-center w-[72px] h-[72px] rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 backdrop-blur-xl"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
        border: "1px solid rgba(255,255,255,0.4)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.5) inset",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = `linear-gradient(135deg, ${gradientStart}30 0%, ${gradientStart}10 100%)`
        e.currentTarget.style.borderColor = `${gradientStart}60`
        e.currentTarget.style.boxShadow = `0 0 24px ${gradientStart}44, 0 0 48px ${gradientStart}22, 0 1px 0 rgba(255,255,255,0.7) inset`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)"
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.5) inset"
      }}
    >
      {children}
    </a>
  )
}
