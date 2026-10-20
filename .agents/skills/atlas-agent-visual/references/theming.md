# Atlas Theming

Atlas ships with two modes. Component classes stay identical — only tokens remap.

## Activation

```html
<!-- dark (default) -->
<html data-theme="dark">

<!-- light -->
<html data-theme="light">

<!-- or via class -->
<body class="light">
```

Toggle by swapping the attribute/class at runtime. Persist with `localStorage`
and read in `document.documentElement.setAttribute('data-theme', saved)` before
first paint to avoid a flash.

## Dark (default)

- Canvas: pure `#000`
- Text: `#fff` primary, `#aaa` secondary
- Accent primary: `#ededed` (near-white)
- Highlight: `#0070f3` (Vercel blue)

## Light

- Canvas: `#fff`
- Text: near-black primary, `#555` secondary
- Accent primary: near-black (inverted)
- Highlight: `#0070f3` (same blue — mode-invariant)

**The blue highlight is intentionally identical** across modes. Focus rings,
selected rows, checkbox fills, and active stepper dots all stay `#0070f3` so users
train on a single color signal.

## shadcn integration

Atlas aliases the shadcn variable set (`--background`, `--foreground`, `--primary`,
`--ring`, etc.) to its own tokens. Any shadcn component installed into an Atlas-loaded
project inherits the aesthetic — no further configuration.

To use with shadcn + Tailwind 4:

1. Import `colors_and_type.css` before `@import "tailwindcss"` so shadcn variables
   are defined when Tailwind's `@theme` consumes them.
2. Optionally disable Tailwind's preflight if it conflicts with Atlas base styles.
3. Use shadcn components as normal — they'll pick up Atlas's colors, radius, and
   spacing.

## Writing theme-aware components

Reference tokens by name, never raw hex:

```css
/* YES */
.my-panel { background: var(--bg-raised); color: var(--text-primary); }

/* NO — breaks theme switching */
.my-panel { background: #0f0f0f; color: #fff; }
```

Some effects (rgba overlays) are already theme-aware via `--bg-hover` etc. Use those
instead of `rgba(255,255,255,…)` when on neutral surfaces.
