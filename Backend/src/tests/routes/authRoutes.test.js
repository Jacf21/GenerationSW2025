// src/tests/routes/authRoutes.test.js
import request from "supertest";
import express from "express";
import { jest } from "@jest/globals";

// 🧩 MOCK del controlador antes del import del router
await jest.unstable_mockModule("../../controllers/authController.js", () => ({
  loginUser: jest.fn((req, res) => res.status(200).json({ message: "Login correcto" })),
}));

// Importar luego del mock
const authRoutes = (await import("../../routes/authRoutes.js")).default;
const { loginUser } = await import("../../controllers/authController.js");

// Crear app express
const app = express();
app.use(express.json());
app.use("/api", authRoutes);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/login debe llamar a loginUser", async () => {
    await request(app)
      .post("/api/login")
      .send({ email: "test@example.com", password: "123456" })
      .expect(200)
      .expect("Content-Type", /json/);

    expect(loginUser).toHaveBeenCalled();
  });

  // 🔥 IMPORTANTE:
  // Como NO hay validaciones en las rutas, loginUser igual será llamado
  test("POST /api/login debe llamar loginUser incluso sin email", async () => {
    await request(app).post("/api/login").send({ password: "123456" }).expect(200);

    expect(loginUser).toHaveBeenCalled();
  });

  test("POST /api/login debe llamar loginUser incluso sin password", async () => {
    await request(app).post("/api/login").send({ email: "test@example.com" }).expect(200);

    expect(loginUser).toHaveBeenCalled();
  });
});
