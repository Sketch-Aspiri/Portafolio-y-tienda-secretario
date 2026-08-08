"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CardSwipeProps {
  /** Una tarjeta por hijo; el carrusel no decide su contenido. */
  children: React.ReactNode;
  /** Nombre del carrusel para lectores de pantalla. */
  label: string;
  className?: string;
}

/** Margen para decidir qué tarjeta encabeza la vista pese al redondeo del scroll. */
const TOLERANCIA_SNAP = 8;

/**
 * Carrusel de tarjetas que se arrastra con el dedo.
 *
 * Usa scroll con anclaje nativo en vez de arrastre simulado: así conserva la
 * inercia del sistema en táctil, el desplazamiento con trackpad y el recorrido
 * con teclado, y los botones y puntos quedan como alternativa accesible.
 */
export function CardSwipe({ children, label, className }: CardSwipeProps) {
  const trackRef = React.useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  /**
   * Los extremos se leen del scroll real, no del índice: con varias tarjetas
   * a la vista el recorrido se agota antes de que la última encabece la fila,
   * y un botón que ya no puede avanzar tiene que apagarse.
   */
  const [recorrido, setRecorrido] = React.useState({
    alInicio: true,
    alFinal: false,
    haySobrante: true,
  });

  const cards = React.Children.toArray(children);
  const total = cards.length;

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const items = Array.from(track.children) as HTMLElement[];
      const maxScroll = track.scrollWidth - track.clientWidth;
      const alFinal = track.scrollLeft >= maxScroll - TOLERANCIA_SNAP;

      setRecorrido({
        alInicio: track.scrollLeft <= TOLERANCIA_SNAP,
        alFinal,
        haySobrante: maxScroll > TOLERANCIA_SNAP,
      });

      if (alFinal) {
        setActiveIndex(items.length - 1);
        return;
      }

      const leading = items.findIndex(
        (item) => item.offsetLeft >= track.scrollLeft - TOLERANCIA_SNAP,
      );
      setActiveIndex(leading === -1 ? items.length - 1 : leading);
    };

    // El scroll dispara muy seguido: se agrupa en un solo cuadro de animación.
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    // Al cambiar de punto de quiebre cambia cuántas tarjetas caben.
    const observer = new ResizeObserver(onScroll);

    track.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(track);
    update();

    return () => {
      track.removeEventListener("scroll", onScroll);
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [total]);

  /** Sin `behavior` explícito manda el CSS, que respeta "reducir movimiento". */
  const goTo = (index: number) => {
    const track = trackRef.current;
    const item = track?.children[index] as HTMLElement | undefined;
    if (!track || !item) return;

    track.scrollTo({ left: item.offsetLeft });
  };

  /**
   * Las flechas avanzan a la siguiente tarjeta que aún no alcanza el borde,
   * no a `índice ± 1`: con varias tarjetas a la vista el recorrido se agota
   * antes que la lista, y un destino inalcanzable el navegador lo recorta
   * al máximo, dejando el botón sin efecto.
   */
  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children) as HTMLElement[];
    const target =
      direction === 1
        ? items.find((item) => item.offsetLeft > track.scrollLeft + TOLERANCIA_SNAP)
        : items
            .filter((item) => item.offsetLeft < track.scrollLeft - TOLERANCIA_SNAP)
            .at(-1);

    if (target) track.scrollTo({ left: target.offsetLeft });
  };

  const hasControls = total > 1 && recorrido.haySobrante;

  return (
    <div
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      className={cn("w-full", className)}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        className="relative flex snap-x snap-mandatory items-stretch gap-6 overflow-x-auto scroll-smooth pb-2 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card, index) => (
          <li
            key={index}
            aria-label={`${index + 1} de ${total}`}
            className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[30%]"
          >
            {card}
          </li>
        ))}
      </ul>

      {hasControls ? (
        <div className="mt-8 flex items-center justify-center gap-6">
          <SwipeButton
            label="Tarjeta anterior"
            disabled={recorrido.alInicio}
            onClick={() => step(-1)}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </SwipeButton>

          <ul className="flex items-center gap-2">
            {cards.map((_, index) => (
              <li key={index}>
                <button
                  type="button"
                  aria-label={`Ir a la tarjeta ${index + 1}`}
                  aria-current={index === activeIndex}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none",
                    index === activeIndex
                      ? "w-6 bg-accent"
                      : "w-1.5 bg-primary/20 hover:bg-primary/40",
                  )}
                />
              </li>
            ))}
          </ul>

          <SwipeButton
            label="Tarjeta siguiente"
            disabled={recorrido.alFinal}
            onClick={() => step(1)}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </SwipeButton>
        </div>
      ) : null}
    </div>
  );
}

interface SwipeButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function SwipeButton({ label, disabled, onClick, children }: SwipeButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
