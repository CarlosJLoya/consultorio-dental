"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function aprobarTestimonio(id: number) {
  const session = await auth();
  const aprobadoPorId = session?.user?.id ? Number(session.user.id) : null;

  await prisma.testimonio.update({
    where: { id },
    data: { estado: "aprobado", aprobadoPorId, aprobadoEn: new Date() },
  });

  revalidatePath("/admin/testimonios");
}

export async function rechazarTestimonio(id: number) {
  const session = await auth();
  const aprobadoPorId = session?.user?.id ? Number(session.user.id) : null;

  await prisma.testimonio.update({
    where: { id },
    data: { estado: "rechazado", aprobadoPorId, aprobadoEn: new Date() },
  });

  revalidatePath("/admin/testimonios");
}

export async function eliminarTestimonio(id: number) {
  await prisma.testimonio.delete({ where: { id } });
  revalidatePath("/admin/testimonios");
}
