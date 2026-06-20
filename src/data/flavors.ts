export interface Flavor {
  id: string
  name: string
  tagline: string
  description: string
  ingredients: string[]
  glb: string
  color: string
  gradientMid: string
  gradientEnd: string
  bgLight: string
  sectionBg: string
}

export const FLAVORS: Flavor[] = [
  {
    id: "morada",
    name: "astral",
    tagline: "Dulce y envolvente",
    description: "Tranquilo pero traicionero… entra como jueguito y termina hablando solo.",
    ingredients: ["Sandía", "Maracuyá", "Whisky"],
    glb: "/textura-morada.glb",
    color: "#6B318B",
    gradientMid: "#A855F7",
    gradientEnd: "#A03B90",
    bgLight: "#F3E8FF",
    sectionBg: "linear-gradient(135deg, #6B318B 0%, #7B3D8F 40%, #A03B90 100%)",
  },
  {
    id: "azul",
    name: "chill",
    tagline: "Fresca y vibrante",
    description: "Este es peligroso… cuando caes en cuenta ya vas en el tercero.",
    ingredients: ["Menta", "Arándanos", "Vodka"],
    glb: "/textura-azul.glb",
    color: "#1E88E5",
    gradientMid: "#42A5F5",
    gradientEnd: "#64B5F6",
    bgLight: "#E3F2FD",
    sectionBg: "linear-gradient(135deg, #0D47A1 0%, #1565C0 40%, #42A5F5 100%)",
  },
]
