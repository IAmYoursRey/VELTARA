# Atlas Patterns

Composition recipes — how to use the components together.

## 3-pane app shell

The canonical Atlas layout — titlebar + sidebar + main + inspector + status bar.
Full source in `ui_kits/generic_app/`.

```
┌──────────────────────────────────────────────────────┐
│ .atlas-titlebar (36px)                               │
├──────────┬────────────────────────────┬──────────────┤
│ Sidebar  │ Main panel                 │ Inspector    │
│ 220px    │   ├── .atlas-tabbar (34px) │ 280px        │
│          │   └── content              │              │
├──────────┴────────────────────────────┴──────────────┤
│ .atlas-statusbar (28px)                              │
└──────────────────────────────────────────────────────┘
```

Implementation notes:
- Use `display: grid` with columns `220px 1fr 280px` and rows
  `var(--h-titlebar) 1fr var(--h-statusbar)`.
- Each panel has `contain: layout style paint` for scroll isolation.
- Use `react-resizable-panels` if resizable; otherwise fixed widths.

## Card density

Cards are dense and flat. No hero radii, no drop shadows.

- Header: 32px (`--h-panel-header`), 11px uppercase title, 8px dot + title spacing.
- Body: 12px padding when dense, 16px when roomy.
- Border: `1px solid var(--border-default)`. Never both border + shadow.

## Icon sizing rules

| Context | Size | Stroke |
|---|---|---|
| Titlebar | 18px | 1.5 |
| Button / standalone | 16px | 1.5 |
| Card header | 11px | 1.5 |
| Inline with text | matches font size | 1.5 |
| Empty state | 24px | 1.5 |

Always Lucide (`lucide` npm or CDN `https://unpkg.com/lucide@latest`). **Never emoji,
never unicode glyphs** like ★ → ✓ — always a real icon.

## Content tone

- **Sentence case** for all copy. `Create project`, not `Create Project`.
- **UPPERCASE + tracking 0.08em+** only for eyebrow labels, badges, section splits.
- **Numbers beat adjectives.** `12,847 rows` beats "many rows."
- **No emoji.** No ★, →, ✓ — use Lucide.
- **Tone is neutral-technical.** Terse, declarative, confident. Devtool voice,
  not lifestyle brand.

## Motion rules

- Only animate `background-color` (120–150ms).
- Never animate `color` or `opacity` on icons — causes jitter.
- Never bounce or spring. Everything is `ease-out` or linear.
- No entry/exit animations on content — UI should feel instant.

## When to use blue vs. near-white

| Need | Color |
|---|---|
| Primary CTA button | **Near-white** `--accent-primary` |
| Focus ring | **Blue** `--accent-highlight` |
| Selected row | **Blue** left border + muted blue fill |
| Link | **Blue** (underline on hover) |
| Active stepper dot | **Blue** |
| Checkbox/radio fill when checked | **Blue** |
| Destructive CTA | Red `--status-error` (not blue, not near-white) |

Rule of thumb: **near-white = action, blue = state.**

## Layout spacing

- **4px grid everywhere.** Use `--space-1` through `--space-10`. `--space-0h` (2px)
  and `--space-1h` (6px) only for ultra-compact inline cases.
- **Panel padding:** 12px tight, 16px standard, 24px generous.
- **Stack gap:** 4px between tightly related items, 8px between distinct items,
  16px between sections.
