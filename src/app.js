import express from "express";
import morgan from "morgan";
import tareasRoutes from "./router/tareas.routes.js";
import authRoutes from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { pool } from "./db.js";
import { ORIGIN } from "./config.js";

const app = express();
// ★ detrás de Railway/NGINX:
app.set("trust proxy", 1);

//Middlewares
app.use(cors({
  origin: ORIGIN,                 // p.ej. https://ftask-man-production.up.railway.app
  credentials: true,              // ← permite cookies
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rutas
app.get("/", (req, res) => res.json({ message: "Bienvenido a mi proyecto" }));
app.get("/api/ping", async(req, res) => {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
});
app.use("/api", tareasRoutes);
app.use("/api", authRoutes);

//manejando errores
app.use((err, req, res, next) => {
    res.status(500).json({
        status: "error",
        message: err.message,
    });
});
export default app;