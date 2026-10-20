---
name: ai-sync-memory
description: Wajib dipakai di SETIAP sesi pada proyek ini. Mencatat seluruh riwayat percakapan, perubahan, keputusan, dan progres ke folder `.ai-sync/` supaya pekerjaan bisa dilanjutkan oleh AI/model lain (Gemini, Claude, GPT, dll.), tetap aman jika chat korup/terhapus, dan antar-AI bisa saling berkomunikasi serta sinkron.
---

# Skill: AI Sync Memory

## Tujuan
1. **Riwayat permanen**: semua percakapan penting, perubahan, dan keputusan tersimpan di file, bukan hanya di chat.
2. **Handoff mulus**: AI lain (model/vendor berbeda) bisa lanjut tanpa bertanya ulang.
3. **Tahan kehilangan data**: jika chat hilang/korup, proyek bisa dipulihkan dari folder `.ai-sync/`.
4. **Sinkron multi-AI**: beberapa AI mengerjakan 1 proyek tanpa saling menimpa, dan bisa berkomunikasi lewat papan pesan.

## Aturan emas
- **File adalah sumber kebenaran, bukan ingatan chat.** Jika tidak tertulis di `.ai-sync/`, anggap tidak pernah terjadi.
- **Append-only** untuk log (`CHANGELOG`, `SESSIONS`, `BOARD`, `DECISIONS`). Jangan hapus atau edit entri lama; koreksi dengan entri baru.
- **Jangan menyimpan rahasia** (API key, password, token). Tulis `[REDACTED]` dan sebut lokasinya saja.
- **Tulis netral**: jangan memakai fitur khusus satu AI. Pakai Markdown polos agar semua model bisa membaca.
- Waktu pakai format ISO: `2026-10-19 14:42 +07:00`.
- Identitas agen: `<vendor>-<model>`, contoh `gemini-3.8-flash`, `gemini-2.5-pro`, `claude-sonnet`, `gpt-5`.

## Struktur folder

```
.ai-sync/
├── README.md          # penjelasan singkat protokol ini
├── STATE.md           # snapshot status proyek SAAT INI (ditimpa/diperbarui)
├── HANDOFF.md         # catatan serah-terima ke AI berikutnya (diperbarui tiap akhir sesi)
├── TASKS.md           # daftar tugas: todo / doing / blocked / done + pemilik
├── PLANS.md           # repositori rencana tindakan sebelum eksekusi (plan-verify-execute)
├── DECISIONS.md       # keputusan penting + alasannya (append-only)
├── CHANGELOG.md       # riwayat perubahan file/kode (append-only)
├── ERRORS.md          # log kegagalan, error, bug regresi & perbaikan (append-only)
├── BOARD.md           # papan komunikasi antar-AI (append-only)
├── AGENTS.md          # daftar AI yang terlibat, peran, dan terakhir aktif
├── LOCKS/             # penanda file yang sedang dikerjakan (1 file per kunci)
├── SESSIONS/          # log percakapan per sesi: YYYY-MM-DD_HHMM_<agen>.md
└── SNAPSHOTS/         # cadangan STATE/TASKS berkala
```

## Protokol

### 1. Awal sesi (WAJIB, sebelum mengerjakan apa pun)
1. Cek dan baca file `SKILL.md` yang relevan dengan tugas yang diminta pengguna sebelum mengambil tindakan teknis.
2. Cek folder `.ai-sync/`. Jika belum ada, buat semua file di atas dengan isi awal dari templat.
3. Baca berurutan: `HANDOFF.md` → `STATE.md` → `TASKS.md` → 20 entri terakhir `BOARD.md` → 10 entri terakhir `CHANGELOG.md` → `ERRORS.md` → `DECISIONS.md` → sesi terakhir di `SESSIONS/`.
4. Periksa histori perubahan dan riwayat error untuk mendeteksi potensi regresi atau efek samping yang disebabkan oleh perubahan AI terdahulu.
5. Cek `LOCKS/`. Jangan sentuh file yang dikunci agen lain (kecuali kunci kadaluarsa, lihat bagian Kunci).
6. Daftarkan/perbarui diri di `AGENTS.md`.
7. Buat file sesi baru: `SESSIONS/YYYY-MM-DD_HHMM_<agen>.md`.
8. Tulis ringkasan 2–3 kalimat ke pengguna: "Saya membaca riwayat; status terakhir: …; saya lanjut dari: …".

### 2. Selama bekerja
- **Setiap interaksi bermakna** (permintaan pengguna, jawaban penting, keputusan, error, solusi) → tambahkan ke file sesi aktif. Jangan menunggu akhir sesi.
- **Setiap perubahan file/kode** → tambahkan entri ke `CHANGELOG.md` segera setelah perubahan.
- **Setiap keputusan** (pilihan teknologi, struktur, pendekatan yang ditolak) → `DECISIONS.md`.
- **Setiap error / bug / kegagalan** → catat langsung ke `ERRORS.md` dan file sesi beserta root cause & solusinya.
- **Status tugas berubah** → perbarui `TASKS.md`.
- **Butuh sesuatu dari AI lain / menemukan masalah lintas-bagian** → tulis di `BOARD.md`.
- Sebelum mengedit file penting, buat kunci di `LOCKS/`; hapus setelah selesai.
- Setiap ±10 interaksi atau setelah milestone: perbarui `STATE.md`.

