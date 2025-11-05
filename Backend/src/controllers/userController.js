import { getUsers, aprobarUser, getUserById } from "../services/userService.js";
import { emailService } from "../services/emailService.js";

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

    const usuario = await getUserById(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const userActualizado = await aprobarUser(id);

    if (userActualizado.aprobado) {
      await emailService.enviarNotificacionAprobacion(usuario.email, usuario.nombre);
    } else {
      await emailService.enviarNotificacionDesaprobacion(usuario.email, usuario.nombre);
    }

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
