import { MinimalistHero, type HeroSocialLink } from "@/components/ui/minimalist-hero";
import { TrayectoriaSection } from "@/components/marketing/trayectoria/trayectoria-section";
import { TiendaSection } from "@/components/tienda/tienda-section";

const SOCIAL_LINKS: HeroSocialLink[] = [
  { label: "LinkedIn", icon: "linkedin", href: "#" },
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "Correo electrónico", icon: "email", href: "#contacto" },
];

export default function HomePage() {
  return (
    <>
      <MinimalistHero
        className="min-h-[calc(100svh-5rem)]"
        eyebrow="Secretario General de Acuerdos · TJAAQROO"
        mainText="Trayectoria en la justicia administrativa de Quintana Roo. Publicaciones, cursos y asesorías especializadas para la práctica jurídica."
        readMoreLink="/#trayectoria"
        readMoreLabel="Conocer la trayectoria"
        secondaryLink={{ href: "/tienda", label: "Visitar la tienda" }}
        imageSrc="/images/secretario.png"
        imageAlt="Retrato del Dr. Luis Eduardo Anica Rodríguez"
        overlayText={{ part1: "Luis Eduardo", part2: "Anica." }}
        socialLinks={SOCIAL_LINKS}
        locationText="Chetumal, Quintana Roo"
      />
      <TrayectoriaSection />
      <TiendaSection />
    </>
  );
}
