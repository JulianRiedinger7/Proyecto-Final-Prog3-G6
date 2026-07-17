import { useState } from 'react'
import './App.css'
import { GestionGenero } from './pages/GestionGenero.pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DetalleLibro from './pages/DetalleLibro'
import Home from './pages/Home'

function App() {
  const [count, setCount] = useState(0)
     return (
    <BrowserRouter>
      <Routes>
        <Route path="/generos" element={<GestionGenero />} />
        <Route path="/libro/:id" element={<DetalleLibro />} />
        {/* la ruta principal, con el contenido de bienvenida de Vite */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
