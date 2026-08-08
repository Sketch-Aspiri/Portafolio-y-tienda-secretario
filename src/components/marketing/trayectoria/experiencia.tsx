import { EXPERIENCIA } from "@/content/trayectoria";
import { HoverExpand, type HoverExpandItem } from "@/components/ui/hover-expand";
import { BloqueTitulo } from "./bloque-titulo";

const AMBITOS: HoverExpandItem[] = EXPERIENCIA.map((area) => ({
  id: area.area,
  label: area.area,
  sublabel: area.ambito,
  description: area.descripcion,
  image: area.imagen,
  entries: area.cargos.map((cargo) => ({
    primary: cargo.puesto,
    secondary: cargo.institucion,
  })),
}));

export function ExperienciaProfesional() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
      <BloqueTitulo
        align="center"
        titulo="Experiencia profesional"
        descripcion="Cargos directivos y de mando en los ámbitos federal, estatal y municipal, y en el sector privado. Cada bloque abre el detalle de los puestos."
      />

      <HoverExpand className="mt-12" items={AMBITOS} />
    </div>
  );
}
