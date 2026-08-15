"use client";

export function ConfirmDeleteButton({ confirmText = "¿Eliminar este registro?" }: { confirmText?: string }) {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm(confirmText)) {
          e.preventDefault();
        }
      }}
      className="text-sm text-danger hover:underline"
    >
      Eliminar
    </button>
  );
}
