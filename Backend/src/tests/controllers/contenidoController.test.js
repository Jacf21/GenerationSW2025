/**
 * @file contenidoController.test.js
 * @description Tests para el controlador de contenidos.
 */

import { jest } from "@jest/globals";

// 🧩 Mock de servicios
jest.unstable_mockModule("../../services/contenidoService.js", () => ({
  subirContenido: jest.fn(),
  eliminarContenido: jest.fn(),
  obtenerContenido: jest.fn(),
  obtenerContenidosPorTopico: jest.fn(),
}));

jest.unstable_mockModule("../../services/topicoService.js", () => ({
  obtenerTopico: jest.fn(),
}));

// 📥 Importar después de hacer mocks
const contenidoService = await import("../../services/contenidoService.js");
const { obtenerTopico } = await import("../../services/topicoService.js");
const { crearContenido, eliminarContenido, obtenerContenidosPorTopico } = await import(
  "../../controllers/contenidoController.js"
);

describe("contenidoController", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  // 🧪 TEST crearContenido
  describe("crearContenido", () => {
    test("debe retornar 404 si el tópico no existe", async () => {
      req = { body: { id_topico: 1, tipo: "video" } };
      obtenerTopico.mockResolvedValueOnce(null);

      await crearContenido(req, res);

      expect(obtenerTopico).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Tópico no encontrado" });
    });

    test("debe crear contenido correctamente", async () => {
      req = {
        body: { id_topico: 1, tipo: "imagen" },
        file: { path: "fakepath", originalname: "img.png" },
      };
      obtenerTopico.mockResolvedValueOnce({ id: 1 });
      contenidoService.subirContenido.mockResolvedValueOnce({ id: 10, url: "mock.url" });

      await crearContenido(req, res);

      expect(contenidoService.subirContenido).toHaveBeenCalledWith(1, "imagen", req.file);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Contenido subido correctamente",
        data: { id: 10, url: "mock.url" },
      });
    });

    test("debe manejar errores internos (500)", async () => {
      req = { body: { id_topico: 1, tipo: "video" }, file: {} };
      obtenerTopico.mockRejectedValueOnce(new Error("DB error"));

      await crearContenido(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error al subir el contenido" });
    });
  });

  // 🧪 TEST eliminarContenido
  describe("eliminarContenido", () => {
    test("debe retornar 404 si el contenido no existe", async () => {
      req = { params: { id: 1 } };
      contenidoService.obtenerContenido.mockResolvedValueOnce(null);

      await eliminarContenido(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Contenido no encontrado" });
    });

    test("debe eliminar contenido correctamente", async () => {
      req = { params: { id: 5 } };
      contenidoService.obtenerContenido.mockResolvedValueOnce({
        id: 5,
        storage_path: "topicos/5/video.mp4",
      });

      await eliminarContenido(req, res);

      expect(contenidoService.eliminarContenido).toHaveBeenCalledWith(5, "topicos/5/video.mp4");
      expect(res.json).toHaveBeenCalledWith({
        mensaje: "Contenido eliminado correctamente",
      });
    });

    test("debe manejar errores internos (500)", async () => {
      req = { params: { id: 3 } };
      contenidoService.obtenerContenido.mockRejectedValueOnce(new Error("Falla en DB"));

      await eliminarContenido(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error al eliminar contenido" });
    });
  });

  // 🧪 TEST obtenerContenidosPorTopico
  describe("obtenerContenidosPorTopico", () => {
    test("debe retornar contenidos correctamente", async () => {
      req = { params: { id_topico: 2 } };
      const mockContenidos = [
        { id: 1, tipo: "imagen" },
        { id: 2, tipo: "video" },
      ];
      contenidoService.obtenerContenidosPorTopico.mockResolvedValueOnce(mockContenidos);

      await obtenerContenidosPorTopico(req, res);

      expect(contenidoService.obtenerContenidosPorTopico).toHaveBeenCalledWith(2);
      expect(res.json).toHaveBeenCalledWith({
        message: "Contenidos obtenidos correctamente",
        data: mockContenidos,
      });
    });

    test("debe manejar errores internos (500)", async () => {
      req = { params: { id_topico: 9 } };
      contenidoService.obtenerContenidosPorTopico.mockRejectedValueOnce(new Error("Error interno"));

      await obtenerContenidosPorTopico(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener contenidos" });
    });
  });
});
