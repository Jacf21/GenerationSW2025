/**
 * @file emailService.test.js
 * @description Tests para el servicio de envío de correos.
 */

import { jest } from "@jest/globals";

// 🧩 Mock de las dependencias
jest.unstable_mockModule("../../config/emailConfig.js", () => ({
  transporter: {
    sendMail: jest.fn(),
  },
}));

jest.unstable_mockModule("../../config/emailTemplates.js", () => ({
  emailTemplates: {
    codigoVerificacion: jest.fn((nombre, codigo) => ({
      subject: "Código de verificación",
      html: `<p>Hola ${nombre}, tu código es ${codigo}</p>`,
    })),
    aprobacion: jest.fn((nombre) => ({
      subject: "Aprobado",
      html: `<p>Felicidades ${nombre}, has sido aprobado</p>`,
    })),
    desaprobacion: jest.fn((nombre) => ({
      subject: "Desaprobado",
      html: `<p>Hola ${nombre}, lamentamos informarte que no fuiste aprobado</p>`,
    })),
    registro: jest.fn((nombre, tipo) => ({
      subject: "Registro exitoso",
      html: `<p>Bienvenido ${nombre}, te registraste como ${tipo}</p>`,
    })),
  },
}));

// 🧩 Importar el módulo bajo prueba después de mockear dependencias
const { emailService } = await import("../../services/emailService.js");
const { transporter } = await import("../../config/emailConfig.js");
const { emailTemplates } = await import("../../config/emailTemplates.js");

describe("emailService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ✅ Test: enviarCorreo exitoso
  test("enviarCorreo debe enviar un correo exitosamente", async () => {
    transporter.sendMail.mockResolvedValueOnce({ messageId: "abc123" });

    const template = { subject: "Test", html: "<p>Hola</p>" };
    const result = await emailService.enviarCorreo(template, "test@correo.com");

    expect(transporter.sendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "test@correo.com",
        subject: "Test",
        html: "<p>Hola</p>",
      })
    );
    expect(result).toEqual({
      success: true,
      message: "Correo enviado a test@correo.com",
      messageId: "abc123",
    });
  });

  // ❌ Test: enviarCorreo con error
  test("enviarCorreo debe lanzar error si sendMail falla", async () => {
    transporter.sendMail.mockRejectedValueOnce(new Error("SMTP error"));

    const template = { subject: "Error", html: "<p>Falló</p>" };

    await expect(emailService.enviarCorreo(template, "error@correo.com")).rejects.toThrow(
      "No se pudo enviar el correo a error@correo.com. SMTP error"
    );
  });

  // ✅ Test: enviarCodigoVerificacion exitoso
  test("enviarCodigoVerificacion debe usar el template correcto y enviar el correo", async () => {
    emailTemplates.codigoVerificacion.mockReturnValueOnce({
      subject: "Código de verificación",
      html: "<p>1234</p>",
    });
    transporter.sendMail.mockResolvedValueOnce({ messageId: "msg001" });

    const result = await emailService.enviarCodigoVerificacion("user@correo.com", "Carlos", "1234");

    expect(emailTemplates.codigoVerificacion).toHaveBeenCalledWith("Carlos", "1234");
    expect(transporter.sendMail).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
  });

  // ✅ Test: enviarNotificacionAprobacion exitoso
  test("enviarNotificacionAprobacion debe enviar correo de aprobación", async () => {
    emailTemplates.aprobacion.mockReturnValueOnce({
      subject: "Aprobado",
      html: "<p>OK</p>",
    });
    transporter.sendMail.mockResolvedValueOnce({ messageId: "msg002" });

    const result = await emailService.enviarNotificacionAprobacion("ok@correo.com", "Laura");

    expect(emailTemplates.aprobacion).toHaveBeenCalledWith("Laura");
    expect(result.success).toBe(true);
  });

  // ✅ Test: enviarNotificacionDesaprobacion exitoso
  test("enviarNotificacionDesaprobacion debe enviar correo de desaprobación", async () => {
    emailTemplates.desaprobacion.mockReturnValueOnce({
      subject: "Desaprobado",
      html: "<p>Fail</p>",
    });
    transporter.sendMail.mockResolvedValueOnce({ messageId: "msg003" });

    const result = await emailService.enviarNotificacionDesaprobacion("fail@correo.com", "Luis");

    expect(emailTemplates.desaprobacion).toHaveBeenCalledWith("Luis");
    expect(result.success).toBe(true);
  });

  // ✅ Test: registro exitoso
  test("registro debe enviar correo de registro con el template correcto", async () => {
    emailTemplates.registro.mockReturnValueOnce({
      subject: "Registro exitoso",
      html: "<p>Bienvenido</p>",
    });
    transporter.sendMail.mockResolvedValueOnce({ messageId: "msg004" });

    const result = await emailService.registro("nuevo@correo.com", "Pedro", "Docente");

    expect(emailTemplates.registro).toHaveBeenCalledWith("Pedro", "Docente");
    expect(result.success).toBe(true);
  });
});
