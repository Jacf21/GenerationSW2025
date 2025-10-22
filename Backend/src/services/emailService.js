import { transporter } from "../config/emailConfig.js";

export const emailService = {
  async enviarCodigoVerificacion(email, nombre, codigo) {
    try {
      await transporter.sendMail({
        from: `"Sistema Generación de Software" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Verifica tu cuenta",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Hola ${nombre},</h2>
            <p>Tu código de verificación es:</p>
            <div style="font-size: 2rem; font-weight: bold; color: #4f46e5; margin: 16px 0;">${codigo}</div>
            <p>Este código expirará en 5 minutos.</p>
          </div>
        `,
      });
      console.log(`Correo de verificación enviado a: ${email}`);
    } catch (error) {
      console.error(`Error al enviar correo a ${email}:`, error.message);
    }
  },
};
