"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Tarjeta que se despliega a una vista ampliada, de Watermelon UI
 * (`registry.watermelon.sh/r/expandable-profile-card.json`).
 *
 * Ajustes respecto del original, todos necesarios para este sitio:
 * - La portada es un `button` y la vista ampliada un diálogo con `Escape`,
 *   bloqueo del scroll y devolución del foco. El original abría con un `div`
 *   sin acceso por teclado.
 * - La vista ampliada se monta en un portal, para que `position: fixed` no
 *   dependa de que ningún ancestro tenga `transform`.
 * - `next/image` en lugar de `img`, y panel institucional cuando no hay foto.
 * - Paleta del sitio y exportación con nombre.
 */

/** Mismo panel de respaldo que usan las filas de trayectoria. */
const PLACEHOLDER_BACKGROUND =
  "bg-[radial-gradient(125%_125%_at_12%_0%,#1d3a6d_0%,#0f1f3d_52%,#0a1428_100%)]";

export interface ExpandableProfileCardProps {
  /** Identificador estable que empareja la portada con la vista ampliada. */
  id: string;
  title: string;
  /** Categoría breve sobre el título. */
  subtitle?: string;
  /** Sin imagen se pinta el panel institucional. */
  imageSrc?: string;
  /** Esquina inferior de la portada; aquí, el precio. */
  badge?: React.ReactNode;
  /** Contenido de la vista ampliada. */
  children: React.ReactNode;
  className?: string;
}

export function ExpandableProfileCard({
  id,
  title,
  subtitle,
  imageSrc,
  badge,
  children,
  className,
}: ExpandableProfileCardProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  /**
   * El portal se crea en cuanto se abre por primera vez y ya no se destruye,
   * para que `AnimatePresence` conserve la animación de salida. Solo puede
   * pasar tras un clic, así que a esas alturas el documento ya existe.
   */
  const [hasOpened, setHasOpened] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);

  const layoutId = `expandable-profile-card-${id}`;
  const tituloId = `${layoutId}-titulo`;

  /** Al cerrar, el foco vuelve a la tarjeta que abrió la vista ampliada. */
  const close = React.useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close]);

  const open = () => {
    setHasOpened(true);
    setIsOpen(true);
  };

  const portada = (
    <motion.button
      ref={triggerRef}
      type="button"
      layoutId={layoutId}
      onClick={open}
      aria-expanded={isOpen}
      whileHover="hover"
      className={cn(
        "group relative block h-64 w-full cursor-pointer overflow-hidden rounded-2xl border border-primary/10 text-left shadow-sm focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      <Fondo layoutId={layoutId} imageSrc={imageSrc} />

      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 transition-transform duration-300 group-hover:-translate-y-1">
        {subtitle ? (
          <motion.span
            layoutId={`subtitle-${layoutId}`}
            className="text-[11px] font-semibold tracking-[0.15em] text-accent uppercase"
          >
            {subtitle}
          </motion.span>
        ) : null}

        <motion.span
          layoutId={`title-${layoutId}`}
          className="block font-heading text-xl font-bold tracking-tight text-white"
        >
          {title}
        </motion.span>

        {badge ? (
          <span className="mt-2 text-sm font-semibold text-white/80">
            {badge}
          </span>
        ) : null}
      </div>
    </motion.button>
  );

  const ampliada = (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />

          <motion.div
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={tituloId}
            className="relative z-10 flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-xl md:flex-row"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-primary/40 text-white backdrop-blur-sm transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none md:border-primary/15 md:bg-background/70 md:text-primary"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-full md:w-1/2">
              <Fondo layoutId={layoutId} imageSrc={imageSrc} />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent md:hidden" />
            </div>

            <div className="flex h-full w-full flex-col overflow-y-auto p-6 sm:p-8 md:w-1/2">
              {subtitle ? (
                <motion.span
                  layoutId={`subtitle-${layoutId}`}
                  className="text-[11px] font-semibold tracking-[0.15em] text-accent uppercase"
                >
                  {subtitle}
                </motion.span>
              ) : null}

              <motion.h3
                id={tituloId}
                layoutId={`title-${layoutId}`}
                className="mt-3 border-b border-primary/10 pb-4 font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl"
              >
                {title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ delay: 0.2 }}
                className="mt-6 grow text-sm leading-relaxed text-foreground/80"
              >
                {children}
              </motion.div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <>
      {portada}
      {hasOpened ? createPortal(ampliada, document.body) : null}
    </>
  );
}

interface FondoProps {
  layoutId: string;
  imageSrc?: string;
}

/** Imagen compartida entre portada y vista ampliada, o panel institucional. */
function Fondo({ layoutId, imageSrc }: FondoProps) {
  return (
    <motion.div
      layoutId={`image-${layoutId}`}
      aria-hidden="true"
      className="absolute inset-0"
      variants={{ hover: { scale: 1.05 } }}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(min-width: 768px) 32rem, 100vw"
          className="object-cover"
        />
      ) : (
        <div className={cn("h-full w-full", PLACEHOLDER_BACKGROUND)} />
      )}
    </motion.div>
  );
}
