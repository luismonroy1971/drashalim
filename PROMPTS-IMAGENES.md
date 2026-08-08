# 🖼️ Prompts para generar las imágenes con Gemini

Este documento contiene los **prompts listos para pegar en Gemini** (Imagen), el
**nombre exacto** con el que debes guardar cada archivo y la **carpeta** donde va.

> 💡 Consejo: los generadores de imágenes responden mejor en **inglés**. Cada
> imagen trae el prompt en inglés (recomendado) y una versión en español por si
> prefieres. Pide siempre **formato realista, iluminación suave y colores
> aqua/teal** para mantener la identidad de la marca.

---

## 📁 Dónde se guardan

Todas las imágenes van en la carpeta:

```
C:\projects\shalim\assets\
```

| # | Archivo a guardar        | Reemplaza a          | Dónde aparece en la web            | Proporción |
|---|--------------------------|----------------------|------------------------------------|------------|
| 1 | `assets/smile.jpg`       | `assets/smile.svg`   | Hero (imagen principal) + galería  | Vertical 4:5 |
| 2 | `assets/doctor.jpg`      | `assets/doctor.svg`  | Sección "La Doctora" + galería     | Vertical 4:5 |
| 3 | `assets/clinic.jpg`      | `assets/clinic.svg`  | Galería (imagen grande)            | Horizontal 16:11 |

> Puedes exportarlas en `.jpg`, `.png` o `.webp`. Si usas otra extensión,
> recuerda actualizarla en `index.html` (ver sección **"Cómo conectarlas"** al final).

---

## 1️⃣ smile.jpg — Paciente con sonrisa radiante (Hero)

**Guardar como:** `assets/smile.jpg`
**Proporción:** vertical 4:5 (retrato)

**Prompt (inglés – recomendado):**
```
Professional portrait photograph of a happy Latin American woman in her late 20s
with a bright, perfect white smile, showing healthy teeth. Natural warm skin,
looking at the camera with confidence and joy. Soft studio lighting, shallow
depth of field. Background is a smooth gradient of aqua and teal tones (#98e6e2
to #0e9ca8). Clean, modern, premium dental clinic aesthetic. High detail,
photorealistic, 4:5 vertical portrait, no text, no watermark.
```

**Prompt (español):**
```
Retrato fotográfico profesional de una mujer latinoamericana de unos 28 años con
una sonrisa amplia, blanca y perfecta que muestra dientes sanos. Piel cálida y
natural, mirando a la cámara con confianza y alegría. Iluminación de estudio
suave, poca profundidad de campo. Fondo con degradado aqua y turquesa
(#98e6e2 a #0e9ca8). Estética limpia, moderna y premium de clínica dental.
Alto detalle, fotorrealista, formato vertical 4:5, sin texto, sin marca de agua.
```

---

## 2️⃣ doctor.jpg — Retrato de la Dra. Shalim Viza

**Guardar como:** `assets/doctor.jpg`
**Proporción:** vertical 4:5 (retrato)

**Prompt (inglés – recomendado):**
```
Professional portrait photograph of a confident female dentist in her 30s wearing
a clean white medical coat over teal scrubs, with a stethoscope. Warm, friendly
and trustworthy expression, arms relaxed. Modern dental clinic softly blurred in
the background with aqua and teal tones. Bright, soft natural lighting,
photorealistic, high detail, premium healthcare branding. 4:5 vertical portrait,
no text, no watermark.
```

**Prompt (español):**
```
Retrato fotográfico profesional de una odontóloga segura de unos 35 años, con
bata blanca médica limpia sobre uniforme (scrubs) turquesa y estetoscopio.
Expresión cálida, amable y confiable, brazos relajados. Consultorio dental
moderno desenfocado al fondo con tonos aqua y turquesa. Luz natural brillante y
suave, fotorrealista, alto detalle, imagen de salud premium. Formato vertical
4:5, sin texto, sin marca de agua.
```

> 📌 Nota: esta imagen representa a la doctora. Si tienes una **foto real de la
> Dra. Shalim Viza**, úsala directamente y guárdala como `assets/doctor.jpg`.

---

## 3️⃣ clinic.jpg — Consultorio odontológico moderno (Galería)

**Guardar como:** `assets/clinic.jpg`
**Proporción:** horizontal 16:11 (apaisada)

**Prompt (inglés – recomendado):**
```
Wide interior photograph of a modern, luxurious dental clinic treatment room.
A clean dental chair in the center, overhead dental lamp, intraoral scanner and
monitor, minimalist cabinets, a green potted plant and a large window with soft
daylight. Color palette dominated by white, aqua and teal (#0e9ca8). Spotless,
bright, calming, high-end and welcoming atmosphere. Photorealistic, high detail,
wide angle, no people, no text, no watermark.
```

**Prompt (español):**
```
Fotografía interior amplia de un consultorio dental moderno y lujoso. Un sillón
dental limpio al centro, lámpara odontológica cenital, escáner intraoral y
monitor, muebles minimalistas, una planta verde en maceta y un gran ventanal con
luz de día suave. Paleta de colores dominada por blanco, aqua y turquesa
(#0e9ca8). Ambiente impecable, luminoso, relajante, de alta gama y acogedor.
Fotorrealista, alto detalle, gran angular, sin personas, sin texto, sin marca de agua.
```

---

## 🔌 Cómo conectarlas a la web

Las ilustraciones actuales terminan en `.svg`. Cuando tengas tus fotos:

**Opción A (más simple):** guarda las fotos como `.svg`… no aplica a fotos.
Guárdalas como `.jpg` y edita **3 líneas** en `index.html` cambiando la extensión:

| Buscar en `index.html`            | Cambiar por                       |
|-----------------------------------|-----------------------------------|
| `assets/smile.svg`  (2 apariciones) | `assets/smile.jpg`              |
| `assets/doctor.svg` (2 apariciones) | `assets/doctor.jpg`             |
| `assets/clinic.svg` (1 aparición)   | `assets/clinic.jpg`             |

> Si me avisas cuando las tengas listas en la carpeta `assets/`, yo mismo hago
> esos cambios en el HTML por ti.

**Recomendaciones de tamaño y peso:**
- `smile.jpg` y `doctor.jpg`: mínimo **800 × 1000 px**
- `clinic.jpg`: mínimo **1200 × 825 px**
- Comprime a **≤ 300 KB** cada una (usa formato `.webp` o `.jpg` de calidad 80).
