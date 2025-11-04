import { jest } from "@jest/globals";

// 🧩 Mock completo de userService antes de importarlo
await jest.unstable_mockModule("../../services/userService.js", () => ({
  getUsers: jest.fn(),
  aprobarUser: jest.fn(),
  getUserById: jest.fn(),
}));

// 🧩 Mock de emailService para evitar llamadas reales
await jest.unstable_mockModule("../../services/emailService.js", () => ({
  emailService: {
    enviarNotificacionAprobacion: jest.fn(),
    enviarNotificacionDesaprobacion: jest.fn(),
  },
}));

// Importar mocks y controlador
const { getUsers, aprobarUser, getUserById } = await import("../../services/userService.js");
const { emailService } = await import("../../services/emailService.js");
const { getAllUsers, cambiarAprobacionUser } = await import("../../controllers/userController.js");

// 🧰 Mock para res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("userController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // --------------------------------------------------------
  // 🧪 TESTS PARA getAllUsers
  // --------------------------------------------------------
  describe("getAllUsers", () => {
    it("debe devolver lista de usuarios si existen", async () => {
      const mockUsers = [{ id: 1, nombre: "Juan" }];
      getUsers.mockResolvedValueOnce(mockUsers);

      const req = {};
      const res = mockResponse();

      await getAllUsers(req, res);

      expect(getUsers).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it("debe devolver 404 si no hay usuarios", async () => {
      getUsers.mockResolvedValueOnce([]);

      const req = {};
      const res = mockResponse();

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "No hay usuarios registrados" });
    });

    it("debe manejar errores internos", async () => {
      getUsers.mockRejectedValueOnce(new Error("DB Error"));

      const req = {};
      const res = mockResponse();

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error al obtener los usuarios",
        error: "DB Error",
      });
    });
  });

  // --------------------------------------------------------
  // 🧪 TESTS PARA cambiarAprobacionUser
  // --------------------------------------------------------
  describe("cambiarAprobacionUser", () => {
    it("debe devolver 400 si no se envía id", async () => {
      const req = { params: {} };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Falta el parámetro 'id' del usuario",
      });
    });

    it("debe devolver 404 si el usuario no existe", async () => {
      getUserById.mockResolvedValueOnce(undefined);

      const req = { params: { id: 999 } };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario no encontrado",
      });
    });

    it("debe actualizar aprobación del usuario y enviar correo de aprobación", async () => {
      const usuario = { id: 2, nombre: "Juan", email: "juan@test.com" };
      const userActualizado = { ...usuario, aprobado: true };

      getUserById.mockResolvedValueOnce(usuario);
      aprobarUser.mockResolvedValueOnce(userActualizado);

      const req = { params: { id: 2 } };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(getUserById).toHaveBeenCalledWith(2);
      expect(aprobarUser).toHaveBeenCalledWith(2);
      expect(emailService.enviarNotificacionAprobacion).toHaveBeenCalledWith(
        usuario.email,
        usuario.nombre
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Estado de aprobación actualizado correctamente",
        user: userActualizado,
      });
    });

    it("debe actualizar desaprobación del usuario y enviar correo correspondiente", async () => {
      const usuario = { id: 3, nombre: "Pedro", email: "pedro@test.com" };
      const userActualizado = { ...usuario, aprobado: false };

      getUserById.mockResolvedValueOnce(usuario);
      aprobarUser.mockResolvedValueOnce(userActualizado);

      const req = { params: { id: 3 } };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(getUserById).toHaveBeenCalledWith(3);
      expect(aprobarUser).toHaveBeenCalledWith(3);
      expect(emailService.enviarNotificacionDesaprobacion).toHaveBeenCalledWith(
        usuario.email,
        usuario.nombre
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Estado de aprobación actualizado correctamente",
        user: userActualizado,
      });
    });

    it("debe manejar errores internos", async () => {
      getUserById.mockRejectedValueOnce(new Error("Error DB"));

      const req = { params: { id: 2 } };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Error interno del servidor",
        error: "Error DB",
      });
    });
  });
});
