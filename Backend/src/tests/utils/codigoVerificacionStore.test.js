import { jest } from "@jest/globals";

import { setCodigo, getCodigo, deleteCodigo } from "../../utils/codigoVerificacionStore.js";

describe("codigoVerificacionStore", () => {
  const email = "test@example.com";

  beforeEach(() => {
    // limpiar cualquier valor previo
    deleteCodigo(email);
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  test("setCodigo guarda un código correctamente", () => {
    setCodigo(email, "123456");
    expect(getCodigo(email)).toBe("123456");
  });

  test("getCodigo devuelve el código si no ha expirado", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000); // Tiempo base

    setCodigo(email, "654321");

    // aún no expiró (menos de 5 minutos = 300000 ms)
    jest.spyOn(Date, "now").mockReturnValue(1000 + 200000);

    expect(getCodigo(email)).toBe("654321");
  });

  test("getCodigo devuelve null si el código expiró", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000);

    setCodigo(email, "999999");

    // después de 5 minutos (300000 ms)
    jest.spyOn(Date, "now").mockReturnValue(1000 + 400000);

    expect(getCodigo(email)).toBe(null);
  });

  test("getCodigo elimina el código cuando está expirado", () => {
    jest.spyOn(Date, "now").mockReturnValue(1000);

    setCodigo(email, "111111");

    // Expirado
    jest.spyOn(Date, "now").mockReturnValue(1000 + 500000);

    getCodigo(email); // esto debe eliminarlo

    // debe devolver null porque ya se eliminó
    expect(getCodigo(email)).toBe(null);
  });

  test("getCodigo devuelve null si no existe el código", () => {
    expect(getCodigo("noexiste@mail.com")).toBe(null);
  });

  test("deleteCodigo elimina el código manualmente", () => {
    setCodigo(email, "123123");
    deleteCodigo(email);

    expect(getCodigo(email)).toBe(null);
  });
});
