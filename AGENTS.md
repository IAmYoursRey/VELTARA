# Konfigurasi & Panduan Agent VELTARA.ID

Dokumen ini adalah konstitusi kerja utama untuk AI Agent dalam repositori ini, mengintegrasikan metodologi [OpenHands](https://github.com/OpenHands/OpenHands), prinsip rekayasa modern Full-Stack Web (Next.js + FastAPI), dan sistem tema visual berkualitas tinggi.

---

## 1. Peraturan Utama Komunikasi & Respon
1. **Singkat, Padat, dan Jelas**:
   - Respon tidak boleh bertele-tele atau menyertakan filler text basa-basi.
   - Berikan poin-poin konkret dan langsung ke solusi teknis.
2. **Kewajiban Menjelaskan Bagian yang Diperbaiki**:
   - Setiap kali membuat perubahan atau memperbaiki kode/file, cantumkan rekapitulasi:
     - **File / Komponen yang Diperbaiki**
     - **Poin & Alasan Perbaikan**
     - **Hasil Verifikasi**
3. **Protokol Sinkronisasi Memori AI (`ai-sync-memory`)**:
   - Wajib mengikuti protokol [ai-sync-memory](file:///d:/vscode/VELTARA/.agents/skills/ai-sync-memory/SKILL.md) di SETIAP sesi.
   - Baca `.ai-sync/` di awal (`HANDOFF.md`, `STATE.md`, `TASKS.md`, dll), catat log interaksi dan perubahan file di `CHANGELOG.md` serta file sesi, dan perbarui `HANDOFF.md` di akhir sesi.
4. **Kewajiban Membaca Skill & Audit Regresi Histori AI**:
   - **Wajib Baca SKILL.md**: Selalu baca playbook `SKILL.md` terkait sebelum mengeksekusi tugas non-trivial agar tindakan terarah dan sesuai arsitektur.
   - **Audit Forensik Histori untuk Error**: Ketika mencari atau menyelesaikan error/bug, wajib telusuri riwayat `.ai-sync/CHANGELOG.md`, `DECISIONS.md`, dan log `SESSIONS/` terdahulu untuk memeriksa apakah masalah dipicu oleh modifikasi atau asumsi yang keliru dari AI sebelumnya.
5. **Evolusi Skill & Pencatatan Kesalahan (Self-Improving Loop)**:
   - **Pencatatan Error Real-Time**: Setiap error, bug regresi, kompilasi gagal, atau teguran pengguna wajib dicatat ke `.ai-sync/ERRORS.md` beserta gejala, akar masalah (root cause), solusi, dan mitigasinya.
   - **Pembaruan Skill Wajib saat Terjadi Kesalahan**: Jika error/masalah terjadi karena celah panduan atau ambiguitas prosedur, agen **WAJIB langsung menyempurnakan `SKILL.md` terkait** (menambahkan aturan pencegahan, anti-pattern, atau checklist baru) agar kesalahan serupa dicegah permanen bagi agen masa depan.
   - **Pelacakan Perubahan Skill**: Tandai setiap pembaruan skill di `CHANGELOG.md` dengan tag `[SKILL-EVOLUTION]`.
6. **Alur Kerja Wajib Plan-Verify-Execute (`plan-verify-execute`)**:
   - **Plan First**: Setiap kali ada prompt untuk memperbaiki sesuatu atau memodifikasi kode, AI **WAJIB** merumuskan langkah-langkah kerja konkret dan mengidentifikasi masalah yang ditangani.
   - **Simpan Rencana Sebelum Dikerjakan**: Rencana tindakan **WAJIB** disimpan ke [.ai-sync/PLANS.md](file:///d:/vscode/VELTARA/.ai-sync/PLANS.md) terlebih dahulu sebelum berkas kode pertama disentuh/diedit.
   - **Koreksi Rencana Sebelum Eksekusi**: Lakukan evaluasi mandiri (*Pre-Execution Self-Correction*) terhadap rencana untuk mendeteksi potensi regresi, path berkas salah, atau asumsi keliru.
   - **Eksekusi Bertahap & Verifikasi**: Baru setelah rencana lolos koreksi, kerjakan langkah-langkah secara terukur dan verifikasi hasilnya dengan build/test.

---

## 2. Katalog Skill yang Terpasang (`.agents/skills/`)

Skill dimuat secara modular sesuai kebutuhan tugas:

### A. Domain Inti VELTARA.ID
| Skill | Path | Fungsi & Lingkup Penggunaan |
|---|---|---|
| **veltara-auth-rbac** | [veltara-auth-rbac](file:///d:/vscode/VELTARA/.agents/skills/veltara-auth-rbac/SKILL.md) | Autentikasi VELTARA, JWT/session, routing multi-role, dan server-enforced RBAC. |
| **veltara-portfolio** | [veltara-portfolio](file:///d:/vscode/VELTARA/.agents/skills/veltara-portfolio/SKILL.md) | Alur submission karya, validasi tag kanonikal, rubrik guru, dan state machine. |
| **veltara-talent-engine** | [veltara-talent-engine](file:///d:/vscode/VELTARA/.agents/skills/veltara-talent-engine/SKILL.md) | Scoring deterministik bukti karya, heatmap sekolah, dan translasi bahasa industri. |
| **veltara-cv-verify** | [veltara-cv-verify](file:///d:/vscode/VELTARA/.agents/skills/veltara-cv-verify/SKILL.md) | Pembuatan Digital CV dari karya tervalidasi dan verifikasi QR otentisitas publik. |
| **veltara-ui** | [veltara-ui](file:///d:/vscode/VELTARA/.agents/skills/veltara-ui/SKILL.md) | Rekayasa UI PWA Next.js mobile-first, dashboard multi-role, form, dan chart. |
| **veltara-data-api** | [veltara-data-api](file:///d:/vscode/VELTARA/.agents/skills/veltara-data-api/SKILL.md) | Batas persistensi PostgreSQL, MongoDB, object-storage, dan migrasi skema. |
| **veltara-phase** | [veltara-phase](file:///d:/vscode/VELTARA/.agents/skills/veltara-phase/SKILL.md) | Eksekusi fase pengembangan dengan perumusan scope, delegasi spesialis, dan gate validasi. |
| **veltara-review** | [veltara-review](file:///d:/vscode/VELTARA/.agents/skills/veltara-review/SKILL.md) | Validasi invariant, keamanan privasi, kepatuhan kriteria penerimaan, dan audit regresi. |
| **veltara-context** | [veltara-context](file:///d:/vscode/VELTARA/.agents/skills/veltara-context/SKILL.md) | Pemuatan konteks minimal proyek untuk menjaga token budget dan presisi kerja. |

### B. Inti Rekayasa & Metodologi
| Skill | Path | Fungsi & Lingkup Penggunaan |
|---|---|---|
| **plan-verify-execute** | [plan-verify-execute](file:///d:/vscode/VELTARA/.agents/skills/plan-verify-execute/SKILL.md) | Protokol perumusan rencana, persistence ke PLANS.md, koreksi mandiri, dan verifikasi. |
| **ai-sync-memory** | [ai-sync-memory](file:///d:/vscode/VELTARA/.agents/skills/ai-sync-memory/SKILL.md) | Sinkronisasi riwayat sesi, keputusan, perubahan, dan handoff via folder `.ai-sync/`. |
| **openhands-agent** | [openhands-agent](file:///d:/vscode/VELTARA/.agents/skills/openhands-agent/SKILL.md) | Protokol pengembangan software otonom OpenHands & test-driven development. |
| **clean-code** | [clean-code](file:///d:/vscode/VELTARA/.agents/skills/clean-code/SKILL.md) | Prinsip Uncle Bob: refactoring, readability, dan pemeliharaan arsitektur kode. |
| **systematic-debugging** | [systematic-debugging](file:///d:/vscode/VELTARA/.agents/skills/systematic-debugging/SKILL.md) | Investigasi akar masalah (root-cause), tracing error, & mitigasi regresi. |

### C. Desain Visual, Taste & UI/UX Design Systems
| Skill | Path | Fungsi & Lingkup Penggunaan |
|---|---|---|
| **awesome-design-md** | [awesome-design-md](file:///d:/vscode/VELTARA/.agents/skills/awesome-design-md/SKILL.md) | 84+ spesifikasi DESIGN.md dari brand ternama (Stripe, Apple, Linear, Vercel, dll). |
| **frontend-design** | [frontend-design](file:///d:/vscode/VELTARA/.agents/skills/frontend-design/SKILL.md) | Panduan desain frontend tanpa generic AI slop, layout berkarakter, dan motion terarah. |
| **atlas-agent-visual** | [atlas-agent-visual](file:///d:/vscode/VELTARA/.agents/skills/atlas-agent-visual/SKILL.md) | Sistem desain visual AI agent (AMOLED-black, multi-surface, CSS tokens). |
| **ui-ux-pro-max** | [ui-ux-pro-max](file:///d:/vscode/VELTARA/.agents/skills/ui-ux-pro-max/SKILL.md) | Basis data intelijen UI/UX (50+ gaya, 97 palet, 57 tipografi, 99 aturan UX). |
| **theme-factory** | [theme-factory](file:///d:/vscode/VELTARA/.agents/skills/theme-factory/SKILL.md) | 10 palet tema profesional + katalog preset tema terkurasi. |

### D. Frontend Frameworks, React & Vercel
| Skill | Path | Fungsi & Lingkup Penggunaan |
|---|---|---|
| **react-best-practices** | [react-best-practices](file:///d:/vscode/VELTARA/.agents/skills/react-best-practices/SKILL.md) | Aturan optimasi performa React & Next.js dari Vercel Engineering. |
| **composition-patterns** | [composition-patterns](file:///d:/vscode/VELTARA/.agents/skills/composition-patterns/SKILL.md) | Pola komposisi komponen React yang skalabel (compound, context, React 19). |
| **react-view-transitions** | [react-view-transitions](file:///d:/vscode/VELTARA/.agents/skills/react-view-transitions/SKILL.md) | Implementasi native View Transitions API pada React & Next.js. |
| **web-design-guidelines** | [web-design-guidelines](file:///d:/vscode/VELTARA/.agents/skills/web-design-guidelines/SKILL.md) | Audit kepatuhan antarmuka web terhadap Vercel Web Interface Guidelines. |
| **web-artifacts-builder** | [web-artifacts-builder](file:///d:/vscode/VELTARA/.agents/skills/web-artifacts-builder/SKILL.md) | Pembuatan antarmuka web interaktif mandiri (React, Tailwind, Lucide). |

### E. Quality Assurance & Browser Automation
| Skill | Path | Fungsi & Lingkup Penggunaan |
|---|---|---|
| **playwright-cli** | [playwright-cli](file:///d:/vscode/VELTARA/.agents/skills/playwright-cli/SKILL.md) | Automasi browser CLI headless/headed via Playwright. |
| **webapp-testing** | [webapp-testing](file:///d:/vscode/VELTARA/.agents/skills/webapp-testing/SKILL.md) | Pengujian end-to-end aplikasi web lokal. |

---

## 3. Standar Logika & Visual

- **Aplikasi Web**: Gunakan Next.js 14 App Router, TypeScript, Tailwind CSS, Material/Atlas tokens, dan Unidirectional Data Flow (StateFlow/Adapters).
- **Backend Persistensi**: Gunakan FastAPI Python, PostgreSQL (relational source-of-truth), MongoDB (dynamic document), dan Object Storage (evidence blobs).
- **Estetika Visual**: Gunakan palet warna terkurasi berkelas luxury-tech modern (Electric Violet, Deep Indigo, Emerald Status, Slate Borders). Hindari layout generik atau AI slop tanpa hierarki.
