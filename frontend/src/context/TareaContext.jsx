import  {createContext, useContext, useState} from 'react';
import { obtenerTareasRequest, eliminarTareaRequest, crearTareaRequest, obtenerTareaRequest, actualizarTareaRequest } from '../api/tareas.api';
import { set } from 'react-hook-form';

const TareaContext = createContext();

export const useTareas = () => {
    const context = useContext(TareaContext);
    if (!context) {
        throw new Error('useTareas must be used within a TareaProvider');
    }
    return context;
}

export const TareaProvider = ({ children }) => {
  const [tareas, setTareas] = useState([]);
  const [errors, setError] = useState([]);

const  cargarTareas  = async() => {
        const res = await obtenerTareasRequest();
        setTareas(res.data);
    };
const cargarTarea = async (id) => {
    const res = await obtenerTareaRequest(id);
    return res.data;
};

    const crearTarea = async (tarea) => {
        try {
            const res = await crearTareaRequest(tarea);
            setTareas([...tareas, res.data]);
            return res.data;
            
        } catch (error) {
            if (error.response) {
                const data = error.response.data;
                setError(Array.isArray(data) ? data : [data.message]);
            }
        }
    
}

const eliminarTarea = async (id) => {
    await eliminarTareaRequest(id);
}

const actualizarTarea = async (id, newFields) => {
    try {
        const res = await actualizarTareaRequest(id, newFields);
        return res.data;
    } catch (error) {
        if (error.response) {
            const data = error.response.data;
            setError(Array.isArray(data) ? data : [data.message]);
        }
    }
}

return (
    <TareaContext.Provider value={{ tareas,  cargarTareas, setTareas, eliminarTarea, crearTarea, errors, setError, cargarTarea, actualizarTarea }}>
      {children}
    </TareaContext.Provider>
  );
};
 
export const useTarea = () => useContext(TareaContext);
