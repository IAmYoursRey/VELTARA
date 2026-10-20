# Atlas Components Reference

Every `.atlas-*` class with a copy-ready HTML snippet. Load `colors_and_type.css`
first; no other dependencies.

> **Conventions:** Use semantic HTML where possible (`<button>`, `<input>`, `<a>`).
> Wrap icon glyphs with Lucide (1.5px stroke, 16px default, 18px in titlebars, 11px
> in card headers). Never animate color or opacity on icons — use `background-color`
> transitions only.

---

## Primitives

### Button · `.atlas-btn`
```html
<button class="atlas-btn atlas-btn-primary">Primary</button>
<button class="atlas-btn atlas-btn-secondary">Secondary</button>
<button class="atlas-btn atlas-btn-ghost">Ghost</button>
<button class="atlas-btn atlas-btn-destructive">Delete</button>
<button class="atlas-btn atlas-btn-icon"><svg>…</svg></button>
<button class="atlas-btn atlas-btn-primary atlas-btn-sm">Small</button>
<button class="atlas-btn atlas-btn-primary atlas-btn-lg">Large</button>
```
28px height · 4px radius · uses near-white `--accent-primary` for primary.
**Never use blue for CTAs** — blue is reserved for focus/selection.

### Input · `.atlas-input`
```html
<input class="atlas-input" placeholder="Search…" />
<input class="atlas-input atlas-input-sm" placeholder="Small" />
```
24px default · 20px `atlas-input-sm`. Border `--border-default`, fill `--bg-input`,
focus ring `--accent-highlight`.

### Checkbox · `.atlas-checkbox`
```html
<label><input type="checkbox" class="atlas-checkbox" /> Remember me</label>
```
Uses `accent-color: var(--accent-highlight)` — blue fill when checked.

### Radio · `.atlas-radio`
```html
<label><input type="radio" name="g" class="atlas-radio" /> Option</label>
```

### Switch · `.atlas-switch`
```html
<button class="atlas-switch is-on" role="switch" aria-checked="true"></button>
```

### Kbd · `.atlas-kbd`
```html
<kbd class="atlas-kbd">⌘K</kbd>
```
Compact 1-char keycap, JetBrains Mono.

### Link · `.atlas-link`
```html
<a class="atlas-link" href="#">Read more</a>
```
Blue underline on hover.

---

## Surfaces

### Card · `.atlas-card`
```html
<div class="atlas-card">
  <div class="atlas-card-header">
    <span class="atlas-dot atlas-dot-primary"></span>
    <span class="atlas-panel-title">Card title</span>
  </div>
  <div class="atlas-card-body">Content…</div>
</div>
```

### Panel header · `.atlas-panel-header`
```html
<div class="atlas-panel-header">
  <span class="atlas-panel-title">Inspector</span>
  <button class="atlas-btn atlas-btn-icon"><svg>x</svg></button>
</div>
```
32px height · 11px uppercase title (when using `--text-xs` + tracking).

### Stat · `.atlas-stat`
```html
<div class="atlas-stat">
  <div class="atlas-stat-label">REVENUE</div>
  <div class="atlas-stat-value">$12,847</div>
  <div class="atlas-stat-delta is-up">+12.4%</div>
</div>
```

### Empty · `.atlas-empty`
```html
<div class="atlas-empty">
  <div class="atlas-empty-icon"><svg>…</svg></div>
  <div class="atlas-empty-title">No results</div>
  <div class="atlas-empty-desc">Try a different query.</div>
</div>
```

---

## Navigation

### Tabs · `.atlas-tabbar` / `.atlas-tab`
```html
<div class="atlas-tabbar">
  <button class="atlas-tab is-active">Overview</button>
  <button class="atlas-tab">Details</button>
  <button class="atlas-tab">History</button>
</div>
```

### Segmented · `.atlas-segmented`
```html
<div class="atlas-segmented">
  <button class="atlas-segmented-item is-active">Day</button>
  <button class="atlas-segmented-item">Week</button>
  <button class="atlas-segmented-item">Month</button>
</div>
```

