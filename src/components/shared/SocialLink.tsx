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
    >
      {children}
    </a>
  )
}
