# Portafolio de Roberto González

Portafolio web personal de Roberto González, estudiante de Ingeniería en Informática
de la Universidad Católica de Temuco. La página presenta su perfil, información de
contacto y una selección de proyectos frontend.

## URL para ingresar

### GitHub Pages

**https://rgonzalez2026-ui.github.io/portafolio/**

Esta es la URL pública esperada al publicar el repositorio `portafolio` con
GitHub Pages desde la rama configurada para el sitio.

### Ejecución local

1. Abrir una terminal dentro de esta carpeta (`proyecto de frontend`).
2. Iniciar un servidor web local:

   ```bash
   python -m http.server 5500
   ```

3. Ingresar desde el navegador a:

   **http://localhost:5500**

La página principal es [`index.html`](./index.html). Si GitHub Pages todavía no
está habilitado en el repositorio, se puede activar desde **Settings → Pages**,
seleccionando la rama de publicación. La URL quedará disponible en el dominio
anterior una vez completado el despliegue.

## Contenido de la página

Todos los proyectos están reunidos en la sección **Proyectos destacados** de la
página principal. Desde allí se puede acceder a cada propuesta sin buscar archivos
manualmente:

| Proyecto | Descripción | Acceso |
| --- | --- | --- |
| Mi portafolio | Página personal con presentación, proyectos y formulario de contacto. | Sección `#inicio` de [`index.html`](./index.html) |
| Nova | Boceto interactivo para organizar ideas y visualizar el progreso de proyectos. | [`proyecto 2/boceto 1.html`](./proyecto%202/boceto%201.html) |
| Prestige Legal | Landing page para una asesoría legal, con una estética editorial y profesional. | [`proyecto 3-legal page/prestige_legal_perfil_profesional_espa_ol/code.html`](./proyecto%203-legal%20page/prestige_legal_perfil_profesional_espa_ol/code.html) |
| Promar | Catálogo web de insumos para sushi con productos destacados y carrito interactivo. | [`proyecto 4/index.html`](./proyecto%204/index.html) |

La página principal funciona como punto de entrada único: presenta los cuatro
proyectos en tarjetas, explica brevemente cada uno y enlaza a su demostración.

## Tecnologías utilizadas

- HTML5 semántico.
- CSS3, incluyendo diseño responsive, variables CSS, grid y flexbox.
- JavaScript para las interacciones de Nova y Promar.
- Google Fonts para las tipografías de las propuestas.
- Tailwind CSS mediante CDN en Prestige Legal.

## Uso de inteligencia artificial

Se utilizó inteligencia artificial como apoyo durante el desarrollo y
refinamiento de [`styles.css`](./styles.css), principalmente para:

- Proponer una estructura visual para el portafolio.
- Explorar combinaciones de colores, tipografías, espaciados y tarjetas.
- Mejorar la adaptación responsive para pantallas pequeñas.
- Revisar la organización del CSS y la accesibilidad visual.

La decisión final sobre el contenido, la selección de proyectos, la identidad
visual y la integración de los archivos corresponde al autor del portafolio.

## Estructura principal

```text
proyecto de frontend/
├── index.html
├── styles.css
├── foto-presentacion.jpeg
├── proyecto 2/
│   ├── boceto 1.html
│   ├── boceto 1.css
│   └── boceto 1.js
├── proyecto 3-legal page/
│   └── prestige_legal_perfil_profesional_espa_ol/
│       └── code.html
└── proyecto 4/
    ├── index.html
    ├── styles.css
    └── script.js
```

## Contacto

- Correo: [r.goonzlez@gmail.com](mailto:r.goonzlez@gmail.com)
- Teléfono: [+56 9 72725235](tel:+56972725235)
