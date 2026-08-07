export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="font-sans text-sm tracking-widest text-accent uppercase">
        Bienvenido 
      </p>
      <h1 className="font-heading text-4xl font-semibold text-primary sm:text-5xl">
        Dr. Luis Eduardo Anica Rodríguez
      </h1>
      <p className="max-w-xl font-sans text-base text-foreground/80">
        Portafolio institucional y recursos profesionales — próximamente.
      </p>
    </main>
  );
}
