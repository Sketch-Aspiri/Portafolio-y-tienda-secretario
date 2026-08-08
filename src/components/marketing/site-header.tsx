"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: "INICIO", href: "/" },
  { label: "TRAYECTORIA", href: "/trayectoria" },
  { label: "TIENDA", href: "/tienda" },
  { label: "BLOG", href: "/blog" },
  { label: "CONTACTO", href: "/contacto" },
] as const;

const LINK_CLASSES =
  "text-sm font-medium tracking-widest text-primary/60 transition-colors hover:text-accent focus-visible:text-accent";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-40 w-full bg-background">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          onClick={closeMenu}
          className="font-heading text-lg font-bold tracking-wide text-primary transition-colors hover:text-accent"
        >
          Dr. Luis E. Anica
        </Link>

        <nav aria-label="Navegación principal" className="hidden items-center space-x-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} className={LINK_CLASSES}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="menu-movil"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          className="text-primary transition-colors hover:text-accent md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      <nav
        id="menu-movil"
        aria-label="Navegación principal (móvil)"
        className={cn(
          "absolute inset-x-0 top-20 border-b border-primary/10 bg-background px-6 pb-6 shadow-sm md:hidden",
          isMenuOpen ? "flex flex-col gap-4" : "hidden"
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={closeMenu}
            className={LINK_CLASSES}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
