import fs from "fs";
import path from "path";
import { google } from "googleapis";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

// Ruta de este archivo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// 🔒 Alcance mínimo para archivos y carpetas en Drive
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// 📄 Rutas locales
const TOKEN_PATH = path.join(__dirname, "token.json");
const CREDENTIALS_PATH = path.join(__dirname, "credentials_oauth.json");

/**
 * Cargar token previamente guardado
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = fs.readFileSync(TOKEN_PATH, "utf8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch {
    return null;
  }
}

/**
 * Autorizar con token existente
 */
async function authorize() {
  const client = await loadSavedCredentialsIfExist();
  if (!client) throw new Error("No se encontró token.json. Ejecuta node googleDrive.js primero.");
  return client;
}

/**
 * Obtener cliente Drive
 */
async function getDriveClient() {
  const auth = await authorize();
  return google.drive({ version: "v3", auth });
}

/**
 * Crear carpeta en Drive
 */
export async function crearCarpeta(nombre, parentId = null) {
  const drive = await getDriveClient();
  const res = await drive.files.create({
    resource: {
      name: nombre,
      mimeType: "application/vnd.google-apps.folder",
      parents: parentId ? [parentId] : [],
    },
    fields: "id, name",
  });
  return res.data; // { id, name }
}

/**
 * Subir archivo a una carpeta específica
 */
export async function subirArchivo(localPath, name, mimeType, folderId) {
  const drive = await getDriveClient();

  const res = await drive.files.create({
    requestBody: {
      name,
      mimeType,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: fs.createReadStream(localPath),
    },
    fields: "id, name, webViewLink",
  });

  // Hacer público el archivo
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: { role: "reader", type: "anyone" },
  });

  // Intentar borrar el archivo temporal local
  try {
    fs.unlinkSync(localPath);
  } catch (err) {
    console.warn("⚠️ No se pudo eliminar archivo temporal:", err.message);
  }

  return res.data; // { id, name, webViewLink }
}

/**
 * Eliminar archivo de Drive
 */
export async function eliminarArchivo(fileId) {
  const drive = await getDriveClient();
  await drive.files.delete({ fileId });
  return true;
}

/**
 * Listar archivos de una carpeta
 */
export async function listarArchivos(folderId) {
  const drive = await getDriveClient();
  const res = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id, name, mimeType, webViewLink)",
  });
  return res.data.files;
}

// Modo CLI opcional: solo para generar token.json la primera vez
if (process.argv[1].endsWith("googleDrive.js")) {
  console.log("🔧 Modo configuración: genera el token de acceso a Drive.\n");
  console.log("Ejecuta node googleDrive.js una vez para crear token.json si no lo tienes.");
}
