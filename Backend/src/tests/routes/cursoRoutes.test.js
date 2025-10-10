const request = require("supertest");
const express = require("express");
const cursoRouter = require("../../routes/cursoRoutes");

jest.mock("../../controllers/cursoController", () => ({
  crearCurso: jest.fn((req, res) => res.status(201).json({ message: "Curso creado" })),
}));

const app = express();
app.use(express.json());
app.use("/cursos", cursoRouter);

describe("Rutas de cursos", () => {
  it("POST /cursos/crear-curso → éxito con datos válidos", async () => {
    const res = await request(app).post("/cursos/crear-curso").send({
      nombre: "Curso de React",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Curso creado");
  });

  it("POST /cursos/crear-curso → error si faltan campos", async () => {
    const res = await request(app).post("/cursos/crear-curso").send({ nombre: "Curso incompleto" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Faltan campos obligatorios.");
  });

  it("POST /cursos/crear-curso → error si fecha_ini >= fecha_fin", async () => {
    const res = await request(app).post("/cursos/crear-curso").send({
      nombre: "Curso React",
      fecha_ini: "2025-03-01",
      fecha_fin: "2025-02-01",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "La fecha de inicio debe ser anterior a la fecha de fin."
    );
  });
});
