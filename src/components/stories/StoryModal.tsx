import { useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"
import { StoryViewer } from "./StoryViewer"

interface StoryModalProps {
  open: boolean
  initialIndex: number
  gradientStart: string
  gradientMid: string
  gradientEnd: string
  onClose: () => void
}

export function StoryModal({ open, initialIndex, gradientStart, gradientMid, gradientEnd, onClose }: StoryModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevTouchAction = document.body.style.touchAction

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handler)

    return () => {
      document.body.style.overflow = prevOverflow
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.touchAction = prevTouchAction
      window.removeEventListener('keydown', handler)
    }
  }, [open, close])

  if (!open) return null

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 w-screen h-dvh z-[99999] overscroll-none touch-none"
      style={{
        background: 'linear-gradient(180deg, rgba(8,8,12,.96), rgba(15,10,25,.98))',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
      }}
      onClick={(e) => { if (e.target === overlayRef.current) close() }}
    >
      <div className="w-full h-full">
        <StoryViewer
          initialIndex={initialIndex}
          gradientStart={gradientStart}
          gradientMid={gradientMid}
          gradientEnd={gradientEnd}
          onClose={close}
        />
      </div>
    </div>,
    document.body
  )
}