### 3. Akhir sesi (atau ketika diminta berhenti/ganti AI)
1. Tutup file sesi dengan bagian **Ringkasan Sesi**.
2. Perbarui `STATE.md` (kondisi terkini) dan `TASKS.md`.
3. Tulis ulang `HANDOFF.md` secara lengkap (lihat templat).
4. Hapus semua kunci milik sendiri di `LOCKS/`.
5. Tulis 1 entri penutup di `BOARD.md`.
6. Jika pengguna tiba-tiba bilang "pindah ke AI lain / limit habis", lakukan langkah 1–5 **segera** sebelum hal lain.

### 4. Pemulihan (chat korup / terhapus / konteks hilang)
1. Jangan panik dan jangan memulai dari nol. Baca `.ai-sync/` sesuai urutan "Awal sesi".
2. Bandingkan `STATE.md` dengan kondisi file proyek sebenarnya (cek tanggal modifikasi, `git log`/`git status` bila ada).
3. Jika ada selisih (perubahan tidak tercatat), catat di `CHANGELOG.md` dengan tag `[REKONSTRUKSI]` dan beri tahu pengguna.
4. Jika file sesi terakhir terpotong, tandai `[TERPOTONG]` dan lanjutkan di sesi baru.
5. Konfirmasi ke pengguna ringkasan hasil pemulihan sebelum melanjutkan pekerjaan besar.

### 5. Sinkron & komunikasi antar-AI
- **Semua komunikasi lewat `BOARD.md`**, bukan asumsi. Setiap pesan wajib punya: pengirim, tujuan (`@nama-agen` atau `@semua`), jenis, isi, dan status.
- Jenis pesan: `INFO`, `PERTANYAAN`, `PERMINTAAN`, `PERINGATAN`, `JAWABAN`, `BLOKIR`.
- AI penerima wajib membalas dengan entri `JAWABAN` yang merujuk ID pesan, lalu mengubah status menjadi `selesai` lewat entri baru (jangan edit yang lama).
- **Pembagian kerja**: setiap tugas di `TASKS.md` punya satu pemilik. Jangan mengerjakan tugas milik agen lain tanpa mengambil alih lewat pesan di `BOARD.md`.
- **Konflik**: jika dua AI mengubah hal yang sama, yang kedua berhenti, menulis `PERINGATAN` di `BOARD.md`, dan menunggu keputusan pengguna. Jangan menimpa pekerjaan agen lain.
- **Perbedaan kemampuan model**: tulis instruksi secara eksplisit (jalur file lengkap, perintah persis, kriteria selesai). Jangan mengandalkan "konteks yang sudah jelas".

### 6. Kunci (`LOCKS/`)
- Nama file: `<nama-file-yang-dikunci-dengan-/-diganti-__>.lock`
- Isi: `agen`, `waktu mulai`, `alasan`.
- Kunci dianggap **kadaluarsa setelah 2 jam** tanpa pembaruan. Kunci kadaluarsa boleh diambil alih, tapi wajib dicatat di `BOARD.md`.

### 7. Investigasi Akar Masalah & Audit Regresi AI (Forensik Error)
1. **Curigai Modifikasi Sebelumnya**: Ketika pengguna melaporkan masalah atau terjadi error saat pengujian/eksekusi, langkah awal adalah meneliti entri terbaru di `CHANGELOG.md`, `ERRORS.md`, `DECISIONS.md`, dan `SESSIONS/`.
2. **Korelasi File & Fitur**: Cek apakah file atau fungsi yang bermasalah baru saja disentuh oleh AI sebelumnya. Telusuri apakah perubahan logika, refaktor yang keliru, atau hilangnya kode penting menjadi penyebab utama.
3. **Pencatatan Temuan Regresi**: Jika error terbukti disebabkan oleh kesalahan AI sebelumnya, catat temuan ini di file sesi dan `CHANGELOG.md` dengan tag `[REGRESI-FIX]` agar AI berikutnya mengetahui konteks perbaikan tersebut.

### 8. Evolusi Skill Berkelanjutan Berdasarkan Kesalahan (Self-Improving Loop)
1. **Kewajiban Memperbarui Skill saat Ada Kesalahan**:
   - Jika suatu error terjadi karena ketiadaan panduan, ambiguitas prosedur, atau kesalahan berulang dari AI, agen **WAJIB langsung memperbarui `SKILL.md` terkait** (misal: menambahkan aturan pencegahan, anti-pattern, checklist pra-eksekusi, atau catatan jebakan).
   - Jangan biarkan kesalahan hanya berhenti sebagai perbaikan kode sekali jalan; tanamkan pencegahannya langsung ke dalam `SKILL.md` agar AI berikutnya di masa mendatang tidak mengulangi kesalahan yang sama.
