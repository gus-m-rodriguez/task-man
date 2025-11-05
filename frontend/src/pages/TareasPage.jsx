import {useEffect} from 'react'
import {CardTareas} from '../components/tareas/cardTareas'
import { useTareas } from '../context/TareaContext';
import { Cardti } from '../components/ui/carti'
import { ButtonTi } from '../components/ui/ButtonTi'
import { HUES } from '../components/ui/palette'


function TareasPage() {
  const { tareas, cargarTareas, setTareas } = useTareas();
  useEffect(() => {
    cargarTareas();
  }, []);

   if (tareas.length === 0) {
    const hue = HUES[2];
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Cardti
          hue={hue}
          className="w-[min(92vw,720px)] text-center px-8 py-10 shadow-lg rounded-2xl"
        >
          <div className="mb-4">
            <h2 className="flex items-center justify-center gap-2 text-2xl font-extrabold">
              <svg
                viewBox="0 0 120 120"
                aria-hidden="true"
                className="w-10 h-10 align-middle"
              >
                <circle cx="60" cy="60" r="50" fill="#F9D44C" />
                <polygon points="60,60 110,30 110,90" fill="#fbcfe8" />
                <circle cx="72" cy="48" r="7" fill="#0F1A2B" />
              </svg>
              <span className="align-middle">📋</span>
              <span className="align-middle">No hay tareas aún</span>
            </h2>
          </div>

          <p className="text-black mb-6">
            Creá tu primera tarea para empezar a organizarte.
          </p>
          <p className="text-black mb-6">
            Podés editarla oeliminarla cuando quieras.
          </p>

          <div className="flex items-center justify-center gap-3">
            <ButtonTi hue={hue} variant="edit" onClick={() => navigate('/tareas/crear')}>
              Crear tarea
            </ButtonTi>
            <ButtonTi hue={hue} variant="delete" onClick={cargarTareas}>
              Refrescar
            </ButtonTi>
          </div>
        </Cardti>
      </div>
    );
  }
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-2'>
      {tareas.map((tarea, i) => (
      <CardTareas tarea={tarea} key={tarea.id} index={i} onDeleted={(id) => setTareas(prev => prev.filter(t => t.id !== id))}
  />
))}
    </div>
  )
}

export default TareasPage
