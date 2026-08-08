import { DIPLOMADOS, FORMACION } from "@/content/trayectoria";
import { HoverExpand, type HoverExpandItem } from "@/components/ui/hover-expand";
import { BloqueTitulo } from "@/components/ui/bloque-titulo";

/** Niveles de mayor a menor, y los diplomados al final como bloque aparte. */
const NIVELES: HoverExpandItem[] = [
  ...FORMACION.map((nivel) => ({
    id: nivel.nivel,
    label: nivel.nivel,
    sublabel: `${nivel.grados.length} ${nivel.grados.length === 1 ? "grado" : "grados"}`,
    entries: nivel.grados.map((grado) => ({
      primary: grado.titulo,
      secondary: grado.institucion,
      tag: grado.estado === "candidato" ? "Candidato" : undefined,
    })),
  })),
  {
    id: "diplomados",
    label: "Diplomados de especialización",
    sublabel: `${DIPLOMADOS.length} programas`,
    entries: DIPLOMADOS.map((diplomado) => ({
      primary: diplomado.nombre,
      secondary: diplomado.institucion,
    })),
  },
];

export function FormacionAcademica() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
      <BloqueTitulo
        align="center"
        titulo="Formación académica"
        descripcion="Cuatro programas de doctorado, tres maestrías y dos especialidades enfocadas en materia fiscal, hacendaria y anticorrupción."
      />

      <HoverExpand className="mt-12" items={NIVELES} />
    </div>
  );
}
