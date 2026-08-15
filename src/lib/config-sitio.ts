import { prisma } from "@/lib/prisma";

export async function getConfiguracion(clave: string, valorPorDefecto: string): Promise<string> {
  const registro = await prisma.configuracionSitio.findUnique({ where: { clave } });
  return registro?.valor ?? valorPorDefecto;
}
