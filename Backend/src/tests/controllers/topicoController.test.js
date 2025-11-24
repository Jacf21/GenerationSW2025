import { jest } from "@jest/globals";

// Mock de pool
jest.unstable_mockModule("../../config/db.js", () => ({
  default: {
    query: jest.fn(),
  },
}));

const pool = (await import("../../config/db.js")).default;
const { crearTopico, obtenerTopicos, obtenerTopico, actualizarTopico, eliminarTopico } =
  await import("../../controllers/topicosController.js");

describe("Topicos Controller", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  // ----------------------------------------------------------
  // crearTopico
  // ----------------------------------------------------------
  test("crearTopico → debe crear un tópico y retornar 201", async () => {
    const fakeTopico = { id: 1, titulo: "Test", orden: 1, descripcion: "Desc" };

    req.body = fakeTopico;

    pool.query.mockResolvedValueOnce({ rows: [fakeTopico] });

    await crearTopico(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO topico (titulo, orden, descripcion) VALUES ($1, $2, $3) RETURNING *",
      ["Test", 1, "Desc"]
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ data: fakeTopico });
  });

  test("crearTopico → debe retornar 500 si ocurre error", async () => {
    req.body = { titulo: "A" };
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    await crearTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

  // ----------------------------------------------------------
  // obtenerTopicos
  // ----------------------------------------------------------
  test("obtenerTopicos → debe retornar lista de tópicos", async () => {
    const fakeList = [{ id: 1 }, { id: 2 }];

    pool.query.mockResolvedValueOnce({ rows: fakeList });

    await obtenerTopicos(req, res);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM topico ORDER BY orden ASC");
    expect(res.json).toHaveBeenCalledWith({ data: fakeList });
  });

  test("obtenerTopicos → error 500", async () => {
    pool.query.mockRejectedValueOnce(new Error("Error DB"));

    await obtenerTopicos(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error DB" });
  });

  // ----------------------------------------------------------
  // obtenerTopico
  // ----------------------------------------------------------
  test("obtenerTopico → debe retornar un tópico", async () => {
    const fakeTopico = { id: 1, titulo: "Test" };

    req.params.id = 1;
    pool.query.mockResolvedValueOnce({ rows: [fakeTopico] });

    await obtenerTopico(req, res);

    expect(pool.query).toHaveBeenCalledWith("SELECT * FROM topico WHERE id = $1", [1]);
    expect(res.json).toHaveBeenCalledWith({ data: fakeTopico });
  });

  test("obtenerTopico → debe retornar 404 si no existe", async () => {
    req.params.id = 99;
    pool.query.mockResolvedValueOnce({ rows: [] });

    await obtenerTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tópico no encontrado" });
  });

  test("obtenerTopico → error 500", async () => {
    req.params.id = 1;
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    await obtenerTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

  // ----------------------------------------------------------
  // actualizarTopico
  // ----------------------------------------------------------
  test("actualizarTopico → debe actualizar un tópico", async () => {
    const fakeUpdated = { id: 1, titulo: "Nuevo", orden: 2, descripcion: "X" };

    req.params.id = 1;
    req.body = fakeUpdated;

    pool.query.mockResolvedValueOnce({ rows: [fakeUpdated] });

    await actualizarTopico(req, res);

    expect(pool.query).toHaveBeenCalledWith(
      "UPDATE topico SET titulo = $1, orden = $2, descripcion = $3 WHERE id = $4 RETURNING *",
      ["Nuevo", 2, "X", 1]
    );
    expect(res.json).toHaveBeenCalledWith({ data: fakeUpdated });
  });

  test("actualizarTopico → debe retornar 404 si no existe", async () => {
    req.params.id = 99;
    req.body = { titulo: "x" };

    pool.query.mockResolvedValueOnce({ rows: [] });

    await actualizarTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tópico no encontrado" });
  });

  test("actualizarTopico → error 500", async () => {
    req.params.id = 1;
    pool.query.mockRejectedValueOnce(new Error("DB error"));

    await actualizarTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });

  // ----------------------------------------------------------
  // eliminarTopico
  // ----------------------------------------------------------
  test("eliminarTopico → debe eliminar un tópico", async () => {
    req.params.id = 1;

    pool.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await eliminarTopico(req, res);

    expect(pool.query).toHaveBeenCalledWith("DELETE FROM topico WHERE id = $1 RETURNING *", [1]);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tópico eliminado exitosamente",
    });
  });

  test("eliminarTopico → debe retornar 404 si no existe", async () => {
    req.params.id = 99;

    pool.query.mockResolvedValueOnce({ rows: [] });

    await eliminarTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tópico no encontrado",
    });
  });

  test("eliminarTopico → error 500", async () => {
    req.params.id = 1;

    pool.query.mockRejectedValueOnce(new Error("DB error"));

    await eliminarTopico(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "DB error" });
  });
});
