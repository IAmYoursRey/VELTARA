# VELTARA.ID — Panduan Penerapan Vercel Free-Tier
## GitHub + Vercel Hobby + Neon PostgreSQL + Vercel Blob (Private)

Dokumen ini adalah panduan otoritatif untuk menerapkan **VELTARA.ID** secara mandiri ke infrastruktur cloud gratis:
- **Source Control**: GitHub ([https://github.com/IAmYoursRey/VELTARA.git](https://github.com/IAmYoursRey/VELTARA.git))
- **Application Host**: Vercel (Hobby Tier — Next.js 14 App Router + Serverless FastAPI)
- **Database**: Neon Serverless PostgreSQL (Free Tier)
- **Object Storage**: Vercel Blob (Private Storage)

Tidak memerlukan server VPS berbayar, daemon Docker yang berat, ataupun kartu kredit untuk pengujian dan penerapan skala sekolah.

---

## 1. Arsitektur Penerapan

```text
                    GitHub Repository (IAmYoursRey/VELTARA)
                                   │
                                   ▼
                    Vercel Project (Next.js Framework)
        ┌──────────────────────────┴──────────────────────────┐
        │                                                     │
        ▼                                                     ▼
     Next.js                                           FastAPI Function
  (Frontend PWA App)                                    (`api/index.py`)
        │                                                     │
        ├──────────────────────────┬──────────────────────────┤
        │                          │                          │
        ▼                          ▼                          ▼
   Vercel Blob                Neon PostgreSQL            Session & RBAC
 (Private Bukti Karya &     (Seluruh Data Siswa,        (Server-Enforced
     Unduhan CV PDF)          Portofolio & CV)           di PostgreSQL)
```

---

## 2. Pengaturan Filter Berkas (Apa yang Di-Upload & Tidak Di-Upload)

Sistem telah dikonfigurasi dengan dua lapisan pemfilteran berkas:

### A. Filter Git (`.gitignore` — Berkas yang Dikecualikan dari Repositori)
- **Secrets & Credentials**: `.env`, `.env.local`, `.env*.local`, `*.pem`, `*.key`.
- **Database Lokal**: `*.db`, `*.sqlite`, `*.sqlite3`, `test_*.db`.
- **Uploads & Cache Lokal**: `backend/storage_data/`, `uploads/`, `storage/`, `local_storage/`, `generated_cvs/`.
- **Build & Artifacts**: `.next/`, `build/`, `out/`, `dist/`.
- **Python Cache**: `.venv/`, `__pycache__/`, `*.pyc`, `.pytest_cache/`.

### B. Filter Vercel (`.vercelignore` — Berkas yang Dikecualikan dari Build Deployment)
- **AI Agent Prompts & Memory**: `.agents/`, `.ai-sync/` (hanya untuk pengembangan di IDE).
- **Test Scripts & Local Tests**: `scripts/`, `backend/tests/`.
- **Internal Specs**: `VELTARA/`, `AGENTS.md`, `GEMINI.md`, `MANIFEST.json`.
- **Manfaat**: Ukuran paket Serverless Function sangat kecil (< 15 MB), deployment jauh lebih cepat, dan tidak boros kuota bandwidth Vercel.

---

## 3. Otoritas Routing Produksi

Arsitektur Vercel membagi kepemilikan rute secara tegas:

1. **`/api/*` → Otoritas Penuh FastAPI (`api/index.py`)**:
   - Seluruh endpoint API bisnis VELTARA berada di bawah namespace `/api/*`:
     - `/api/v1/auth/*` (Login, Me, CSRF, Logout)
     - `/api/v1/student/*` (Portofolio, Rekomendasi, CV, Unduhan)
     - `/api/v1/teacher/*` (Antrean validasi, review, rubrik)
     - `/api/v1/admin/*` (Manajemen pengguna, kelas, analitik)
     - `/api/v1/public/*` (Verifikasi publik QR independen)
     - `/api/v1/health/*` (Probe live & ready)
   - Konfigurasi `next.config.mjs` secara otomatis memetakan `/api/:path*` ke Serverless Function `/api/`.
2. **`/blob/*` → Otoritas Next.js Route Handlers (Trusted Vercel Blob Broker)**:
   - Terisolasi di luar `/api/*`:
     - `/blob/upload`: Handler `@vercel/blob/client` `handleUpload` yang memverifikasi izin unggah dengan FastAPI.
     - `/blob/sign`: Broker penandatangan URL sempit (`issueSignedToken` + `presignUrl`) yang dilindungi `BLOB_BROKER_HMAC_SECRET`.
3. **Semua Rute Lainnya → Next.js App Router**:
   - `/`, `/login`, `/student/*`, `/teacher/*`, `/admin/*`, `/verify/*`, `/offline`.

---

## 4. Variabel Lingkungan Vercel (Environment Variables)

Konfigurasikan variabel berikut pada menu **Project Settings > Environment Variables** di Dashboard Vercel:

### A. Rahasia Aplikasi (App Secrets)
| Variabel | Lingkungan | Tujuan / Keterangan |
| :--- | :--- | :--- |
| `DATABASE_URL` | Production, Preview | Neon Pooled connection string (`postgresql+asyncpg://...pooler...`) |
| `JWT_SECRET_KEY` | Production, Preview | Kunci rahasia minimal 32 karakter untuk enkripsi token sesi pengguna |
| `BLOB_BROKER_HMAC_SECRET` | Production, Preview | Kunci rahasia minimal 32 karakter khusus otorisasi internal FastAPI ↔ Next.js Blob broker |
| `IDENTIFIER_LOOKUP_PEPPER` | Production, Preview | Pepper HMAC untuk anonimisasi NISN / NIP di database |
| `CV_VERIFICATION_TOKEN_PEPPER` | Production, Preview | Pepper rahasia untuk hash token verifikasi publik QR |

### B. Konfigurasi Aplikasi (App Config)
| Variabel | Nilai Contoh | Lingkungan | Keterangan |
| :--- | :--- | :--- | :--- |
| `APP_ENV` | `production` | Production, Preview | Mode lingkungan |
| `REPOSITORY_BACKEND` | `postgres` | Production, Preview | Menggunakan PostgreSQL Neon |
| `OBJECT_STORAGE_PROVIDER` | `vercel_blob` | Production, Preview | Provider storage |
| `BLOB_BROKER_TOKEN_TTL_SECONDS` | `60` | Production, Preview | TTL token otorisasi broker internal (detik) |
| `BLOB_DOWNLOAD_URL_TTL_SECONDS` | `300` | Production, Preview | TTL tautan unduh presigned blob langsung (detik) |
| `FREE_TIER_MODE` | `true` | Production, Preview | Mengaktifkan proteksi kuota free-tier |
| `STORAGE_SOFT_LIMIT_BYTES` | `209715200` | Production, Preview | Soft limit storage (200 MB) |
| `CV_PDF_MAX_BYTES` | `4194304` | Production, Preview | Batas aman payload CV PDF (4 MB) |
| `DB_POOL_CLASS` | `queue` | Production, Preview | `queue` (pool_size=2) untuk serverless |
| `COOKIE_SECURE` | `true` | Production, Preview | Enforce HTTPS cookie |
| `ENABLE_DEMO_AUTH` | `false` | Production, Preview | Wajib false di produksi |
| `PUBLIC_APP_URL` | `https://veltara.vercel.app` | Production | URL domain produksi utama Vercel Anda |
| `ALLOWED_ORIGINS` | `https://veltara.vercel.app` | Production | Origin CORS yang diizinkan |

### C. Identitas Blob Terkelola Vercel (Otomatis)
Variabel ini disuntikkan secara otomatis oleh platform Vercel saat Anda membuat Blob Store di tab Storage:
- `VERCEL_OIDC_TOKEN` (Otomatis)
- `BLOB_STORE_ID` (Otomatis)

---

## 5. Panduan Penerapan Langkah-Demi-Langkah

### Langkah 1: Buat Database Neon PostgreSQL Gratis
1. Buka [neon.tech](https://neon.tech) dan masuk dengan akun GitHub Anda.
2. Buat proyek baru (misal: `veltara-db`).
3. Pada dashboard Neon, pilih opsi **Pooled Connection** (yang memiliki host dengan subdomain `-pooler`).
4. Salin string koneksi yang diberikan (contoh: `postgresql://neondb_owner:xyz@ep-pooler.region.aws.neon.tech/neondb?sslmode=require`).

### Langkah 2: Inisialisasi Skema Tabel Neon
Anda dapat langsung membuat seluruh tabel di database Neon hanya dengan satu perintah dari terminal lokal Anda:
```bash
python scripts/init_neon_db.py --db-url "postgresql://neondb_owner:YOUR_PASSWORD@ep-pooler.region.aws.neon.tech/neondb?sslmode=require"
```
*(Gunakan flag `--seed-demo` jika ingin langsung mengisi data awal sekolah dan portofolio percontohan).*

### Langkah 3: Impor Repositori ke Vercel
1. Masuk ke [vercel.com](https://vercel.com).
2. Klik **Add New... > Project** dan pilih repositori `IAmYoursRey/VELTARA`.
3. Vercel akan otomatis mengenali framework **Next.js**.
4. Biarkan konfigurasi Build & Output secara default (Next.js otomatis memaketkan Next.js dan `api/index.py`).

### Langkah 4: Buat Vercel Blob Store (Private)
1. Di halaman proyek Vercel Anda, buka tab **Storage**.
2. Klik **Create Database > Blob**.
3. Beri nama store (misal: `veltara-evidence`).
4. Pastikan opsi **Private** aktif untuk keamanan data portofolio siswa.
5. Klik **Create & Connect**. Vercel akan secara otomatis menautkan kredensial Blob ke deployment Anda.

### Langkah 5: Masukkan Environment Variables di Vercel
1. Buka menu **Project Settings > Environment Variables** di Vercel.
2. Tambahkan seluruh variabel dari template `.env.vercel.example`.
3. Pastikan `DATABASE_URL` menggunakan format `postgresql+asyncpg://...` dengan parameter `?sslmode=require`.

### Langkah 6: Deploy & Uji Aplikasi
1. Klik **Deploy**.
2. Setelah deployment selesai, buka domain yang diberikan Vercel (`https://veltara.vercel.app`).
3. Uji endpoint kesehatan: `https://<domain>/api/v1/health/ready` -> status `ready`.
4. Aplikasi VELTARA.ID Anda sekarang aktif dan berjalan di cloud gratis dengan database Neon dan storage Vercel Blob!
