import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DoctorForm } from "@/components/admin/DoctorForm";
import { actualizarDoctor } from "../actions";

export default async function EditarDoctorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctorId = Number(id);

  const [doctor, especialidades] = await Promise.all([
    prisma.doctor.findUnique({
      where: { id: doctorId },
      include: { especialidades: true },
    }),
    prisma.especialidad.findMany({ orderBy: { nombre: "asc" } }),
  ]);

  if (!doctor) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">
        Editar doctor: {doctor.nombre} {doctor.apellido}
      </h1>
      <div className="mt-6">
        <DoctorForm action={actualizarDoctor.bind(null, doctorId)} especialidades={especialidades} doctor={doctor} />
      </div>
    </div>
  );
}
