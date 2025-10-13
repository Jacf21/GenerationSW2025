import { jest } from "@jest/globals";

// Primero mockeamos el módulo de servicios
const cursoServiceMock = {
  buscarCursoPorCodigo: jest.fn(),
};
await jest.unstable_mockModule("../../services/cursoServices.js", () => cursoServiceMock);

// Ahora importamos la función que vamos a probar
const { generarCodigoUnico } = await import("../../utils/cursoUtils.js");

// Importamos el mock para poder hacer assertions
const cursoService = await import("../../services/cursoServices.js");

describe("generarCodigoUnico", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    cursoService.buscarCursoPorCodigo.mockReset();
  });

  it("debe generar un código único cuando no existe en la base de datos", async () => {
    cursoService.buscarCursoPorCodigo.mockResolvedValueOnce(undefined);

    const codigo = await generarCodigoUnico();

    expect(codigo).toHaveLength(6);
    expect(typeof codigo).toBe("string");
    expect(codigo).toMatch(/^[A-Z0-9]+$/);
    expect(cursoService.buscarCursoPorCodigo).toHaveBeenCalledTimes(1);
  });

  it("debe regenerar código si ya existe uno en la base de datos", async () => {
    cursoService.buscarCursoPorCodigo
      .mockResolvedValueOnce({ id: 1 }) // primer intento falla
      .mockResolvedValueOnce(undefined); // segundo intento pasa

    const codigo = await generarCodigoUnico();

    expect(cursoService.buscarCursoPorCodigo).toHaveBeenCalledTimes(2);
    expect(codigo).toHaveLength(6);
    expect(codigo).toMatch(/^[A-Z0-9]+$/);
  });
});
