export function Contacto() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-16">
      <h2 className="text-3xl font-bold text-foreground">Contacto</h2>
      <p className="mt-2 text-muted">
        Formulario de ejemplo — falta conectarlo a la tabla <code>contactos</code> vía una ruta de API.
      </p>

      <form className="mt-8 grid max-w-xl gap-4">
        <div>
          <label htmlFor="nombre" className="text-sm font-medium text-foreground">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="telefono" className="text-sm font-medium text-foreground">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="Tu teléfono"
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="text-sm font-medium text-foreground">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <button
          type="submit"
          disabled
          className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground opacity-60"
        >
          Enviar (pendiente de conectar)
        </button>
      </form>
    </section>
  );
}
