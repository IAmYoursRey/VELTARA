---
trigger: Apply when modifying Next.js frontend, FastAPI backend services, API contracts, state management, or component lifecycle.
---

# Rule: Standar Rekayasa & Arsitektur VELTARA.ID

## 1. Frontend Web & PWA (Next.js + TypeScript)
- **App Router & Client/Server Boundaries**: Pisahkan `'use client'` untuk interaktivitas dinamis (form, audio, charts, auth) dan Server Components untuk rendering cepat.
- **Mobile-First & Aksesibilitas**: UI didesain responsif untuk layar smartphone hingga desktop, mendukung navigasi keyboard, dan memiliki indikator pemuatan (loading skeleton/spinner).
- **Service Layer Abstraction**: Komponen UI tidak boleh memanggil fetch raw secara ad-hoc atau bergantung langsung ke mock data; selalu lewat interface service (`IAuthService`, `ICVService`, `IVerificationService`, dll).

## 2. Backend & API persistence (FastAPI + PostgreSQL + MongoDB)
- **Relational Source-of-Truth**: Entitas inti (users, schools, roles, classes, audit logs) disimpan di PostgreSQL.
- **Dynamic Documents**: Artefak bukti karya dan snapshot dinamis disimpan di MongoDB/Blob Storage.
- **Server-Enforced Authorization**: Jangan pernah memercayai role atau claim kepemilikan dari browser tanpa verifikasi token/session server-side.
