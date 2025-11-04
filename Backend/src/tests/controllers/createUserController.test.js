/**
 * @file authController.test.js
 * @description Tests para las funciones register y verificarCodigo del controlador de autenticación.
 */

import { jest } from "@jest/globals";

// 🧩 Mock de bcrypt antes de importar el controlador
jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(),
  },
}));

// 🧩 Mock de dependencias
jest.unstable_mockModule("../../config/db.js", () => ({
  default: { query: jest.fn() },
}));

jest.unstable_mockModule("../../services/emailService.js", () => ({
  emailService: {
    enviarCodigoVerificacion: jest.fn(),
    registro: jest.fn(),
  },
}));

jest.unstable_mockModule("../../utils/codigoVerificacionStore.js", () => ({
  setCodigo: jest.fn(),
  getCodigo: jest.fn(),
  deleteCodigo: jest.fn(),
}));

// 📥 Importar módulos mockeados dinámicamente
const bcrypt = (await import("bcrypt")).default;
const pool = (await import("../../config/db.js")).default;
const { emailService } = await import("../../services/emailService.js");
const { setCodigo, getCodigo, deleteCodigo } = await import(
  "../../utils/codigoVerificacionStore.js"
);
const { register, verificarCodigo } = await import("../../controllers/createUserController.js");

// Evitar logs en consola
jest.spyOn(console, "error").mockImplementation(() => {});

describe("createUserController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // 🧪 TEST: register
  describe("register", () => {
    test("debe retornar 400 si el email ya está registrado", async () => {
      req.body = { nombre: "Ana", email: "ana@mail.com", tipo: "est" };
      pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

      await register(req, res);

      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE email = $1", [
        "ana@mail.com",
      ]);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "El email ya está registrado" });
    });

    test("debe retornar 400 si el tipo de usuario no es válido", async () => {
      req.body = { nombre: "Luis", email: "luis@mail.com", tipo: "invalido" };
      pool.query.mockResolvedValueOnce({ rows: [] });

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Tipo de usuario no válido" });
    });

    test("debe registrar usuario correctamente y enviar código", async () => {
      req.body = { nombre: "Carla", email: "carla@mail.com", tipo: "profesor" };
      pool.query.mockResolvedValueOnce({ rows: [] });

      await register(req, res);

      expect(setCodigo).toHaveBeenCalledWith("carla@mail.com", expect.any(String));
      expect(emailService.enviarCodigoVerificacion).toHaveBeenCalledWith(
        "carla@mail.com",
        "Carla",
        expect.any(String)
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Código de verificación enviado al correo",
        email: "carla@mail.com",
      });
    });

    test("debe manejar errores internos (500)", async () => {
      req.body = { nombre: "Ana", email: "ana@mail.com", tipo: "est" };
      pool.query.mockRejectedValueOnce(new Error("DB crash"));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error al registrar usuario" });
    });
  });

  // 🧪 TEST: verificarCodigo
  describe("verificarCodigo", () => {
    test("debe retornar 400 si el código es incorrecto o no existe", async () => {
      req.body = { email: "juan@mail.com", codigo: "111111" };
      getCodigo.mockReturnValueOnce(null);

      await verificarCodigo(req, res);

      expect(getCodigo).toHaveBeenCalledWith("juan@mail.com");
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Código incorrecto o expirado" });
    });

    test("debe crear usuario correctamente cuando el código es válido", async () => {
      req.body = {
        email: "juan@mail.com",
        codigo: "123456",
        nombre: "Juan",
        password: "1234",
        tipo: "est",
      };
      getCodigo.mockReturnValueOnce("123456");
      bcrypt.hash.mockResolvedValueOnce("hashed-pass");
      pool.query.mockResolvedValueOnce({
        rows: [{ id: 1, tipo: "est", aprobado: true }],
      });

      await verificarCodigo(req, res);

      expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO users"), [
        "Juan",
        "juan@mail.com",
        "hashed-pass",
        "est",
        true,
        true,
      ]);
      expect(emailService.registro).toHaveBeenCalledWith("juan@mail.com", "Juan", "est");
      expect(deleteCodigo).toHaveBeenCalledWith("juan@mail.com");
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Usuario creado y verificado exitosamente",
        userId: 1,
        tipo: "est",
        aprobado: true,
      });
    });

    test("debe manejar errores internos (500)", async () => {
      req.body = { email: "error@mail.com", codigo: "123456" };
      getCodigo.mockReturnValueOnce("123456");
      pool.query.mockRejectedValueOnce(new Error("DB crash"));

      await verificarCodigo(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error al verificar código" });
    });
  });
});
