import Navbar from './components/navbar/navbar.jsx'
import { Container } from './components/ui/index.js'
import {ProtectedRoute} from './components/ProtectedRoute.jsx'
import { useAuth } from './context/AuthContext.jsx'
import {TareaProvider} from './context/TareaContext.jsx'

import {Routes, Route, Outlet} from 'react-router-dom'

import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import TareasPage from './pages/TareasPage'
import TareaFormPage from './pages/TareaFormPage' 
import NotFoundPage from './pages/NotFound'



function App () {
  const {isAuth} = useAuth();
  return(
    <>
      <Navbar/>
      <Container className="py-5">
         <Routes>

          <Route element={<ProtectedRoute isAllowed={!isAuth} redirectTo={"tareas"}/>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<ProtectedRoute isAllowed={isAuth} redirectTo="/login" />}>
              <Route path="/perfil" element={<ProfilePage />} />

              <Route element={<TareaProvider>
                <Outlet />
              </TareaProvider>}>
                {<Route path="/tareas" element={<TareasPage />} />}
                {<Route path="/tareas/crear" element={<TareaFormPage />} />}
                {<Route path="/tareas/:id/editar" element={<TareaFormPage />} />}
              </Route>
          </Route>
          <Route path="*" element={<NotFoundPage/>} />

        </Routes>
      </Container>
    </>
  )
}

export default App

