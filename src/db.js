import pg from "pg";
import {
  PG_PORT, PG_HOST, PG_USER, PG_PASSWORD, PG_DATABASE, DATABASE_URL
} from "./config.js";

const { Pool } = pg;

// Si hay DATABASE_URL, úsala; si no, usa los campos sueltos
const isInternal = (PG_HOST || "").includes(".internal");

export const pool = DATABASE_URL
  ? new Pool({
      connectionString: DATABASE_URL,
      // con dominio público usar SSL
      ssl: { rejectUnauthorized: false },
    })
  : new Pool({
      host: PG_HOST,
      port: PG_PORT,
      user: PG_USER,
      password: PG_PASSWORD,
      database: PG_DATABASE,
      // red interna de Railway NO necesita SSL
      ssl: isInternal ? false : { rejectUnauthorized: false },
    });

pool.on("connect", () => {
  console.log("Conectado a la base de datos", {
    host: PG_HOST || "via DATABASE_URL",
    port: PG_PORT || "via DATABASE_URL",
  });
});
