import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";

// Mock del controller antes de importar las rutas
await jest.unstable_mockModule("../../controllers/cursoController.js", () => ({
  crearCurso: jest.fn((req, res) => res.status(201).json({ message: "Curso creado" })),
  getMisCursos: jest.fn((req, res) => res.status(200).json([])),
  actualizarCurso: jest.fn((req, res) => res.status(200).json({ message: "Curso actualizado" })),
  desactivarCurso: jest.fn((req, res) => res.status(200).json({ message: "Curso desactivado" })),
}));

// Importa después de mockear
const cursoRouter = (await import("../../routes/cursoRoutes.js")).default; // asumiendo export default

// Configuración de Express
const app = express();
app.use(express.json());
app.use("/cursos", cursoRouter);

describe("Rutas de cursos", () => {
  it("POST /cursos/crear-curso → éxito con datos válidos", async () => {
    const res = await request(app).post("/cursos/crear-curso").send({
      nombre: "Curso de React",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
      descripcion: "recasnskjvgbkdbnljbvksdnblkdbjsndfbldknbldfnbldnb",
      id_usuario: "1",
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
      descripcion: "recasnskjvgbkdbnljbvksdnblkdbjsndfbldknbldfnbldnb",
      id_usuario: "1",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      "error",
      "La fecha de inicio debe ser anterior a la fecha de fin."
    );
  });
});
