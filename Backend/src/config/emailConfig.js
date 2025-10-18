import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD, // Contraseña de aplicación de Gmail
  },
});

// Plantillas de correo
export const emailTemplates = {
  registro: (nombre, tipo) => ({
    subject: "Bienvenido a Generación de Software",
    html: `
      <div style="
        font-family: 'Segoe UI', Arial, sans-serif;
        background-color: #f9fafc;
        padding: 30px;
        color: #333;
      ">
        <div style="
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          overflow: hidden;
        ">
          <div style="background: linear-gradient(135deg, #0061ff, #0b6670ff); padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Generación de Software</h1>
          </div>
          <div style="padding: 25px;">
            <h2 style="color: #0e2955ff;">¡Bienvenido, ${nombre}!</h2>
            <p>Gracias por registrarte en el <strong>Sistema de Generación de Software</strong>.</p>
            <p>Te has registrado como: <strong>${tipo}</strong></p>
            ${
              tipo === "profesor" || tipo === "edit"
                ? "<p style='background: #fff3cd; padding: 10px; border-radius: 6px; border-left: 4px solid #ffc107;'>Tu cuenta está pendiente de aprobación por un administrador. Te notificaremos cuando sea aprobada.</p>"
                : "<p style='background: #e7f9ed; padding: 10px; border-radius: 6px; border-left: 4px solid #28a745;'>Ya puedes acceder al sistema con tus credenciales.</p>"
            }
            <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;">
            <p style="font-size: 13px; color: #777;">Si no realizaste este registro, por favor ignora este correo.</p>
          </div>
          <div style="background: #f1f3f6; text-align: center; padding: 15px; font-size: 12px; color: #555;">
            © ${new Date().getFullYear()} Generación de Software. Todos los derechos reservados.
          </div>
        </div>
      </div>
    `,
  }),
};
