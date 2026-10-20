# Atlas Responsive & Multi-surface

Atlas ships three surface modes. The same tokens and most classes work on all
three, but certain primitives swap out at specific breakpoints.

## Surfaces

| Surface | Viewport | Primary classes |
|---|---|---|
| Mobile | 360–480px | `.atlas-device-mobile` wrapper, `.atlas-tabbar-bottom` |
| Tablet | 600–900px | `.atlas-device-tablet` wrapper, mixed desktop/mobile |
| Desktop | 1000px+ | `.atlas-device-desktop` chrome frame, `.atlas-titlebar` |

## Device frames

The `.atlas-device-*` classes render a realistic viewport chrome around
content. Use them for:

- **Docs showcases** — showing what a component looks like in-context.
- **Email screenshots** — rendering UI for marketing materials.
- **Multi-surface demos** — side-by-side mobile + desktop in the same page.

Not for production app shells — use `.atlas-titlebar` etc. directly for real
apps.

## Container queries over media queries

Atlas prefers `@container` for layout decisions that depend on the component's
own width, not the viewport:

```css
.my-panel { container: panel / inline-size; }
@container panel (min-width: 640px) {
  .my-grid { grid-template-columns: repeat(3, 1fr); }
}
```

Media queries are still used for: global font scaling (`.atlas-display`
uses `clamp()` internally), reduced-motion gating, and swapping top/bottom
nav at mobile thresholds.

## Component swaps by surface

| Role | Mobile | Desktop |
|---|---|---|
| Primary nav | `.atlas-tabbar-bottom` | `.atlas-sidebar` / nav tree |
| Page header | `.atlas-topbar` (custom, 48–56px) | `.atlas-titlebar` (36px) |
| Secondary nav | bottom sheet | `.atlas-tabbar` (top tabs) |
| Modal | full-screen (no backdrop) | `.atlas-dialog` + backdrop |
| Menu | action sheet (bottom) | `.atlas-popover` |

## Safe areas on mobile

The `.atlas-device-mobile` wrapper reserves 54px top and 34px bottom as safe
areas. For real mobile web, use:

```css
padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);
```

## Typography scaling

- **Compact (default)**: `--text-base` 13px stays constant. Use for app UIs.
- **Responsive display**: `.atlas-display` grows `clamp(32px, 6vw, 72px)` for
  landing hero type. Use sparingly — 1–2 uses per page max.

## Motion on mobile

Reduce motion amplitude. Skip scroll-driven reveal (`animation-timeline: view()`
becomes `opacity: 1` fallback). Keep 120ms hover/press transitions — they
feel native on touch.
