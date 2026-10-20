---
name: awesome-design-md
description: "Curated collection of 84+ production DESIGN.md design system specifications extracted from top tech companies (Stripe, Apple, Vercel, Linear, Figma, Airbnb, Tesla, Raycast, Supabase, etc.). Use whenever designing, building, or restyling UI to match or draw inspiration from iconic brands, colors, typography scales, spacing, shadows, and interactive patterns."
risk: safe
source: "VoltAgent/awesome-design-md"
---

# Awesome DESIGN.md Skill

This skill provides direct access to 84+ curated, real-world **DESIGN.md** specifications from industry-leading companies, developer tools, AI platforms, luxury brands, and consumer applications.

## How to Use This Skill

1. **Identify the Desired Brand or Aesthetic**:
   Browse the directory `.agents/skills/awesome-design-md/design-md/<brand>/DESIGN.md`.
2. **Inspect the DESIGN.md File**:
   Use `view_file` to read the specific `DESIGN.md` of interest (e.g., [stripe/DESIGN.md](file:///d:/vscode/VISTARA/.agents/skills/awesome-design-md/design-md/stripe/DESIGN.md) or [apple/DESIGN.md](file:///d:/vscode/VISTARA/.agents/skills/awesome-design-md/design-md/apple/DESIGN.md)).
3. **Extract & Implement Design Tokens**:
   - **Color Palette**: Exact hex codes, CSS variables, and functional roles (primary, surface, border, accent).
   - **Typography**: Font family, weight scales, letter-spacing, and line-height.
   - **Component Styles**: Button radii, card shadows, borders, transitions, and hover states.
   - **Atmosphere & Layout**: Spacing rules, density, gradient meshes, dark/light mode characteristics.
4. **Apply to Code**:
   Translate tokens into CSS variables, Tailwind classes, or Jetpack Compose theme attributes.

---

## Catalog of 84 Brand Design Systems

### 1. Developer Tools & Infrastructure
- **vercel**: Minimalist monochrome, crisp hair lines, deep blacks, Geist typography.
- **linear.app**: High-density keyboard-first UX, subtle borders, muted dark surfaces.
- **raycast**: Mac-native dark mode, vibrant command accents, tight pill badges.
- **supabase**: Emerald-on-dark palette, developer database aesthetic, sleek tab bars.
- **posthog**: Playful retro-tech hedgehog aesthetics, bold borders, warm neutrals.
- **clickhouse**: Blazing fast data telemetry aesthetic, high contrast grids.
- **mongodb**: Leaf green accents on graphite slate, enterprise developer clarity.
- **sentry**: Crimson bug-tracker accents, structured data layouts, high legibility.
- **hashicorp**: Geometric architectural discipline, enterprise cloud typography.
- **warp**: Terminal modernization, glowing cursor accents, dense command surfaces.

### 2. Fintech & Commerce
- **stripe**: Deep navy ink, electric indigo, atmospheric gradient mesh, thin Sohne type.
- **revolut**: Ultra-clean neo-banking, vibrant financial gradients, rounded pill cards.
- **wise**: Bold high-contrast green, international accessibility, clean sans-serif.
- **coinbase**: Clear crypto trust blue, clean white canvas, tabular numeric cards.
- **binance**: Gold-and-dark trading charts, dense numeric metrics, high-information layout.
- **mercury**: Polished banking for startups, sophisticated typography, calm palettes.
- **shopify**: Merchant-first clarity, accessible green actions, structured commerce grids.

### 3. AI & Creative Platforms
- **claude**: Warm parchment and terracotta, literary editorial elegance, human-centric calm.
- **cursor**: AI-first code editor aesthetic, subtle glows, hyper-focused productivity.
- **figma**: Creative canvas freedom, multi-player cursor colors, floating toolbars.
- **framer**: Motion-driven interactivity, spring physics visual cues, sleek dark UI.
- **replicate**: Terminal-meets-cloud AI, monospaced model specs, rapid execution UI.
- **runwayml**: High-end cinematic video AI, moody dark tones, studio-grade styling.
- **mistral.ai**: European typography flair, orange flame accents, minimalist geometry.
- **lovable**: Vibrant builder aesthetics, modern glass elements, rapid feedback UI.

### 4. Consumer, Lifestyle & Luxury
- **apple**: SF Pro typography, pristine glassmorphism, subtle drop shadows, human interface guidelines.
- **airbnb**: Soft coral accents, friendly rounded geometry, image-led immersive cards.
- **spotify**: Signature neon green on true black AMOLED, music discovery cards.
- **tesla**: High-tech minimalism, monochrome precision, automotive cockpit UI.
- **ferrari / lamborghini / bugatti**: Hyper-luxury performance, high contrast, aerodynamic lines.
- **nike**: Bold athletic typography, dynamic diagonal angles, unapologetic energy.
- **starbucks**: Deep forest green, warm welcoming textures, artisanal coffee tones.

---

## Quick Reference Workflow

When asked to "make a page like Stripe" or "give this app an Apple or Linear feel":
```
1. view_file: .agents/skills/awesome-design-md/design-md/<brand>/DESIGN.md
2. Extract exact tokens: colors, typography, border-radius, shadows
3. Generate cohesive code adhering strictly to that brand's visual identity
```
