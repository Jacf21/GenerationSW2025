/**
 * @file contenidoService.test.js
 * Tests unitarios para src/services/contenidoService.js
 */

import { jest } from "@jest/globals";

// 🧩 Mock de fs: aquí devolvemos directamente las funciones esperadas
jest.unstable_mockModule("fs", () => ({
  readFileSync: jest.fn(() => Buffer.from("mockFile")),
}));

// 🧩 Mock de pool (PostgreSQL)
const mockQuery = jest.fn();
jest.unstable_mockModule("../../config/db.js", () => ({
  default: { query: mockQuery },
}));

// 🧩 Mock de Supabase
const mockUpload = jest.fn();
const mockGetPublicUrl = jest.fn();
const mockRemove = jest.fn();
jest.unstable_mockModule("../../config/supabase.js", () => ({
  supabase: {
    storage: {
      from: jest.fn(() => ({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl,
        remove: mockRemove,
      })),
    },
  },
}));

// 🧩 Importar el módulo bajo prueba (después de los mocks)
const { subirContenido, eliminarContenido, obtenerContenido, obtenerContenidosPorTopico } =
  await import("../../services/contenidoService.js");
const fs = await import("fs");

describe("contenidoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ subirContenido exitoso
  test("subirContenido debe subir archivo, guardar en DB y devolver el contenido insertado", async () => {
    mockQuery
      .mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1 }] }) // tópico existe
      .mockResolvedValueOnce({ rows: [{ id: 10, url: "https://mock.url" }] }); // inserción DB
    mockUpload.mockResolvedValueOnce({ data: {}, error: null });
    mockGetPublicUrl.mockReturnValueOnce({ data: { publicUrl: "https://mock.url" } });

    const fakeFile = { path: "fakepath", originalname: "file.png", mimetype: "image/png" };
    const result = await subirContenido(1, "imagen", fakeFile);

    expect(fs.readFileSync).toHaveBeenCalledWith("fakepath");
    expect(mockUpload).toHaveBeenCalled();
    expect(mockGetPublicUrl).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledTimes(2);
    expect(result).toEqual({ id: 10, url: "https://mock.url" });
  });

  // ✅ tópico no encontrado
  test("subirContenido debe lanzar error si el tópico no existe", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0, rows: [] });

    const fakeFile = { path: "fakepath", originalname: "file.png", mimetype: "image/png" };
    await expect(subirContenido(99, "video", fakeFile)).rejects.toThrow("Tópico no encontrado");
  });

  // ✅ error en supabase.upload
  test("subirContenido debe lanzar error si supabase.upload falla", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1, rows: [{ id: 1 }] });
    mockUpload.mockResolvedValueOnce({ data: null, error: new Error("Upload failed") });

    const fakeFile = { path: "fakepath", originalname: "file.png", mimetype: "image/png" };
    await expect(subirContenido(1, "video", fakeFile)).rejects.toThrow("Upload failed");
  });

  // ✅ eliminarContenido exitoso
  test("eliminarContenido debe eliminar archivo y registro de la DB", async () => {
    mockRemove.mockResolvedValueOnce({});
    mockQuery.mockResolvedValueOnce({});

    await eliminarContenido(5, "path/to/file.png");

    expect(mockRemove).toHaveBeenCalledWith(["path/to/file.png"]);
    expect(mockQuery).toHaveBeenCalledWith("DELETE FROM contenidoTopico WHERE id = $1;", [5]);
  });

  // ✅ obtenerContenido exitoso
  test("obtenerContenido debe retornar el contenido según id", async () => {
    mockQuery.mockResolvedValueOnce({ rows: [{ id: 1, tipo: "video" }] });
    const result = await obtenerContenido(1);
    expect(result).toEqual({ id: 1, tipo: "video" });
  });

  // ✅ obtenerContenidosPorTopico exitoso
  test("obtenerContenidosPorTopico debe retornar los contenidos de un tópico", async () => {
    mockQuery.mockResolvedValueOnce({
      rows: [{ id: 1, id_topico: 2, tipo: "imagen" }],
    });
    const result = await obtenerContenidosPorTopico(2);
    expect(result).toEqual([{ id: 1, id_topico: 2, tipo: "imagen" }]);
  });
});
