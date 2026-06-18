export interface Flavor {
  id: string
  name: string
  tagline: string
  glb: string
  color: string
  gradientEnd: string
  bgLight: string
}

export const FLAVORS: Flavor[] = [
  {
    id: "morada",
    name: "Morada",
    tagline: "Dulce y envolvente",
    glb: "/textura-morada.glb",
    color: "#6B318B",
    gradientEnd: "#A03B90",
    bgLight: "#F3E8FF",
  },
  {
    id: "azul",
    name: "Azul",
    tagline: "Fresca y vibrante",
    glb: "/textura-azul.glb",
    color: "#1E88E5",
    gradientEnd: "#64B5F6",
    bgLight: "#E3F2FD",
  },
]
