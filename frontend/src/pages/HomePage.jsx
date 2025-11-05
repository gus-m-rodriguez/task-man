import {useContext} from 'react';
import { authContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';


function HomePage() {
  const data = useContext(authContext);

 return (
  <div className="flex justify-center items-center h-[80vh]">
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-b from-[#cdd5df] to-[#cdd5df] text-gray-800 rounded-3xl shadow-inner w-[85vw] max-w-5xl mx-auto">
      <header className="mb-6 text-center">
        <h1 className="text-5xl font-extrabold text-sky-700 mb-2 flex items-center justify-center gap-2 drop-shadow-sm">
  <span dangerouslySetInnerHTML={{ __html: `<svg xmlns='http://www.w3.org/2000/svg' width='62' height='62' viewBox='0 0 200 200'><circle cx='100' cy='100' r='80' fill='#FCD34D'/>
      <polygon points='100,100 180,45 180,155' fill='#cdd5df'/><circle cx='120' cy='60' r='8' fill='#111827'/></svg>`}}/> 📋Task-Man
        </h1>
        <p className="text-lg text-gray-700">
          Organizá tus tareas, administrá tus proyectos y alcanzá tus metas.
        </p>
      </header>

      <main className="bg-white rounded-2xl shadow-lg p-8 w-11/12 max-w-lg text-center border border-gray-200">
        <h2 className="text-2xl font-bold mb-3">Comenzá ahora</h2>
        <p className="text-gray-600 mb-8">
          Registrate gratis o ingresá si ya tenés una cuenta para empezar a
          crear y gestionar tus tareas.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/login"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-md transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-5 rounded-md transition"
          >
            Crear cuenta
          </Link>
        </div>
      </main>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} TaskManager — Proyecto académico UTN
      </footer>
    </div>
  </div>
  );
}

export default HomePage;