import { useTareas } from '../context/TareaContext';
import { Card, Input, Textarea } from "../components/ui";
import {useForm} from "react-hook-form";
import { useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";


function TareaFormPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [postError, setPostError] = useState([]);
  const { crearTarea, errors: tareaErrors, setError, cargarTarea, actualizarTarea } = useTareas();
  useEffect(() => {
    setError([]);
    return () => setError([]);
  }, [setError]);
  const onSubmit = handleSubmit(async(data) => {
      setError([]);
      let res;
      if (!params.id) {
        res = await crearTarea(data);
      } else {
        res = await actualizarTarea(params.id, data);
      }
      if (res) {
          navigate("/tareas");
        }
  });

  useEffect(() => {
    if (params.id) {
        cargarTarea(params.id).then(tarea => {
            setValue("titulo", tarea.titulo);
            setValue("descripcion", tarea.descripcion);
        });
    }
  }, [params.id, setValue, cargarTarea]);

  return (
    <div className="flex h-[80vh] justify-center items-center">
      <Card>
        {
          tareaErrors.map((error, index) => (
            <div key={index} className="bg-red-500 p-2 text-white font-bold mb-3 rounded-md">
              {error}
            </div>
          ))}
        <h2 className="text text-2xl font-bold my-5"> Formulario de Tareas | {params.id ? "Editar" : "Crear"}</h2>
        <form onSubmit={onSubmit}>
          <label id="titulo" htmlFor="titulo">Título</label>

          <Input type="text" placeholder="Título" className="my-15" autoFocus
            {...register("titulo", { required: true })} />
          {errors.titulo && <div><span className="text-red-500">*El título es obligatorio</span></div>}
          <label className="mt-5" id="descripcion" htmlFor="descripcion">Descripción</label>
          <Textarea type="text" placeholder="Descripción" rows={15}
            {...register("descripcion")} />
        <button type="submit" 
        //onClick={handleSubmit(onSubmit)}
          className="bg-green-950 px-3 py-2 rounded-md mt-5 hover:bg-green-800
          transition-colors duration-300">
          Guardar
        </button>
        </form>
      </Card>
    </div>
  );
}

export default TareaFormPage;
