"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { SOCIAL_ICONS, type SocialIconName } from "@/components/ui/social-icons";

const DELAY = {
  circle: 0.2,
  portrait: 0.4,
  intro: 0.8,
  title: 1,
  footer: 1.1,
} as const;

/** Anchos del disco por breakpoint; también alimentan el `sizes` de next/image. */
const PORTRAIT_SIZES =
  "(min-width: 1280px) 420px, (min-width: 1024px) 360px, (min-width: 768px) 300px, 280px";

export interface HeroSocialLink {
  /** Nombre accesible del enlace (se lee en lectores de pantalla). */
  label: string;
  icon: SocialIconName;
  href: string;
}

export interface MinimalistHeroProps {
  /** Bloque de presentación junto al retrato: texto, ficha o lo que toque. */
  intro?: ReactNode;
  /** Ruta de la fotografía del retrato. */
  imageSrc: string;
  imageAlt: string;
  /** Titular en dos líneas. */
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: HeroSocialLink[];
  locationText: string;
  className?: string;
}

function SocialIcon({ href, label, icon }: HeroSocialLink) {
  const Icon = SOCIAL_ICONS[icon];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-primary/60 transition-colors hover:text-accent focus-visible:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

export function MinimalistHero({
  intro,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) {
  return (
    <MotionConfig reducedMotion="user">
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-between overflow-hidden bg-background px-6 pt-10 pb-8 md:px-12",
          className
        )}
      >
        {/* Contenido principal */}
        {/* La columna central se ajusta al disco para que no invada al titular. */}
        <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto_1fr] md:gap-10 lg:gap-16">
          {/* Presentación */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: DELAY.intro }}
            className="z-20 order-3 flex h-full flex-col items-center justify-center text-center md:order-1 md:items-start md:text-left"
          >
            {intro}
          </motion.div>

          {/* Retrato enmarcado en el disco dorado */}
          <div className="relative order-1 flex h-full items-center justify-center md:order-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.8,
                ease: EASE_OUT_EXPO,
                delay: DELAY.circle,
              }}
              className="relative aspect-square w-[280px] overflow-hidden rounded-full bg-accent/90 md:w-[300px] lg:w-[360px] xl:w-[420px]"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: EASE_OUT_EXPO,
                  delay: DELAY.portrait,
                }}
                className="absolute inset-0"
              >
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes={PORTRAIT_SIZES}
                  priority
                  /* `scale-90` sube el borde inferior un 5%; el desplazamiento
                     lo compensa para que el retrato llegue al filo del disco. */
                  className="translate-y-[7%] scale-90 object-contain object-bottom"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Titular */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: DELAY.title }}
            className="z-20 order-2 flex items-center justify-center text-center md:order-3 md:justify-start md:text-left"
          >
            <h1 className="font-heading text-5xl leading-[0.95] font-bold tracking-tight text-balance text-primary sm:text-6xl md:text-4xl lg:text-5xl xl:text-7xl">
              {overlayText.part1}
              <br />
              <span className="text-accent">{overlayText.part2}</span>
            </h1>
          </motion.div>
        </div>

        {/* Pie del hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: DELAY.footer }}
          className="z-30 mt-12 -mx-6 self-stretch border-t border-primary/10 px-6 md:-mx-12 md:px-12"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-between">
            <div className="flex items-center space-x-5">
              {socialLinks.map((link) => (
                <SocialIcon key={link.label} {...link} />
              ))}
            </div>
            <p className="text-sm font-medium text-foreground/70">
              {locationText}
            </p>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
