import fs from "node:fs";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function getCaCert(): string | undefined {
  // Preferido en producción (ej. Vercel): certificado como variable de entorno,
  // porque una ruta de archivo leída en tiempo de ejecución no siempre queda
  // incluida en el paquete de una función serverless.
  if (process.env.DATABASE_CA_CERT) {
    return process.env.DATABASE_CA_CERT.replace(/\\n/g, "\n");
  }

  // Alternativa para desarrollo local: leer el certificado de un archivo.
  if (process.env.DATABASE_CA_CERT_PATH) {
    return fs.readFileSync(process.env.DATABASE_CA_CERT_PATH, "utf8");
  }

  return undefined;
}

function createPrismaClient() {
  const ca = getCaCert();

  // Conexión SSL con verificación completa del certificado CA (ej. Aiven).
  if (ca) {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT ?? 3306),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      connectionLimit: 5,
      ssl: { ca },
    });
    return new PrismaClient({ adapter });
  }

  // Desarrollo local: sin SSL, cadena de conexión simple.
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
