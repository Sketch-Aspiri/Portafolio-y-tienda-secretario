import { GraduationCap, Landmark, MapPin, Scale, Tag } from "lucide-react";

import { ESPECIALIDADES } from "@/content/trayectoria";
import {
  ProfileCard,
  ProfileCardChip,
  type ProfileCardRow,
} from "@/components/ui/profile-card";

/** Cuántas especialidades caben en la ficha sin saturarla. */
const MAX_MATERIAS = 3;

const ICON_SIZE = 16;

const MATERIAS = ESPECIALIDADES.slice(0, MAX_MATERIAS);

const FILAS: readonly ProfileCardRow[] = [
  {
    icon: <Scale size={ICON_SIZE} />,
    label: "Cargo",
    value: "Secretario General de Acuerdos",
  },
  {
    icon: <Landmark size={ICON_SIZE} />,
    label: "Institución",
    value: "TJAAQROO",
  },
  {
    icon: <MapPin size={ICON_SIZE} />,
    label: "Sede",
    value: "Chetumal, Quintana Roo",
  },
  {
    icon: <GraduationCap size={ICON_SIZE} />,
    label: "Formación",
    value: "Doctor en Ciencias de lo Fiscal",
  },
  {
    icon: <Tag size={ICON_SIZE} />,
    label: "Materias",
    value: (
      <div className="flex flex-wrap justify-end gap-1.5">
        {MATERIAS.map((materia) => (
          <ProfileCardChip key={materia.nombre}>
            {materia.nombre}
          </ProfileCardChip>
        ))}
      </div>
    ),
  },
];

interface PerfilCardProps {
  className?: string;
}

/**
 * Ficha del doctor en el hero: sustituye al párrafo introductorio con los
 * datos duros —cargo, institución, sede, formación y materias—, desplegables
 * desde la cabecera.
 */
export function PerfilCard({ className }: PerfilCardProps) {
  return (
    <ProfileCard
      className={className}
      name="Dr. Luis E. Anica"
      subtitle="TJAAQROO"
      rows={FILAS}
      defaultOpen
    />
  );
}
