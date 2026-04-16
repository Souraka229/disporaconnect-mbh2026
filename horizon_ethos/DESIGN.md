```markdown
# Design System Specification: Editorial Precision

## 1. Overview & Creative North Star
**The Creative North Star: "The Architectural Ledger"**

This design system is not a standard fintech kit; it is a high-end editorial framework designed for the global citizen. It rejects the cluttered "dashboard" aesthetic in favor of **Architectural Ledgering**—a style that prioritizes massive negative space, intentional asymmetry, and a rigorous commitment to tonal depth.

Inspired by the precision of Wise and the boldness of Moniepoint, this system breaks the "template" look by treating every screen as a balanced composition. We move beyond generic grids by using "breathing room" as a functional element, allowing the typography to command attention and the surfaces to guide the user’s eye without the need for structural clutter.

---

## 2. Color Theory & Tonal Architecture
The palette is built on a foundation of "Deep Navy" stability and "Global Orange" energy. 

### The "No-Line" Rule
**Borders are a failure of hierarchy.** Within this design system, 1px solid borders for sectioning are strictly prohibited. Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `background` provides all the definition a user needs.

### Surface Hierarchy & Nesting
Instead of a flat grid, treat the UI as a series of physical layers. Use the surface-container tiers to create "nested" depth:
- **Surface (Base):** The canvas.
- **Surface-Container-Low:** For secondary content blocks.
- **Surface-Container-Lowest:** For primary cards or focal points.

### The "Glass & Gradient" Nuance
While the style is "minimal," we avoid "flat." 
- **Signature Textures:** Use subtle, barely-perceptible gradients on main CTAs (e.g., transitioning from `secondary` #9D4300 to `secondary_container` #FD761A) to provide a "lit from within" feel.
- **Glassmorphism:** For floating modals or navigation bars, use `surface` colors with a 70% opacity and a `24px` backdrop-blur. This ensures the UI feels integrated into the environment rather than "pasted on."

---

## 3. Typography: Editorial Authority
We utilize a dual-font strategy to balance character with utility.

| Level | Token | Font | Size | Weight | Intent |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Manrope | 3.5rem | 700 | Large hero numbers/stats. |
| **Headline** | `headline-md` | Manrope | 1.75rem | 600 | Page titles & section starts. |
| **Title** | `title-md` | Inter | 1.125rem | 500 | Card headings & subtitles. |
| **Body** | `body-lg` | Inter | 1.0rem | 400 | Standard reading text. |
| **Label** | `label-md` | Inter | 0.75rem | 600 | Captions, tags, & small UI hints. |

**The Hierarchy Rule:** Headings (`Manrope`) should be high-contrast against the background. Use `on_primary_fixed` (#101C2E) for primary headings to ensure an authoritative, ink-on-paper feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too heavy for this system. We convey hierarchy through **Tonal Layering**.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. This creates a soft, natural lift.
- **Ambient Shadows:** If a floating effect is mandatory (e.g., a Bottom Sheet), use a "Shadow-Light": `Y: 8px, Blur: 24px, Color: rgba(10, 22, 40, 0.04)`. Note the tint—the shadow uses a navy base, not grey.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components: Minimalist Primitives

### Buttons (The Pill)
All buttons use `rounded-full` (9999px) for a modern, friendly touch.
- **Primary:** `secondary` background, `on_secondary` text.
- **Secondary:** `surface-container-high` background, `on_surface` text.
- **Interactions:** On hover, shift the background color to the next tier (e.g., Primary moves to `on_secondary_container`).

### Cards & Lists
- **Border Radius:** Fixed at `1rem` (16px) for all primary cards.
- **No Dividers:** Forbid the use of divider lines in lists. Use `16px` of vertical white space or a subtle shift to `surface-container-low` for alternating rows.

### Input Fields
Inputs should be "Soft-Sharp." Use `surface-container-highest` for the background with no border. Upon focus, add a `2px` "Ghost Border" using the `secondary` (Orange) color at 40% opacity.

### Global Transfer Chip
A unique component for this system: A large, `2rem` rounded chip displaying currency conversion, using `surface_container_highest` to house the data, ensuring the most important fintech info is "framed" but not "boxed."

---

## 6. Do's and Don'ts

### Do
- **Use "Aggressive" White Space:** If you think a section needs more space, double it.
- **Center-Align Editorial Content:** Use asymmetrical layouts for landing pages, but keep functional data (dashboards) strictly aligned to the left.
- **Use Tonal Backgrounds:** Use `surface_variant` to distinguish between global navigation and the main workspace.

### Don't
- **Don't use #000000:** Always use the deep navy `on_primary_fixed` (#101C2E) for "black" text. It feels more expensive.
- **Don't use Box Shadows on Cards:** Rely on background color shifts (`surface-container` tiers).
- **Don't use Icons-only Buttons:** Always accompany icons with `label-sm` text unless the icon is universally understood (e.g., a "back" arrow).

---

## Director's Final Note
Design is not about what you add, but what you have the courage to leave out. This system thrives on the tension between the deep navy stability and the vibrant orange energy. Keep the surfaces clean, the type bold, and the borders non-existent.```