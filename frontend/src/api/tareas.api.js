import axios from "./axios";

export const crearTareaRequest = (tarea) => axios.post("/tareas", tarea);

export const obtenerTareasRequest = () => axios.get("/tareas");

export const eliminarTareaRequest = (id) => axios.delete(`/tareas/${id}`);

export const obtenerTareaRequest = (id) => axios.get(`/tareas/${id}`);

export const actualizarTareaRequest = (id, newFields) => axios.put(`/tareas/${id}`, newFields);