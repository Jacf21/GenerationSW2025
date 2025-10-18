import { transporter, emailTemplates } from "../config/emailConfig.js";

export const emailService = {
  async enviarCorreoRegistro(email, nombre, tipo) {
    try {
      const template = emailTemplates.registro(nombre, tipo);

      await transporter.sendMail({
        from: `"Sistema Generación de Software" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: template.subject,
        html: template.html,
      });

      console.log("Correo de registro enviado a:", email);
      return true;
    } catch (error) {
      console.error("Error al enviar correo:", error);
      throw new Error("Error al enviar el correo de confirmación");
    }
  },
};
