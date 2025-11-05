export const PORT = process.env.PORT || 3000;

// Acepta variables de Railway y las tuyas
export const PG_HOST     = process.env.PGHOST     || process.env.PG_HOST     || "localhost";
export const PG_PORT     = Number(process.env.PGPORT || process.env.PG_PORT || 5432);
export const PG_USER     = process.env.PGUSER     || process.env.PG_USER     || "postgres";
export const PG_PASSWORD = process.env.PGPASSWORD || process.env.PG_PASSWORD || "admin";
export const PG_DATABASE = process.env.PGDATABASE || process.env.PG_DATABASE || "PERN";

// ⬇️ ESTA LÍNEA ES CLAVE (faltaba en el deploy)
export const DATABASE_URL = process.env.DATABASE_URL || null;

export const ORIGIN = process.env.ORIGIN || "http://localhost:4000";
