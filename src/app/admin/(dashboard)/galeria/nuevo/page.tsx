import { GaleriaForm } from "@/components/admin/GaleriaForm";
import { crearFoto } from "../actions";

export default function NuevaFotoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Nueva foto</h1>
      <div className="mt-6">
        <GaleriaForm action={crearFoto} />
      </div>
    </div>
  );
}
