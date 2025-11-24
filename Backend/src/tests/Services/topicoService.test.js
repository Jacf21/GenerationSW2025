import { jest } from "@jest/globals";

// 🧩 Mock del pool de base de datos
jest.unstable_mockModule("../../config/db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

// 🧩 Importar el módulo bajo prueba (después de mockear)
const { crearTopico, obtenerTopicos, obtenerTopico, eliminarTopico } = await import(
  "../../services/topicoService.js"
);
const pool = (await import("../../config/db.js")).default;

describe("topicoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: crearTopico exitoso
  test("crearTopico debe insertar un nuevo tópico y retornar el resultado", async () => {
    const fakeTopico = { id: 1, titulo: "Introducción", orden: 1, descripcion: "Tema inicial" };

    pool.query.mockResolvedValueOnce({ rows: [fakeTopico] });

    const result = await crearTopico({
      titulo: "Introducción",
      orden: 1,
      descripcion: "Tema inicial",
    });

    expect(pool.query).toHaveBeenCalledWith(expect.stringContaining("INSERT INTO topico"), [
      "Introducción",
      1,
      "Tema inicial",
    ]);
    expect(result).toEqual(fakeTopico);
  });

  // ❌ Test: crearTopico con error
  test("crearTopico debe lanzar un error si la inserción falla", async () => {
    pool.query.mockRejectedValueOnce(new Error("Error en DB"));

    await expect(
      crearTopico({ titulo: "Falla", orden: 2, descripcion: "Error test" })
    ).rejects.toThrow("Error en DB");
  });

  // ✅ Test: obtenerTopicos exitoso
  test("obtenerTopicos debe retornar todos los tópicos ordenados por orden ASC, id DESC", async () => {
    const mockRows = [
      { id: 1, titulo: "Intro", orden: 1 },
      { id: 2, titulo: "Avanzado", orden: 2 },
    ];

    pool.query.mockResolvedValueOnce({ rows: mockRows });

    const result = await obtenerTopicos();

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM topico ORDER BY orden ASC, id DESC");
    expect(result).toEqual(mockRows);
  });

  // ✅ Test: obtenerTopico exitoso
  test("obtenerTopico debe retornar un tópico según el id", async () => {
    const mockRow = { id: 3, titulo: "Bases", orden: 3, descripcion: "Fundamentos" };

    pool.query.mockResolvedValueOnce({ rows: [mockRow] });

    const result = await obtenerTopico(3);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM topico WHERE id = $1", [3]);
    expect(result).toEqual(mockRow);
  });

  // ✅ Test: obtenerTopico sin resultados
  test("obtenerTopico debe retornar null si no se encuentra el id", async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });

    const result = await obtenerTopico(999);

    expect(result).toBeNull();
  });

  // ✅ Test: eliminarTopico debe ejecutar el DELETE correctamente
  test("eliminarTopico debe eliminar un tópico por id", async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 1 });

    await eliminarTopico(5);

    expect(pool.query).toHaveBeenCalledWith("DELETE FROM topico WHERE id = $1", [5]);
  });

  // ❌ Test: eliminarTopico con error
  test("eliminarTopico debe lanzar error si la query falla", async () => {
    pool.query.mockRejectedValueOnce(new Error("Error al eliminar"));

    await expect(eliminarTopico(10)).rejects.toThrow("Error al eliminar");
  });
});