### Toggle · `.atlas-toggle`
```html
<button class="atlas-toggle is-on">Dark</button>
```

### Breadcrumb · `.atlas-breadcrumb`
```html
<nav class="atlas-breadcrumb">
  <a href="#">Projects</a>
  <span class="atlas-breadcrumb-sep">/</span>
  <a href="#">Atlas</a>
  <span class="atlas-breadcrumb-sep">/</span>
  <span class="atlas-breadcrumb-current">Overview</span>
</nav>
```

### Pagination · `.atlas-pagination`
```html
<nav class="atlas-pagination">
  <button class="atlas-pagination-item">‹</button>
  <button class="atlas-pagination-item is-active">1</button>
  <button class="atlas-pagination-item">2</button>
  <span class="atlas-pagination-ellipsis">…</span>
  <button class="atlas-pagination-item">9</button>
  <button class="atlas-pagination-item">›</button>
</nav>
```

### Stepper · `.atlas-stepper`
```html
<ol class="atlas-stepper">
  <li class="atlas-stepper-step is-done">
    <span class="atlas-stepper-dot"></span>
    <span class="atlas-stepper-label">Account</span>
  </li>
  <li class="atlas-stepper-sep"></li>
  <li class="atlas-stepper-step is-active">
    <span class="atlas-stepper-dot"></span>
    <span class="atlas-stepper-label">Plan</span>
  </li>
</ol>
```

---

## Overlays

### Popover · `.atlas-popover`
```html
<div class="atlas-popover">
  <button class="atlas-menu-item">Rename</button>
  <button class="atlas-menu-item">Duplicate</button>
  <div class="atlas-menu-separator"></div>
  <button class="atlas-menu-item">Delete</button>
</div>
```

### Dialog · `.atlas-dialog`
```html
<div class="atlas-dialog-backdrop"></div>
<div class="atlas-dialog">
  <div class="atlas-dialog-header">
    <div class="atlas-dialog-title">Confirm</div>
    <div class="atlas-dialog-desc">This cannot be undone.</div>
  </div>
  <div class="atlas-dialog-body">…</div>
  <div class="atlas-dialog-footer">
    <button class="atlas-btn atlas-btn-ghost">Cancel</button>
    <button class="atlas-btn atlas-btn-primary">Confirm</button>
  </div>
</div>
```

### Command palette · `.atlas-command`
```html
<div class="atlas-command">
  <div class="atlas-command-input-wrap">
    <input class="atlas-command-input" placeholder="Type a command…" />
    <kbd class="atlas-kbd">⌘K</kbd>
  </div>
  <div class="atlas-command-group-label">Actions</div>
  <button class="atlas-command-item">
    New file
    <span class="atlas-command-item-shortcut"><kbd class="atlas-kbd">⌘N</kbd></span>
  </button>
</div>
```

### Tooltip · `.atlas-tooltip`
```html
<div class="atlas-tooltip">Save · ⌘S</div>
<div class="atlas-tooltip atlas-tooltip-dark">Dark variant</div>
```

### Toast · `.atlas-toast`
```html
<div class="atlas-toast">
  Project saved.
  <div class="atlas-toast-desc">All changes synced.</div>
  <button class="atlas-toast-close">×</button>
</div>
```

### Alert · `.atlas-alert`
```html
<div class="atlas-alert atlas-alert-info">
  <div class="atlas-alert-icon"><svg>i</svg></div>
  <div class="atlas-alert-title">Heads up</div>
  <div class="atlas-alert-desc">Deploy takes ~2 min.</div>
</div>
<div class="atlas-alert atlas-alert-warning">…</div>
<div class="atlas-alert atlas-alert-error">…</div>
```

---

## Data & lists

### Table · `.atlas-table`
```html
<table class="atlas-table">
  <thead><tr><th>Name</th><th>Status</th><th class="num">Count</th></tr></thead>
  <tbody>
    <tr><td>atlas-core</td><td><span class="atlas-badge atlas-badge-success">OK</span></td><td class="num">1,284</td></tr>
  </tbody>
</table>
```
`.num` right-aligns numeric columns.

