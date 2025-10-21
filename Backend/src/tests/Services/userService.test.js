import { jest } from "@jest/globals";

// Mock del pool ANTES de importar el servicio
await jest.unstable_mockModule("../../config/db.js", () => ({
  default: { query: jest.fn() },
}));

// Importar después de mockear
const pool = (await import("../../config/db.js")).default;
const userModel = await import("../../services/userService.js");

describe("userModel", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  describe("findUserByEmail", () => {
    it("debe devolver un usuario por email", async () => {
      const mockUser = { id: 1, email: "test@example.com", nombre: "Juan" };
      pool.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await userModel.findUserByEmail("test@example.com");

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE email = $1", [
        "test@example.com",
      ]);
      expect(result).toEqual(mockUser);
    });

    it("debe devolver undefined si el usuario no existe", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await userModel.findUserByEmail("noexiste@example.com");
      expect(result).toBeUndefined();
    });
  });

  describe("getUsers", () => {
    it("debe devolver todos los usuarios que no son admin", async () => {
      const mockUsers = [
        { id: 2, nombre: "Pedro", email: "pedro@example.com", tipo: "user", aprobado: false },
      ];
      pool.query.mockResolvedValueOnce({ rows: mockUsers });

      const result = await userModel.getUsers();

      expect(pool.query).toHaveBeenCalledWith(
        "SELECT id, nombre, email, tipo, aprobado FROM users where tipo != $1",
        ["admin"]
      );
      expect(result).toEqual(mockUsers);
    });
  });

  describe("aprobarUser", () => {
    it("debe alternar el campo aprobado del usuario", async () => {
      const mockUser = { id: 3, aprobado: true };
      pool.query.mockResolvedValueOnce({ rows: [mockUser] });

      const result = await userModel.aprobarUser(3);

      expect(pool.query).toHaveBeenCalledWith(
        "UPDATE users SET aprobado = not aprobado WHERE id = $1 RETURNING *",
        [3]
      );
      expect(result).toEqual(mockUser);
    });
  });
});
