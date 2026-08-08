"use client";

import * as React from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";

import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Una línea del detalle que se revela al abrir la fila. */
export interface HoverExpandEntry {
  primary: string;
  secondary?: string;
  /** Matiz breve junto al título (por ejemplo, el estado de un grado). */
  tag?: string;
}

export interface HoverExpandItem {
  id: string;
  label: string;
  /** Categoría breve alineada a la derecha (ámbito, año, lugar). */
  sublabel?: string;
  /** Texto de contexto visible solo con la fila abierta. */
  description?: string;
  /**
   * Fondo decorativo de la fila. Sin imagen se usa un panel institucional.
   * No lleva texto alternativo: el rótulo de la fila ya nombra el contenido.
   */
  image?: string;
  entries?: readonly HoverExpandEntry[];
}

export interface HoverExpandProps {
  items: readonly HoverExpandItem[];
  /** Alto de la fila cerrada, en píxeles. */
  collapsedHeight?: number;
  className?: string;
}

const DEFAULT_COLLAPSED_HEIGHT = 78;

/** Fondo de respaldo mientras no exista fotografía para la fila. */
const PLACEHOLDER_BACKGROUND =
  "bg-[radial-gradient(125%_125%_at_12%_0%,#1d3a6d_0%,#0f1f3d_52%,#0a1428_100%)]";

/**
 * Mide el alto real del contenido para animar hacia un valor en píxeles.
 * Evita animar hacia `auto`, que no todas las versiones de Framer interpolan.
 */
function useMeasuredHeight<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new ResizeObserver(() => {
      setHeight(node.getBoundingClientRect().height);
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, height] as const;
}

interface HoverExpandRowProps {
  item: HoverExpandItem;
  index: number;
  collapsedHeight: number;
  isOpen: boolean;
  isDimmed: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

function HoverExpandRow({
  item,
  index,
  collapsedHeight,
  isOpen,
  isDimmed,
  onOpen,
  onClose,
  onToggle,
}: HoverExpandRowProps) {
  const panelId = React.useId();
  const [contentRef, contentHeight] = useMeasuredHeight<HTMLDivElement>();

  return (
    <motion.li
      className="relative isolate w-full overflow-hidden border-b border-primary/10"
      animate={{
        height: isOpen ? Math.max(contentHeight, collapsedHeight) : collapsedHeight,
        opacity: isDimmed ? 0.42 : 1,
      }}
      initial={false}
      transition={{
        height: { duration: 0.55, ease: EASE_OUT_EXPO },
        opacity: { duration: 0.25, ease: "easeOut" },
      }}
      onHoverStart={onOpen}
      onHoverEnd={onClose}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 1.05 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 56rem, 100vw"
            className="object-cover"
          />
        ) : (
          <div className={cn("h-full w-full", PLACEHOLDER_BACKGROUND)} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/45" />
      </motion.div>

      <div ref={contentRef}>
        <h4>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onToggle}
            onFocus={onOpen}
            onBlur={onClose}
            style={{ height: collapsedHeight }}
            className="flex w-full items-center gap-4 px-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-inset sm:px-8"
          >
            <span
              className={cn(
                "shrink-0 text-xs tabular-nums transition-colors duration-300",
                isOpen ? "text-accent" : "text-primary/35",
              )}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <span
              className={cn(
                "min-w-0 flex-1 font-heading text-lg font-bold tracking-tight transition-colors duration-300 sm:text-2xl",
                isOpen ? "text-white" : "text-primary",
              )}
            >
              {item.label}
            </span>

            {item.sublabel ? (
              <span
                className={cn(
                  "hidden shrink-0 text-xs tracking-[0.2em] uppercase transition-colors duration-300 sm:block",
                  isOpen ? "text-accent" : "text-primary/40",
                )}
              >
                {item.sublabel}
              </span>
            ) : null}
          </button>
        </h4>

        <motion.div
          id={panelId}
          inert={!isOpen}
          className="px-5 pb-8 sm:px-8"
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 10 }}
          transition={{
            duration: 0.4,
            ease: EASE_OUT_EXPO,
            delay: isOpen ? 0.1 : 0,
          }}
        >
          {item.description ? (
            <p className="max-w-2xl pl-8 text-sm leading-relaxed text-white/75">
              {item.description}
            </p>
          ) : null}

          {item.entries && item.entries.length > 0 ? (
            <ul className="mt-6 grid gap-x-10 gap-y-4 border-t border-white/15 pt-6 pl-8 sm:grid-cols-2">
              {item.entries.map((entry) => (
                <li key={`${entry.primary}·${entry.secondary ?? ""}`}>
                  <p className="text-sm font-semibold text-white">
                    {entry.primary}
                    {entry.tag ? (
                      <span className="ml-2 align-middle text-[11px] font-semibold tracking-[0.15em] text-accent uppercase">
                        · {entry.tag}
                      </span>
                    ) : null}
                  </p>
                  {entry.secondary ? (
                    <p className="mt-0.5 text-sm leading-relaxed text-white/60">
                      {entry.secondary}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : null}
        </motion.div>
      </div>
    </motion.li>
  );
}

/**
 * Menú de filas que se expanden sobre una imagen de fondo.
 * Abre con el puntero, con el foco de teclado y con clic o toque,
 * de modo que el contenido no depende del hover para ser accesible.
 */
export function HoverExpand({
  items,
  collapsedHeight = DEFAULT_COLLAPSED_HEIGHT,
  className,
}: HoverExpandProps) {
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [pinnedId, setPinnedId] = React.useState<string | null>(null);

  // El clic manda sobre el puntero: al fijar una fila deja de seguir al mouse.
  const openId = pinnedId ?? hoveredId;

  return (
    <MotionConfig reducedMotion="user">
      <ul className={cn("w-full border-t border-primary/10", className)}>
        {items.map((item, index) => (
          <HoverExpandRow
            key={item.id}
            item={item}
            index={index}
            collapsedHeight={collapsedHeight}
            isOpen={openId === item.id}
            isDimmed={openId !== null && openId !== item.id}
            onOpen={() => setHoveredId(item.id)}
            onClose={() => setHoveredId(null)}
            onToggle={() =>
              setPinnedId((current) => (current === item.id ? null : item.id))
            }
          />
        ))}
      </ul>
    </MotionConfig>
  );
}
