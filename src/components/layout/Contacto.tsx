import { WHATSAPP_URL } from "../../constants"
import { FaInstagram, FaWhatsapp, FaRegEnvelope } from "react-icons/fa"
import { SectionBackground } from "../shared/SectionBackground"
import { SocialLink } from "../shared/SocialLink"

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
  const iconStyle: React.CSSProperties = {
    color: "#1a0a2e",
    fontSize: "46px",
    filter: `drop-shadow(0 0 8px ${gradientStart}) drop-shadow(0 0 20px ${gradientStart}cc) drop-shadow(0 0 40px ${gradientStart}66)`,
    stroke: `${gradientStart}`,
    strokeWidth: "1",
    transition: "all 0.3s ease",
  }

  return (
    <section id="contacto" className="relative w-full flex flex-col items-center justify-center px-5 py-16 overflow-hidden">
      <SectionBackground
        gradientStart={gradientStart}
        gradientMid={gradientMid}
        gradientEnd={gradientEnd}
        activeFlavorIndex={activeFlavorIndex}
      />

      <div className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm">

        <h2 className="text-center" style={{ fontSize: "38px", fontWeight: 900, lineHeight: 1, color: "#1a0a2e", letterSpacing: "-1px" }}>
          <span
            style={{
              textShadow: `0 0 4px ${gradientStart}80, 0 0 12px ${gradientStart}40`,
              WebkitTextStroke: `0.5px ${gradientStart}60`,
              fontFamily: "var(--font-zaza)",
              fontSize: "44px",
            }}
          >
            Súmate al  parche.
          </span>
        </h2>

        <div className="flex items-center justify-center gap-8 w-full">
          <SocialLink href="https://instagram.com/zaza.latam" label="Instagram @zaza.latam" gradientStart={gradientStart}>
            <FaInstagram style={iconStyle} />
          </SocialLink>

          <SocialLink href={WHATSAPP_URL} label="WhatsApp 3209432119" gradientStart={gradientStart}>
            <FaWhatsapp style={iconStyle} />
          </SocialLink>

          <SocialLink href="mailto:zaza.latam@outlook.es" label="Email zaza.latam@outlook.es" gradientStart={gradientStart}>
            <FaRegEnvelope style={iconStyle} />
          </SocialLink>
        </div>

      </div>

      <p className="absolute bottom-3 text-[10px] tracking-[1px] whitespace-nowrap text-gray-700/60">
        © {new Date().getFullYear()} ZAZA · Todos los derechos reservados
      </p>
    </section>
  )
}
