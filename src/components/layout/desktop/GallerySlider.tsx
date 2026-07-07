import { useCallback, useState } from "react"
import { desktopClamp } from "../../../hooks/useScreenSize"
import { GalleryImage } from "../../stories/GalleryImage"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"

interface GallerySliderProps {
  gradientStart: string
  gradientEnd: string
  onImageClick: (index: number) => void
}

const TOTAL = 6
const STEP = 60

const RADIUS_X = desktopClamp("150px", "12vw + 60px", "270px")
const RADIUS_Y = desktopClamp("30px", "2.5vw + 10px", "55px")
const CARD_W = desktopClamp("165px", "13vw + 55px", "285px")
const CARD_R = "32px"
const CTN_H = desktopClamp("300px", "24vw + 100px", "480px")

const BTN_SZ = desktopClamp("36px", "24px + 1vw", "48px")
const BTN_FS = desktopClamp("18px", "12px + 0.6vw", "24px")

const T = "600ms cubic-bezier(.22,.61,.36,1)"

function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function GallerySlider({ gradientStart, gradientEnd, onImageClick }: GallerySliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback((index: number) => {
    setActiveIndex(mod(index, TOTAL))
  }, [])

  const handleCardClick = useCallback((index: number) => {
    if (index === activeIndex) {
      onImageClick(index)
    } else {
      goTo(index)
    }
  }, [activeIndex, onImageClick, goTo])

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ gap: desktopClamp("0.35rem", "0.2rem + 0.2vw", "0.6rem") }}
    >

      <div className="relative w-full" style={{ height: CTN_H }}>
        {Array.from({ length: TOTAL }).map((_, i) => {
          const raw = i * STEP - activeIndex * STEP
          const angle = ((raw + 180) % 360) - 180
          const rad = angle * (Math.PI / 180)

          const sinA = Math.sin(rad)
          const cosA = Math.cos(rad)

          const frontness = (1 + cosA) / 2
          const depth = Math.max(0, frontness)

          const xF = sinA
          const yF = 1 - cosA

          const scale = Math.max(0.12, 0.1 + 0.9 * depth)
          const opacity = Math.max(0.08, 0.08 + 0.92 * depth)
          const blurPx = (1 - depth) * 3

          const zIndex = Math.round(depth * 20) + 5

          return (
            <div
              key={i}
              onClick={() => handleCardClick(i)}
              className="absolute left-1/2 top-1/2 cursor-pointer"
              style={{
                width: CARD_W,
                aspectRatio: "2 / 3",
                transform: `translate(calc(-50% + ${xF} * ${RADIUS_X}), calc(-50% + ${yF} * ${RADIUS_Y})) scale(${scale})`,
                zIndex,
                opacity,
                filter: blurPx > 0.5 ? `blur(${blurPx}px)` : "none",
                transition: `transform ${T}, opacity ${T}, filter ${T}`,
              }}
            >
              <div
                className="overflow-hidden w-full h-full"
                style={{
                  borderRadius: CARD_R,
                  boxShadow: depth > 0.9
                    ? `0 0 30px ${gradientStart}60, 0 0 60px ${gradientStart}30, 0 0 0 1px ${gradientEnd}60`
                    : depth > 0.3
                      ? `0 0 0 1px ${gradientEnd}20`
                      : "none",
                  transition: `box-shadow ${T}`,
                }}
              >
                <GalleryImage
                  index={i}
                  gradientStart={gradientStart}
                  gradientEnd={gradientEnd}
                  onClick={() => { }}
                  className="aspect-[2/3]!"
                />
              </div>
            </div>
          )
        })}
      </div>

      <div
        className="flex items-center justify-center"
        style={{ gap: desktopClamp("1.5rem", "1rem + 0.5vw", "2rem") }}
      >
        <button
          aria-label="Anterior"
          className="flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all cursor-pointer"
          style={{ width: BTN_SZ, height: BTN_SZ, fontSize: BTN_FS }}
          onClick={() => goTo(activeIndex - 1)}
        >
          <FiChevronLeft />
        </button>

        <button
          aria-label="Siguiente"
          className="flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/25 transition-all cursor-pointer"
          style={{ width: BTN_SZ, height: BTN_SZ, fontSize: BTN_FS }}
          onClick={() => goTo(activeIndex + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  )
}
