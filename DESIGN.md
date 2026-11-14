---
name: Bota de Navidad
description: Intercambio navideño y listas de deseos para familia y amigos, en una columna de app cálida y nevada.
colors:
  bota: "#C62E3A"
  bota-deep: "#A3202B"
  pine: "#1F5C4A"
  pine-deep: "#113A2E"
  pine-soft: "#2B6B57"
  pine-glow: "#1B4A3B"
  pine-night: "#0D2B22"
  mint: "#E3EEE9"
  cream: "#FAF7F2"
  sage: "#83C3B0"
  sage-soft: "#9DC3B4"
  sage-hover: "#8FCBB9"
  sage-focus: "#9BD2C1"
  field-ink: "#10312A"
  placeholder: "#2C584C"
  sand: "#B8B1A4"
  gold: "#F2C144"
  ink: "#17241F"
  white: "#FFFFFF"
typography:
  display:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  display-sm:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  headline-sm:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1.2
  heading:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 600
    lineHeight: 1.2
  subhead:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.25
  lead:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.08rem"
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.5
  small:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 500
    lineHeight: 1.4
  caption:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 500
    lineHeight: 1.35
  micro:
    fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  xs: "6px"
  sm: "10px"
  md: "14px"
  lg: "18px"
  xl: "28px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "28px"
  4xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.bota}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.pine}"
    textColor: "{colors.cream}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  button-on-dark:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.pine}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  input:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "48px"
  card:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.pine}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Bota de Navidad

## Overview

**Creative North Star: "El Pueblo Nevado"**

Bota de Navidad se siente como una tarjeta de Nochebuena que cobra vida: un pueblito de tejados nevados al pie de cada pantalla, un regalo con listón dorado y una paleta de pino, crema y rojo que ya huele a ponche. La interfaz es móvil primero, cálida y directa, sin adornos que compitan con la tarea: crear el intercambio, sumar a la familia y llenar la lista de deseos.

El mundo visual vive en una columna angosta de app sobre un fondo verde profundo, incluso en escritorio. Esa decisión mantiene la intimidad del teléfono y evita que el producto se convierta en un panel corporativo. La nieve no cae: se queda quieta en la silueta del pueblo y en los puntos suaves del cielo, como una escena de ventana.

La voz visual es mexicana y familiar sin ser infantil. Los bordes son generosos, los botones son píldoras rojas, las tarjetas son de papel crema y los campos son de salvia. Nada de vidrio esmerilado, nada de degradados morados, nada de iconos emoji: el regalo y el pueblo están dibujados a mano en SVG.

**Key Characteristics:**
- Columna de app de 430 px centrada sobre un degradado de pino profundo.
- Fondo menta en las pantallas, tarjetas crema, cabeceras verdes y acciones rojas.
- Poppins geométrica en cuatro pesos, con titulares de tracking apretado.
- Formas suaves: píldoras para acciones, esquinas de 14–18 px en campos y tarjetas.
- Escena de pueblo nevado y regalo dorado como firma gráfica, nunca como decoración ruidosa.

## Colors

La paleta es invernal y comestible: verdes de bosque, crema de repostería, menta de invernadero y un rojo de flor de Nochebuena que se reserva para lo importante.

