export const emailTemplates = {
  codigoVerificacion: (nombre, codigo) => ({
    subject: "Verifica tu cuenta",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Hola ${nombre},</h2>
        <p>Tu código de verificación es:</p>
        <div style="font-size: 2rem; font-weight: bold; color: #4f46e5; margin: 16px 0;">${codigo}</div>
        <p>Este código expirará en 5 minutos.</p>
      </div>
    `,
  }),

  aprobacion: (nombre) => ({
    subject: "✅ Tu cuenta ha sido aprobada",
    html: `
      ${baseEmail(
        `
        <h2>Hola ${nombre},</h2>
        <p>Nos alegra informarte que tu cuenta ha sido <strong>aprobada</strong>.</p>
        <p>Ya puedes ingresar al sistema con tus credenciales.</p>
        <div style="text-align:center;margin-top:25px;">
          <a href="https://dev-recode.app/login" target="_blank"
            style="display:inline-block;background:#28a745;color:white;
            padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
            Ingresar al Sistema
          </a>
        </div>
      `,
        "#28a745"
      )}
    `,
  }),

  desaprobacion: (nombre) => ({
    subject: "⚠️ Tu cuenta ha sido desactivada",
    html: `
      ${baseEmail(
        `
        <h2>Hola ${nombre},</h2>
        <p>Lamentamos informarte que tu cuenta ha sido <strong>desactivada temporalmente</strong>.</p>
        <p>Si crees que se trata de un error, contacta al equipo de soporte.</p>
        <div style="text-align:center;margin-top:25px;">
          <a href="mailto:soporte@generacion-software.com"
            style="display:inline-block;background:#dc3545;color:white;
            padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
            Contactar Soporte
          </a>
        </div>
      `,
        "#dc3545"
      )}
    `,
  }),

  registro: (nombre, tipo) => ({
    subject: "🎉 ¡Bienvenido a Generación de Software!",
    html: baseEmail(
      `
        <h2>Hola ${nombre},</h2>
        <p>Tu cuenta de tipo <strong>${tipo}</strong> ha sido creada correctamente.</p>
        <p>Gracias por unirte a nuestra comunidad. Esperamos que disfrutes de la experiencia.</p>
        <div style="text-align:center;margin-top:25px;">
          <a href="https://dev-recode.app/login" target="_blank"
            style="display:inline-block;background:#4f46e5;color:white;
            padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;">
            Iniciar Sesión
          </a>
        </div>
      `,
      "#4f46e5"
    ),
  }),
};

// Función base para reducir código duplicado
const baseEmail = (content, color) => `
  <div style="font-family:'Segoe UI',Arial,sans-serif;background-color:#f9fafc;padding:30px;color:#333;">
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;
                box-shadow:0 4px 12px rgba(0,0,0,0.1);overflow:hidden;">
      <div style="background:${color};padding:20px;text-align:center;color:white;">
        <h1 style="margin:0;">Generación de Software</h1>
      </div>
      <div style="padding:25px;">${content}
        <hr style="margin:25px 0;border:none;border-top:1px solid #ddd;">
        <p style="font-size:13px;color:#777;">Si no esperabas este mensaje, por favor ignóralo.</p>
      </div>
      <div style="background:#f1f3f6;text-align:center;padding:15px;font-size:12px;color:#555;">
        © ${new Date().getFullYear()} Generación de Software. Todos los derechos reservados.
      </div>
    </div>
  </div>
`;
