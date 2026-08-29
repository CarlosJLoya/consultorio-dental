import { prisma } from "@/lib/prisma";
import { getConfiguracion } from "@/lib/config-sitio";
import { AgendarCitaForm } from "@/components/sections/AgendarCitaForm";

export const dynamic = "force-dynamic";

export default async function AgendarCitaPage() {
  const [especialidades, whatsapp] = await Promise.all([
    prisma.especialidad.findMany({
      include: { doctores: { where: { doctor: { activo: true } }, include: { doctor: true } } },
      orderBy: { nombre: "asc" },
    }),
    getConfiguracion("telefono_whatsapp_principal", ""),
  ]);

  const especialidadesConDoctores = especialidades
    .filter((e) => e.doctores.length > 0)
    .map((e) => ({
      id: e.id,
      nombre: e.nombre,
      doctores: e.doctores.map(({ doctor }) => ({
        id: doctor.id,
        nombre: doctor.nombre,
        apellido: doctor.apellido,
      })),
    }));

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground">Agendar cita</h1>
      <p className="mt-2 text-muted">
        Elige la especialidad, el doctor y el horario que más te convenga. Tu solicitud se confirmará por WhatsApp.
      </p>

      <div className="mt-8">
        <AgendarCitaForm especialidades={especialidadesConDoctores} whatsapp={whatsapp} />
      </div>
    </div>
  );
}
