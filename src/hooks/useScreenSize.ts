export function useScreenSize() {
  const w = window.innerWidth

  const isMini = w < 375
  const isStandard = w >= 375 && w < 390
  const isPro = w >= 390 && w < 430
  const isProMax = w >= 430
  const isMobile = w < 768
  const isDesktop = w >= 768

  function mobileScale<T>(mini: T, standard: T, pro: T, proMax: T, desktop: T): T {
    if (!isMobile) return desktop
    if (isMini) return mini
    if (isStandard) return standard
    if (isPro) return pro
    return proMax
  }

  return { isMini, isStandard, isPro, isProMax, isMobile, isDesktop, mobileScale, w }
}
