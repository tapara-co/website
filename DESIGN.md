```markdown
# The Design System: Editorial Commerce & NZ Roots

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Modern Artisan."** 

We are deliberately moving away from the "Fintech SaaS" aesthetic—characterized by loud blues, heavy drop shadows, and rounded geometric clutter. Instead, we embrace the soul of a high-end Wellington café: sophisticated, tactile, and intentionally quiet. The experience should feel like reading a premium magazine.

We achieve this through **Intentional Asymmetry** and **Negative Space as a Component.** By utilizing the stark contrast between the humanist elegance of *Playfair Display* and the functional precision of *DM Sans*, we create a rhythm that feels curated rather than generated.

---

## 2. Colors: The Power of Monochrome
This system operates on a strict monochromatic scale. Depth is not created through color, but through the sophisticated application of light and texture.

### The Palette
- **Primary Background (`surface`):** #FFFFFF — Pure, gallery-white space.
- **Primary Foreground (`primary`):** #0A0A0A — Deep obsidian for high-contrast legibility.
- **Secondary Surface (`surface-container-low`):** #F5F5F3 — A warm, "bone" off-white for subtle sectioning.
- **Muted Accents (`outline`):** #888888 — Used sparingly for non-critical metadata.

### The "No-Line" Rule
To maintain a premium editorial feel, **prohibit the use of 1px solid black borders for sectioning.** Large layout blocks must be defined by shifts in background tone (e.g., a `surface-container-low` section sitting against a `surface` background). Let the "edges" of the content be defined by the alignment of the typography, not a box.

### Signature Textures
Integrate the **Geometric Fern Tile** (4-6% opacity) only on large empty states or hero section backgrounds. This adds a "watermark" quality that feels like bespoke stationery. Use the **Koru Spiral Stroke** as a decorative element to guide the eye toward primary CTAs, treating it as a piece of art rather than a functional icon.

---

## 3. Typography: The Humanist & The Machine
The typographic pairing is the heartbeat of the brand. It juxtaposes the heritage of New Zealand with the efficiency of modern commerce.

| Level | Token | Font Family | Weight | Style / Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Playfair Display | Bold | Hero statements; high-end editorial impact. |
| **Headline** | `headline-md`| Playfair Display | Regular | Page titles and section introductions. |
| **Title** | `title-md` | DM Sans | Medium | Card titles and navigation headers. |
| **Body** | `body-lg` | DM Sans | Regular | Primary reading passages; high legibility. |
| **Label** | `label-md` | DM Sans | Medium | Buttons, chips, and small caps metadata. |

**Editorial Note:** Use "Display" sizes with tight letter-spacing (-2%) to create a locked-in, professional look. Increase line-height on body text to `1.6` to ensure the layout feels "breathable."

---

## 4. Elevation & Depth: Tonal Layering
We reject the standard Material Design shadow. Depth in this system is "Physical Paper Layering."

### The Layering Principle
Depth is achieved by stacking the surface tiers:
1.  **Level 0 (Base):** `surface` (#FFFFFF)
2.  **Level 1 (Sectioning):** `surface-container-low` (#F5F5F3)
3.  **Level 2 (Interaction):** `surface-container-lowest` (#FFFFFF) cards placed on top of Level 1.

### Ambient Shadows
When a card requires "lift" (e.g., a floating payment modal), use an **Ambient Shadow**:
- `box-shadow: 0 12px 40px rgba(10, 10, 10, 0.04);`
The shadow must feel like a soft glow of light blocked by thick cardstock, not a digital effect.

### Glassmorphism & Depth
For floating navigation bars or mobile overlays, use a **Frosted Surface**:
- **Background:** `rgba(255, 255, 255, 0.8)`
- **Backdrop-blur:** `12px`
This allows the geometric textures of the background to bleed through, maintaining a sense of place within the app.

---

## 5. Components

### Buttons
- **Primary:** Pill-shaped (`rounded-full`). Background: #0A0A0A. Text: #FFFFFF. No shadow.
- **Secondary:** Pill-shaped. Background: Transparent. Border: 1px #E0E0DC. Text: #0A0A0A.
- **Interaction:** On hover, the Secondary button should fill with `surface-container-low` rather than changing border color.

### Cards & Lists
- **The Divider Ban:** Do not use horizontal rules (`<hr>`) to separate list items. Use **Vertical White Space** (Spacing Scale `6` or `8`) or a subtle 4px margin with a background shift.
- **Card Style:** Minimalist. White fill, `outline-variant` (#E0E0DC) 1px border. The shadow is a whisper—2px blur, 4% opacity.

### Input Fields
- **Style:** Underline-only or subtle ghost-box. 
- **Focus State:** Transition the bottom border from `#E0E0DC` to `#0A0A0A` (Black). Do not use "glow" effects.
- **Typography:** Labels should use `label-sm` in DM Sans Medium, always in Uppercase with 0.05em tracking.

### Chips (Selection)
- Pill-shaped. Unselected: `surface-container-low` with no border. Selected: `primary` (Black) with white text.

---

## 6. Do's and Don'ts

### Do:
- **Use "Extreme" White Space:** If you think there is enough padding, add 20% more. Premium feels expensive because it isn't crowded.
- **Align to a Grid, then Break it:** Place a single decorative Koru stroke or a piece of Display text slightly off-center to create visual interest.
- **Monochrome Only:** Use weight and scale to show importance, never color.

### Don't:
- **No Gradients:** We rely on flat tones and transparency (Glassmorphism), never multi-color linear gradients.
- **No Heavy Borders:** 100% opaque black borders are too "harsh." Stick to the `#E0E0DC` or tonal shifts.
- **No Standard Icons:** Avoid "filled" icons. Use strictly 1.5pt stroke-weight outline icons to match the geometric nature of the wordmark.

### Accessibility Note:
While we use a muted palette, ensure all functional text (Body, Labels, Titles) maintains a 4.5:1 contrast ratio against its respective background. Decorative elements (Fern patterns) should remain below 10% opacity to ensure they do not interfere with OCR or readability.```