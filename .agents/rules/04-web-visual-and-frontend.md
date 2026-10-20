---
trigger: Apply when writing or modifying frontend web code, CSS, HTML, or UI state handling.
---

# Rule: Standar Rekayasa Web Visual & Frontend

## 1. Fondasi UI & Styling
- Gunakan Vanilla CSS murni atau Tailwind dengan token desain sistem yang konsisten.
- Terapkan CSS Variables untuk warna, radius, dan spacing agar mudah diganti tema (*dark/light mode*).
- Hindari hardcoding warna ad-hoc atau padding acak.

## 2. Struktur Komponen & Logika
- Pisahkan presentational component (stateless) dari container / stateful logic.
- Kelola state secara eksplisit tanpa sinkronisasi ganda yang membingungkan.
- Terapkan semantic HTML5 (`<main>`, `<header>`, `<nav>`, `<article>`, `<button>`) untuk SEO dan aksesibilitas.
- Sediakan fallback state yang jelas: loading spinner/skeleton, empty state, dan error boundary.
