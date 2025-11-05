// src/tests/routes/userRoutes.test.js
import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

// 🧩 MOCKS de controladores y middleware antes de importar el router
await jest.unstable_mockModule("../../controllers/createUserController.js", () => ({
  register: jest.fn((req, res) => res.status(201).json({ message: "Usuario registrado" })),
  verificarCodigo: jest.fn((req, res) => res.status(200).json({ message: "Código verificado" })),
}));

await jest.unstable_mockModule("../../middleware/validateRequest.js", () => ({
  validateRegister: jest.fn((req, res, next) => next()),
}));

await jest.unstable_mockModule("../../controllers/userController.js", () => ({
  getAllUsers: jest.fn((req, res) => res.status(200).json([{ id: 1, name: "Test" }])),
  cambiarAprobacionUser: jest.fn((req, res) => res.status(200).json({ message: "Aprobado" })),
}));

// 🧩 Importar dependencias mockeadas y router después del mock
const userRoutes = (await import("../../routes/userRoutes.js")).default;
const { register, verificarCodigo } = await import("../../controllers/createUserController.js");
const { validateRegister } = await import("../../middleware/validateRequest.js");
const { getAllUsers, cambiarAprobacionUser } = await import("../../controllers/userController.js");

// 🧪 Crear app Express de prueba
const app = express();
app.use(express.json());
app.use("/api", userRoutes);

describe("User Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test de registro
  test("POST /api/register debe llamar a validateRegister y register", async () => {
    await request(app)
      .post("/api/register")
      .send({ email: "test@example.com", password: "123456" })
      .expect(201)
      .expect("Content-Type", /json/);

    expect(validateRegister).toHaveBeenCalled();
    expect(register).toHaveBeenCalled();
  });

  // ✅ Test de obtención de usuarios
  test("GET /api/users debe devolver lista de usuarios", async () => {
    const response = await request(app)
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /json/);

    expect(getAllUsers).toHaveBeenCalled();
    expect(response.body).toEqual([{ id: 1, name: "Test" }]);
  });

  // ✅ Test de cambio de aprobación (ajustado)
  test("PATCH /api/:id/aprobar debe llamar cambiarAprobacionUser", async () => {
    await request(app).patch("/api/5/aprobar").expect(200).expect("Content-Type", /json/);

    expect(cambiarAprobacionUser).toHaveBeenCalled();

    // Verificar que el id sea el correcto
    const [req] = cambiarAprobacionUser.mock.calls[0];
    expect(req.params.id).toBe("5");
  });

  // ✅ Test de verificación de código
  test("POST /api/verify debe llamar a verificarCodigo", async () => {
    await request(app)
      .post("/api/verify")
      .send({ email: "test@example.com", codigo: "1234" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(verificarCodigo).toHaveBeenCalled();
  });
});
