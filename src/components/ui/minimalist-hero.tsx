"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { SOCIAL_ICONS, type SocialIconName } from "@/components/ui/social-icons";

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const DELAY = {
  circle: 0.2,
  portrait: 0.4,
  intro: 0.8,
  title: 1,
  footer: 1.1,
} as const;

/** Anchos del disco por breakpoint; también alimentan el `sizes` de next/image. */
const PORTRAIT_SIZES = "(min-width: 1024px) 420px, (min-width: 768px) 340px, 280px";

export interface HeroSocialLink {
  /** Nombre accesible del enlace (se lee en lectores de pantalla). */
  label: string;
  icon: SocialIconName;
  href: string;
}

export interface MinimalistHeroProps {
  /** Texto breve sobre el párrafo introductorio (cargo, institución). */
  eyebrow?: string;
  mainText: string;
  readMoreLink: string;
  readMoreLabel?: string;
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
  eyebrow,
  mainText,
  readMoreLink,
  readMoreLabel = "Conocer más",
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
        <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center gap-12 md:grid-cols-3 md:gap-6">
          {/* Texto introductorio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: DELAY.intro }}
            className="z-20 order-3 text-center md:order-1 md:text-left"
          >
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                {eyebrow}
              </p>
            ) : null}
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">
              {mainText}
            </p>
            <Link
              href={readMoreLink}
              className="mt-5 inline-block text-sm font-semibold text-primary underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
            >
              {readMoreLabel}
            </Link>
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
              className="relative aspect-square w-[280px] overflow-hidden rounded-full bg-accent/90 md:w-[340px] lg:w-[420px]"
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
                  className="translate-y-[4%] scale-90 object-contain object-bottom"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Titular */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: DELAY.title }}
            className="z-20 order-2 flex items-center justify-center text-center md:order-3 md:justify-start md:text-left lg:-ml-10"
          >
            <h1 className="font-heading text-5xl leading-[0.95] font-bold tracking-tight text-primary sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl">
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
          className="z-30 mt-12 flex w-full max-w-7xl flex-col items-center gap-4 border-t border-primary/10 pt-6 sm:flex-row sm:justify-between"
        >
          <div className="flex items-center space-x-5">
            {socialLinks.map((link) => (
              <SocialIcon key={link.label} {...link} />
            ))}
          </div>
          <p className="text-sm font-medium text-foreground/70">{locationText}</p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
