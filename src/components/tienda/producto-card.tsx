import { nombreCategoria } from "@/content/tienda";
import { formatearPrecio, periodicidad } from "@/lib/precio";
import type { Producto, TipoEntrega } from "@/types/tienda";
import { ExpandableProfileCard } from "@/components/watermelon-ui/expandable-profile-card";

/** Cómo llega el producto al cliente, dicho en una línea dentro de la ficha. */
const ENTREGA_LABELS = {
  descarga: "Descarga inmediata",
  acceso: "Acceso permanente",
  invitacion: "Invitación al grupo",
  sesion: "Cita agendada",
} as const satisfies Record<TipoEntrega, string>;

interface ProductoCardProps {
  producto: Producto;
}

/**
 * Ficha de producto: la portada muestra lo indispensable y, al abrirla,
 * despliega el detalle completo.
 *
 * BORRADOR: todavía no lleva acción de compra —falta la página de producto y
 * el checkout de Stripe—, así que solo presenta la oferta.
 */
export function ProductoCard({ producto }: ProductoCardProps) {
  const precio = (
    <>
      {formatearPrecio(producto.precioCentavos)} MXN{" "}
      {periodicidad(producto.cobro)}
    </>
  );

  return (
    <ExpandableProfileCard
      id={producto.id}
      title={producto.titulo}
      subtitle={nombreCategoria(producto.categoria)}
      imageSrc={producto.imagen}
      badge={precio}
    >
      <div className="flex h-full flex-col gap-6">
        <p>{producto.resumen}</p>

        {producto.detalles.length > 0 ? (
          <div>
            <h4 className="font-semibold tracking-tight text-primary">
              Qué incluye
            </h4>
            <ul className="mt-2 space-y-1.5">
              {producto.detalles.map((detalle) => (
                <li
                  key={detalle}
                  className="text-foreground/60 before:mr-2 before:text-accent before:content-['·']"
                >
                  {detalle}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <h4 className="font-semibold tracking-tight text-primary">Entrega</h4>
          <p className="mt-2 text-foreground/60">
            {ENTREGA_LABELS[producto.entrega]}
          </p>
        </div>

        <div className="mt-auto border-t border-primary/10 pt-5">
          <p className="font-heading text-3xl font-bold tracking-tight text-primary">
            {formatearPrecio(producto.precioCentavos)}
            <span className="ml-1 text-sm font-semibold text-primary/40">
              MXN {periodicidad(producto.cobro)}
            </span>
          </p>

          {producto.estado === "proximamente" ? (
            <p className="mt-3 text-[11px] font-semibold tracking-[0.15em] text-accent uppercase">
              Próximamente
            </p>
          ) : null}
        </div>
      </div>
    </ExpandableProfileCard>
  );
}