2. **Pencatatan ke `ERRORS.md`**:
   - Setiap kali terjadi error teknis atau teguran kesalahan dari pengguna, catat entri baru ke `.ai-sync/ERRORS.md` yang memuat: Gejala, Root Cause, Solusi Kode, dan Bagian `SKILL.md` yang diperbarui.
3. **Tandai di `CHANGELOG.md`**:
   - Gunakan tag `[SKILL-EVOLUTION]` di `CHANGELOG.md` setiap kali memperbarui file `SKILL.md` sebagai bukti evolusi kompetensi agen.

## Templat

### `STATE.md`
```markdown
# STATE — diperbarui: <waktu> oleh <agen>

## Ringkasan proyek
<1 paragraf: apa proyeknya, tujuannya>

## Kondisi saat ini
- Bagian yang selesai: ...
- Sedang dikerjakan: ...
- Rusak / bermasalah: ...

## Teknologi & struktur penting
- ...

## Cara menjalankan / menguji
- ...
```

### `HANDOFF.md`
```markdown
# HANDOFF — <waktu> dari <agen> untuk <agen berikutnya / siapa saja>

## Terakhir dikerjakan
...
## Langkah berikutnya (urut prioritas)
1. ...
2. ...
## Hal yang HARUS diketahui
- Jebakan, bug, hal yang sudah dicoba dan gagal, preferensi pengguna
## File yang sedang berubah / belum selesai
- `path/file` — kondisi
## Pertanyaan terbuka untuk pengguna
- ...
```

### `TASKS.md`
```markdown
| ID | Tugas | Status | Pemilik | Diperbarui | Catatan |
|----|-------|--------|---------|------------|---------|
| T-001 | ... | todo/doing/blocked/done | gemini-3.8-flash | 2026-10-19 14:42 | ... |
```

### `CHANGELOG.md` (entri baru ditambah di bawah)
```markdown
## 2026-10-19 14:42 +07:00 — <agen>
- **File**: `path/file`
- **Jenis**: tambah | ubah | hapus | pindah
- **Apa & mengapa**: ...
- **Terkait**: T-001, D-003
```

### `DECISIONS.md`
```markdown
## D-003 — <judul> (2026-10-19, <agen>)
- **Keputusan**: ...
- **Alasan**: ...
- **Alternatif ditolak**: ...
- **Dampak**: ...
```

### `BOARD.md`
```markdown
### M-012 | 2026-10-19 14:42 | dari: gemini-3.8-flash | ke: @claude-sonnet | jenis: PERMINTAAN | status: terbuka
Isi pesan yang jelas dan bisa dikerjakan tanpa konteks tambahan.

### M-013 | 2026-10-19 15:05 | dari: claude-sonnet | ke: @gemini-3.8-flash | jenis: JAWABAN (re: M-012) | status: selesai
Balasan...
```

### `AGENTS.md`
```markdown
| Agen | Peran | Kekuatan/Batasan | Terakhir aktif |
|------|-------|------------------|----------------|
| gemini-3.8-flash | fullstack | Perbaikan kode & integrasi memori | 2026-10-19 14:42 |
```

### `ERRORS.md` (append-only)
```markdown
## E-001 | 2026-10-19 15:00 +07:00 — <agen>
- **Gejala / Pesan Error**: ...
- **File / Komponen**: `path/file`
- **Penyebab (Root Cause)**: ... (analisis mengapa ini terjadi, apakah ada asumsi salah dari AI)
- **Solusi & Perbaikan**: ...
- **Pembaruan Skill (Pencegahan)**: Menyempurnakan `SKILL.md` pada bagian ... agar tidak terulang
```

### File sesi `SESSIONS/YYYY-MM-DD_HHMM_<agen>.md`
```markdown
# Sesi 2026-10-19 14:42 — <agen>
**Tujuan sesi**: ...

## Log
- [14:42] **Pengguna**: <ringkasan/isi permintaan>
- [14:44] **<agen>**: <ringkasan tindakan & hasil>
- [14:50] **Error**: <pesan> → **Solusi**: ...

## Ringkasan Sesi (diisi saat penutupan)
- Selesai: ...
- Belum selesai: ...
- Perubahan file: lihat CHANGELOG
```

## Checklist cepat sebelum menjawab pengguna
- [ ] Sudah membaca `.ai-sync/` di awal sesi?
- [ ] Interaksi ini sudah masuk file sesi?
- [ ] Perubahan sudah masuk `CHANGELOG.md`?
- [ ] Keputusan baru sudah masuk `DECISIONS.md`?
- [ ] Apakah ada error / kesalahan baru? Sudah dicatat ke `ERRORS.md`?
- [ ] Apakah `SKILL.md` sudah diperbarui jika kesalahan merupakan celah panduan?
- [ ] Ada pesan untuk AI lain di `BOARD.md`?
- [ ] Tidak ada rahasia yang tertulis?

