export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "521234567890"
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`
export const PRODUCT_PRICE = "$ 17.900"

// Pasa rutas absolutas a rutas con prefijo base (GitHub Pages subpath)
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
