// src/config/db.js
import dotenv from "dotenv";
import pkg from "pg"; // pg solo soporta import de esta forma en ESM
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
});

// Exportamos el objeto pool directamente como default
export default {
  query: (text, params) => pool.query(text, params),
};
