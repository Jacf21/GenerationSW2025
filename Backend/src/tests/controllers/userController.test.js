import { jest } from "@jest/globals";

// Mock de userService antes de importarlo
await jest.unstable_mockModule("../../services/userService.js", () => ({
  getUsers: jest.fn(),
  aprobarUser: jest.fn(),
}));

const { getUsers, aprobarUser } = await import("../../services/userService.js");
const { getAllUsers, cambiarAprobacionUser } = await import("../../controllers/userController.js");

// Mock para req y res
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // permite encadenar .status().json()
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("userController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

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

    it("debe actualizar aprobación del usuario si existe", async () => {
      const mockUser = { id: 2, aprobado: true };
      aprobarUser.mockResolvedValueOnce(mockUser);

      const req = { params: { id: 2 } };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(aprobarUser).toHaveBeenCalledWith(2);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: `Estado de aprobación actualizado correctamente`,
        user: mockUser,
      });
    });

    it("debe devolver 404 si el usuario no existe", async () => {
      aprobarUser.mockResolvedValueOnce(undefined);

      const req = { params: { id: 999 } };
      const res = mockResponse();

      await cambiarAprobacionUser(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario no encontrado",
      });
    });

    it("debe manejar errores internos", async () => {
      aprobarUser.mockRejectedValueOnce(new Error("Error DB"));

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
