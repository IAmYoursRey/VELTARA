# Atlas Lessons · Gotchas from real builds

Hard-won rules discovered while shipping the kitchen-sink. Read every one
before writing code — each prevents a real regression.

---

## 1. Button-default reset is mandatory

**The bug:** `.atlas-*` classes that sit on `<button>` elements render as
browser-default pills (white fill, rounded, border-box) unless the rule
includes a full button reset. This bit `.atlas-command-item`,
`.atlas-menu-item`, and `.atlas-toast-close`.

**The rule:** Any class that may be applied to a `<button>` needs:

```css
.atlas-whatever {
  background: transparent;
  border: 0;
  border-radius: 0;       /* unless you want a specific radius */
  padding: 0 ... ;        /* explicit padding */
  font-family: inherit;
  text-align: left;       /* or center, but explicit */
  color: var(--text-primary);  /* or the right token */
  width: 100%;            /* if it's a row element */
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
```

**When generating new components that may be buttons**: include this reset
by default. Never rely on `<div>` wrappers to dodge it.

---

## 2. Shadows must differ per theme

**The bug:** Atlas's default shadow tokens use 0.6–0.95 alpha against black.
That's correct for dark mode. In light mode, those alphas crush the canvas
into muddy gray.

**The rule:** The light-theme block in `colors_and_type.css` overrides the
shadow tokens to 0.06–0.14 alpha:

```css
[data-theme="light"], .light {
  --shadow-sm: 0 1px 2px rgba(17, 17, 17, 0.06);
  --shadow-md: 0 4px 12px rgba(17, 17, 17, 0.08);
  --shadow-lg: 0 8px 24px rgba(17, 17, 17, 0.10);
  --shadow-overlay: 0 16px 48px rgba(17, 17, 17, 0.14);
}
```

**When generating components with shadows** in a non-plain-HTML stack: define
both dark and light variants, don't reuse the dark values.

---

## 3. Pulse dot uses opacity, not box-shadow

**The bug:** A glowing box-shadow pulse on status dots leaks shadow blur
into surrounding list rows and card bodies. It looks like a rendering bug
even when it isn't.

**The rule:** `.atlas-dot.is-pulse` animates opacity only (0.6 → 1), never
box-shadow. This matters for `live` indicators anywhere in the system.

```css
.atlas-dot.is-pulse {
  animation: atlas-dot-pulse 1.6s ease-in-out infinite;
}
@keyframes atlas-dot-pulse {
  0%, 100% { opacity: 0.6; }
  50%      { opacity: 1;   }
}
```

---

## 4. Sidebar collapse needs dual transitions

**The bug:** Transitioning `grid-template-columns` alone causes nav text to
wrap and reflow mid-animation (ugly). Hiding the sidebar with
`display: none` drops the nav height, also ugly.

**The rule:** Transition BOTH `grid-template-columns` (width) AND `opacity`
(content), with `white-space: nowrap` on nav items so they don't wrap.

```css
.ks-shell { transition: grid-template-columns 180ms ease; }
.ks-shell-sidebar { transition: opacity 140ms ease, transform 180ms ease; }
[data-sidebar="collapsed"] .ks-shell { grid-template-columns: 0 1fr; }
[data-sidebar="collapsed"] .ks-shell-sidebar {
  opacity: 0; pointer-events: none; border-right-color: transparent;
}
.nav-item { white-space: nowrap; }
```

---

## 5. App-shell top rows must share height for aligned borders

**The bug:** Each column in a 3-pane shell (folder rail / list / reader)
tends to pick its own padding → bottom borders land at different Y
coordinates → visual noise.

**The rule:** Every top row must use:

```css
height: 56px;               /* or chosen chrome height */
box-sizing: border-box;
padding: 0 14px;            /* internal, varies per column */
display: flex;
align-items: center;
border-bottom: 1px solid var(--border-default);
```

See `references/examples.md` §"Three-column top-row alignment" for a
working snippet.

---

## 6. Mobile responsive: sidebar becomes overlay

**The rule:** At ≤768px viewport:
- Grid collapses to `1fr` (sidebar leaves the grid).
- Sidebar becomes `position: fixed` with `transform: translateX(-100%)` by
  default, `translateX(0)` when expanded.
