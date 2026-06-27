export interface Flavor {
  id: string
  name: string
  tagline: string
  description: string
  ingredients: string[]
  price: string
  glb: string
  color: string
  gradientMid: string
  gradientEnd: string
  bgLight: string
  sectionBg: string
  nosotrosBg: string
  colabBg: string
}

export const FLAVORS: Flavor[] = [
  {
    id: "morada",
    name: "astral",
    tagline: "Dulce y envolvente",
    description: "Tranquilo pero traicionero… entra como jueguito y termina hablando solo.",
    ingredients: ["Sandía", "Maracuyá", "Whisky"],
    price: "$ 17.900",
    glb: "/textura-morada.glb",
    color: "#6B318B",
    gradientMid: "#A855F7",
    gradientEnd: "#A03B90",
    bgLight: "#F3E8FF",
    sectionBg: "linear-gradient(135deg, #6B318B 0%, #7B3D8F 40%, #A03B90 100%)",
    nosotrosBg: "linear-gradient(160deg, #2a0d3a 0%, #3d1560 100%)",
    colabBg: "linear-gradient(160deg, #1c0828 0%, #280d45 100%)",
  },
  {
    id: "azul",
    name: "chill",
    tagline: "Fresca y vibrante",
    description: "Este es peligroso… cuando caes en cuenta ya vas en el tercero.",
    ingredients: ["Menta", "Arándanos", "Vodka"],
    price: "$ 17.900",
    glb: "/textura-azul.glb",
    color: "#0d4a8a",
    gradientMid: "#1565C0",
    gradientEnd: "#1976D2",
    bgLight: "#E3F2FD",
    sectionBg: "linear-gradient(135deg, #0d3d6e 0%, #155ea8 50%, #1a78c8 100%)",
    nosotrosBg: "linear-gradient(160deg, #051828 0%, #0a2d50 100%)",
    colabBg: "linear-gradient(160deg, #030e1a 0%, #061e36 100%)",
  },
  {
    id: "roja",
    name: "bery",
    tagline: "Intensa y explosiva",
    description:
      "Dulcecito pero con malicia... no te confies.",
    ingredients: ["Kola", "Frutos rojos", "Whisky"],
    price: "$ 17.900",
    glb: "/textura-berry.glb",
    color: "#8a0a28",
    gradientMid: "#b01530",
    gradientEnd: "#6e1515",
    bgLight: "#FFF1F3",
    sectionBg: "linear-gradient(135deg, #8a0a28 0%, #b5103a 50%, #7a1515 100%)",
    nosotrosBg: "linear-gradient(160deg, #2d0510 0%, #4a0c1e 100%)",
    colabBg: "linear-gradient(160deg, #1a0309 0%, #2e0812 100%)",
  },
  {
    id: "lulay",
    name: "lulay",
    tagline: "Ácida y tropical",
    description:
      `Sabe a parche, a calorcito y a "otro mas pues". Muy colombiano, muy chimba`,
    ingredients: ["Limón", "Lulo", "Ron"],
    price: "$ 17.900",
    glb: "/textura-lulay.glb",
    color: "#4a6310",
    gradientMid: "#6b7e1a",
    gradientEnd: "#206b18",
    bgLight: "#F7FCEB",
    sectionBg: "linear-gradient(135deg, #3d5214 0%, #5a7a1e 50%, #1e6b18 100%)",
    nosotrosBg: "linear-gradient(160deg, #141f05 0%, #233510 100%)",
    colabBg: "linear-gradient(160deg, #0a1302 0%, #152008 100%)",
  },
  {
    id: "tropico",
    name: "tropico",
    tagline: "Refrescante y atrevida",
    description:
      "Fresquito pero traicionero... entra como como juguito y termina hablando solo.",
    ingredients: ["Limón", "Manzana verde", "Tequila"],
    price: "$ 17.900",
    glb: "/textura-tropico.glb",
    color: "#31B49A",
    gradientMid: "#5FC07E",
    gradientEnd: "#19A9B6",
    bgLight: "#EAFBF7",
    sectionBg: "linear-gradient(135deg,#31B49A 0%,#63C57D 40%,#19A9B6 100%)",
    nosotrosBg: "linear-gradient(160deg, #072e28 0%, #0d4a3a 100%)",
    colabBg: "linear-gradient(160deg, #041c18 0%, #082e24 100%)",
  },
]
