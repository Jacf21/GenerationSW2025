import { getUsers, aprobarUser } from "../services/userService.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();

    if (users.length === 0) {
      return res.status(404).json({ message: "No hay usuarios registrados" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return res.status(500).json({
      message: "Error al obtener los usuarios",
      error: error.message,
    });
  }
};

export const cambiarAprobacionUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Falta el parámetro 'id' del usuario" });
    }

    const userActualizado = await aprobarUser(id);

    if (!userActualizado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: `Estado de aprobación actualizado correctamente`,
      user: userActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar aprobación del usuario:", error);
    return res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
