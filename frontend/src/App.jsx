import Navbar from './components/navbar/navbar.jsx'
import { Container } from './components/ui/index.js'

import {Routes, Route} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import TareasPage from './pages/TareasPage'
import TareaFormPage from './pages/TareaFormPage' 
import NotFoundPage from './pages/NotFound'



function App () {
  return(
    <>
      <Navbar/>
      <Container className="py-5">
         <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
      
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/perfil" element={<ProfilePage />} />

          <Route path="/tareas" element={<TareasPage />} />
          <Route path="/tareas/crear" element={<TareaFormPage />} />
          <Route path="/tareas/editar/:id" element={<TareaFormPage />} />
          <Route path="*" element={<NotFoundPage/>} />

        </Routes>
      </Container>
    </>
  )
}

export default App

