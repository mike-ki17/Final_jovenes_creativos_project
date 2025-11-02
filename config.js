
process.loadEnvFile?.();



// Utilidad para asegurar que las variables no sean undefined
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
export const DB_IP = requireEnv('DB_IP');
export const DB_CLUSTER = requireEnv('DB_CLUSTER');
export const ORIGIN_URL = requireEnv('ORIGIN_URL');
export const PORT = parseInt(requireEnv('PORT'), 10) || 3000;