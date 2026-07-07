import { WHATSAPP_URL, asset } from "../../constants";
import { ZazaLogo } from "../shared/ZazaLogo";
import { SectionBackground } from "../shared/SectionBackground";
import { useScreenSize } from "../../hooks/useScreenSize";
import { smoothScrollTo } from "../../utils/scroll";

interface AboutProps {
    borderColor?: string
    gradientStart?: string
    gradientMid?: string
    gradientEnd?: string
    activeFlavorIndex?: number
}

export function About({
    borderColor: _borderColor,
    gradientStart = "#6B318B",
    gradientMid = "#A855F7",
    gradientEnd = "#C084FC",
    activeFlavorIndex = 0,
}: AboutProps) {
    const { mobileScale } = useScreenSize()

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center pt-[25vh] overflow-hidden">

            <SectionBackground
                gradientStart={gradientStart}
                gradientMid={gradientMid}
                gradientEnd={gradientEnd}
                activeFlavorIndex={activeFlavorIndex}
            />

            <img
                src={asset("/decor/hoja-one.webp")}
                alt=""
                className="absolute top-22 left-2 sm:top-16 sm:left-16 w-30 sm:w-36 md:w-76 pointer-events-none select-none opacity-90"
            />
            <img
                src={asset("/decor/hoja-one-bottom.webp")}
                alt=""
                className="absolute bottom-8 right-2 sm:bottom-16 sm:right-16 w-30 sm:w-36 md:w-76 pointer-events-none select-none opacity-90"
            />

            {/* Contenido original sin cambios */}
            <div className="mt-6 md:mt-0 w-full flex justify-center">
                <ZazaLogo
                    size={280}
                    color={gradientStart}
                    gradientEnd={gradientEnd}
                    className="select-none pointer-events-none w-full max-w-[320px] h-auto lg:w-auto lg:max-w-none"
                />
            </div>

            <p className="mt-16 text-base text-[#464e59] md:text-xl md:text-black  text-center px-6 max-w-md leading-relaxed" style={{ marginTop: mobileScale("3.5rem", "3.5rem", "5rem", "8rem", undefined) }}>
                el sabor de los momentos<br />que no se explican,{" "}
                <span className="font-zaza text-2xl sm:text-3xl text-transparent bg-clip-text bg-[length:200%_auto] animate-text-shimmer" style={{ backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd}, ${gradientStart})`, filter: `drop-shadow(0 0 8px ${gradientMid}80)` }}>se viven</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:w-auto justify-center">
                <div
                  className="snake-border group rounded-xl w-full sm:w-auto"
                  style={{
                    ["--g1" as any]: gradientStart,
                    ["--g2" as any]: gradientEnd,
                    ["--speed" as any]: "4s",
                  }}
                >
                  <div className="bg-[#F3E8FF] group-hover:bg-white/20 group-hover:backdrop-blur-md transition-all duration-300 rounded-[10px]">
                    <a
                      href="#productos"
                      className="block w-full px-7 py-3 text-sm font-semibold rounded-[10px] transition-colors duration-300 text-center"
                      style={{ color: gradientStart }}
                      onMouseEnter={(e) => e.currentTarget.style.color = gradientStart}
                      onMouseLeave={(e) => e.currentTarget.style.color = gradientStart}
                      onClick={(e) => {
                        e.preventDefault()
                        const el = document.getElementById('productos')
                        if (el) smoothScrollTo(el.getBoundingClientRect().top + window.scrollY, 1000)
                      }}
                    >
                      Ver sabores
                    </a>
                  </div>
                </div>
                <div className="relative group rounded-xl sm:w-auto">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block w-full px-7 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300 text-center"
                        style={{
                            background: `linear-gradient(to right, ${gradientStart}, ${gradientMid})`,
                            boxShadow: `0 0 0px transparent`,
                            transition: "box-shadow 0.3s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = `0 0 25px ${gradientMid}80`
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "0 0 0px transparent"
                        }}
                    >
                        <span className="relative z-10">Pruébalo ahora</span>
                        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 z-0 pointer-events-none">
                            <div
                                className="absolute -inset-px rounded-xl snake-rotate blur-[2px]"
                                style={{
                                    background: `conic-gradient(from var(--angle), transparent 0%, transparent 20%, ${gradientEnd} 35%, ${gradientMid} 50%, #f0e6ff 60%, ${gradientMid} 70%, ${gradientEnd} 80%, transparent 90%, transparent 100%)`,
                                }}
                            />
                            <div
                                className="absolute -inset-3 rounded-xl blur-3xl"
                                style={{ background: `${gradientMid}30` }}
                            />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}