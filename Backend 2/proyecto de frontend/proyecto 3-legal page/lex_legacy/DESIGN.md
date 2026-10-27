---
name: Lex & Legacy
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#45464d'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#6f5c31'
  on-secondary: '#ffffff'
  secondary-container: '#fae0a9'
  on-secondary-container: '#756237'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1c19'
  on-tertiary-container: '#858480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#fae0a9'
  secondary-fixed-dim: '#ddc490'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#56451c'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Work Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is engineered to evoke a sense of heritage, absolute authority, and modern legal precision. Targeting a high-net-worth clientele and corporate entities, the UI must feel like a digital extension of a prestigious law office—quiet, confident, and meticulously organized.

The aesthetic follows a **Modern Minimalist** approach with subtle **Corporate** influences. It prioritizes clarity and intentionality, using generous whitespace to allow complex legal information to breathe. The emotional response is one of calm reliability; every interaction should feel deliberate and secure. The design avoids trendy flourishes in favor of timeless elegance, ensuring the firm’s digital presence remains as enduring as its reputation.

## Colors

The palette is rooted in tradition but executed with modern depth. 
- **Primary (Midnight Navy):** Used for primary navigation, headings, and high-impact backgrounds to establish immediate authority.
- **Secondary (Old Gold):** Used sparingly as a signature accent for highlights, primary call-to-action buttons, and subtle divider details to signify premium service.
- **Tertiary (Ivory Cream):** Provides a warm, sophisticated alternative to pure white for page backgrounds, reducing eye strain and adding a sense of luxury.
- **Neutral (Slate Gray):** Utilized for body text and secondary interface elements to maintain a professional, balanced contrast.

## Typography

The typography strategy employs a classic serif/sans-serif pairing to balance character with readability.
- **Headlines:** Playfair Display is used for all major headings. Its high-contrast strokes and elegant terminals reflect a storied, traditional legal aesthetic.
- **Body & UI:** Work Sans is selected for its grounded and professional qualities. Its neutral architecture ensures that even long-form legal disclosures remain highly legible.
- **Formatting:** Use generous line heights (1.6x) for body text to improve scanning. All labels should utilize uppercase styling with slight letter spacing to differentiate them from prose.

## Layout & Spacing

This design system utilizes a **Fixed Grid** model for desktop to maintain a controlled, editorial feel, transitioning to a fluid model for mobile devices.

- **Desktop:** A 12-column grid with a 1200px max-width. Content is centered with substantial outer margins to create a "framed" appearance.
- **Tablet:** 8-column grid with 32px margins.
- **Mobile:** 4-column grid with 16px margins. 
- **Rhythm:** All spacing (padding, margins, component heights) must be multiples of the 8px base unit. Vertical rhythm is critical; section headers should be preceded by at least 80px of whitespace to signify a transition in subject matter.

## Elevation & Depth

To maintain a minimalist and authoritative aesthetic, the design system avoids heavy shadows. Depth is achieved through **Tonal Layers** and **Low-Contrast Outlines**.

- **Surface Levels:** The base background is Ivory Cream. Primary containers (cards, modals) use white or a very light Slate tint to step forward.
- **Borders:** Use thin (1px) borders in a muted Slate or Gold to define boundaries. 
- **Shadows:** When necessary for functional depth (e.g., dropdowns or active modals), use a single, highly diffused "Ambient Shadow" with 4% opacity and no color tint, ensuring the element feels like it is resting softly on the page rather than floating.

## Shapes

The shape language is strictly **Sharp**. In the context of a high-end law firm, 0px border radii convey precision, stability, and a "no-nonsense" professional attitude. 

All buttons, input fields, and containers must feature crisp 90-degree corners. Any use of circles is restricted strictly to icon backgrounds or user avatars to provide a singular point of visual relief without compromising the structural integrity of the layout.

## Components

### Buttons
- **Primary:** Solid Midnight Navy with White or Gold text. Sharp corners, no shadow. 
- **Secondary:** Transparent background with a 1px Midnight Navy or Gold border.
- **Interaction:** Hover states should involve a subtle background color shift (e.g., Navy to a slightly lighter Slate) rather than a lift effect.

### Input Fields
- Underline style or fully enclosed sharp boxes.
- Focus state is indicated by a 2px Gold bottom border or a subtle Slate fill.
- Labels sit above the field in uppercase Work Sans (Label-md).

### Cards & Containers
- Used for practice areas or attorney profiles.
- No shadows; use 1px Slate-200 borders or a slight tonal shift in background color to differentiate from the main surface.

### Lists
- Legal documents and bulleted lists should use Gold-colored square markers instead of standard discs to maintain brand alignment.

### Specialized Components
- **Attorney Profiles:** Use high-contrast photography with sharp-edged frames.
- **Quote Blocks:** Large Playfair Display italic text with a Gold vertical accent bar on the left.