interface BubbleSvgProps {
  gradientStart: string
  gradientMid: string
  gradientEnd: string
}

export function BubbleSvg({ gradientStart, gradientMid, gradientEnd }: BubbleSvgProps) {
  return (
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
  )
}
