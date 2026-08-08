@AGENTS.md

# PÁGINA WEB DR. LUIS EDUARDO ANICA RODRÍGUEZ

## ¿QUÉ ES?
Página web personal para el Secretario General del TJAAQROO, el Dr. Luis Eduardo Anica Rodríguez. Cumple 2 funciones principales:
1. **Portafolio personal** — trayectoria profesional e institucional.
2. **Tienda en línea** — productos y servicios digitales/profesionales que vende el doctor.

## PRODUCTOS Y SERVICIOS
- Libros y manuales en `.pdf`
- Videos y cursos
- Suscripción a una comunidad de WhatsApp
- Asesorías, evaluaciones y servicios de consultoría

> Catálogo aún no definido a detalle — la estructura de datos debe permitir agregar/editar productos sin tocar código (vía panel de administración, ver abajo).

---

## LÓGICA DE NEGOCIO

### 1. Pagos
- Procesador: **Stripe**.
- Checkout como invitado (no requiere cuenta obligatoria).
- Debe soportar tanto pagos únicos (libros, videos, cursos, asesorías) como, a futuro, posibles suscripciones recurrentes (ej. comunidad de WhatsApp si se vuelve mensual).

### 2. Entrega y acceso a contenido digital (PDFs, videos, cursos)
- **Compra como invitado:** tras el pago, se envía por correo el acceso/enlace de descarga (no obliga a crear cuenta).
- **Cuenta opcional:** si el usuario crea cuenta (antes o después de comprar), obtiene acceso a una **biblioteca personal** ("Mis compras") donde ve todo su historial y contenido comprado.
- Los archivos (PDFs/videos) no deben ser públicamente accesibles por URL directa — servir mediante enlaces firmados/temporales o rutas protegidas verificando la compra (por correo o sesión).
- Autenticación y almacenamiento de archivos vía Supabase (Auth + Storage).

### 3. Comunidad de WhatsApp
- Tras confirmar el pago, el sistema genera/entrega automáticamente un **enlace de invitación** al grupo o canal de WhatsApp (mostrado en la pantalla de confirmación y enviado por correo).
- No requiere intervención manual del doctor o su equipo para dar el acceso inicial.
- Dejar el link de invitación como un valor configurable desde el panel de administración (por si el grupo cambia o se llena y hay que rotar de grupo/canal).

### 4. Asesorías, evaluaciones y consultoría
- Se construye un **sistema de citas propio** dentro de la app (no depende de Calendly/Cal.com externos):
  - El doctor/equipo define disponibilidad (días, horarios, duración de sesión) desde el panel de administración.
  - El cliente ve horarios disponibles, agenda y paga (Stripe) en el mismo flujo.
  - Confirmación por correo al cliente y notificación al doctor/equipo.
  - Debe soportar cancelación/reprogramación básica.

### 5. Cuentas de usuario
- **Cuenta opcional**, no obligatoria para comprar ni para agendar asesorías.
- Beneficio de crear cuenta: biblioteca de contenido comprado + historial de asesorías/citas en un solo lugar.
- Autenticación vía Supabase Auth (correo/contraseña como mínimo; considerar magic link para simplificar UX).

### 6. Panel de administración
- Dashboard privado (protegido, solo para el doctor/su equipo) para:
  - Crear/editar/eliminar productos (libros, videos, cursos) y sus precios.
  - Subir archivos digitales (PDFs, videos o enlaces a video hosting externo).
  - Configurar el enlace de invitación de WhatsApp vigente.
  - Definir disponibilidad de asesorías y ver/gestionar citas agendadas.
  - Ver historial de ventas/pagos (vía Stripe + registro propio en la BD).
- Acceso restringido por rol (`admin`) en Supabase — no exponer esta ruta a usuarios normales.

---

## ¿CÓMO SE VA A REALIZAR?

- **Framework:** Next.js (App Router)
- **Base de datos:** Supabase (Postgres + Auth + Storage)
- **Pagos:** Stripe (Checkout + Webhooks para confirmar compras y desbloquear contenido/citas)
- **Estilos:** Tailwind CSS
- **Despliegue:** Vercel
- Libertad para ajustar el resto del entorno (librerías de UI, validación, emails transaccionales, etc.) según se necesite al construir.