### List · `.atlas-list`
```html
<ul class="atlas-list">
  <li class="atlas-list-item is-selected">main.ts</li>
  <li class="atlas-list-item">index.tsx</li>
</ul>
```

### Badge · `.atlas-badge`
```html
<span class="atlas-badge">DEFAULT</span>
<span class="atlas-badge atlas-badge-primary">PRIMARY</span>
<span class="atlas-badge atlas-badge-success">OK</span>
<span class="atlas-badge atlas-badge-warning">DRAFT</span>
<span class="atlas-badge atlas-badge-error">FAIL</span>
<span class="atlas-badge atlas-badge-info">NEW</span>
```
10px uppercase · wide tracking.

### Pill · `.atlas-pill`
```html
<span class="atlas-pill">North America</span>
<span class="atlas-pill atlas-pill-active">Selected</span>
```

### Accordion · `.atlas-accordion`
```html
<div class="atlas-accordion">
  <div class="atlas-accordion-item is-open">
    <button class="atlas-accordion-trigger">
      <span>Settings</span>
      <span class="atlas-accordion-chev">›</span>
    </button>
    <div class="atlas-accordion-content">Content…</div>
  </div>
</div>
```

---

## Feedback & indicators

### Progress · `.atlas-progress`
```html
<div class="atlas-progress"><div class="atlas-progress-bar" style="width:42%"></div></div>
```

### Slider · `.atlas-slider`
```html
<div class="atlas-slider">
  <div class="atlas-slider-track">
    <div class="atlas-slider-range" style="width:60%"></div>
  </div>
  <div class="atlas-slider-thumb" style="left:60%"></div>
</div>
```

### Skeleton · `.atlas-skeleton`
```html
<div class="atlas-skeleton" style="height:12px;width:60%"></div>
```

### Dot · `.atlas-dot`
```html
<span class="atlas-dot atlas-dot-primary"></span>
<span class="atlas-dot atlas-dot-success"></span>
<span class="atlas-dot atlas-dot-warning"></span>
<span class="atlas-dot atlas-dot-error"></span>
<span class="atlas-dot atlas-dot-info"></span>
```
6px circle · status dots used in titles, lists, and table cells.

---

## Identity

### Avatar · `.atlas-avatar`
```html
<div class="atlas-avatar">AB</div>
<div class="atlas-avatar-group">
  <div class="atlas-avatar">AB</div>
  <div class="atlas-avatar">CD</div>
  <div class="atlas-avatar">+3</div>
</div>
```

### Divider · `.atlas-divider` / `-v`
```html
<hr class="atlas-divider" />
<div class="atlas-divider-v"></div>
```

---

## Layout furniture

### Titlebar · `.atlas-titlebar`
```html
<header class="atlas-titlebar">
  <div class="atlas-titlebar-left">Atlas</div>
  <div class="atlas-titlebar-center">Kitchen sink</div>
  <div class="atlas-titlebar-right">…</div>
</header>
```
36px · 18px Lucide icons.

### Statusbar · `.atlas-statusbar`
```html
<footer class="atlas-statusbar">
  <div>Ready</div>
  <div>47 components</div>
  <div>v0.1.0</div>
</footer>
```
28px · 11px text.

---

## Reference preview snippets

Working copy-paste HTML for every component lives in `preview/components-*.html`
(open any file in a browser to see the rendered result).

---

## v0.2 — Alive / multi-surface

### Pill button · `.atlas-btn-pill`
```html
<button class="atlas-btn-pill atlas-btn-pill-primary">Ship it</button>
<button class="atlas-btn-pill atlas-btn-pill-secondary">Cancel</button>
<button class="atlas-btn-pill atlas-btn-pill-ghost">Learn more</button>
<button class="atlas-btn-pill atlas-btn-pill-primary atlas-btn-pill-sm">Small</button>
<button class="atlas-btn-pill atlas-btn-pill-primary atlas-btn-pill-lg">Large</button>
```
Monochromatic hover (brightness shift), `scale(0.985)` press, 9999px radius.
Use for landing pages, CTAs, hero surfaces. `.atlas-btn` stays the default
for dense app UIs.

