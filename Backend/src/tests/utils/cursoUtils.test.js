const cursoService = require("../../services/cursoServices");
const { generarCodigoUnico } = require("../../utils/cursoUtils");

jest.mock("../../services/cursoServices", () => ({
  buscarCursoPorCodigo: jest.fn(),
}));

describe("generarCodigoUnico", () => {
  it("debe generar un código único cuando no existe en la base de datos", async () => {
    cursoService.buscarCursoPorCodigo.mockResolvedValueOnce(undefined);

    const codigo = await generarCodigoUnico();

    expect(codigo).toHaveLength(6);
    expect(typeof codigo).toBe("string");
    expect(codigo).toMatch(/^[A-Z0-9]+$/);
  });

  it("debe regenerar código si ya existe uno en la base de datos", async () => {
    cursoService.buscarCursoPorCodigo
      .mockResolvedValueOnce({ id: 1 })
      .mockResolvedValueOnce(undefined);

    const codigo = await generarCodigoUnico();

    expect(cursoService.buscarCursoPorCodigo).toHaveBeenCalledTimes(3);
    expect(codigo).toHaveLength(6);
  });
});
