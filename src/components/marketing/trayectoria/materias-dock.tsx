import type { ComponentType } from "react";
import {
  ClipboardCheck,
  Handshake,
  Landmark,
  ReceiptText,
  Scale,
  ShieldCheck,
} from "lucide-react";

import { ESPECIALIDADES } from "@/content/trayectoria";
import type { MateriaIconName } from "@/types/trayectoria";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";

type MateriaIcon = ComponentType<{ className?: string }>;

const MATERIA_ICONS = {
  fiscal: ReceiptText,
  administrativo: Scale,
  hacienda: Landmark,
  fiscalizacion: ClipboardCheck,
  anticorrupcion: ShieldCheck,
  etica: Handshake,
} as const satisfies Record<MateriaIconName, MateriaIcon>;

/** Barra de materias de especialidad, con vidrio translúcido y aumento al pasar el puntero. */
export function MateriasDock() {
  return (
    <div className="w-full">
      <p className="text-center text-xs font-semibold tracking-[0.2em] text-primary/40 uppercase">
        Materias
      </p>

      <Dock className="mt-4" label="Materias de especialidad">
        {ESPECIALIDADES.map((materia) => {
          const Icon = MATERIA_ICONS[materia.icono];

          return (
            <DockItem
              key={materia.nombre}
              className="group aspect-square rounded-2xl border border-primary/10 bg-primary/[0.06] backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-accent/10"
            >
              <DockLabel>{materia.nombre}</DockLabel>
              <DockIcon>
                <Icon className="h-full w-full text-primary/50 transition-colors duration-300 group-hover:text-accent" />
              </DockIcon>
            </DockItem>
          );
        })}
      </Dock>
    </div>
  );
}