- A backdrop (`rgba(0,0,0,0.5)` fixed inset) appears during expansion; tap
  closes.
- Nav items autoclose the sidebar on click (set `data-sidebar="collapsed"`)
  so the user lands on the new page, not the menu.

The boot script should default to `collapsed` on mobile viewports unless
the user has a stored preference.

---

## 7. Horizontal scroll: hide the bar, keep the scroll

**The rule:** `overflow-x: hidden` is the wrong fix — it disables horizontal
scroll entirely (bad for wide tables, mobile device frames). Instead:

```css
*::-webkit-scrollbar:horizontal { height: 0; display: none; }
```

Horizontal scroll via trackpad / wheel / touch still works; only the
scrollbar is invisible. Firefox can't hide one axis only — accept its
default behavior there.

---

## 8. Device frame layout

**The bug:** `.atlas-device-mobile` as `display: block` with a `height: 100%`
inner caused the inner to take 100% of the parent height, pushing the
safe-bottom indicator past the overflow clip.

**The rule:**

```css
.atlas-device-mobile {
  display: flex;
  flex-direction: column;
  /* ... width, height, border-radius ... */
  overflow: hidden;
}
.atlas-device-mobile-safe-top    { height: 54px; flex: none; }
.atlas-device-mobile-inner       { flex: 1; min-height: 0; overflow: hidden; }
.atlas-device-mobile-safe-bottom { height: 34px; flex: none; }
```

---

## 9. Command palette trigger is a round icon button

Don't render `[⌘K] Search` as a text+kbd chip in the titlebar — it's noisy.
Use a single round search-icon button:

```html
<button class="ks-cmdk-trigger" aria-label="Open command palette (⌘K)">
  <svg><!-- search icon, 1.7 stroke --></svg>
</button>
```

The palette keyboard shortcut still works globally; the visual trigger is
minimal.

---

## 10. Theme toggle is Light / Dark / System (default System)

```tsx
type Mode = "light" | "dark" | "system";
```

System reads `prefers-color-scheme` and live-updates via a
`MediaQueryList.onchange` subscription. The boot script in `layout.tsx`
resolves `system` → `dark`/`light` before first paint to avoid flash.

---

## 11. Homepage live grid uses CSS columns, not flex/grid

Masonry-like layout with varying card heights:

```css
.ks-live-grid {
  columns: 3 320px;
  column-gap: 14px;
}
.ks-live-card {
  break-inside: avoid;
  margin-bottom: 14px;
}
```

Scales down automatically: 2 columns at ≤900px, 1 column at ≤620px. No JS.

---

## 12. Border tokens have distinct roles

- `--border-default` (`#1e1e1e`) — **section dividers**, card borders, table
  outlines. Use between distinct areas.
- `--border-subtle` (`#141414`) — **inner separators**, row separators
  inside a list or card. Lower contrast, for grouping inside a section.
- `--border-strong` (`#3d3d3d`) — **focus / emphasis edges**. Hover states,
  focused inputs. Rare.

Mixing them up collapses the hierarchy. When an inner row separator uses
`--border-default` it competes with the card's outer border.

---

## 13. When tabs need to feel louder: pill buttons

The default `.atlas-tabbar` / `.atlas-tab` is a quiet underline tab. When a
section's tab row needs to feel more action-oriented (e.g., in an inspector
panel beside a loud main thread), swap for pill buttons:

```html
<div style="display: flex; gap: 6px; height: 56px; padding: 0 14px;
            border-bottom: 1px solid var(--border-default);
            align-items: center;">
  <button class="atlas-btn-pill atlas-btn-pill-primary atlas-btn-pill-sm">
    Tool I/O
  </button>
  <button class="atlas-btn-pill atlas-btn-pill-ghost atlas-btn-pill-sm">
    Artifacts
  </button>
</div>
```

---

## 14. Selection color must be readable in both themes

The default `::selection` tint at 12% blue is unreadable — selected text
vanishes. Use 22% in light, 42% in dark:

