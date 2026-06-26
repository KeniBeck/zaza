export function smoothScrollTo(targetY: number, duration: number) {
  const startY = window.scrollY
  const distance = targetY - startY
  const startTime = performance.now()
  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    window.scrollTo(0, startY + distance * ease)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}
