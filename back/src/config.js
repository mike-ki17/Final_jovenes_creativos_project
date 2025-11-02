import path from 'path';
import { fileURLToPath } from 'url';

// --- INICIO DE LA CORRECCIÓN ---

// 1. Obtiene la ruta del archivo actual (config.js)
const __filename = fileURLToPath(import.meta.url);

// 2. Obtiene el directorio del archivo actual ( /back/src/ )
const __dirname = path.dirname(__filename);

// 3. Construye la ruta al archivo .env (subiendo un nivel a /back/.env)
const envPath = path.join(__dirname, '..', '.env');

// 4. Carga ESE archivo .env específico
//    (Quitamos el '?' porque queremos que falle si no encuentra ESE archivo)
process.loadEnvFile(envPath);

// --- FIN DE LA CORRECCIÓN ---


// El resto de tu código funciona perfectamente
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno: ${name}`);
  }
  return value;
}

export const DB_USER = requireEnv('DB_USER');
export const DB_PASSWORD = requireEnv('DB_PASSWORD');
export const DB_HOST = requireEnv('DB_HOST');
export const DB_NAME = requireEnv('DB_NAME'); // Asegúrate de tener esta en tu .env
export const DB_IP = requireEnv('DB_IP'); // Asegúrate de tener esta en tu .env
export const DB_CLUSTER = requireEnv('DB_CLUSTER');
export const ORIGIN_URL = requireEnv('ORIGIN_URL'); // Asegúrate de tener esta en tu .env
export const PORT = parseInt(requireEnv('PORT'), 10) || 3000;
