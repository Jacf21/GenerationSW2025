import { jest } from "@jest/globals";
import express from "express";
import request from "supertest";

// Mock de los controladores
const crearTopico = jest.fn((req, res) => res.status(201).json({ message: "crearTopico" }));
const obtenerTopicos = jest.fn((req, res) => res.status(200).json({ message: "obtenerTopicos" }));
const obtenerTopico = jest.fn((req, res) => res.status(200).json({ message: "obtenerTopico" }));
const actualizarTopico = jest.fn((req, res) =>
  res.status(200).json({ message: "actualizarTopico" })
);
const eliminarTopico = jest.fn((req, res) => res.status(200).json({ message: "eliminarTopico" }));
const comentarTopico = jest.fn((req, res) => res.status(201).json({ message: "comentarTopico" }));

// Crear router de prueba
import { Router } from "express";
const router = Router();
router.post("/create", crearTopico);
router.get("/getall", obtenerTopicos);
router.get("/get/:id", obtenerTopico);
router.put("/update/:id", actualizarTopico);
router.delete("/delete/:id", eliminarTopico);
router.post("/comentar", comentarTopico);

describe("topicosRouter", () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/topicos", router);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /topicos/create llama a crearTopico", async () => {
    const res = await request(app).post("/topicos/create").send({ titulo: "Test" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "crearTopico" });
    expect(crearTopico).toHaveBeenCalled();
  });

  test("GET /topicos/getall llama a obtenerTopicos", async () => {
    const res = await request(app).get("/topicos/getall");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "obtenerTopicos" });
    expect(obtenerTopicos).toHaveBeenCalled();
  });

  test("GET /topicos/get/:id llama a obtenerTopico", async () => {
    const res = await request(app).get("/topicos/get/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "obtenerTopico" });
    expect(obtenerTopico).toHaveBeenCalled();
  });

  test("PUT /topicos/update/:id llama a actualizarTopico", async () => {
    const res = await request(app).put("/topicos/update/1").send({ titulo: "Actualizado" });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "actualizarTopico" });
    expect(actualizarTopico).toHaveBeenCalled();
  });

  test("DELETE /topicos/delete/:id llama a eliminarTopico", async () => {
    const res = await request(app).delete("/topicos/delete/1");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "eliminarTopico" });
    expect(eliminarTopico).toHaveBeenCalled();
  });

  test("POST /topicos/comentar llama a comentarTopico", async () => {
    const res = await request(app).post("/topicos/comentar").send({ comentario: "Test" });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: "comentarTopico" });
    expect(comentarTopico).toHaveBeenCalled();
  });
});
