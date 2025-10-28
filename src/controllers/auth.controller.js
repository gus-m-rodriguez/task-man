import { pool } from "../db.js";
import bcrypt from "bcrypt";

export const signin = (req, res) => res.send("ingresando");

export const signup = async (req, res) => {
    const {nombre, email, password} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const resultado = await pool.query("INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *", [nombre, email, hashedPassword]);
        console.log(resultado);
        return res.json(resultado.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "El correo ya esta registrado"
            });
        }
        
    }
        
    
};

export const signout = (req, res) => res.send("cerrando sesion");

export const profile = (req, res) => res.send("perfil del usuario");