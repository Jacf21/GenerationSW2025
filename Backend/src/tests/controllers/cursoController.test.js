import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";

// --------------------
// Mock de los módulos
// --------------------
await jest.unstable_mockModule("../../services/cursoServices.js", () => ({
  crearCurso: jest.fn(),
}));

await jest.unstable_mockModule("../../utils/cursoUtils.js", () => ({
  generarCodigoUnico: jest.fn(),
}));

await jest.unstable_mockModule("bcryptjs", () => ({
  hash: jest.fn(),
}));

// --------------------
// Importar los módulos mockeados
// --------------------
const cursoService = await import("../../services/cursoServices.js");
const utilsCurso = await import("../../utils/cursoUtils.js");
const { hash } = await import("bcryptjs");
const { crearCurso } = await import("../../controllers/cursoController.js"); // named export

// --------------------
// Configuración de Express
// --------------------
const app = express();
app.use(express.json());
app.post("/cursos", crearCurso);

// --------------------
// Tests
// --------------------
describe("POST /cursos - crearCurso", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("debe crear un curso exitosamente", async () => {
    const mockCodigo = "ABC123";
    const mockCodigoHashed = "hashed_ABC123";
    const mockCurso = {
      id: 1,
      nombre: "React Básico",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
      codigo: mockCodigoHashed,
      descripcion: "recasnskjvgbkdbnljbvksdnblkdbjsndfbldknbldfnbldnb",
    };

    utilsCurso.generarCodigoUnico.mockResolvedValue(mockCodigo);
    hash.mockResolvedValue(mockCodigoHashed);
    cursoService.crearCurso.mockResolvedValue(mockCurso);

    const response = await request(app).post("/cursos").send({
      nombre: "React Básico",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
      descripcion: "recasnskjvgbkdbnljbvksdnblkdbjsndfbldknbldfnbldnb",
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Curso creado exitosamente");
    expect(response.body.curso.nombre).toBe("React Básico");
    expect(response.body.curso.codigo).toBe(mockCodigo);
    expect(utilsCurso.generarCodigoUnico).toHaveBeenCalled();
    expect(cursoService.crearCurso).toHaveBeenCalled();
    //expect(hash).toHaveBeenCalledWith(mockCodigo, 10);
  });

  it("debe manejar un error interno del servidor", async () => {
    utilsCurso.generarCodigoUnico.mockRejectedValue(new Error("Error generar código"));

    const response = await request(app).post("/cursos").send({
      nombre: "Node.js",
      fecha_ini: "2025-03-01",
      fecha_fin: "2025-04-01",
      descripcion: "recasnskjvgbkdbnljbvksdnblkdbjsndfbldknbldfnbldnb",
    });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Error interno del servidor al crear el curso.");
  });
});
