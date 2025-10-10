const request = require("supertest");
const express = require("express");
const { crearCurso } = require("../../controllers/cursoController");
const cursoService = require("../../services/cursoServices");
const utilsCurso = require("../../utils/cursoUtils");
const bcrypt = require("bcryptjs");

jest.mock("../../services/cursoServices");
jest.mock("../../utils/cursoUtils");
jest.mock("bcryptjs");

const app = express();
app.use(express.json());
app.post("/cursos", crearCurso);

describe("POST /cursos - crearCurso", () => {
  it("debe crear un curso exitosamente", async () => {
    const mockCodigo = "ABC123";
    const mockCodigoHashed = "hashed_ABC123";
    const mockCurso = {
      id: 1,
      nombre: "React Básico",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
      codigo: mockCodigoHashed,
    };

    utilsCurso.generarCodigoUnico.mockResolvedValue(mockCodigo);
    bcrypt.hash.mockResolvedValue(mockCodigoHashed);
    cursoService.crearCurso.mockResolvedValue(mockCurso);

    const response = await request(app).post("/cursos").send({
      nombre: "React Básico",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Curso creado exitosamente");
    expect(response.body.curso.nombre).toBe("React Básico");
    expect(response.body.curso.codigo).toBe(mockCodigo);
    expect(utilsCurso.generarCodigoUnico).toHaveBeenCalled();
    expect(cursoService.crearCurso).toHaveBeenCalled();
  });

  it("debe manejar un error interno del servidor", async () => {
    utilsCurso.generarCodigoUnico.mockRejectedValue(
      new Error("Error generar código")
    );

    const response = await request(app).post("/cursos").send({
      nombre: "Node.js",
      fecha_ini: "2025-03-01",
      fecha_fin: "2025-04-01",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(
      "Error interno del servidor al crear el curso."
    );
  });
});
