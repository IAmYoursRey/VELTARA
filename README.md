# VELTARA

**VELTARA.ID** — Platform Portofolio Digital Pintar & Analitik Talenta Siswa Berbasis Proof-of-Work Nyata, Validasi Guru, dan Rekomendasi Studi/Karier Objektif.

---

## 🌟 Ikhtisar Platform

VELTARA.ID menjembatani kesenjangan antara karya nyata siswa di sekolah vokasi/menengah dengan kebutuhan industri modern dan pendidikan tinggi. Melalui sistem verifikasi bertingkat, setiap karya siswa melalui kurasi, asesmen rubrik guru, dan proyeksi kompetensi deterministik tanpa mengorbankan privasi data pribadi.

### Fitur Utama:
- **Portofolio Proof-of-Work**: Pengunggahan karya nyata siswa dengan 3–5 tag kompetensi kanonikal dan bukti link/file.
- **Validasi Guru & Asesmen Rubrik**: Alur telaah terstruktur dengan rubrik 5 dimensi soft skill dan feedback terarah.
- **Mesin Talenta & Heatmap Sekolah**: Pemetaan agregat kompetensi sekolah secara deterministik dan rekomendasi karier berbasis bukti.
- **Digital CV & Verifikasi QR Publik**: Penerbitan CV digital dengan tanda tangan snapshot kriptografis (SHA-256) dan verifikasi publik instan tanpa mengekspos NISN/data sensitif.
- **Multi-Role Portal**: Dashboard terdedikasi untuk Siswa, Guru Pembimbing, dan Administrator Sekolah.
- **PWA Mobile-First**: Antarmuka responsif ramah smartphone dengan dukungan offline caching dan performa tinggi.

---

## 🛠️ Stack Teknologi

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Recharts.
- **Backend API**: Python FastAPI, SQLAlchemy, Uvicorn.
- **Basis Data**: PostgreSQL (Relational Source-of-Truth), MongoDB (Dokumen Bukti Dinamis), Object Storage.
- **Keamanan**: Stateless HMAC-SHA256 Edge Session Cookies, CSRF Guard, Privacy Token Hashing, Zero Raw PII Leakage.

---

## 🚀 Memulai (Quick Start)

### 1. Prasyarat
- Node.js >= 18.x
- Python >= 3.10 (untuk backend)

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Menjalankan Server Pengembangan
Frontend (Next.js):
```bash
npm run dev
```
Akses di browser: `http://localhost:3000`

Backend (FastAPI, opsional):
```bash
npm run dev:backend
```

### 4. Menjalankan Pengujian & Verifikasi Invariant
```bash
# Typecheck TypeScript
npm run typecheck

# Linting kode
npm run lint

# Seluruh Test Suite Invariant (Phase 1 s.d. Phase 9)
npm test

# Build Produksi Next.js
npm run build
```

---

## 📂 Struktur Repositori

```text
├── .agents/             # Konfigurasi agen AI, skills, dan konstitusi kerja
│   ├── agents/          # Spesialis agen (orchestrator, ui, platform, intelligence, reviewer)
│   ├── rules/           # Standar keamanan, arsitektur web, dan clean code
│   └── skills/          # Playbook modular VELTARA (auth, portfolio, cv-verify, dll)
├── .ai-sync/            # Sinkronisasi memori multi-AI lintas sesi
├── public/              # Aset statis, ikon PWA SVG baru, service worker
│   └── icons/           # Ikon emblem V 3D faceted modern
├── src/
│   ├── app/             # Next.js App Router (Student, Teacher, Admin, Verify, Offline, Login)
│   ├── components/      # Komponen UI modular (Layout, Common, Dashboard)
│   ├── mocks/           # Mock data adapter untuk prototype mandiri
│   ├── services/        # Service layer abstraksi frontend
│   └── types/           # Definisi tipe TypeScript
├── scripts/             # Test suite verifikasi penerimaan (test_phase1-9.ts)
└── VELTARA/             # Blueprint fase arsitektur dan dokumentasi teknis
```

---

## 🔒 Privasi & Keamanan

VELTARA.ID mematuhi prinsip **Privacy by Design**:
- NISN, NIP/NUPTK, dan password tidak pernah disimpan di JWT atau diekspos di URL publik.
- Halaman verifikasi publik (`/verify/[token]`) hanya menampilkan display code dan ringkasan kompetensi yang telah disetujui guru.
- Seluruh endpoint mutasi dilindungi dengan double-submit CSRF cookie guard.

---

## 📄 Lisensi
Hak Cipta © 2026 VELTARA.ID. Seluruh hak cipta dilindungi.
