import pool from "../config/db.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const getUsers = async () => {
  const tipo = "admin";
  const result = await pool.query(
    "SELECT id, nombre, email, tipo, aprobado FROM users where tipo != $1",
    [tipo]
  );
  return result.rows;
};

export const aprobarUser = async (id) => {
  const result = await pool.query(
    "UPDATE users SET aprobado = not aprobado WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
