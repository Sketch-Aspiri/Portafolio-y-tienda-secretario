"use client";

import * as React from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from "framer-motion";

import { cn } from "@/lib/utils";

const DEFAULT_PANEL_HEIGHT = 64;
const DEFAULT_MAGNIFICATION = 84;
const DEFAULT_DISTANCE = 150;
const RESTING_ITEM_WIDTH = 44;
const DEFAULT_SPRING: SpringOptions = { mass: 0.1, stiffness: 150, damping: 12 };

interface DockContextValue {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  magnification: number;
  distance: number;
}

const DockContext = React.createContext<DockContextValue | null>(null);

function useDock(): DockContextValue {
  const context = React.useContext(DockContext);
  if (!context) {
    throw new Error("Los elementos del dock deben renderizarse dentro de <Dock>.");
  }
  return context;
}

interface DockItemContextValue {
  width: MotionValue<number>;
  isHovered: MotionValue<number>;
}

const DockItemContext = React.createContext<DockItemContextValue | null>(null);

function useDockItem(): DockItemContextValue {
  const context = React.useContext(DockItemContext);
  if (!context) {
    throw new Error("DockIcon y DockLabel deben renderizarse dentro de <DockItem>.");
  }
  return context;
}

export interface DockProps {
  children: React.ReactNode;
  /** Nombre accesible de la lista que forma el dock. */
  label: string;
  className?: string;
  /** Distancia en píxeles a la que el puntero empieza a agrandar un elemento. */
  distance?: number;
  /** Alto en reposo de la barra. */
  panelHeight?: number;
  /** Ancho máximo de un elemento bajo el puntero. */
  magnification?: number;
  spring?: SpringOptions;
}

export function Dock({
  children,
  label,
  className,
  spring = DEFAULT_SPRING,
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
}: DockProps) {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const isHovered = useMotionValue(0);

  // Deja aire arriba para que el elemento agrandado no se recorte.
  const maxHeight = Math.max(panelHeight, magnification + magnification / 2);
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        style={{ height, scrollbarWidth: "none" }}
        className="flex max-w-full items-end overflow-x-auto"
      >
        <motion.ul
          // clientX, no pageX: se compara contra getBoundingClientRect().
          onMouseMove={({ clientX }) => {
            isHovered.set(1);
            mouseX.set(clientX);
          }}
          onMouseLeave={() => {
            isHovered.set(0);
            mouseX.set(Number.POSITIVE_INFINITY);
          }}
          style={{ height: panelHeight }}
          aria-label={label}
          className={cn("mx-auto flex w-fit items-end gap-3 px-2", className)}
        >
          <DockContext.Provider
            value={{ mouseX, spring, distance, magnification }}
          >
            {children}
          </DockContext.Provider>
        </motion.ul>
      </motion.div>
    </MotionConfig>
  );
}

export interface DockItemProps {
  children: React.ReactNode;
  className?: string;
}

export function DockItem({ children, className }: DockItemProps) {
  const ref = React.useRef<HTMLLIElement>(null);
  const { distance, magnification, mouseX, spring } = useDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Number.POSITIVE_INFINITY;
    return value - rect.x - rect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [RESTING_ITEM_WIDTH, magnification, RESTING_ITEM_WIDTH],
  );
  const width = useSpring(widthTransform, spring);

  return (
    <motion.li
      ref={ref}
      style={{ width }}
      tabIndex={0}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={cn(
        "relative inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      <DockItemContext.Provider value={{ width, isHovered }}>
        {children}
      </DockItemContext.Provider>
    </motion.li>
  );
}

export interface DockLabelProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Rótulo del elemento. El texto queda siempre en el árbol de accesibilidad;
 * la burbuja visible es decorativa y solo aparece con el puntero o el foco.
 */
export function DockLabel({ children, className }: DockLabelProps) {
  const { isHovered } = useDockItem();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? -12 : -4,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{ x: "-50%" }}
        className={cn(
          "pointer-events-none absolute -top-7 left-1/2 w-fit rounded-full border border-primary/10 bg-background/80 px-2.5 py-1 text-xs font-medium whitespace-pre text-primary shadow-sm backdrop-blur-md",
          className,
        )}
      >
        {children}
      </motion.span>
    </>
  );
}

export interface DockIconProps {
  children: React.ReactNode;
  className?: string;
}

export function DockIcon({ children, className }: DockIconProps) {
  const { width } = useDockItem();
  const iconWidth = useTransform(width, (value) => value / 2);

  return (
    <motion.span
      aria-hidden="true"
      style={{ width: iconWidth }}
      className={cn("flex items-center justify-center", className)}
    >
      {children}
    </motion.span>
  );
}