```css
::selection               { background: rgba(0, 112, 243, 0.42); color: #fff; }
[data-theme="light"] ::selection { background: rgba(0, 112, 243, 0.22); color: var(--text-primary); }
```

---

## 15. Layout stability for long-running pages

Apply to any panel with heavy content:

```css
contain: layout style paint;
```

Prevents cross-panel reflow from expensive content (charts, tables,
live-updating lists). Especially important in agent consoles where tool
outputs arrive asynchronously.

---

## 16. Radius is sparse on purpose

- 3px — tight chips, small inputs
- 4px — buttons, inputs, form elements (the default)
- 6px — cards, panels, popovers (the default "container" radius)
- 9999px — pills, avatars, toggle tracks

**Don't invent** 8, 10, 12, 16px radii. They break the rhythm.

---

## 17. When generating for Tailwind / shadcn

- **Tailwind v4**: Atlas tokens go into an `@theme` block; emit utility
  classes. Don't ship the reference CSS unless the user explicitly opts in.
- **shadcn/ui**: Atlas has a shadcn variable alias table
  (see `references/theming.md`). Override shadcn's `--background`,
  `--foreground`, `--primary`, `--ring`, etc. with Atlas values. Keep
  shadcn's component structure intact; do not wrap or replace its
  components with `.atlas-*` classes.

---

## 18. Only animate `background-color` by default

`color`, `opacity`, `transform` animations on icons cause jitter on common
hardware. The atlas convention:

```css
transition: background-color 120ms ease;
```

For reveal/enter animations, gate behind `@media (prefers-reduced-motion:
no-preference)` and use CSS animation-timeline (`view()`) instead of JS
observers when possible.

---

## 19. Overlays need blur + spring curves, not opacity + ease

**The bug:** A command palette or drawer that fades in with plain opacity +
a flat `ease` curve reads as "web-y" — it feels slow even at 100ms, and
instant even at 300ms, because the curve is linear-ish and there's no
texture behind it.

**The rule:** Every overlay surface — command palette, dialog backdrop,
mobile sidebar drawer — uses **both** of:

1. **Backdrop blur**, not a flat rgba:
   ```css
   background: rgba(0, 0, 0, 0.45);
   backdrop-filter: blur(12px) saturate(150%);
   -webkit-backdrop-filter: blur(12px) saturate(150%);
   ```
   Light-mode variants use `rgba(220, 220, 220, 0.5)` so they don't wash
   into the canvas.

2. **Spring / Apple curve on the panel**, not `ease`:
   - Panel scale/pop: `340ms var(--ease-spring)` — slight overshoot
   - Backdrop fade: `260ms var(--ease-out-expo)` — smooth but dramatic
   - Drawer slide: `340ms var(--ease-apple)` — spring-without-overshoot

The `--ease-*` tokens are defined on `:root` in `colors_and_type.css`.
Never hand-write `cubic-bezier(...)` — use the token.

**Panel entrance pattern:**
```css
.overlay .panel {
  opacity: 0;
  transform: translateY(-16px) scale(0.94);
  transition:
    opacity 260ms var(--ease-out-expo),
    transform 340ms var(--ease-spring);
}
.overlay.is-open .panel {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

## 20. Overlays animate BOTH enter and exit

**The bug:** A command palette that unmounts instantly on close flashes
off the screen — users see it vanish mid-blur and notice the abruptness
even if they can't articulate why.

**The rule:** Use a two-stage mount with a transition delay before unmount:

```tsx
const [mounted, setMounted] = useState(false);
const [visible, setVisible] = useState(false);

useEffect(() => {
  if (open) {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  } else {
    setVisible(false);
    const t = setTimeout(() => setMounted(false), 260);
    return () => clearTimeout(t);
  }
}, [open]);

if (!mounted) return null;
return <div className={`overlay ${visible ? "is-open" : ""}`}>…</div>;
```

Two `requestAnimationFrame` calls matter: React commits mount in frame 1,
browser paints the initial (hidden) styles in frame 2 — then the
`is-open` class flip produces a real transition rather than snapping to
the final state.

The exit `setTimeout` must match the longest transition duration (e.g.,
260ms for the backdrop). Don't guess — look at the token.
