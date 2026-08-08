"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface ExpandableCardItem {
  id: string;
  titulo: string;
  descripcion: string;
  /** Dato breve al pie (por ejemplo, cuántos productos hay). */
  meta?: string;
  /** Lista que se revela al abrir la tarjeta. */
  detalles?: readonly string[];
  /** Icono ya construido; hereda el color de la tarjeta vía `currentColor`. */
  icon: React.ReactNode;
}

export interface ExpandableCardsProps {
  items: readonly ExpandableCardItem[];
  /** Nombre del grupo para lectores de pantalla. */
  label: string;
  className?: string;
}

/** Cuánto ancho toma la tarjeta abierta respecto de cada una cerrada. */
const CRECIMIENTO_ABIERTA = 2.4;

/**
 * Tarjetas que se expanden para revelar su detalle: en fila a partir de `md`,
 * apiladas como acordeón en pantallas chicas.
 *
 * Abre con el puntero, con el foco de teclado y con clic o toque, igual que
 * `HoverExpand`, de modo que el contenido no depende del hover. El detalle solo
 * existe en el DOM cuando la tarjeta está abierta: así nunca queda texto
 * invisible que los lectores de pantalla sigan anunciando.
 */
export function ExpandableCards({
  items,
  label,
  className,
}: ExpandableCardsProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [pinnedId, setPinnedId] = React.useState<string | null>(null);

  // El clic manda sobre el puntero. En reposo no hay ninguna abierta.
  const openId = pinnedId ?? hoveredId;

  return (
    <ul
      aria-label={label}
      className={cn(
        "flex w-full flex-col gap-px overflow-hidden rounded-2xl border border-primary/10 bg-primary/10 md:h-[22rem] md:flex-row",
        className,
      )}
    >
      {items.map((item) => (
        <ExpandableCard
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onOpen={() => setHoveredId(item.id)}
          onClose={() => setHoveredId(null)}
          onToggle={() =>
            setPinnedId((current) => (current === item.id ? null : item.id))
          }
        />
      ))}
    </ul>
  );
}

interface ExpandableCardProps {
  item: ExpandableCardItem;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function ExpandableCard({
  item,
  isOpen,
  onOpen,
  onClose,
  onToggle,
}: ExpandableCardProps) {
  const panelId = React.useId();
  const detalles = item.detalles ?? [];

  return (
    <li
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      style={
        { "--crecimiento": isOpen ? CRECIMIENTO_ABIERTA : 1 } as React.CSSProperties
      }
      className={cn(
        "min-w-0 transition-[flex-grow,background-color] duration-500 ease-out md:flex-[var(--crecimiento)]",
        isOpen ? "bg-primary" : "bg-background hover:bg-white",
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        onFocus={onOpen}
        onBlur={onClose}
        className="flex h-full w-full flex-col items-start gap-3 p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset"
      >
        <span
          className={cn(
            "transition-colors duration-500",
            isOpen ? "text-accent" : "text-primary/40",
          )}
        >
          {item.icon}
        </span>

        <span
          className={cn(
            "font-heading text-lg font-bold tracking-tight transition-colors duration-500",
            isOpen ? "text-white" : "text-primary",
          )}
        >
          {item.titulo}
        </span>

        <span
          className={cn(
            "text-sm leading-relaxed transition-colors duration-500",
            isOpen ? "text-white/75" : "text-foreground/70",
          )}
        >
          {item.descripcion}
        </span>

        <div id={panelId} className="w-full">
          {isOpen && detalles.length > 0 ? (
            <ul className="space-y-2 border-t border-white/15 pt-4">
              {detalles.map((detalle) => (
                <li
                  key={detalle}
                  className="text-sm leading-snug text-white/70 before:mr-2 before:text-accent before:content-['·']"
                >
                  {detalle}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {item.meta ? (
          <span
            className={cn(
              "mt-auto pt-2 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-500",
              isOpen ? "text-accent" : "text-primary/35",
            )}
          >
            {item.meta}
          </span>
        ) : null}
      </button>
    </li>
  );
}
