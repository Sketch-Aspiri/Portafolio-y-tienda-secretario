"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Tarjeta de perfil que despliega una ficha de datos, de Watermelon UI
 * (`registry.watermelon.sh/r/profile-card.json`).
 *
 * Ajustes respecto del original, todos necesarios para este sitio:
 * - Las filas son datos (`rows`), no campos fijos de startup —«Monthly visits»,
 *   «Heat Score», «Estimated ARR»—, para poder reutilizarla con cualquier
 *   contenido.
 * - Paleta del sitio en lugar de los grises y morados de Watermelon, y sin
 *   variantes `dark:` (el sitio es de tema claro).
 * - Sin `react-icons` ni el gráfico decorativo de tendencia; el original
 *   importaba ese paquete sin declararlo como dependencia.
 * - La cabecera es un `button`, no un `div` con `onClick`: el original no se
 *   podía abrir con el teclado.
 * - Fuera el contenedor de demostración (`min-h-[500px]` centrado); ahora
 *   acepta `className` para que la coloque quien la use.
 * - Función con nombre en lugar de `React.FC`.
 */

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;

/** Una fila de la ficha: etiqueta a la izquierda, valor a la derecha. */
export interface ProfileCardRow {
  /** Icono de la etiqueta, p. ej. `<MapPin size={16} />`. */
  icon?: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

export interface ProfileCardProps {
  name: string;
  /** Línea breve bajo el nombre (cargo, categoría). */
  subtitle?: string;
  /** Contenido del recuadro dorado: imagen o icono. Sin él, la inicial. */
  logo?: React.ReactNode;
  rows: readonly ProfileCardRow[];
  /** La ficha arranca desplegada. */
  defaultOpen?: boolean;
  className?: string;
}

export function ProfileCard({
  name,
  subtitle,
  logo,
  rows,
  defaultOpen = false,
  className,
}: ProfileCardProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const fichaId = React.useId();

  return (
    <motion.div
      layout
      transition={SPRING}
      className={cn(
        "w-full max-w-sm overflow-hidden rounded-xl border border-primary/10 bg-background shadow-lg",
        className,
      )}
    >
      {/* Cabecera: abre y cierra la ficha */}
      <button
        type="button"
        onClick={() => setIsOpen((abierto) => !abierto)}
        aria-expanded={isOpen}
        aria-controls={fichaId}
        className="flex w-full cursor-pointer items-center justify-between gap-3 p-3.5 text-left transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
      >
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-accent/90 font-heading text-lg font-bold text-white"
          >
            {logo ?? name.charAt(0)}
          </span>

          <span className="min-w-0">
            <span className="block truncate font-heading text-[15px] font-bold tracking-tight text-primary">
              {name}
            </span>
            {subtitle ? (
              <span className="block truncate text-[11px] font-semibold tracking-[0.12em] text-accent uppercase">
                {subtitle}
              </span>
            ) : null}
          </span>
        </div>

        <motion.span
          animate={{ rotate: isOpen ? 0 : 180 }}
          aria-hidden="true"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/15 text-primary/50 transition-colors duration-200 hover:text-accent"
        >
          <ChevronUp size={20} />
        </motion.span>
      </button>

      {/* Ficha desplegada */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={fichaId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={SPRING}
            className="rounded-t-3xl border-t border-primary/10 bg-white"
          >
            <dl className="space-y-4 p-5">
              {rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between gap-4 py-0.5"
                >
                  <dt className="flex shrink-0 items-center gap-3">
                    {row.icon ? (
                      <span aria-hidden="true" className="text-accent">
                        {row.icon}
                      </span>
                    ) : null}
                    <span className="text-[13px] font-medium whitespace-nowrap text-foreground/50">
                      {row.label}
                    </span>
                  </dt>
                  <dd className="flex min-w-0 flex-1 justify-end text-right text-[13px] font-semibold text-primary">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

/** Etiqueta redondeada para los valores que van en lista (materias, temas). */
export function ProfileCardChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-bold whitespace-nowrap text-accent">
      {children}
    </span>
  );
}
