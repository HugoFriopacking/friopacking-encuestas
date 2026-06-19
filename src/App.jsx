import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Encuesta from './pages/Encuesta.jsx'
import Gracias from './pages/Gracias.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/encuesta/:id" element={<Encuesta />} />
      <Route path="/gracias" element={<Gracias />} />
    </Routes>
  )
}
