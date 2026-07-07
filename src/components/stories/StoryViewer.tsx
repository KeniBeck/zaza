import { useState, useRef, useEffect, useCallback } from "react"
import { asset } from "../../constants"
import { StoryProgress } from "./StoryProgress"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

const STORIES = Array.from({ length: 6 }, (_, i) => ({
  src: asset(`/image/nosotros/galeria-${i + 1}.webp`),
  caption: "Así se viven nuestros momentos.",
  tag: "#SaborQueSeVive",
}))

interface StoryViewerProps {
  initialIndex: number
  gradientStart: string
  gradientMid: string
  gradientEnd: string
  onClose: () => void
}

export function StoryViewer({ initialIndex, gradientStart, gradientMid, gradientEnd, onClose }: StoryViewerProps) {
  const [current, setCurrent] = useState(initialIndex)
  const [errored, setErrored] = useState(false)
  const [slideFrom, setSlideFrom] = useState<'left' | 'right' | null>(null)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const goNextRef = useRef<() => void>(() => {})
  const goPrevRef = useRef<() => void>(() => {})
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => { setCurrent(initialIndex); setErrored(false); setSlideFrom(null) }, [initialIndex])

  useEffect(() => {
    if (!slideFrom || !imgRef.current) return
    const img = imgRef.current
    img.style.transition = 'none'
    img.style.transform = `translateX(${slideFrom === 'right' ? '100%' : '-100%'})`
    img.getBoundingClientRect()
    const raf = requestAnimationFrame(() => {
      img.style.transition = 'transform 120ms ease-out'
      img.style.transform = 'translateX(0)'
    })
    const t = setTimeout(() => setSlideFrom(null), 150)
    return () => { cancelAnimationFrame(raf); clearTimeout(t) }
  }, [current])

  const goTo = useCallback((idx: number) => {
    if (idx < 0 || idx >= STORIES.length) return
    const fromRight = idx > current
    setCurrent(idx)
    setSlideFrom(fromRight ? 'right' : 'left')
    setErrored(false)
  }, [current])

  const goNext = useCallback(() => goTo(current + 1), [current, goTo])
  const goPrev = useCallback(() => goTo(current - 1), [current, goTo])
  goNextRef.current = goNext
  goPrevRef.current = goPrev

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrevRef.current()
      else if (e.key === 'ArrowRight') goNextRef.current()
      else if (e.key === 'Escape') onCloseRef.current()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    touchStartRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const start = touchStartRef.current
    if (start) {
      const dx = e.clientX - start.x
      const dy = e.clientY - start.y
      if (Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) goNext()
        else goPrev()
      } else if (Math.abs(dx) < 15) {
        const rect = e.currentTarget.getBoundingClientRect()
        if (e.clientX < rect.left + rect.width / 2) goPrev()
        else goNext()
      }
    }
    touchStartRef.current = null
  }, [goNext, goPrev])

  const story = STORIES[current]

  const bgGradient = `linear-gradient(160deg, ${gradientStart}55 0%, ${gradientMid}33 50%, ${gradientEnd}22 100%)`

  return (
    <div className="relative w-full h-full select-none overflow-hidden" style={{ background: "#0a0a0a" }}>
      <div className="absolute inset-0" style={{ background: bgGradient }} />

      <div className="absolute inset-0 flex items-center justify-center md:px-[12vw] md:py-[4vh]">
        <div className="relative w-full h-full">
          {errored ? (
            <span className="absolute inset-0 flex items-center justify-center text-4xl" style={{ opacity: 0.15 }}>📷</span>
          ) : (
            <img
              ref={imgRef}
              src={story.src}
              alt={`Historia ${current + 1}`}
              onError={() => setErrored(true)}
              className="absolute inset-0 w-full h-full object-cover md:object-contain md:rounded-2xl"
              style={{ willChange: "transform" }}
            />
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <button
        aria-label="Anterior"
        className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all cursor-pointer w-10 h-10 text-lg"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
      >
        <FiChevronLeft />
      </button>

      <button
        aria-label="Siguiente"
        className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all cursor-pointer w-10 h-10 text-lg"
        onClick={(e) => { e.stopPropagation(); goNext() }}
      >
        <FiChevronRight />
      </button>

      <StoryProgress total={STORIES.length} current={current} progress={1} color={gradientEnd} />

      <div
        className="absolute left-0 right-0 z-30 flex items-center gap-2.5 px-5"
        style={{ top: 0, paddingTop: "max(env(safe-area-inset-top, 0px), 20px)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-2xl font-zaza text-white flex-shrink-0"
          style={{ background: `${gradientEnd}60`, border: `1px solid ${gradientEnd}80` }}
        >
          Z
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-white leading-tight">Somos ZAZA</p>
          <p className="text-[10px] text-white/60 leading-tight">Momentos reales</p>
        </div>
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:text-white transition-colors z-20"
          aria-label="Cerrar"
          onClick={onClose}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-5"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 24px)", paddingTop: 48 }}
      >
        <p className="text-sm font-medium text-white/90">{story.caption}</p>
        <p className="text-[11px] mt-0.5" style={{ color: gradientEnd }}>
          {story.tag}
        </p>
      </div>

      <div
        className="absolute inset-0 z-10"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        style={{ touchAction: "pan-y" }}
      />
    </div>
  )
}
