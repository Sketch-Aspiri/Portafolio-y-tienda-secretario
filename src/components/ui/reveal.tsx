"use client";

import type { ReactNode } from "react";
import { MotionConfig, motion } from "framer-motion";

import { EASE_OUT_EXPO } from "@/lib/motion";

export interface RevealProps {
  children: ReactNode;
  /** Retraso en segundos antes de iniciar la animación. */
  delay?: number;
  className?: string;
}

/**
 * Aparición sutil al entrar en el viewport, una sola vez.
 * Recibe contenido ya renderizado en el servidor, así que no lo envía al cliente.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO, delay }}
        className={className}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}
