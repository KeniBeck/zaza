import { WHATSAPP_URL } from "../../constants"
import { FaInstagram, FaWhatsapp, FaRegEnvelope } from "react-icons/fa"
import { SocialLink } from "../shared/SocialLink"
import { ContactoBackground } from "../shared/ContactoBackground"

interface ContactoProps {
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
  activeFlavorIndex?: number
  /** Color claro de fondo (debe coincidir con el toColor del WaveDivider de Colaboradores) */
  bgLight?: string
}

export function Contacto({
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#A03B90",
  bgLight = "#F3E8FF",
}: ContactoProps) {
  const iconStyle: React.CSSProperties = {
    color: gradientStart,
    stroke: `${gradientStart}`,
    strokeWidth: "1",
    transition: "all 0.3s ease",
  }

  return (
    <section
      id="contacto"
      className="relative w-full flex flex-col items-center py-10 overflow-hidden"
    >
      <ContactoBackground
        gradientStart={gradientStart}
        gradientMid={gradientMid}
        gradientEnd={gradientEnd}
        bgLight={bgLight}
      />

      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-sm">

        <h2 className="text-center" style={{ fontSize: "38px", fontWeight: 900, lineHeight: 1, color: gradientStart, letterSpacing: "-1px" }}>
          <span
            className="md:text-6xl"
            style={{
              fontFamily: "var(--font-zaza)",
            }}
          >
            Súmate al  parche.
          </span>
        </h2>

        <div className="flex items-center justify-center gap-8 w-full text-[46px] md:text-6xl">
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
      <p className="absolute bottom-1 text-[10px] tracking-[1px] whitespace-nowrap text-gray-700/60">
        © {new Date().getFullYear()} ZAZA · Todos los derechos reservados
      </p>
    </section>
  )
}