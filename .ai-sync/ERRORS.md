# Log Error & Mitigasi

| Waktu | Gejala | Root Cause | Solusi & Mitigasi |
|---|---|---|---|
| 2026-10-20 12:04 | `next lint` interaktif prompt ESLint config | Berkas `.eslintrc.json` belum ada di root proyek | Buat `.eslintrc.json` berisi `{"extends": "next/core-web-vitals"}` |
