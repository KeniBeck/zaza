export interface Colaborador {
  nombre: string
  rol: string
  descripcion: string
  foto: string
  instagram: string
}

export const COLABORADORES: Colaborador[] = [
  {
    nombre: "Salla",
    rol: "CEO · El dueño del letrero",
    descripcion: 'Cabeza detrás del proyecto y experto en decir: "Tengo una idea". El que sueña en grande y convence a todos de seguirle la corriente.',
    foto: "/image/colaboradores/salla.webp",
    instagram: "soysalla_",
  },
  {
    nombre: "Ortiz",
    rol: "El ministro de las vueltas",
    descripcion: "El que mueve todo para que funcione. Si algo falta, él ya lo consiguió. El relacionista, el solucionador y el que tiene un contacto para todo.",
    foto: "/image/colaboradores/ortiz.webp",
    instagram: "estivengoz",
  },
  {
    nombre: "Sombra",
    rol: "El involucrador profesional",
    descripcion: "El corre caminos. Habla con uno, involucra a diez y le vende a veinte. Si te cruzaste con ZAZA, probablemente fue culpa de él.",
    foto: "/image/colaboradores/sombra.webp",
    instagram: "cristian_17h",
  },

]
