import fs from "node:fs";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const caCertPath = process.env.DATABASE_CA_CERT_PATH;

  // Producción (ej. Aiven): conexión SSL con verificación completa del certificado CA.
  if (caCertPath) {
    const adapter = new PrismaMariaDb({
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT ?? 3306),
      user: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      connectionLimit: 5,
      ssl: { ca: fs.readFileSync(caCertPath, "utf8") },
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
