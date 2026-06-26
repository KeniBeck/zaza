interface BackgroundBlobsProps {
  gradientStart: string
  gradientMid: string
  gradientEnd: string
}

export function BackgroundBlobs({ gradientStart, gradientMid, gradientEnd }: BackgroundBlobsProps) {
  return (
    <>
      <div
        className="absolute"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: 500,
          maxHeight: 500,
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          background: `radial-gradient(ellipse at 50% 40%, ${gradientStart}55 0%, ${gradientMid}33 40%, transparent 70%)`,
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "35vw",
          height: "35vw",
          maxWidth: 280,
          maxHeight: 280,
          top: "25%",
          left: "-8%",
          background: `radial-gradient(ellipse, ${gradientEnd}44 0%, transparent 70%)`,
          borderRadius: "70% 30% 60% 40% / 40% 60% 40% 60%",
          filter: "blur(30px)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "30vw",
          height: "30vw",
          maxWidth: 240,
          maxHeight: 240,
          bottom: "20%",
          right: "-5%",
          background: `radial-gradient(ellipse, ${gradientMid}33 0%, transparent 70%)`,
          borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
          filter: "blur(25px)",
        }}
      />
    </>
  )
}