### Mobile bottom tab bar · `.atlas-tabbar-bottom`
```html
<nav class="atlas-tabbar-bottom">
  <button class="atlas-tabbar-bottom-item is-active">
    <svg>…</svg><span>Home</span>
  </button>
  <button class="atlas-tabbar-bottom-item">
    <svg>…</svg><span>Inbox</span>
  </button>
  <button class="atlas-tabbar-bottom-item">
    <svg>…</svg><span>Me</span>
  </button>
</nav>
```
56px tall, 20px icons (1.5px stroke inactive, 2px active), 10px labels.
5-slot max. Pair with `.atlas-device-mobile` for in-docs demos.

### Device frames · `.atlas-device-mobile` / `-tablet` / `-desktop`
```html
<div class="atlas-device-mobile">
  <div class="atlas-device-mobile-safe-top">
    <div class="atlas-device-mobile-notch"></div>
  </div>
  <div class="atlas-device-mobile-inner">
    <!-- app content -->
  </div>
  <div class="atlas-device-mobile-safe-bottom">
    <div class="atlas-device-mobile-indicator"></div>
  </div>
</div>

<div class="atlas-device-desktop">
  <div class="atlas-device-desktop-chrome">
    <span class="atlas-device-desktop-dot is-close"></span>
    <span class="atlas-device-desktop-dot is-min"></span>
    <span class="atlas-device-desktop-dot is-max"></span>
    <span class="atlas-device-desktop-url">atlas.dev</span>
  </div>
  <div class="atlas-device-desktop-inner"><!-- page --></div>
</div>
```
402×874 mobile, 640×860 tablet, flexible desktop. Use to show UI in
context for docs, emails, or marketing. Not for production app shells.

### Marquee · `.atlas-marquee`
```html
<div class="atlas-marquee">
  <div class="atlas-marquee-track">
    <span>40+ components</span>
    <span>AMOLED black</span>
    <span>Multi-surface</span>
    <!-- duplicate content for seamless loop -->
    <span>40+ components</span>
    <span>AMOLED black</span>
    <span>Multi-surface</span>
  </div>
</div>
```
60s infinite scroll, paused on hover, soft edge mask. Duplicate the content
inside the track so the loop is seamless.

### Dashed divider · `.atlas-divider-dashed`
```html
<hr class="atlas-divider-dashed" />
<span class="atlas-divider-v-dashed"></span>
```
Use between major sections on landing pages. Softer than solid dividers.

### Filmstrip texture · `.atlas-filmstrip`
```html
<div class="atlas-filmstrip" style="aspect-ratio:16/9;background:#0a0a0a"></div>
```
16px grid-line overlay. For video thumbnail fallbacks, empty media slots.

### Reveal · `.atlas-reveal`
```html
<section class="atlas-reveal">…</section>
```
CSS-only scroll-triggered fade-in (uses `animation-timeline: view()`).
Degrades to `opacity: 1` on browsers without support. Gated behind
`prefers-reduced-motion: no-preference`.

### Pulse dot · `.atlas-dot.is-pulse`
```html
<span class="atlas-dot atlas-dot-warning is-pulse"></span>
<span class="atlas-dot atlas-dot-info is-pulse"></span>
```
Adds a glowing halo to any dot variant. For active/processing/live status.

### Display type · `.atlas-display` / `.atlas-display-lg`
```html
<h1 class="atlas-display">Atlas is the drop-in design system for agent UI.</h1>
<h1 class="atlas-display-lg">The shadcn<br/>for agent UI.</h1>
<p class="atlas-eyebrow">Design system · v0.2</p>
```
Responsive via `clamp()`. Use sparingly — 1–2 occurrences per page max. Base
`h1`–`h4` stay the default for app UI density.
