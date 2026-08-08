import type { ComponentType } from "react";
import { Globe, Mail, Phone } from "lucide-react";

import { FacebookIcon, LinkedinIcon } from "@/components/ui/brand-icons";

/** Cualquier icono que acepte `className`: los de lucide-react o los de marca propios. */
export type SocialIcon = ComponentType<{ className?: string }>;

/**
 * Los iconos se referencian por nombre —no por componente— para poder
 * declararlos desde Server Components (las funciones no son serializables).
 */
export const SOCIAL_ICONS = {
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  email: Mail,
  telefono: Phone,
  sitio: Globe,
} as const satisfies Record<string, SocialIcon>;

export type SocialIconName = keyof typeof SOCIAL_ICONS;
