# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Familiares y amigos que organizan un intercambio navideño en México. Abren la app desde el teléfono, casi siempre por un enlace compartido en WhatsApp, y no son usuarios técnicos. El organizador (quien crea el grupo) es la persona con más responsabilidad: invita, revisa quién falta y comparte el código.

## Product Purpose

Permitir que un grupo de familia o amigos organice su intercambio de regalos: crear el intercambio, sumar participantes, acordar fecha y presupuesto, y que cada persona publique la lista de lo que le gustaría recibir. El éxito es que el organizador logre tener a todos dentro con su lista completa antes del intercambio, sin depender de hojas de cálculo ni cadenas de mensajes.

## Positioning

La lista de deseos vive dentro del intercambio, no en un documento aparte: cada grupo tiene sus propios participantes y su propia lista, y cada regalo guarda enlace, imagen, precio aproximado y prioridad. No es un marketplace ni una tienda; no hay pagos ni compras.

## Operating Context

- Se usa en el teléfono, en sesiones cortas, en español de México.
- La invitación viaja por WhatsApp como un código corto (`BOTA-XXXX`).
- El intercambio tiene fecha y presupuesto opcionales que el organizador activa.
- Cada participante tiene un perfil con datos útiles para regalar: color y comida favoritos, tallas, pasatiempos y notas.
- Las imágenes de perfil y de regalo se suben a Cloudinary; los enlaces de producto se usan para obtener la imagen automáticamente.
- No hay recuperación de contraseña: si se pierde, el organizador no puede restaurarla.

## Capabilities and Constraints

Confirmado:

- Cuenta ligera por perfil: nombre + contraseña. La contraseña protege la edición del perfil y de la lista.
- Grupos de intercambio con nombre, código de invitación, fecha, presupuesto y comentarios opcionales.
- Participantes por grupo; el creador es propietario y participante.
- Lista de deseos por persona y por intercambio (un mismo regalo no se comparte entre grupos).
- Alta, edición y borrado de regalos con imagen, enlace, descripción, precio, categoría y prioridad.

Restricciones técnicas:

- Next.js 16 (App Router, React 19), Tailwind CSS 4, Prisma 7 sobre PostgreSQL (Neon), Cloudinary para imágenes.
- Diseño móvil primero, con adaptación a escritorio.
- Sin integraciones de pago ni notificaciones push en esta etapa.

Decisiones abiertas:

- Recuperación de contraseña.
- Sorteo automático de "a quién le regalas" (el producto hoy no asigna parejas).

## Brand Commitments

- Nombre del producto: Bota de Navidad. Tono cercano, familiar, mexicano, sin infantilizar.
- Paleta fijada por el cliente: crema `#FAF7F2`, rojo bota `#C62E3A`, verde pino `#1F5C4A`, menta de fondo `#E3EEE9`.
- Español de México en toda la interfaz.

## Evidence on Hand

- Mockups móviles en `design/`: inicio vacío, nuevo grupo, configuración del intercambio, grupo con participantes y lista de regalos personal.
- Base de datos real con 13 perfiles existentes y sin regalos (respaldos previos en `backups/`).

## Product Principles

1. El organizador nunca se queda a medias: cada paso dice qué falta y cómo continuar.
2. La lista se llena en segundos: pegar un enlace debe bastar para tener nombre, imagen y precio.
3. Lo privado se protege: la contraseña cubre la edición del perfil y de la lista.
4. Una pantalla, una decisión: acciones primarias rojas, el resto en silencio.
5. Nada de jerga técnica ni pasos que necesiten explicación.

## Accessibility & Inclusion

- Contraste AA en texto y controles; objetivos táctiles de 44 px como mínimo.
- Soporte de teclado y foco visible en todos los controles.
- Respeto a `prefers-reduced-motion` para nieve y transiciones.
