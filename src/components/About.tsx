import { WHATSAPP_URL } from "../constants";
import { ZazaLogo } from "./ZazaLogo";

export function About() {
    return (
        <div className="flex flex-col items-center pt-[25vh]">
            <ZazaLogo
                size={160}
                color="#6B318B"
                gradientEnd="#A03B90"
                className="select-none pointer-events-none"
            />

            <p className="mt-8 text-base md:text-lg text-gray-500 text-center px-6 max-w-md leading-relaxed">
                el sabor de los momentos<br />que no se explican, se viven.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <a
                    href="#productos"
                    className="px-7 py-3 text-sm font-semibold text-[#6B318B] border-2 border-[#6B318B]/30 rounded-xl hover:bg-[#6B318B]/5 transition-colors"
                >
                    Ver sabores
                </a>
                <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#6B318B] to-[#A03B90] rounded-xl hover:opacity-90 transition-opacity"
                >
                    Pruébalo ahora
                </a>
            </div>
        </div>
    )
}