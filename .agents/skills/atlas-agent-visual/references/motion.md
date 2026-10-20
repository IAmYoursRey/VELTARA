# Atlas Motion

Atlas feels instant for **state changes** (hover, press) and **native + springy**
for **surface changes** (overlays, drawers, sheets). Never flat `ease` on
modal entrances — that's what makes web UI feel not-native.

---

## Easing tokens

Defined in `colors_and_type.css`. Use these — don't invent curves.

| Token | Curve | When to use |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Subtle fades, content swaps, opacity changes |
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Overlay fade-in (dramatic but smooth) |
| `--ease-apple` | `cubic-bezier(0.32, 0.72, 0, 1)` | Drawers, sheets, sidebars — spring-feel without overshoot |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Scale-pop for modals/dialogs/command palette (slight overshoot) |
| `--ease-emphatic` | `cubic-bezier(0.2, 0, 0, 1)` | Big macro transitions (rare) |

## Duration tokens

| Token | Value | Use for |
|---|---|---|
| `--dur-fast` | 140ms | Hover, press, small state swaps |
| `--dur-base` | 220ms | Dropdowns, tooltips, toasts |
| `--dur-slow` | 320ms | Drawers, sheets, sidebar collapse |
| `--dur-xslow` | 420ms | Page transitions, macro reveal |

## Motion inventory

| Transition | Duration | Curve | When |
|---|---|---|---|
| Hover fill | 120ms | ease-out | Background-color on button/link/row |
| Press | 120ms | ease | `transform: scale(0.985)` on active |
| Popover / tooltip open | 220ms | `--ease-standard` | Fade + tiny translate |
| **Dialog / modal open** | 340ms | `--ease-spring` | Scale 0.94 → 1 + opacity 0 → 1 |
| **Command palette open** | 340ms | `--ease-spring` | Same as dialog; backdrop uses `--ease-out-expo` (260ms) |
| Toast enter | 260ms | `--ease-apple` | Slide-in from bottom |
| **Sidebar collapse** | 340ms | `--ease-apple` | grid-template-columns + opacity |
| **Mobile sidebar overlay** | 360ms | `--ease-apple` | `translateX(-100%)` → `translateX(0)` |
| Scroll reveal | 300ms | linear (view timeline) | `.atlas-reveal` |
| Skeleton shimmer | 1600ms | linear loop | Continuous |
| Dot pulse | 1600ms | ease-in-out loop | `.atlas-dot.is-pulse` — opacity only |
| Marquee scroll | 60s | linear loop | `.atlas-marquee` — paused on hover |

## Overlay backdrops use blur, not just opacity

Overlays (command palette, mobile sidebar drawer, dialogs, sheets) must use
`backdrop-filter: blur()` **plus** color, not just a darkened rgba. The blur
is what makes it read as native macOS/iOS — without it the overlay feels
like a faded rectangle.

```css
.overlay-backdrop {
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);
  transition: opacity 260ms var(--ease-out-expo);
}
[data-theme="light"] .overlay-backdrop {
  background: rgba(220, 220, 220, 0.5);
}
```

Light mode needs its own backdrop color so it doesn't wash out; dark mode
goes lower alpha because the blur does the heavy lifting.

## Animating enter AND exit

Don't unmount overlay components directly. Use a two-stage mount:

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
    const t = setTimeout(() => setMounted(false), 260); // match backdrop duration
    return () => clearTimeout(t);
  }
}, [open]);

if (!mounted) return null;
return <div className={`overlay ${visible ? "is-open" : ""}`}>...</div>;
```

Then CSS drives both directions:

```css
.overlay { opacity: 0; transition: opacity 260ms var(--ease-out-expo); }
.overlay.is-open { opacity: 1; }
.overlay .panel {
  opacity: 0;
  transform: translateY(-16px) scale(0.94);
  transition: opacity 260ms var(--ease-out-expo),
              transform 340ms var(--ease-spring);
}
.overlay.is-open .panel { opacity: 1; transform: translateY(0) scale(1); }
```

The two-raf pattern matters: the first rAF lets React commit the mounted
state, the second lets the browser paint the initial (hidden) style — only
then does flipping `is-open` produce a real transition.

## Principles

1. **Overlays feel native, not flat.** Blur backdrop + spring curve on the
   panel — both at once, or it's noticeably "web-y".
2. **Instant for interaction, springy for state.** Hover/press stay 120ms
   ease. Opening a modal uses a 340ms spring.
3. **No springs on icons or text color.** Only `background-color` and
   `transform/opacity` on containers.
4. **Enter and exit animate.** Instant-close on overlays feels broken on
   modern hardware — users see a flash.
5. **Reduced-motion fallback.** All decorative motion (reveal, pulse,
   marquee, overlay transforms) must gracefully degrade under
   `@media (prefers-reduced-motion: reduce)` to a static end-state with
   ≤0.001ms durations.

## Always-on vs gated

**Always-on** (even with reduced-motion):
- Hover fills (120ms) — interaction affordance
- Press scale (120ms) — tactile feedback
- Spinner rotations — indicate live state
- Popover/dialog/toast open — signals modality (use curve, shortened if
  reduced)

**Gated behind `prefers-reduced-motion: no-preference`**:
- `.atlas-reveal` scroll animations
- `.atlas-dot.is-pulse` opacity pulse
- `.atlas-marquee` scrolling
- Hero parallax

## Reduced-motion ground truth

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

Apply as a final rule in any Atlas-built app.

## What NOT to do

- Don't use `ease`, `ease-in`, `ease-out` as literal keywords on modal
  overlays — use one of the tokens above.
- Don't unmount overlays without an exit animation.
- Don't transition `color` or `opacity` on icons (causes jitter).
- Don't animate between different units (`px` → `rem` → `%`).
- Don't use JS-driven animation (Framer Motion, GSAP) for anything CSS can
  handle — the platform is fast enough.
