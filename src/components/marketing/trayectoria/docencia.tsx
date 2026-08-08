import { DOCENCIA } from "@/content/trayectoria";
import { HoverExpand, type HoverExpandItem } from "@/components/ui/hover-expand";
import { BloqueTitulo } from "./bloque-titulo";

const BLOQUES: HoverExpandItem[] = [
  {
    id: "catedra",
    label: "Cátedra universitaria",
    sublabel: `${DOCENCIA.instituciones.length} instituciones`,
    entries: DOCENCIA.instituciones.map((institucion) => ({
      primary: institucion,
    })),
  },
  {
    id: "cursos",
    label: "Cursos, conferencias y talleres",
    sublabel: `${DOCENCIA.temas.length} materias`,
    description:
      "Capacitación impartida a servidores públicos y profesionales del derecho.",
    entries: DOCENCIA.temas.map((tema) => ({ primary: tema })),
  },
];

export function DocenciaDifusion() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
      <BloqueTitulo
        align="center"
        titulo="Docencia y difusión"
        descripcion="La cátedra y la capacitación son el origen de los cursos, publicaciones y asesorías que ofrece en este sitio."
      />

      <HoverExpand className="mt-12" items={BLOQUES} />
    </div>
  );
}
