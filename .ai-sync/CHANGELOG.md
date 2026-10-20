# Changelog

## [2026-10-20] - Konfigurasi Vercel Free-Tier, Neon PostgreSQL, Vercel Blob & Filter Upload
- **[DEPLOYMENT / VERCEL]**:
  - Dibuat berkas `.vercelignore` untuk mengecualikan modul yang tidak dibutuhkan di runtime produksi (`.agents/`, `.ai-sync/`, `scripts/`, `backend/tests/`, cache, SQLite lokal).
  - Dikonfigurasi `vercel.json` dengan Next.js framework, batas memori & durasi untuk Serverless Python `api/index.py`, serta security headers lengkap.
- **[DATABASE / NEON]**:
  - Dikonfirmasi kompatibilitas penuh `backend/app/core/database.py` dengan Neon PostgreSQL Serverless (menghapus parameter tidak kompatibel, normalisasi `ssl=require`, zero statement cache untuk PgBouncer).
  - Dibuat skrip helper mandiri [`scripts/init_neon_db.py`](file:///d:/vscode/VELTARA/scripts/init_neon_db.py) untuk inisialisasi tabel dan seeding baseline Neon DB dengan satu perintah.
- **[STORAGE / VERCEL BLOB]**:
  - Dikonfigurasi Vercel Blob private storage broker (`/blob/upload` dan `/blob/sign`) dengan autentikasi OIDC otomatis dan batas kuota free-tier.
- **[DOCS & CONFIG]**:
  - Diperbarui `.env.vercel.example` dan `.env.example` ke spesifikasi VELTARA.ID.
  - Ditulis panduan otoritatif langkah-demi-langkah penerapan cloud di [`VELTARA/VERCEL_DEPLOYMENT.md`](file:///d:/vscode/VELTARA/VELTARA/VERCEL_DEPLOYMENT.md).

## [2026-10-20] - Migrasi Total & Rebranding VELTARA.ID
- **[REBRANDING]**: Mengganti seluruh nama aplikasi, identitas brand, judul, layout metadata, manifest PWA, auth session cookie, mock responses, dan display code menjadi **VELTARA.ID** / **VELTARA**.
- **[ASSETS]**: Mendesain ulang logo brand SVG (`public/icons/icon-192.svg` dan `icon-512.svg`) dengan lambang geometris 3D faceted "V" berpalet luxury deep night violet & electric violet; mengintegrasikan emblem "V" pada `CircularLogoSpinner.tsx`, header sidebar, form login, serta hero image `public/veltara-hero.jpg`.
- **[SKILLS & AGENTS]**:
  - Menghapus skill Android yang tidak relevan (`android-cli`, `android-dev`, `android-jetpack-compose-expert`).
  - Menyesuaikan 9 skill inti domain dan 5 spesialis agen di `.agents/agents/` ke spesifikasi `veltara-*`.
  - Menambahkan rule arsitektur web modern `03-veltara-architecture-and-logic.md`.
  - Memperbaiki YAML frontmatter `trigger:` di seluruh rule `.agents/rules/` sehingga lolos `validate_kit.py`.
- **[CLEANUP & FIX]**:
  - Mengeliminasi komentar AI slop (`// ───`, boilerplate berlebihan).
  - Menginstal `eslint` dan `eslint-config-next` serta menyediakan `.eslintrc.json`.
  - Memperbaiki seluruh error build dan kompilasi Next.js (`tsc --noEmit`, `next lint`, `next build`).
  - Memastikan 100% dari 9 phase test suite lolos (`npm test`).
- **[GIT]**: Mengarahkan remote origin ke `https://github.com/IAmYoursRey/VELTARA.git` dan berhasil melakukan commit serta push ke branch `main`.
