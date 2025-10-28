import { pool } from "../db.js";
import bcrypt from "bcrypt";
import {createAccessToken} from "../libs/jwt.js";

// SIGN IN
export const signin = async (req, res) => {
   const {email, password} = req.body;

   const result = await pool.query("SELECT * FROM usuarios WHERE email =$1", [email]);

   if(result.rowCount === 0){
        return res.status(400).json({message:"El correo no esta registrado"});
   }

   const validPassword = await bcrypt.compare(password, result.rows[0].password);

   if(!validPassword){
        return res.status(400).json({message: "La constraseña es incorrecta"});
    }

    const token = await createAccessToken({id: result.rows[0].id});
    console.log(result);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        //1 dia milisegundos, segundos, minutos, horas
        maxAge: 1000 * 60 * 60 * 24 //1 dia
        });
        return res.json(result.rows[0]);     
}

//SIGN UP

export const signup = async (req, res, next) => {
    const {nombre, email, password} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const resultado = await pool.query("INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *", [nombre, email, hashedPassword]);
        
        const token = await createAccessToken({id: resultado.rows[0].id});

        console.log(resultado);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            //1 dia milisegundos, segundos, minutos, horas
            maxAge: 1000 * 60 * 60 * 24 //1 dia
                    });
        return res.json(resultado.rows[0]);
    } catch (error) {
        if (error.code === "23505") {
            return res.status(409).json({
                message: "El correo ya esta registrado"
            });
        }
        next(error);
        
    }
        
    
};

// SIGNOUT

export const signout = (req, res) => {
    res.clearCookie("token");
    return res.json({message: "Sesion cerrada"});
};

//PROFILE
export const profile = async (req, res) => {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id =$1", [req.usuarioId]);
    return res.json(resultado.rows[0]);

};