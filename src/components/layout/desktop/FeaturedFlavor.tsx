import type { Flavor } from "../../../data/flavors"
import { desktopClamp } from "../../../hooks/useScreenSize"
import { useCrossfade } from "../../../hooks/useCrossfade"
import { TbShoppingCart } from "react-icons/tb"

interface FeaturedFlavorProps {
  flavors: Flavor[]
  activeIndex: number
  onSelect: (index: number) => void
}

function SelectorItem({ flavor, isActive, onClick }: { flavor: Flavor; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl text-left transition-all duration-300 border backdrop-blur-sm relative overflow-hidden cursor-pointer"
      style={{
        paddingTop: desktopClamp("0.75rem", "0.5rem + 0.5vw", "1.25rem"),
        paddingBottom: desktopClamp("0.75rem", "0.5rem + 0.5vw", "1.25rem"),
        paddingLeft: desktopClamp("1rem", "0.6rem + 0.6vw", "1.5rem"),
        paddingRight: desktopClamp("1rem", "0.6rem + 0.6vw", "1.5rem"),
        backgroundColor: isActive ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
        borderColor: isActive ? `${flavor.color}90` : "rgba(255,255,255,0.12)",
        borderWidth: isActive ? desktopClamp("1.5px", "1px + 0.1vw", "2px") : "1px",
        transform: isActive ? `translateX(${desktopClamp("4px", "2px + 0.3vw", "8px")})` : "translateX(0)",
        boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.15)" : "none",
      }}
    >
      {isActive && (
        <div
          className="absolute inset-0 pointer-events-none rounded-xl"
          style={{ background: `linear-gradient(135deg, ${flavor.color}20, transparent 60%)` }}
        />
      )}
      <span
        className="rounded-full flex-shrink-0"
        style={{
          width: desktopClamp("14px", "8px + 0.6vw", "20px"),
          height: desktopClamp("14px", "8px + 0.6vw", "20px"),
          backgroundColor: flavor.color,
          boxShadow: isActive ? `0 0 10px ${flavor.color}, 0 0 20px ${flavor.color}80` : `0 0 4px ${flavor.color}60`,
        }}
      />
      <div className="flex flex-col min-w-0">
        <span
          className="font-zaza text-white leading-tight truncate"
          style={{
            fontSize: desktopClamp("1.05rem", "0.7rem + 0.6vw", "1.5rem"),
            textShadow: isActive ? `0 0 8px ${flavor.color}90, 0 0 20px ${flavor.color}50` : "none",
            WebkitTextStroke: isActive ? `0.5px ${flavor.color}70` : "none",
          }}
        >
          {flavor.name}
        </span>
        <span
          className="text-white/70 leading-tight truncate"
          style={{ fontSize: desktopClamp("0.75rem", "0.5rem + 0.4vw", "1rem") }}
        >
          {flavor.tagline}
        </span>
      </div>
    </button>
  )
}

