import { transporter } from "../config/emailConfig.js";
import { emailTemplates } from "../config/emailTemplates.js";

export const emailService = {
  async enviarCorreo(template, to) {
    try {
      const info = await transporter.sendMail({
        from: `"Sistema Generación de Software" <${process.env.EMAIL_USER}>`,
        to,
        subject: template.subject,
        html: template.html,
      });

      console.log(`📧 Correo enviado correctamente a ${to} (${template.subject})`);

      return {
        success: true,
        message: `Correo enviado a ${to}`,
        messageId: info.messageId,
      };
    } catch (error) {
      const errorMsg =
        error && error.message ? error.message : "Error desconocido al intentar enviar el correo.";

      console.error(`❌ Error al enviar correo a ${to}: ${errorMsg}`);

      // Lanzamos un error controlado con mensaje definido
      throw new Error(`No se pudo enviar el correo a ${to}. ${errorMsg}`);
    }
  },

  async enviarCodigoVerificacion(email, nombre, codigo) {
    try {
      const template = emailTemplates.codigoVerificacion(nombre, codigo);
      return await this.enviarCorreo(template, email);
    } catch (error) {
      throw new Error(error.message || "No se pudo enviar el correo de verificación.");
    }
  },

  async enviarNotificacionAprobacion(email, nombre) {
    try {
      const template = emailTemplates.aprobacion(nombre);
      return await this.enviarCorreo(template, email);
    } catch (error) {
      throw new Error(error.message || "No se pudo enviar la notificación de aprobación.");
    }
  },

  async enviarNotificacionDesaprobacion(email, nombre) {
    try {
      const template = emailTemplates.desaprobacion(nombre);
      return await this.enviarCorreo(template, email);
    } catch (error) {
      throw new Error(error.message || "No se pudo enviar la notificación de desaprobación.");
    }
  },

  async registro(email, nombre, tipo) {
    try {
      const template = emailTemplates.registro(nombre, tipo);
      return await this.enviarCorreo(template, email);
    } catch (error) {
      throw new Error(error.message || "No se pudo enviar el correo de registro.");
    }
  },
};
