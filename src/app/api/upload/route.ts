import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { auth } from "@/auth";
import { r2, R2_BUCKET_NAME, R2_PUBLIC_URL } from "@/lib/r2";

const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const TAMANO_MAXIMO_BYTES = 5 * 1024 * 1024; // 5 MB

const CARPETAS_PERMITIDAS = ["doctores", "galeria", "casos-exito", "paquetes", "promociones"];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const carpeta = String(formData.get("carpeta") ?? "");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Falta el archivo" }, { status: 400 });
  }

  if (!CARPETAS_PERMITIDAS.includes(carpeta)) {
    return NextResponse.json({ error: "Carpeta inválida" }, { status: 400 });
  }

  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return NextResponse.json({ error: "Solo se permiten imágenes JPG, PNG, WEBP o GIF" }, { status: 400 });
  }

  if (file.size > TAMANO_MAXIMO_BYTES) {
    return NextResponse.json({ error: "La imagen no debe superar 5 MB" }, { status: 400 });
  }

  const extension = file.type.split("/")[1];
  const key = `${carpeta}/${randomUUID()}.${extension}`;
  const bytes = new Uint8Array(await file.arrayBuffer());

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: bytes,
      ContentType: file.type,
    }),
  );

  return NextResponse.json({ url: `${R2_PUBLIC_URL}/${key}` });
}
