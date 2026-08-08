import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/** Serif de los encabezados: tradición y carácter institucional. */
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

/** Sans-serif del cuerpo, formularios y checkout. */
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Luis Eduardo Anica Rodríguez",
  description:
    "Portafolio institucional y tienda de recursos del Dr. Luis Eduardo Anica Rodríguez, Secretario General del TJAAQROO.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full antialiased font-sans",
        lora.variable,
        sourceSans.variable,
      )}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
