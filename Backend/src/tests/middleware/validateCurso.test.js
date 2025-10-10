const { validarCrearCurso } = require("../../middleware/validateCurso");

describe("Middleware validarCrearCurso", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("debe retornar 400 si faltan campos obligatorios", () => {
    req.body = { nombre: "Curso" }; // faltan fechas
    validarCrearCurso(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Faltan campos obligatorios.",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("debe retornar 400 si el formato de fecha es inválido", () => {
    req.body = {
      nombre: "Curso React",
      fecha_ini: "2025-13-01",
      fecha_fin: "2025-02-01",
    };
    validarCrearCurso(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "Formato de fecha inválido.",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("debe retornar 400 si el nombre es muy corto o muy largo", () => {
    // Nombre muy corto
    req.body = {
      nombre: "ABC",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
    };
    validarCrearCurso(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);

    // Nombre muy largo
    req.body.nombre = "A".repeat(101);
    validarCrearCurso(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("debe retornar 400 si fecha_ini >= fecha_fin", () => {
    req.body = {
      nombre: "Curso React",
      fecha_ini: "2025-03-01",
      fecha_fin: "2025-02-01",
    };
    validarCrearCurso(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: "La fecha de inicio debe ser anterior a la fecha de fin.",
      })
    );
    expect(next).not.toHaveBeenCalled();
  });

  it("debe llamar a next() si todos los datos son válidos", () => {
    req.body = {
      nombre: "Curso React",
      fecha_ini: "2025-01-01",
      fecha_fin: "2025-02-01",
    };
    validarCrearCurso(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
