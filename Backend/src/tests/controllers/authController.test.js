/**
 * @file loginUser.test.js
 * @description Tests para el controlador loginUser.
 */

import { jest } from "@jest/globals";

// 🧩 Mock de dependencias
jest.unstable_mockModule("bcrypt", () => ({
  default: {
    compare: jest.fn(),
  },
}));

jest.unstable_mockModule("express-validator", () => ({
  validationResult: jest.fn(),
}));

jest.unstable_mockModule("../../services/userService.js", () => ({
  findUserByEmail: jest.fn(),
}));

jest.unstable_mockModule("../../utils/generateToken.js", () => ({
  generateToken: jest.fn(),
}));

// 🧩 Importar el controlador bajo prueba después del mock
const { loginUser } = await import("../../controllers/authController.js");
const bcrypt = (await import("bcrypt")).default;
const { validationResult } = await import("express-validator");
const { findUserByEmail } = await import("../../services/userService.js");
const { generateToken } = await import("../../utils/generateToken.js");

describe("loginUser Controller", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    req = {
      body: { email: "test@example.com", password: "123456" },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // ✅ Test: validación con errores
  test("debe retornar 400 si hay errores de validación", async () => {
    validationResult.mockReturnValueOnce({
      isEmpty: () => false,
      array: () => [{ msg: "Email inválido" }],
    });

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: "Email inválido" }] });
  });

  // ✅ Test: usuario no encontrado
  test("debe retornar 404 si el usuario no existe", async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    findUserByEmail.mockResolvedValueOnce(null);

    await loginUser(req, res);

    expect(findUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario no encontrado" });
  });

  // ✅ Test: tipo de usuario inválido
  test("debe retornar 400 si el tipo de usuario no es válido", async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    findUserByEmail.mockResolvedValueOnce({ tipo: "otro" });

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Tipo de usuario no válido" });
  });

  // ✅ Test: contraseña incorrecta
  test("debe retornar 401 si la contraseña no coincide", async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    findUserByEmail.mockResolvedValueOnce({
      tipo: "est",
      password: "hashed",
      aprobado: true,
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Contraseña incorrecta" });
  });

  // ✅ Test: usuario no aprobado
  test("debe retornar 403 si el usuario no está aprobado", async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    findUserByEmail.mockResolvedValueOnce({
      tipo: "profesor",
      password: "hashed",
      aprobado: false,
    });
    bcrypt.compare.mockResolvedValueOnce(true);

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Usuario tipo profesor no aprobado" });
  });

  // ✅ Test: login exitoso
  test("debe retornar 200 y token si el login es exitoso", async () => {
    const fakeUser = {
      id: 1,
      tipo: "admin",
      nombre: "Carlos",
      password: "hashedpass",
      aprobado: true,
    };

    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    findUserByEmail.mockResolvedValueOnce(fakeUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    generateToken.mockReturnValueOnce("fake.jwt.token");

    await loginUser(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Login exitoso",
      token: "fake.jwt.token",
      id: 1,
      tipo: "admin",
      nombre: "Carlos",
    });
  });

  // ❌ Test: error interno del servidor
  test("debe retornar 500 si ocurre un error inesperado", async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    findUserByEmail.mockRejectedValueOnce(new Error("DB error"));

    await loginUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error interno del servidor" });
  });
});
