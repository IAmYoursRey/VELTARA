---
trigger: Apply to any task, prompt, bug fix, or code modification in this workspace.
---

# Rule: Alur Wajib Plan-Verify-Execute (Rencana, Koreksi, Eksekusi)

Aturan ini wajib ditaati oleh setiap AI Agent yang beroperasi di repositori VELTARA saat menerima prompt perbaikan, penambahan fitur, atau modifikasi kode.

## 1. Kewajiban Merumuskan & Menyimpan Rencana (Plan First & Persistence)
Sebelum melakukan modifikasi kode atau menjalankan aksi eksekusi pada basis kode:
1. **Identifikasi Masalah & Target**:
   - Definisikan secara jelas masalah apa yang sedang diperbaiki atau fitur apa yang diminta.
   - Cantumkan komponen dan berkas target yang akan disentuh.
2. **Rincian Langkah Konkret (Step-by-Step Plan)**:
   - Rumuskan langkah-langkah kerja berurutan dari awal hingga selesai.
3. **Penyimpanan Permanen (Mandatory Persistence)**:
   - Simpan entri rencana secara permanen ke [PLANS.md](file:///d:/vscode/VELTARA/.ai-sync/PLANS.md) sebelum file kode pertama disentuh/diedit.

## 2. Peninjauan & Koreksi Mandiri Rencana (Pre-Execution Review)
Sebelum mengeksekusi langkah pertama pada kode:
1. Agen **WAJIB** meninjau ulang rencana (Self-Correction):
   - Cek keabsahan path file dan fungsi target.
   - Analisis potensi efek samping dan risiko regresi terhadap ekosistem VELTARA (Next.js React PWA, FastAPI backend, dan test suite).
   - Pastikan rencana selaras dengan prinsip Clean Code dan desain arsitektur.
2. Jika ditemukan celah atau kekeliruan asumsi, perbaiki rencana terlebih dahulu dan catat koreksinya di [PLANS.md](file:///d:/vscode/VELTARA/.ai-sync/PLANS.md).

## 3. Eksekusi Bertahap & Verifikasi Hasil
1. Jalankan eksekusi langkah demi langkah sesuai rencana yang telah dikoreksi.
2. Lakukan validasi teknis (build `npm run build`, lint `npm run lint`, testing `npm test`, dsb.).
3. Berikan rekapitulasi perbaikan sesuai aturan [01-concise-and-change-explanation.md](file:///d:/vscode/VELTARA/.agents/rules/01-concise-and-change-explanation.md) dan perbarui status di `.ai-sync/`.
