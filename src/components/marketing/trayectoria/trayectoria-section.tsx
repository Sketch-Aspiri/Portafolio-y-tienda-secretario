import { TRAYECTORIA_PERFIL } from "@/content/trayectoria";
import { Reveal } from "@/components/ui/reveal";
import { DocenciaDifusion } from "./docencia";
import { ExperienciaProfesional } from "./experiencia";
import { FormacionAcademica } from "./formacion";
import { MateriasDock } from "./materias-dock";

function Introduccion() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
        Trayectoria
      </p>
      <h2
        id="trayectoria-titulo"
        className="mt-4 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl"
      >
        Una carrera entre la hacienda pública y la justicia administrativa
      </h2>
      <p className="mt-6 text-base leading-relaxed text-foreground/80">
        {TRAYECTORIA_PERFIL}
      </p>

      <div className="mt-10 w-full border-t border-primary/10 pt-8">
        <MateriasDock />
      </div>
    </div>
  );
}

export function TrayectoriaSection() {
  return (
    <section
      id="trayectoria"
      aria-labelledby="trayectoria-titulo"
      className="w-full scroll-mt-24 border-t border-primary/10 bg-background px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 md:gap-28">
        <Reveal>
          <Introduccion />
        </Reveal>
        <Reveal>
          <ExperienciaProfesional />
        </Reveal>
        <Reveal>
          <FormacionAcademica />
        </Reveal>
        <Reveal>
          <DocenciaDifusion />
        </Reveal>
      </div>
    </section>
  );
}
