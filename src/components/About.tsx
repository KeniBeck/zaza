import { useState, useEffect } from "react"
import { WHATSAPP_URL, asset } from "../constants";
import { ZazaLogo } from "./ZazaLogo";

function smoothScrollTo(targetY: number, duration: number) {
    const startY = window.scrollY
    const distance = targetY - startY
    const startTime = performance.now()
    function step(currentTime: number) {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        window.scrollTo(0, startY + distance * ease)
        if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
}

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
    const hexToRgb = (hex: string): string => {
        const c = hex.replace('#', '')
        if (c.length !== 6) return '255,255,255'
        return `${parseInt(c.substring(0, 2), 16)},${parseInt(c.substring(2, 4), 16)},${parseInt(c.substring(4, 6), 16)}`
    }
    const blobRgb = hexToRgb(gradientStart)
    const blobMidRgb = hexToRgb(gradientMid)
    const blobEndRgb = hexToRgb(gradientEnd)
    const aboutBg = `linear-gradient(180deg, ${gradientStart}20 0%, ${gradientMid}15 50%, ${gradientEnd}20 100%)`
    const [bgLayers, setBgLayers] = useState([aboutBg, aboutBg])
    const [activeBgLayer, setActiveBgLayer] = useState(0)
    const isMobile = window.innerWidth < 768

    useEffect(() => {
        const nextLayer = activeBgLayer === 0 ? 1 : 0
        setBgLayers(prev => {
            const next = [...prev]
            next[nextLayer] = aboutBg
            return next
        })
        setActiveBgLayer(nextLayer)
    }, [activeFlavorIndex])

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center pt-[25vh] overflow-hidden">

            {/* ── FONDO: crossfade + blobs + burbujas ── */}
            <div className="absolute inset-0 -z-10 pointer-events-none">
                {/* Crossfade gradient layers */}
                <div className="absolute inset-0 transition-opacity duration-[800ms] ease" style={{ background: bgLayers[0], opacity: activeBgLayer === 0 ? 1 : 0 }} />
                <div className="absolute inset-0 transition-opacity duration-[800ms] ease" style={{ background: bgLayers[1], opacity: activeBgLayer === 1 ? 1 : 0 }} />

                {/* Lava blobs */}
                <div
                    className="lava-blob about-lava-1"
                    style={{ backgroundColor: `rgba(${blobRgb},${isMobile ? 0.65 : 0.30})` }}
                />
                <div
                    className="lava-blob about-lava-2"
                    style={{ backgroundColor: `rgba(${blobMidRgb},${isMobile ? 0.55 : 0.25})` }}
                />

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
                        background: `radial-gradient(ellipse at 50% 40%, ${gradientStart}99 0%, ${gradientMid}66 40%, transparent 70%)`,
                        borderRadius: "60% 40% 55% 45% / 50% 60% 40% 50%",
                        filter: "blur(30px)",
                        transition: "background 0.5s ease",
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
                        background: `radial-gradient(ellipse, ${gradientEnd}66 0%, transparent 70%)`,
                        borderRadius: "70% 30% 60% 40% / 40% 60% 40% 60%",
                        filter: "blur(25px)",
                        transition: "background 0.5s ease",
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
                        background: `radial-gradient(ellipse, ${gradientMid}55 0%, transparent 70%)`,
                        borderRadius: "40% 60% 30% 70% / 60% 40% 60% 40%",
                        filter: "blur(20px)",
                        transition: "background 0.5s ease",
                    }}
                />

                {/* Blob inferior */}
                <div
                    className="absolute"
                    style={{
                        width: "60vw",
                        height: "50vw",
                        maxWidth: 600,
                        maxHeight: 450,
                        bottom: "-8%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: `radial-gradient(ellipse at 50% 60%, ${gradientStart}88 0%, ${gradientMid}55 40%, transparent 70%)`,
                        borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
                        filter: "blur(35px)",
                        transition: "background 0.5s ease",
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
                    <circle cx="120" cy="180" r="28" fill="none" stroke={`${gradientStart}60`} strokeWidth="2" />
                    <circle cx="120" cy="180" r="22" fill={`${gradientStart}20`} />

                    <circle cx="880" cy="250" r="22" fill="none" stroke={`${gradientMid}50`} strokeWidth="2" />
                    <circle cx="880" cy="250" r="16" fill={`${gradientMid}20`} />

                    <circle cx="200" cy="550" r="18" fill="none" stroke={`${gradientEnd}50`} strokeWidth="1.5" />
                    <circle cx="820" cy="480" r="32" fill="none" stroke={`${gradientStart}44`} strokeWidth="2" />
                    <circle cx="820" cy="480" r="25" fill={`${gradientStart}20`} />

                    {/* Burbujas pequeñas */}
                    <circle cx="60" cy="320" r="8" fill={`${gradientEnd}40`} />
                    <circle cx="940" cy="400" r="10" fill={`${gradientMid}40`} />
                    <circle cx="320" cy="680" r="6" fill={`${gradientStart}40`} />
                    <circle cx="700" cy="120" r="9" fill={`${gradientEnd}35`} />
                    <circle cx="150" cy="420" r="5" fill={`${gradientStart}44`} />
                    <circle cx="860" cy="600" r="7" fill={`${gradientMid}35`} />
                    <circle cx="480" cy="720" r="5" fill={`${gradientStart}30`} />

                    {/* Burbujas medianas (antes gotitas ovaladas) */}
                    <circle cx="90" cy="500" r="7" fill={`${gradientStart}44`} />
                    <circle cx="920" cy="300" r="6" fill={`${gradientMid}35`} />
                    <circle cx="750" cy="650" r="8" fill={`${gradientEnd}35`} />
                    <circle cx="250" cy="150" r="5" fill={`${gradientStart}35`} />

                    {/* Destellos */}
                    <circle cx="350" cy="200" r="3" fill={`${gradientEnd}bb`} />
                    <circle cx="680" cy="350" r="2" fill={`${gradientEnd}99`} />
                    <circle cx="100" cy="650" r="2.5" fill={`${gradientEnd}88`} />
                </svg>

                {/* PNG hojas decorativas */}
                <img
                    src={asset("/decor/hoja-one.png")}
                    alt=""
                    className="absolute top-22 left-2 sm:top-16 sm:left-16 w-30 sm:w-36 md:w-76 pointer-events-none select-none opacity-90"
                />
                <img
                    src={asset("/decor/hoja-one-bottom.png")}
                    alt=""
                    className="absolute bottom-8 right-2 sm:bottom-16 sm:right-16 w-30 sm:w-36 md:w-76 pointer-events-none select-none opacity-90"
                />
            </div>
            {/* ── FIN FONDO ── */}

            {/* Contenido original sin cambios */}
            <div className="mt-6 md:mt-0 w-full flex justify-center">
                <ZazaLogo
                    size={280}
                    color={gradientStart}
                    gradientEnd={gradientEnd}
                    className="select-none pointer-events-none w-full max-w-[320px] h-auto lg:w-auto lg:max-w-none"
                />
            </div>

            <p className="mt-14 text-base md:text-xl text-[#464e59] text-center px-6 max-w-md leading-relaxed">
                el sabor de los momentos<br />que no se explican,{" "}
                <span className="font-zaza text-2xl sm:text-3xl text-transparent bg-clip-text bg-[length:200%_auto] animate-text-shimmer" style={{ backgroundImage: `linear-gradient(to right, ${gradientStart}, ${gradientEnd}, ${gradientStart})`, filter: `drop-shadow(0 0 8px ${gradientMid}80)` }}>se viven</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 sm:w-auto justify-center">
                <div className="relative group rounded-xl overflow-hidden w-full sm:w-auto">
                    <div
                        className="absolute -inset-0.5 rounded-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow"
                        style={{
                            background: `conic-gradient(from 0deg, transparent 10deg, ${gradientEnd}cc 30deg, ${gradientMid}cc 50deg, #fff 70deg, ${gradientStart}cc 90deg, transparent 110deg, transparent 360deg)`,
                        }}
                    />
                    <div className="relative m-[2px] rounded-[10px] bg-[#F3E8FF] group-hover:bg-white/20 group-hover:backdrop-blur-md transition-all duration-300">
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