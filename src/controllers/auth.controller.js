import { pool } from "../db.js";
import bcrypt from "bcrypt";
import {createAccessToken} from "../libs/jwt.js";
import md5 from "md5";

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
        secure: true,
        sameSite: "none",
        path: "/",
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
        
        const gravatar = "https://gravatar.com/avatar/"+ md5(email);

        const resultado = await pool.query("INSERT INTO usuarios (nombre, email, password, gravatar) VALUES ($1, $2, $3, $4) RETURNING *", [nombre, email, hashedPassword, gravatar]);
        
        const token = await createAccessToken({id: resultado.rows[0].id});

        console.log(resultado);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
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
    res.clearCookie("token", { path: "/", secure: true, sameSite: "None" });
    return res.json({message: "Sesion cerrada"});
};

//PROFILE
export const profile = async (req, res) => {
    const resultado = await pool.query("SELECT * FROM usuarios WHERE id =$1", [req.usuarioId]);
    return res.json(resultado.rows[0]);

};

export const updateProfile = async (req, res) => {
  const { nombre, email } = req.body;

  try {
    if (!nombre || nombre.trim().length < 3) {
      return res.status(400).json({ message: "El nombre debe tener al menos 3 caracteres" });
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: "Email inválido" });
    }

    // ¿ya existe ese email en otro user?
    const exists = await pool.query(
      "SELECT id FROM usuarios WHERE email = $1 AND id <> $2",
      [email, req.usuarioId]
    );
    if (exists.rowCount > 0) {
      return res.status(409).json({ message: "El correo ya se encuentra registrado por otro usuario" });
    }

    const updated = await pool.query(
        "UPDATE usuarios SET nombre=$1, email=$2, fecha_actualizacion=NOW() WHERE id=$3 RETURNING id, nombre, email, gravatar, fecha_registro, fecha_actualizacion",
        [nombre.trim(), email.trim(), req.usuarioId]
    );
    return res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al actualizar el perfil" });
  }
};

// === CHANGE PASSWORD
export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "La nueva contraseña debe tener al menos 6 caracteres" });
    }

    const q = await pool.query("SELECT id, password FROM usuarios WHERE id=$1", [req.usuarioId]);
    if (q.rowCount === 0) return res.status(404).json({ message: "Usuario no encontrado" });

    const ok = await bcrypt.compare(currentPassword ?? "", q.rows[0].password);
    if (!ok) return res.status(400).json({ message: "La contraseña actual es incorrecta" });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE usuarios SET password=$1 WHERE id=$2", [hashed, req.usuarioId]);

    return res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};