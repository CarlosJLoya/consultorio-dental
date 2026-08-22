import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { r2, R2_BUCKET_NAME, R2_PUBLIC_URL } from "@/lib/r2";

const EXTENSIONES_POR_TIPO: Record<string, string> = {
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export async function POST(request: Request) {
  const { contentType } = await request.json();

  const extension = EXTENSIONES_POR_TIPO[contentType];
  if (!extension) {
    return NextResponse.json({ error: "Solo se permiten videos MP4, WEBM o MOV" }, { status: 400 });
  }

  const key = `testimonios/${randomUUID()}.${extension}`;

  const putUrl = await getSignedUrl(
    r2,
    new PutObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key, ContentType: contentType }),
    { expiresIn: 300 },
  );

  return NextResponse.json({ putUrl, publicUrl: `${R2_PUBLIC_URL}/${key}` });
}
