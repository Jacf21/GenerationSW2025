import { hashPassword, comparePassword } from "../../utils/paswordUtils";

describe("Password Utils Tests", () => {
  test("Debe hashear la contraseña correctamente", async () => {
    const password = "MiPassword123";
    const hash = await hashPassword(password);

    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
  });

  test("Debe validar correctamente la contraseña correcta", async () => {
    const password = "MiPassword123";
    const hash = await hashPassword(password);

    const result = await comparePassword(password, hash);
    expect(result).toBe(true);
  });

  test("Debe fallar con contraseña incorrecta", async () => {
    const password = "MiPassword123";
    const hash = await hashPassword(password);

    const result = await comparePassword("otraPassword", hash);
    expect(result).toBe(false);
  });
});
