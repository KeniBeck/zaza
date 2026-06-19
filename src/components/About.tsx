import { WHATSAPP_URL } from "../constants";
import { ZazaLogo } from "./ZazaLogo";

interface AboutProps {
  borderColor?: string
  gradientStart?: string
  gradientMid?: string
  gradientEnd?: string
}

export function About({
  borderColor = "#6B318B",
  gradientStart = "#6B318B",
  gradientMid = "#A855F7",
  gradientEnd = "#C084FC",
}: AboutProps) {
    return (
        <div className="relative min-h-screen w-full flex flex-col items-center pt-[25vh] overflow-hidden">

            {/* ── FONDO: blobs + burbujas estilo splash morado ── */}
            <div className="absolute inset-0 -z-10 pointer-events-none">

                {/* Blob grande central morado */}
                <div
                    className="absolute"
                    style={{
                        width: "70vw",
                        height: "70vw",
                        maxWidth: 700,
                        maxHeight: 700,
                        top: "5%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "radial-gradient(ellipse at 50% 40%, #9333ea88 0%, #7c3aed55 40%, transparent 70%)",
                        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                        filter: "blur(40px)",
                    }}
                />

                {/* Blob secundario izquierda */}
                <div
                    className="absolute"
                    style={{
                        width: "40vw",
                        height: "40vw",
                        maxWidth: 380,
                        maxHeight: 380,
                        top: "20%",
                        left: "-5%",
                        background: "radial-gradient(ellipse, #a855f766 0%, transparent 70%)",
                        borderRadius: "70% 30% 60% 40% / 40% 60% 40% 60%",
                        filter: "blur(35px)",
                    }}
                />

                {/* Blob secundario derecha */}
                <div
                    className="absolute"
                    style={{
                        width: "35vw",
                        height: "35vw",
                        maxWidth: 320,
                        maxHeight: 320,
                        top: "30%",
                        right: "-3%",
                        background: "radial-gradient(ellipse, #7c3aed55 0%, transparent 70%)",
                        borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                        filter: "blur(30px)",
                    }}
                />

                {/* SVG con burbujas y splashes */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1000 800"
                    preserveAspectRatio="xMidYMid slice"
                >
                    {/* Burbujas grandes */}
                    <circle cx="120" cy="180" r="28" fill="none" stroke="#9333ea60" strokeWidth="2" />
                    <circle cx="120" cy="180" r="22" fill="#9333ea20" />

                    <circle cx="880" cy="250" r="22" fill="none" stroke="#7c3aed50" strokeWidth="2" />
                    <circle cx="880" cy="250" r="16" fill="#7c3aed20" />

                    <circle cx="200" cy="550" r="18" fill="none" stroke="#a855f750" strokeWidth="1.5" />
                    <circle cx="820" cy="480" r="32" fill="none" stroke="#9333ea44" strokeWidth="2" />
                    <circle cx="820" cy="480" r="25" fill="#9333ea20" />

                    {/* Burbujas pequeñas */}
                    <circle cx="60"  cy="320" r="8"  fill="#a855f740" />
                    <circle cx="940" cy="400" r="10" fill="#7c3aed40" />
                    <circle cx="320" cy="680" r="6"  fill="#9333ea40" />
                    <circle cx="700" cy="120" r="9"  fill="#a855f735" />
                    <circle cx="150" cy="420" r="5"  fill="#9333ea44" />
                    <circle cx="860" cy="600" r="7"  fill="#7c3aed35" />
                    <circle cx="480" cy="720" r="5"  fill="#9333ea30" />

                    {/* Burbujas medianas (antes gotitas ovaladas) */}
                    <circle cx="90"  cy="500" r="7"  fill="#9333ea44" />
                    <circle cx="920" cy="300" r="6"  fill="#7c3aed35" />
                    <circle cx="750" cy="650" r="8"  fill="#a855f735" />
                    <circle cx="250" cy="150" r="5"  fill="#9333ea35" />

                    {/* Destellos */}
                    <circle cx="350" cy="200" r="3" fill="#e9d5ff" />
                    <circle cx="680" cy="350" r="2" fill="#ddd6fe" />
                    <circle cx="100" cy="650" r="2.5" fill="#c4b5fd" />
                </svg>

                {/* PNG hojas decorativas */}
                <img
                    src="/decor/hoja-one.png"
                    alt=""
                    className="absolute top-20 left-18 w-36 md:w-76 pointer-events-none select-none opacity-90"
                />
                <img
                    src="/decor/hoja-one-bottom.png"
                    alt=""
                    className="absolute bottom-20 right-18 w-36 md:w-76 pointer-events-none select-none opacity-90"
                />
            </div>
            {/* ── FIN FONDO ── */}

            {/* Contenido original sin cambios */}
            <ZazaLogo
                size={280}
                color="#6B318B"
                gradientEnd="#A03B90"
                className="select-none pointer-events-none"
            />

            <p className="mt-14 text-base md:text-xl text-[#464e59] text-center px-6 max-w-md leading-relaxed">
                el sabor de los momentos<br />que no se explican,{" "}
                <span className="font-zaza text-3xl text-transparent bg-clip-text bg-gradient-to-r from-[#6B318B] via-[#C084FC] to-[#6B318B] bg-[length:200%_auto] animate-text-shimmer drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">se viven</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <div className="relative group rounded-xl overflow-hidden">
                    <div
                        className="absolute -inset-0.5 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
                        style={{
                            background: `conic-gradient(from 0deg, transparent 10deg, ${gradientEnd}cc 30deg, ${gradientMid}cc 50deg, #fff 70deg, ${borderColor}cc 90deg, transparent 110deg, transparent 360deg)`,
                        }}
                    />
                    <div className="relative m-[2px] rounded-[10px] bg-[#F3E8FF] group-hover:bg-white/20 group-hover:backdrop-blur-md transition-all duration-300">
                        <a
                            href="#productos"
                            className="block px-7 py-3 text-sm font-semibold rounded-[10px] text-[#6B318B] group-hover:text-[#6B318B] transition-colors duration-300"
                        >
                            Ver sabores
                        </a>
                    </div>
                </div>
                <div className="relative group rounded-xl">
                    <a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative block px-7 py-3 text-sm font-semibold text-white rounded-xl transition-all duration-300"
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