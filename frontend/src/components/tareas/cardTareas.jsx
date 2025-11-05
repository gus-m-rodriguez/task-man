import { Cardti } from "../ui/carti";
import { ButtonTi } from "../ui/ButtonTi";
import { HUES } from "../ui/palette";
import { useTareas} from "../../context/TareaContext";
import { useNavigate } from "react-router-dom";
  
export function CardTareas({ tarea, index, onDeleted }) {
    const { eliminarTarea } = useTareas();
    const navigate = useNavigate();
    const hue = HUES[(index ?? 0) % HUES.length];

  return (
    <Cardti hue={hue} className="flex flex-col justify-between" style={{ marginBottom: "1rem" }}>
      <div>
        <h3 className="text-2xl font-bold">{tarea.titulo}</h3>
        <p>{tarea.descripcion}</p>
      </div>

      <div className="flex gap-2 mt-4">
        <ButtonTi hue={hue} variant="edit" onClick={() => navigate(`/tareas/${tarea.id}/editar`)}>Editar</ButtonTi>
        <ButtonTi hue={hue} variant="delete" onClick={async () => { if (confirm("¿Estás seguro de eliminar esta tarea?")) { await eliminarTarea(tarea.id); onDeleted?.(tarea.id) } }}>Eliminar</ButtonTi>
      </div>
    </Cardti>
  );
}
export default CardTareas;
