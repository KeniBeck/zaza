interface StoryProgressProps {
  total: number
  current: number
  progress: number
  color: string
}

export function StoryProgress({ total, current, progress, color }: StoryProgressProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-30 flex gap-1 p-3">
      {Array.from({ length: total }).map((_, i) => {
        const fill = i < current ? 1 : i === current ? progress : 0
        return (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full overflow-hidden"
            style={{ background: `${color}40` }}
          >
            <div
              className="h-full rounded-full transition-all duration-100 ease-linear"
              style={{
                width: `${fill * 100}%`,
                background: color,
                boxShadow: `0 0 6px ${color}`,
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
