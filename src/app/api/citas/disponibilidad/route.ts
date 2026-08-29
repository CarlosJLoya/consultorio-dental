import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { diasHabilesDisponibles, formatFechaISO } from "@/lib/citas";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const doctorId = Number(searchParams.get("doctorId"));

  if (!Number.isInteger(doctorId) || doctorId <= 0) {
    return NextResponse.json({ error: "doctorId inválido" }, { status: 400 });
  }

  const dias = diasHabilesDisponibles();
  const primerDia = dias[0];
  const ultimoDia = dias[dias.length - 1];

  const citas = await prisma.cita.findMany({
    where: {
      doctorId,
      estado: { not: "cancelada" },
      fecha: { gte: primerDia, lte: ultimoDia },
    },
    select: { fecha: true, hora: true },
  });

  const ocupados = citas.map((c) => `${formatFechaISO(c.fecha)}-${c.hora}`);

  return NextResponse.json({ ocupados });
}
