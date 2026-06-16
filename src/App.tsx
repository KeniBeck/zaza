import { Route, Routes } from "react-router-dom"
import { ZazaLogo } from "./components/ZazaLogo"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white">
      <ZazaLogo color="white" size={80} />
      <Routes>
        <Route path="/" element={<p className="text-neutral-400 mt-2">Home</p>} />
      </Routes>
    </div>
  )
}

export default App
