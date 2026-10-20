# Rencana Kerja: Deployment Vercel, Neon PostgreSQL, Vercel Blob & Filter Upload

## 1. Identifikasi Masalah & Kebutuhan
- **Target Deployment**: Aplikasi VELTARA.ID (Next.js 14 App Router + Python FastAPI Serverless) harus siap digunakan dan dideploy di platform **Vercel Free-Tier**.
- **Database Neon PostgreSQL**: Memanfaatkan database gratis Neon (Serverless PostgreSQL) sebagai single-source-of-truth terpadu untuk data siswa, sekolah, portofolio, rubrik, sesi, dan verifikasi publik.
- **Object Storage Vercel Blob**: Mengonfigurasi Vercel Blob private storage untuk penyimpanan bukti karya siswa dan file CV digital secara aman dengan kuota gratis.
- **Filter Upload (Apa yang Perlu & Tidak Perlu Diunggah)**:
  - **Git Upload (`.gitignore`)**: Melindungi secrets (`.env*`), database lokal (`*.sqlite`, `*.db`), storage upload lokal (`storage_data/`, `uploads/`), logs, cache OS/Node, dan build artifacts dari commit repository.
  - **Vercel Build Upload (`.vercelignore`)**: Mengabaikan artefak internal AI (`.ai-sync/`, `.agents/`), test suites (`scripts/test_*.ts`, `backend/tests/`), artefak lokal, dan dokumentasi arsitektur internal agar ukuran payload serverless function ringan, cepat di-build, dan tidak melebihi batas kuota Vercel.
- **Tooling & Migrasi**: Menyediakan skrip dan petunjuk satu langkah bagi pengguna untuk menghubungkan dan menginisialisasi tabel Neon DB dengan mudah.

---

## 2. Langkah Kerja Terukur

1. **Pembuatan `.vercelignore` (Filter Berkas untuk Vercel Build)**:
   - Definisikan file dan folder yang **TIDAK PERLU** diunggah atau diproses oleh build engine Vercel:
     - `.ai-sync/` (catatan sinkronisasi AI)
     - `.agents/` (katalog prompt dan skill AI berukuran besar)
     - `scripts/` (testing suite dan validator lokal)
     - `backend/tests/` (unit & integration tests Python lokal)
     - `backend/storage_data/`, `uploads/`, `local_storage/`
     - `*.sqlite`, `*.db`, `test_*.db`
     - `.git/`, `.github/`, `.vscode/`
     - File dokumentasi internal yang tidak memengaruhi runtime.
2. **Penyempurnaan `.gitignore` (Filter Berkas untuk Git)**:
   - Pastikan seluruh secret, file `.env.production.local`, storage data lokal, dan cache benar-benar terisolasi dari Git.
3. **Konfigurasi Vercel (`vercel.json`) & Routing**:
   - Pastikan `vercel.json` memiliki konfigurasi headers keamanan, memori/maxDuration function Python jika diperlukan, dan harmonis dengan Next.js App Router & FastAPI runtime di `api/index.py`.
4. **Adapter & Validasi Neon PostgreSQL**:
   - Periksa `backend/app/core/database.py` dan `backend/app/core/config.py` untuk memastikan koneksi Neon PostgreSQL:
     - Menormalkan connection string Neon (`postgresql+asyncpg://...pooler...` & `ssl=require`).
     - Menghapus opsi libpq yang tidak kompatibel (`channel_binding`).
     - Mengatur connection pool hemat koneksi (`AsyncAdaptedQueuePool` max 2 atau `NullPool`) untuk mencegah connection explosion pada serverless function.
5. **Vercel Blob Integration (Private)**:
   - Memastikan `src/app/blob/upload/route.ts` dan `src/app/blob/sign/route.ts` siap menggunakan token OIDC Vercel (`VERCEL_OIDC_TOKEN`) atau fallback `BLOB_READ_WRITE_TOKEN`.
   - Mengonfigurasi `backend/app/storage/vercel_blob.py` dan `src/lib/blob-security.ts` agar tersinkronisasi dengan secret `BLOB_BROKER_HMAC_SECRET`.
6. **Script Otomatisasi Migrasi Neon (`scripts/init_neon_db.py`)**:
   - Buat skrip pembantu Python yang bisa dieksekusi dengan mudah untuk menjalankan migrasi skema tabel dan seed initial data ke Neon Database.
7. **Pembaruan Konfigurasi & Dokumentasi Environment**:
   - Perbarui `.env.vercel.example` dan `.env.example` dengan branding `VELTARA.ID`.
   - Perbarui [`VELTARA/VERCEL_DEPLOYMENT.md`](file:///d:/vscode/VELTARA/VELTARA/VERCEL_DEPLOYMENT.md) dengan panduan langkah-demi-langkah jelas:
     - Cara membuat DB Neon gratis dan mengambil Pooled URL.
     - Cara membuat Private Blob Store di Vercel.
     - Cara mengatur Environment Variables di Vercel.
     - Cara menjalankan inisialisasi tabel Neon.
8. **Verifikasi Build & Test**:
   - Jalankan `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd test`, dan `npm.cmd run build`.
   - Pastikan tidak ada regresi dan 25 rute sukses ter-generate.
9. **Git Commit & Push**:
   - Stage semua perubahan konfigurasi dan dokumentasi.
   - Commit dan push ke `https://github.com/IAmYoursRey/VELTARA.git`.

---

## 3. Pre-Execution Self-Correction (Evaluasi Mandiri)
- **Koneksi Neon Serverless**: Neon menggunakan PgBouncer pooler secara default pada mode pooling. Asyncpg akan gagal jika prepared statement di-cache pada pooled connection. Karena itu, setting `statement_cache_size: 0` dan `prepared_statement_cache_size: 0` di `database.py` harus tetap aktif.
- **Vercel Blob Private vs Public**: Vercel Blob store harus disetel ke `access: private` untuk melindungi bukti karya siswa dan dokumen CV. Penandatanganan token hanya dilakukan melalui broker terpercaya `/blob/sign` dan `/blob/upload`.
- **Tidak Memutus `.agents/` di Git**: `.agents/` tetap di-commit ke Git (karena dibutuhkan untuk instruksi agent di repo), namun dimasukkan ke `.vercelignore` agar tidak membebani deployment size Vercel.
- **Zero Runtime Error**: Build Next.js (`npm run build`) harus tetap menghasilkan exit code 0 dengan 25 halaman terkompilasi.
