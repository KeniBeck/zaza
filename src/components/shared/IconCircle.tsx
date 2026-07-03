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
      className="flex items-center justify-center w-[72px] h-[72px] rounded-[20px] cursor-pointer transition-all duration-300 hover:scale-110"
      style={{
        background: "rgba(107,49,139,0.08)",
        border: "1.5px solid rgba(107,49,139,0.2)",
        boxShadow: "0 0 20px rgba(107,49,139,0.15), 0 0 40px rgba(107,49,139,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = gradientStart
        e.currentTarget.style.boxShadow = `0 0 20px ${gradientStart}, 0 0 40px ${gradientStart}55`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(107,49,139,0.2)"
        e.currentTarget.style.boxShadow = "0 0 20px rgba(107,49,139,0.15), 0 0 40px rgba(107,49,139,0.08), inset 0 1px 0 rgba(255,255,255,0.6)"
      }}
    >
      {children}
    </a>
  )
}
