import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { ruta, referer } = await request.json();

  if (typeof ruta !== "string" || ruta.length === 0 || ruta.length > 500) {
    return NextResponse.json({ error: "Ruta inválida" }, { status: 400 });
  }

  await prisma.visitaPagina.create({
    data: {
      ruta,
      referer: typeof referer === "string" && referer.length > 0 ? referer.slice(0, 500) : null,
    },
  });

  return NextResponse.json({ ok: true });
}
