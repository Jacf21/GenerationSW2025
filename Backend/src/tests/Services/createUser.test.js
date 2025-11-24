import { jest } from "@jest/globals";

// -------------------- MOCKS --------------------
jest.unstable_mockModule("../../config/db.js", () => ({
  default: { query: jest.fn() },
}));

jest.unstable_mockModule("../../utils/codigoVerificacionStore.js", () => ({
  setCodigo: jest.fn(),
  getCodigo: jest.fn(),
  deleteCodigo: jest.fn(),
}));

jest.unstable_mockModule("../../services/emailService.js", () => ({
  emailService: { enviarCodigoVerificacion: jest.fn() },
}));

jest.unstable_mockModule("../../config/emailConfig.js", () => ({
  transporter: { sendMail: jest.fn() },
  emailTemplates: {
    registro: (nombre, tipo) => ({
      subject: `Bienvenido ${nombre}`,
      html: `<p>Tipo: ${tipo}</p>`,
    }),
  },
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    hash: jest.fn(),
  },
}));

// Importar módulos mockeados
const db = (await import("../../config/db.js")).default;
const { setCodigo, getCodigo, deleteCodigo } = await import(
  "../../utils/codigoVerificacionStore.js"
);
const { emailService } = await import("../../services/emailService.js");
const { transporter } = await import("../../config/emailConfig.js");
const bcrypt = (await import("bcrypt")).default;

// Importar funciones a testear
const { iniciarRegistro, verificarYCrearUsuario } = await import("../../services/createUser.js");

// ----------------------------------------------------------
// TESTS
// ----------------------------------------------------------
describe("Registro Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ----------------------------------------------------------
  // iniciarRegistro
  // ----------------------------------------------------------
  test("iniciarRegistro → envía código y guarda registro", async () => {
    db.query.mockResolvedValueOnce({ rows: [] }); // email NO existe

    const result = await iniciarRegistro({
      nombre: "Juan",
      email: "test@test.com",
      tipo: "est",
    });

    // Se generó código y guardó
    expect(setCodigo).toHaveBeenCalled();

    // Se envió email
    expect(emailService.enviarCodigoVerificacion).toHaveBeenCalled();

    expect(result).toEqual({
      message: "Código de verificación enviado al correo",
      email: "test@test.com",
    });
  });

  test("iniciarRegistro → error si el email ya existe", async () => {
    db.query.mockResolvedValueOnce({ rows: [{ id: 1 }] });

    await expect(
      iniciarRegistro({ nombre: "Juan", email: "existe@test.com", tipo: "est" })
    ).rejects.toThrow("El email ya está registrado");
  });

  test("iniciarRegistro → error si tipo inválido", async () => {
    db.query.mockResolvedValueOnce({ rows: [] });

    await expect(
      iniciarRegistro({ nombre: "Juan", email: "a@a.com", tipo: "fake" })
    ).rejects.toThrow("Tipo de usuario no válido");
  });

  // ----------------------------------------------------------
  // verificarYCrearUsuario
  // ----------------------------------------------------------
  test("verificarYCrearUsuario → crea usuario correctamente", async () => {
    getCodigo.mockReturnValue("123456");

    bcrypt.hash.mockResolvedValueOnce("hashed-pass");

    db.query.mockResolvedValueOnce({
      rows: [{ id: 1, tipo: "est", aprobado: true }],
    });

    const result = await verificarYCrearUsuario({
      email: "test@test.com",
      codigo: "123456",
      nombre: "Juan",
      password: "1234",
      tipo: "est",
    });

    expect(bcrypt.hash).toHaveBeenCalledWith("1234", 10);

    expect(db.query).toHaveBeenCalled();

    expect(transporter.sendMail).toHaveBeenCalled();

    expect(deleteCodigo).toHaveBeenCalledWith("test@test.com");

    expect(result).toEqual({
      message: "Usuario creado y verificado exitosamente",
      userId: 1,
      tipo: "est",
      aprobado: true,
    });
  });

  test("verificarYCrearUsuario → error si código incorrecto", async () => {
    getCodigo.mockReturnValue("999999");

    await expect(
      verificarYCrearUsuario({
        email: "test@test.com",
        codigo: "123456",
        nombre: "Juan",
        password: "123",
        tipo: "est",
      })
    ).rejects.toThrow("Código incorrecto o expirado");
  });

  test("verificarYCrearUsuario → error si el código no existe", async () => {
    getCodigo.mockReturnValue(null);

    await expect(
      verificarYCrearUsuario({
        email: "test@test.com",
        codigo: "111111",
        nombre: "Juan",
        password: "123",
        tipo: "est",
      })
    ).rejects.toThrow("Código incorrecto o expirado");
  });
});
