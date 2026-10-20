# Rencana Kerja: Refactoring & Rebranding Total ke VELTARA.ID

## 1. Identifikasi Masalah & Lingkup Perubahan
- **Branding & Judul**: Banyak berkas masih memakai nama proyek lama (TALENTRA / VISTARA) di UI, metadata, cookie, mock data, layanan frontend/backend, dan dokumentasi.
- **Aset Logo & Foto**: Logo PWA (`icon-192.svg`, `icon-512.svg`), `CircularLogoSpinner`, sidebar brand, dan login page masih menggunakan inisial "T" (TALENTRA). Perlu diganti dengan logo modern & ikon emblem "V" untuk VELTARA.
- **Skill & Konfigurasi Proyek Lain**: Terdapat skill Android (`android-cli`, `android-dev`, `android-jetpack-compose-expert`) dan konfigurasi VISTARA di `AGENTS.md` serta `.agents/rules/` yang tidak relevan untuk web application Next.js + FastAPI ini.
- **Git Repository & Remote**: Git remote masih mengarah ke `Talentra.git`. Perlu dialihkan ke `https://github.com/IAmYoursRey/VELTARA.git` pada branch `main` dengan `README.md` berawalan `# VELTARA`.
- **AI Slop & Error Fixes**: Menghilangkan komentar hiasan robotik AI (`// ───`), menambahkan konfigurasi ESLint (`.eslintrc.json`) agar `next lint` tidak terhenti, dan memastikan seluruh suite tes (Phase 1-9) lolos.

---

## 2. Langkah Kerja Terukur
1. **Inisialisasi Sinkronisasi Memori (.ai-sync/)**:
   - Setup folder `.ai-sync/` lengkap: `README.md`, `STATE.md`, `HANDOFF.md`, `TASKS.md`, `PLANS.md`, `DECISIONS.md`, `CHANGELOG.md`, `ERRORS.md`, `BOARD.md`, `AGENTS.md`, dan log sesi.
2. **Desain & Implementasi Aset Logo Baru (VELTARA)**:
   - Buat logo SVG baru untuk `public/icons/icon-192.svg` dan `public/icons/icon-512.svg` dengan lambang geometris modern "V" (gradasi ungu-indigo premium, rounded squircle, high-resolution).
   - Perbarui `CircularLogoSpinner.tsx` dengan emblem "V" dan styling harmonis.
   - Perbarui emblem logo di `Sidebar.tsx` dan `login/page.tsx`.
3. **Rebranding & Rename Kode (Frontend, Services, Lib, Mocks, App Shell)**:
   - `package.json`: `"name": "veltara-id"`.
   - `layout.tsx`, `manifest.ts`, `page.tsx`, `loading.tsx`, `offline/page.tsx`, `login/page.tsx`, `Header.tsx`, `Sidebar.tsx`.
   - Services (`auth.service.ts`, `cv.service.ts`, `verification.service.ts`, `settings.service.ts`, `mock-state.ts`, dll):
     - Ganti cookie `talentra_session` -> `veltara_session`, `talentra_csrf` -> `veltara_csrf`.
     - Ganti storage keys `talentra_school_settings` -> `veltara_school_settings`, dll.
     - Ganti kode display verifikasi: `TLN-` -> `VLT-`.
     - Ganti `TALENTRA-CV-` -> `VELTARA-CV-`.
   - `src/lib/jwt.ts` & `src/middleware.ts`: `iss: 'veltara.id'`, `aud: 'veltara.id'`, rahasia dev default `veltara-dev-secret-key-32-bytes-minimum-length-req`.
   - `src/mocks/`: domain email `@veltara.id`, entitas sekolah Sekolah VELTARA.
4. **Pembersihan Skill & Aturan AI**:
   - Hapus folder Android yang tidak relevan dari `.agents/skills/`: `android-cli`, `android-dev`, `android-jetpack-compose-expert`.
   - Hapus `.agents/rules/03-android-architecture-and-logic.md` dan gantikan dengan standar web/fullstack VELTARA.
   - Perbarui `AGENTS.md`: bersihkan referensi VISTARA dan path lama `d:/vscode/VISTARA`, catat katalog skill VELTARA (`veltara-auth-rbac`, dll).
   - Perbarui `GEMINI.md`: ubah judul dan instruksi menjadi VELTARA.ID.
5. **Perbaikan Error & AI Slop**:
   - Tambahkan `.eslintrc.json` (`{"extends": "next/core-web-vitals"}`).
   - Bersihkan komentar berformat robotik (`// ───`, boilerplate berlebihan).
   - Perbarui seluruh script test (`scripts/test_phase1.ts` s.d. `test_phase9.ts`) agar mencocokkan invariant VELTARA (`VLT-`, `VELTARA.ID`, `veltara.id`).
6. **Konfigurasi Git & README.md**:
   - Tulis `README.md` berawalan `# VELTARA`.
   - Set remote origin ke `https://github.com/IAmYoursRey/VELTARA.git` dan branch `main`.
7. **Verifikasi Penuh**:
   - Jalankan `npm.cmd run typecheck`.
   - Jalankan `npm.cmd run lint`.
   - Jalankan `npm.cmd test`.
   - Jalankan `npm.cmd run build`.

---

## 3. Pre-Execution Self-Correction (Evaluasi Mandiri)
- **Konsistensi Cookie & JWT**: Perubahan nama cookie `veltara_session` dan `iss/aud: 'veltara.id'` harus sinkron 100% antara `middleware.ts`, `auth.service.ts`, dan suite `test_phase2.ts`. Jika salah satu tidak sinkron, tes RBAC akan gagal.
- **Prefix Kode Verifikasi**: Perubahan prefix dari `TLN-` ke `VLT-` pada `verification.service.ts` harus diikuti perubahan regex/pola di `test_phase8.ts` dan `test_phase9.ts`.
- **Git Push Remote**: Jangan menghapus commit history yang ada jika tidak perlu, cukup ubah url remote `git remote set-url origin https://github.com/IAmYoursRey/VELTARA.git` dan lakukan commit komprehensif agar kode tidak hilang.
- **Next.js Build**: Setelah semua perubahan, `next build` harus lulus menghasilkan 25 rute statis/dinamis tanpa peringatan sintaks.