### Piezas técnicas clave a resolver durante el desarrollo
- Envío de correos transaccionales (confirmación de compra, biblioteca, citas) — ej. Resend o similar.
- Webhooks de Stripe para: desbloquear contenido digital, generar el link de WhatsApp, confirmar citas de asesoría.
- Reglas de acceso a archivos (Supabase Storage con URLs firmadas / Row Level Security).

---

## IDENTIDAD DE MARCA (PROPUESTA)

Perfil objetivo: figura institucional/judicial — debe transmitir **autoridad, confianza, tradición y seriedad**, sin perder cercanía ni verse anticuado, ya que también es una tienda con checkout moderno.

### Paleta de colores
| Uso | Color | Hex (referencia) |
|---|---|---|
| Primario (autoridad, institucional) | Azul marino profundo | `#0F1F3D` |
| Acento (prestigio, tradición jurídica) | Dorado / bronce | `#C0972E` |
| Secundario sutil (identidad regional, Quintana Roo/Caribe) | Verde esmeralda oscuro | `#1B4332` (uso mínimo, detalles) |
| Texto principal | Grafito | `#22242A` |
| Fondo | Blanco hueso | `#FAFAF8` |

### Tipografía
- **Encabezados:** una serif con carácter institucional (ej. *Lora* o *Playfair Display*) — transmite tradición y seriedad.
- **Cuerpo de texto / UI:** una sans-serif limpia y muy legible (ej. *Inter* o *Source Sans 3*) — para formularios, tienda y checkout.

### Tono visual
- Diseño limpio, espaciado generoso, poco ruido visual.
- El dorado se usa como acento (botones clave, íconos, detalles), nunca como color dominante.
- Fotografía/imagen institucional cuidada (evitar clip-art o ilustraciones genéricas).

> Esta paleta y tipografía son un punto de partida — ajustable si el doctor ya tiene lineamientos institucionales del TJAAQROO que deban respetarse.

---

## PORTAFOLIO — SECCIONES

**Pendiente de definir por el usuario.** Se agregará el detalle de secciones (biografía, trayectoria, publicaciones, prensa, línea de tiempo, contacto, etc.) en una siguiente actualización de este archivo antes de construir esa parte del sitio.

---

## ESTRUCTURA DEL PROYECTO

```
src/
  app/
    (marketing)/        # Portafolio público del doctor (home, biografía, trayectoria, etc.)
    tienda/              # Catálogo de productos y páginas de producto
    checkout/            # Flujo de compra (invitado + Stripe)
    citas/               # Sistema de agendado de asesorías
    cuenta/              # Área de usuario ("Mis compras", historial de citas)
    admin/               # Panel de administración (protegido, rol admin)
    api/
      stripe/webhook/    # Webhook de Stripe
      ...
  components/
    ui/                  # Componentes base reutilizables (botones, cards, forms)
    marketing/           # Componentes específicos del portafolio
    tienda/              # Componentes específicos de la tienda
  lib/
    supabase/            # Clientes de Supabase (browser, server, admin)
    stripe/              # Cliente de Stripe y helpers
    email/                # Envío de correos transaccionales
  types/                 # Tipos compartidos (productos, pedidos, citas, etc.)
```

## ROADMAP SUGERIDO (MVP)

1. Setup del proyecto (Next.js + Tailwind + Supabase + Vercel) y estructura base. ✅
2. Identidad visual aplicada (tema Tailwind, tipografías, componentes base). ✅
   > Pendiente al retomar: primitivas de UI transaccional (`Button`, `Input`/formularios)
   > — se definirán junto al checkout (paso 4) y al agendado (paso 7).
3. Portafolio (pendiente de contenido detallado del usuario).
4. Catálogo de productos + checkout con Stripe (flujo de compra como invitado).
5. Entrega de contenido digital (correo + biblioteca opcional con cuenta).
6. Automatización del link de WhatsApp tras el pago.
7. Sistema de citas para asesorías (disponibilidad + agendado + pago).
8. Panel de administración (productos, WhatsApp, disponibilidad, ventas).
