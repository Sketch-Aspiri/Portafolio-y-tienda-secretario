import type { ComponentType } from "react";
import {
  BookOpen,
  CalendarCheck,
  MessagesSquare,
  MonitorPlay,
} from "lucide-react";

import type { CategoriaId } from "@/types/tienda";

type CategoriaIcon = ComponentType<{ className?: string }>;

/**
 * Los datos del catálogo se mantienen planos: nombran la categoría y aquí
 * se resuelve el icono que le corresponde en la vista.
 */
export const CATEGORIA_ICONS = {
  libros: BookOpen,
  cursos: MonitorPlay,
  comunidad: MessagesSquare,
  asesorias: CalendarCheck,
} as const satisfies Record<CategoriaId, CategoriaIcon>;
