import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// Nota: GitHub Pages no entiende rutas profundas al recargar (404 en
// usuario.github.io/repo/alguna-ruta). Si el proyecto crece a multi-página,
// agregar un 404.html que redirija a index.html (patrón SPA).
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
