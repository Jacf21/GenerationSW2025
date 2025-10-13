import { jest } from "@jest/globals";

// Mock de pool antes de importar cursoService
await jest.unstable_mockModule("../../config/db.js", () => ({
  default: { query: jest.fn() },
}));

// Importa después de mockear
const pool = (await import("../../config/db.js")).default;
const cursoService = await import("../../services/cursoServices.js"); // <- sin .default

describe("cursoService", () => {
  beforeEach(() => {
    pool.query.mockReset();
  });

  describe("crearCurso", () => {
    it("debe insertar un curso y devolver los datos", async () => {
      const mockCurso = { id: 1, nombre: "React Básico" };
      pool.query.mockResolvedValueOnce({ rows: [mockCurso] });

      const result = await cursoService.crearCurso(
        "React Básico",
        "2025-01-01",
        "2025-02-01",
        "codigo123"
      );

      expect(pool.query).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCurso);
    });
  });

  describe("buscarCursoPorCodigo", () => {
    it("debe devolver un curso si el código existe", async () => {
      const mockCurso = { id: 2 };
      pool.query.mockResolvedValueOnce({ rows: [mockCurso] });

      const result = await cursoService.buscarCursoPorCodigo("codigo123");

      expect(pool.query).toHaveBeenCalledWith("SELECT id FROM curso WHERE codigo = $1", [
        "codigo123",
      ]);
      expect(result).toEqual(mockCurso);
    });

    it("debe devolver undefined si el código no existe", async () => {
      pool.query.mockResolvedValueOnce({ rows: [] });

      const result = await cursoService.buscarCursoPorCodigo("no-existe");

      expect(result).toBeUndefined();
    });
  });
});
