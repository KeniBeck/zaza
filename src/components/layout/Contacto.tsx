import { WHATSAPP_URL } from "../../constants"
import { FaInstagram, FaWhatsapp, FaRegEnvelope } from "react-icons/fa"
import { SectionBackground } from "../shared/SectionBackground"
import { IconCircle } from "../shared/IconCircle"

interface ContactoProps {
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  activeFlavorIndex?: number
}

export function Contacto({
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#C084FC",
  activeFlavorIndex = 0,
}: ContactoProps) {
  return (
    <section id="contacto" className="relative w-full flex flex-col items-center justify-center px-5 py-16 overflow-hidden">
      <SectionBackground
        gradientStart={gradientStart}
        gradientMid={gradientMid}
        gradientEnd={gradientEnd}
        activeFlavorIndex={activeFlavorIndex}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm">
        <p className="font-sans text-[10px] tracking-[4px] uppercase font-semibold" style={{ color: gradientStart }}>
          Contacto
        </p>

        <h2 className="text-center" style={{ fontSize: "38px", fontWeight: 900, lineHeight: 1, color: "#1a0a2e", letterSpacing: "-1px" }}>
          Súmate<br />al{" "}
          <span
            style={{
              textShadow: `0 0 6px ${gradientStart}, 0 0 16px ${gradientStart}, 0 0 32px ${gradientStart}`,
              WebkitTextStroke: `1px ${gradientStart}`,
              fontFamily: "var(--font-zaza)",
              fontSize: "44px",
            }}
          >
            parche.
          </span>
        </h2>

        <div style={{
          width: "48px",
          height: "3px",
          background: `linear-gradient(90deg, ${gradientStart}, ${gradientMid})`,
          borderRadius: "2px",
          transform: "skewX(-15deg)",
        }} />

        <div className="flex items-center justify-center gap-5 w-full">
          <IconCircle
            href="https://instagram.com/zaza.latam"
            label="Instagram @zaza.latam"
            gradientStart={gradientStart}
          >
            <FaInstagram color={gradientStart} size={30} />
          </IconCircle>

          <IconCircle
            href={WHATSAPP_URL}
            label="WhatsApp 3209432119"
            gradientStart={gradientStart}
          >
            <FaWhatsapp color={gradientStart} size={30} />
          </IconCircle>

          <IconCircle
            href="mailto:zaza.latam@outlook.es"
            label="Email zaza.latam@outlook.es"
            gradientStart={gradientStart}
          >
            <FaRegEnvelope color={gradientStart} size={30} />
          </IconCircle>
        </div>
      </div>
    </section>
  )
}
