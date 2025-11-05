import { pool } from "../db.js";

export const listarTareas = async (req, res) => {
    console.log(req.usuarioId);
    const resultado = await pool.query("SELECT * FROM tareas WHERE usuario_id = $1", [req.usuarioId]);
    return res.json(resultado.rows);
}

export const listarTarea = async (req, res) => {
    const resultado = await pool.query("SELECT * FROM tareas WHERE id = $1", [req.params.id]);
    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "Tarea no encontrada"
        });
    }
    return res.json(resultado.rows[0]);
}

export const crearTarea = async (req, res, next) => {
    const { titulo, descripcion } = req.body;
    const usuarioId = req.usuarioId;
    const tituloUnico = `${titulo}-${usuarioId}`;
    try {    
        const result = await pool.query(`INSERT INTO tareas (titulo, descripcion, usuario_id, titulo_usuario_unique)
       VALUES ($1, $2, $3, $4)
       RETURNING *`, [titulo, descripcion, req.usuarioId, tituloUnico]);
        res.json(result.rows[0]);
        console.log(result.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "Ya existe una tarea con ese titulo"
            });
        }

        console.log(error);
        next(error);
    } 
    
}

export const actualizarTarea = async (req, res) => {
    const { titulo, descripcion } = req.body;
    const id = req.params.id;
    const resultado = await pool.query("UPDATE tareas SET titulo = $1, descripcion = $2 WHERE id = $3 RETURNING *", [titulo, descripcion, id]);
    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "Tarea no encontrada con ese ID"
        });
    }
    return res.json(resultado.rows[0]);
}





export const eliminarTarea = async (req, res) => {
    const resultado = await pool.query("DELETE FROM tareas WHERE id = $1", [req.params.id]);
    
    if (resultado.rowCount === 0) {
        return res.status(404).json({
            message: "Tarea no encontrada"
        });
    }
    return res.sendStatus(204);
}