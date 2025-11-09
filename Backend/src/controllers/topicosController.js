import pool from "../config/db.js";

export const crearTopico = async (req, res) => {
  try {
    const { titulo, orden, descripcion } = req.body;
    const result = await pool.query(
      "INSERT INTO topico (titulo, orden, descripcion) VALUES ($1, $2, $3) RETURNING *",
      [titulo, orden, descripcion]
    );
    res.status(201).json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerTopicos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM topico ORDER BY orden ASC");
    res.json({ data: result.rows });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerTopico = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM topico WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tópico no encontrado" });
    }
    res.json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarTopico = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, orden, descripcion } = req.body;
    const result = await pool.query(
      "UPDATE topico SET titulo = $1, orden = $2, descripcion = $3 WHERE id = $4 RETURNING *",
      [titulo, orden, descripcion, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tópico no encontrado" });
    }
    res.json({ data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarTopico = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM topico WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Tópico no encontrado" });
    }
    res.json({ message: "Tópico eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
