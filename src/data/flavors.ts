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
    glb: "/textura-morada-small.glb",
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
  {
    id: "roja",
    name: "bery",
    tagline: "Intensa y explosiva",
    description:
      "Dulcecito pero con malicia... no te confies.",
    ingredients: ["Kola", "Frutos rojos", "Whisky"],
    glb: "/textura-berry.glb",
    color: "#E31245",
    gradientMid: "#F23B5F",
    gradientEnd: "#B12222",
    bgLight: "#FFF1F3",
    sectionBg:
      "linear-gradient(135deg,#E31245 0%,#E9445C 40%,#B12222 100%)",
  },
  {
    id: "lulay",
    name: "lulay",
    tagline: "Ácida y tropical",
    description:
      `Sabe a parche, a calorcito y a "otro mas pues". Muy colombiano, muy chimba`,
    ingredients: ["Limón", "Lulo", "Ron"],
    glb: "/textura-lulay.glb",
    color: "#A7CC39",
    gradientMid: "#C9DB55",
    gradientEnd: "#58BF4D",
    bgLight: "#F7FCEB",
    sectionBg:
      "linear-gradient(135deg,#A7CC39 0%,#D2DE58 40%,#58BF4D 100%)",
  },
  {
    id: "tropico",
    name: "tropico",
    tagline: "Refrescante y atrevida",
    description:
      "Fresquito pero traicionero... entra como como juguito y termina hablando solo.",
    ingredients: ["Limón", "Manzana verde", "Tequila"],
    glb: "/textura-tropico.glb",
    color: "#31B49A",
    gradientMid: "#5FC07E",
    gradientEnd: "#19A9B6",
    bgLight: "#EAFBF7",
    sectionBg:
      "linear-gradient(135deg,#31B49A 0%,#63C57D 40%,#19A9B6 100%)",
  },
]
