import { jest } from "@jest/globals";

// Importar el módulo real
import { setCodigo, getCodigo, deleteCodigo } from "../../controllers/temporalController.js";

describe("TemporalController - store de códigos", () => {
  const email = "test@test.com";

  beforeEach(() => {
    // Limpiar store antes de cada test
    deleteCodigo(email);
    jest.useRealTimers();
  });

  // ----------------------------------------------------------------------
  test("setCodigo → guarda el código correctamente", () => {
    setCodigo(email, "123456");

    const codigo = getCodigo(email);
    expect(codigo).toBe("123456");
  });

  // ----------------------------------------------------------------------
  test("getCodigo → retorna el código si no ha expirado", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000); // tiempo base

    setCodigo(email, "654321");

    // Fecha simulada ANTES de expiración (5 min = 300,000 ms)
    jest.spyOn(Date, "now").mockReturnValue(1000 + 100000);

    const codigo = getCodigo(email);
    expect(codigo).toBe("654321");
  });

  // ----------------------------------------------------------------------
  test("getCodigo → retorna null si el código expiró", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000);

    setCodigo(email, "999999");

    // Simular tiempo DESPUÉS de expiración
    jest.spyOn(Date, "now").mockReturnValue(1000 + 301000);

    const codigo = getCodigo(email);

    expect(codigo).toBe(null);
  });

  // ----------------------------------------------------------------------
  test("getCodigo → elimina automáticamente el código expirado", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000);

    setCodigo(email, "000000");

    // Tiempo después de expiración
    jest.spyOn(Date, "now").mockReturnValue(1000 + 400000);

    getCodigo(email); // Debe eliminarlo

    // Debe retornar null ya eliminado
    expect(getCodigo(email)).toBe(null);
  });

  // ----------------------------------------------------------------------
  test("getCodigo → devuelve null si no existe el email", () => {
    const resultado = getCodigo("noexiste@test.com");
    expect(resultado).toBe(null);
  });

  // ----------------------------------------------------------------------
  test("deleteCodigo → elimina el código", () => {
    setCodigo(email, "121212");

    deleteCodigo(email);

    expect(getCodigo(email)).toBe(null);
  });
});