### Primary
- **Rojo Bota** (#C62E3A): acción principal y única. Botones de guardar, entrar, agregar regalo, prioridad alta y el acento del regalo. Su escasez es lo que lo hace fuerte.
- **Rojo Bota Profundo** (#A3202B): estado hover y cifras de error; nunca como fondo de bloques grandes.

### Secondary
- **Pino de Medianoche** (#1F5C4A): estructura y navegación. Cabeceras, botones secundarios, textos de marca, iconos y enlaces.
- **Pino Abeto** (#113A2E): fondo exterior de la app, silueta del pueblo, extremo oscuro de los degradados.
- **Pino Suave** (#2B6B57): luz superior de las cabeceras y matices de profundidad.

### Tertiary
- **Oro de Listón** (#F2C144): el moño del regalo, la prioridad media y el badge de organizador. Es un acento ceremonial, no un color de acción.

### Neutral
- **Menta de Invierno** (#E3EEE9): fondo de todas las pantallas y de los estados vacíos suaves.
- **Crema de Mazapán** (#FAF7F2): tarjetas, texto sobre pino y superficies que deben sentirse de papel.
- **Salvia de Invernadero** (#83C3B0): relleno de campos, buscadores y selectores; su tono medio mantiene legible la tinta.
- **Arena de Trineo** (#B8B1A4): toggles apagados, placeholders discretos y datos ocultos.
- **Tinta de Carbón** (#17241F): texto principal sobre crema y menta.
- **Blanco Nieve** (#FFFFFF): solo para la imagen de regalo sin foto y detalles de brillo.

### Supporting Tones
Estos tonos existen porque los estados reales los necesitan; no son colores nuevos de marca.
- **Pino Resplandor** (#1B4A3B) y **Pino Noche** (#0D2B22): los dos radiales del fondo exterior de la app, arriba y abajo de la columna.
- **Salvia Suave** (#9DC3B4): riel y pulgar de la barra de desplazamiento.
- **Salvia Hover** (#8FCBB9) y **Salvia Focus** (#9BD2C1): estados del campo de formulario.
- **Tinta de Campo** (#10312A): texto escrito dentro de un campo de salvia.
- **Tinta de Placeholder** (#2C584C): placeholder legible sobre salvia; nunca más claro que esto.

### Named Rules
**La Regla del Rojo Escaso.** El rojo Bota aparece en una sola acción primaria por pantalla. Si hay dos rojos compitiendo, uno está mal.

**La Regla del Papel Crema.** Las tarjetas son crema; el fondo de página es menta. No se invierten ni se mezclan en la misma jerarquía.

## Typography

**Display Font:** Poppins (con ui-sans-serif, system-ui, sans-serif)
**Body Font:** Poppins (misma familia; los pesos hacen la jerarquía)
**Label Font:** Poppins Medium/SemiBold con tracking abierto

**Character:** Geométrica, redonda y amable. Los titulares respiran con tracking negativo; las etiquetas se separan con mayúsculas pequeñas y tracking amplio para parecer impresas.

### Hierarchy
La escala es cerrada: doce pasos, sin tamaños inventados entre ellos. Si un texto no cabe, se acorta el texto o se baja un paso completo.

| Paso | Tamaño | Uso |
| --- | --- | --- |
| Display | 2 rem / 600 | Nombre del producto en la portada. |
| Display SM | 1.85 rem / 600 | Título del estado vacío. |
| Headline | 1.7 rem / 600 | Título de la cabecera verde; tracking −0.01 em. |
| Headline SM | 1.6 rem / 600 | Título de formulario y de pantalla interna. |
| Heading | 1.45 rem / 600 | Pregunta que abre un paso del flujo. |
| Subhead | 1.35 rem / 600 | Nombre del perfil o del intercambio en su ficha. |
| Lead | 1.08 rem / 500 | Entradilla y texto destacado de una tarjeta. |
| Body | 1 rem / 400 | Párrafos; ancho máximo de 30–34 caracteres en textos centrados. |
| Body SM | 0.9 rem / 400 | Ayudas, descripciones de regalo y textos de apoyo. |
| Small | 0.84 rem / 500 | Enlaces de acción, subtítulos de lista y botones pequeños. |
| Caption | 0.78 rem / 500 | Metadatos, fechas, contadores y códigos. |
| Micro | 0.68 rem / 600 | Badges en mayúsculas con tracking 0.06 em. |

### Named Rules
**La Regla del Titular Corto.** Un titular no compite con su propio subtítulo: si necesita más de dos líneas en 390 px, se acorta el texto, no la tipografía.

## Layout

El layout es una columna de app de `max-width: 430px`, centrada y con `min-height: 100dvh`. En móvil ocupa todo el ancho; en escritorio se queda como una tarjeta vertical sobre el degradado de pino, con bordes laterales sutiles y sombra profunda. El contenido respira con 20 px de margen lateral y secciones separadas por 24–32 px.

Las acciones primarias viajan en un dock fijo al pie, alineado con la columna, con degradado menta para no cortar el contenido. Las pantallas reservan 7 rem de espacio inferior para que nada quede debajo del dock. Las cabeceras verdes son bloques de 28 px de radio que ocupan el ancho completo del contenido, nunca el ancho del viewport.

La retícula interna es de una sola columna; solo los formularios cortos usan dos o tres columnas (color/comida, tallas). Las listas son tarjetas apiladas con 10–12 px de separación, no tablas.

## Elevation & Depth

La profundidad es ambiental, no estructural. El mundo base es plano: menta y crema se distinguen por color, no por sombra. Las sombras aparecen solo en superficies que flotan de verdad sobre el fondo (cabecera verde, tarjetas, dock) y son amplias, difusas y de bajo contraste, teñidas de pino en lugar de negro puro.

### Shadow Vocabulary
- **Sombra de tarjeta** (`0 1px 2px rgba(17,58,46,0.04), 0 8px 24px -12px rgba(17,58,46,0.18)`): tarjetas de lista, formularios y estados vacíos.
- **Sombra de pino** (`0 10px 30px -12px rgba(17,58,46,0.45)`): cabeceras verdes y el bloque de bienvenida del wishlist.
- **Sombra de acción** (`0 6px 18px -8px rgba(198,46,58,0.75)`): solo el botón primario rojo.
- **Sombra de marco** (`0 0 0 1px rgba(250,247,242,0.04), 0 40px 80px -40px rgba(0,0,0,0.6)`): solo la columna de app en escritorio, para separarla del pino del fondo.

### Named Rules
**La Regla de la Nieve en Reposo.** Ninguna superficie se mueve ni brilla sin una razón de estado. El hover levanta 0.5 px como máximo; el resto del tiempo, todo está quieto.

## Shapes

El lenguaje de formas es suave y táctil. Las acciones son píldoras completas (999 px); las tarjetas y campos usan esquinas de 14–18 px; las cabeceras verdes llegan a 28 px. No hay esquinas rectas en elementos interactivos. Los bordes son de 1 px y casi siempre translúcidos: delinean sin dibujar cajas duras.

Los iconos son de trazo (Lucide) con 1.7–2.2 px de grosor, y los dos gráficos de marca —el regalo y el pueblo— son SVG dibujados a mano con curvas y solapes, no siluetas geométricas rígidas.

## Components

### Buttons
- **Shape:** píldora completa (999 px), altura 48 px (36 px en `sm`, 52 px en `lg`).
- **Primary:** fondo Rojo Bota, texto crema, sombra de acción; una sola por pantalla.
- **Hover / Focus:** hover a Rojo Bota Profundo; foco con anillo pino de 2 px y offset 2 px sobre menta. `active` baja 1 px.
- **Secondary:** fondo Pino de Medianoche, texto crema; para acciones de apoyo como «Nuevo grupo» o «Añadir».
- **On-dark:** borde y velo crema al 6–15 % sobre cabeceras verdes; el botón «Nuevo grupo» del inicio vacío.
- **Ghost / Soft:** sin fondo o con pino al 8–10 %, texto pino; nunca para la acción principal.

### Chips
- **Style:** fondo pino al 10 % o menta, texto pino, radio píldora, 0.68–0.76 rem, peso 600.
- **State:** prioridad Alta en rojo al 10 %, Media en oro al 25 %, Baja en salvia al 30 %. Categorías en pino al 10 %. No son botones salvo en el selector de categoría, donde el activo se invierte a pino sólido con texto crema.

### Cards / Containers
- **Corner Style:** 18 px (28 px en cabeceras verdes).
- **Background:** Crema de Mazapán sobre Menta de Invierno.
- **Shadow Strategy:** sombra de tarjeta; las cabeceras verdes usan sombra de pino.
- **Border:** 1 px translúcido o ninguno; el borde crema al 10 % delimita las cabeceras.
- **Internal Padding:** 16–20 px; las filas de lista usan 14–16 px.

### Inputs / Fields
- **Style:** fondo Salvia, sin borde en reposo, radio 14 px, altura 48 px, texto Tinta con peso 500.
- **Focus:** fondo salvia más claro, borde pino y halo de 3 px al 16 %.
- **Error / Disabled:** el error se comunica con un bloque rojo al 10 % y texto rojo profundo, no cambiando el borde del campo. Los campos deshabilitados bajan a 45 % de opacidad.

### Navigation
- **Style:** barra superior con avatar de 36 px, eyebrow en mayúsculas (contexto: «Intercambio», «Tus intercambios») y nombre en pino. A la derecha, ajustes y salir como iconos sueltos.
- **States:** los enlaces de retorno son texto pino con chevron; hover con fondo pino al 10 %. No hay barra de pestañas inferior: la navegación es jerárquica y el dock solo lleva la acción de la pantalla.

### Signature Components
- **Cabecera verde (pine-header):** bloque de 28 px con degradado radial y lineal de pino, texto centrado, título grande, subtítulo y, en la pantalla de grupo, el código de invitación como píldora copiable.
- **Dock de acción:** barra fija de 430 px con degradado menta, botón píldora a ancho completo y `safe-area-inset-bottom`.
- **Regalo de marca:** caja roja con listón y moño dorado, dibujada en SVG; se usa en login, estado vacío y banners. Nunca se sustituye por un emoji.
- **Pueblo nevado:** silueta de casas, iglesia y pinos en Pino Abeto con puntos de nieve crema al 38 %; cierra las pantallas de bienvenida y no aporta información.

## Do's and Don'ts

### Do:
- **Do** mantener una sola acción roja por pantalla y dejar el resto en pino, ghost o soft.
- **Do** usar la columna de 430 px también en escritorio; el fondo de pino es el marco, no el lienzo.
- **Do** reservar 7 rem de espacio inferior cuando haya dock fijo.
- **Do** escribir en español de México, cercano y sin jerga; los textos de ayuda van en 0.78–0.84 rem.
- **Do** usar Poppins con tracking negativo en titulares y tracking abierto en etiquetas.
- **Do** mantener objetivos táctiles de al menos 44 px y foco visible en todos los controles.
- **Do** respetar `prefers-reduced-motion`: la nieve y las entradas se apagan.

### Don't:
- **Don't** usar el rojo Bota como fondo de bloques grandes, badges de información o decoración.
- **Don't** invertir la jerarquía de superficies: el fondo nunca es crema si las tarjetas también lo son.
- **Don't** introducir morados, azules fríos, vidrio esmerilado ni degradados ajenos a la paleta.
- **Don't** usar emojis como iconos ni imágenes de stock para el regalo o el pueblo.
- **Don't** poner dos botones sólidos del mismo peso visual lado a lado; uno debe ceder.
- **Don't** añadir barra de pestañas inferior ni menús hamburguesa: la navegación ya es clara con retorno y contexto.