function ContentLayer({ flavor, isVisible }: { flavor: Flavor; isVisible: boolean }) {
  return (
    <div
      className="flex flex-col transition-opacity duration-[800ms] ease"
      style={{
        opacity: isVisible ? 1 : 0,
        position: "absolute",
        inset: 0,
        paddingTop: desktopClamp("1.5rem", "0.75rem + 1vw", "2.5rem"),
        paddingBottom: desktopClamp("1.5rem", "0.75rem + 1vw", "2.5rem"),
        paddingLeft: desktopClamp("1.5rem", "0.75rem + 1vw", "2.5rem"),
        paddingRight: desktopClamp("1.5rem", "0.75rem + 1vw", "2.5rem"),
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      <h3
        className="font-zaza text-white leading-none"
        style={{
          fontSize: desktopClamp("2rem", "1.25rem + 2vw", "3.5rem"),
          textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
          WebkitTextStroke: `1px ${flavor.color}`,
          marginBottom: desktopClamp("0.75rem", "0.4rem + 0.5vw", "1.5rem"),
        }}
      >
        {flavor.name}
      </h3>

      <div className="self-end flex flex-col items-center text-right" style={{ gap: desktopClamp("0.75rem", "0.6rem + 0.6vw", "1.5rem"), maxWidth: desktopClamp("300px", "200px + 15vw", "520px") }}>
        <p
          className="text-white/85 leading-relaxed text-center"
          style={{
            fontSize: desktopClamp("0.85rem", "0.5rem + 0.5vw", "1.05rem"),
          }}
        >
          {flavor.description}
        </p>

        <div className=" text-center">
          <p
            className="font-zaza text-white text-3xl"
            style={{
              textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
              WebkitTextStroke: `0.5px ${flavor.color}`,
              marginBottom: desktopClamp("0.15rem", "0.1rem + 0.1vw", "0.35rem"),
            }}
          >
            Ingredientes
          </p>
          <p
            className="text-white/70"
            style={{ fontSize: desktopClamp("0.75rem", "0.45rem + 0.4vw", "0.95rem") }}
          >
            {flavor.ingredients.join(", ")}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <p
            className="font-zaza text-white"
            style={{
              fontSize: desktopClamp("1.5rem", "0.9rem + 1.2vw", "2.5rem"),
              textShadow: `0 0 8px ${flavor.color}, 0 0 20px ${flavor.color}, 0 0 40px ${flavor.color}`,
              WebkitTextStroke: `1px ${flavor.color}`,
            }}
          >
            {flavor.price}
          </p>

          <button
            className="snake-border rounded-2xl text-white bg-white/30 font-semibold active:scale-95 transition-transform cursor-pointer"
            style={{
              paddingTop: desktopClamp("0.5rem", "0.3rem + 0.3vw", "0.75rem"),
              paddingBottom: desktopClamp("0.5rem", "0.3rem + 0.3vw", "0.75rem"),
              paddingLeft: desktopClamp("1rem", "0.6rem + 0.6vw", "2rem"),
              paddingRight: desktopClamp("1rem", "0.6rem + 0.6vw", "2rem"),
              ["--g1" as string]: flavor.color,
              ["--g2" as string]: `${flavor.color}AA`,
              ["--speed" as string]: "4s",
            }}
          >
            <span
              className="flex items-center justify-center gap-2"
              style={{ fontSize: desktopClamp("0.8rem", "0.5rem + 0.4vw", "1rem") }}
            >
              <TbShoppingCart />
              Pedir
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export function FeaturedFlavor({ flavors, activeIndex, onSelect }: FeaturedFlavorProps) {
  const active = flavors[activeIndex]

  const [contentLayers, activeContentLayer] = useCrossfade(flavors[activeIndex])

  return (
    <div
      className="hidden md:flex items-stretch"
      style={{ gap: desktopClamp("1rem", "0.5rem + 2vw", "3rem") }}
    >
      <div
        className="flex flex-col justify-center"
        style={{
          width: desktopClamp("180px", "10vw + 80px", "300px"),
          gap: desktopClamp("0.6rem", "0.4rem + 0.4vw", "1.25rem"),
        }}
      >
        {flavors.map((flavor, i) => (
          <SelectorItem
            key={flavor.id}
            flavor={flavor}
            isActive={i === activeIndex}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      <div
        className="relative flex-1 rounded-3xl bg-white/10 backdrop-blur-xl border shadow-xl overflow-hidden"
        style={{
          minHeight: desktopClamp("320px", "20vw + 120px", "500px"),
          borderColor: `${active.color}40`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
        }}
      >
        <div
          className="absolute top-0 rounded-full pointer-events-none"
          style={{
            left: desktopClamp("1rem", "0.5rem + 1vw", "2rem"),
            right: desktopClamp("1rem", "0.5rem + 1vw", "2rem"),
            height: "1.5px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
          }}
        />

        {[0, 1].map((layer) => (
          <ContentLayer
            key={layer}
            flavor={contentLayers[layer]}
            isVisible={activeContentLayer === layer}
          />
        ))}
      </div>
    </div>
  )
}
