<div align="center">
  
  # 🛡️ YOUTH-GUARD (INTEGRATED YOUTH CONFLICT & GANG ACTIVITY DETERRENT SYSTEM)
  ### Platform Digital Pelaporan Anonim, Pemetaan Zona Merah, dan Mitigasi Dini Kenakalan Remaja (Perkelahian & Gerombolan Bermotor)
  <br>

  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://youth-guard.vercel.app)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/davidleonardo/youth-guard)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
  <br>

  **Submission for ITECHNO CUP 2026 - Web Development Category**
  <br>
  **Official Project Documentation v2.4.0**
  <br>
  
  **By Tim Developer (SMKN 2 Tasikmalaya)**
  
</div>

---
<br>

## 📋 Daftar Isi

- [1. Executive Summary & Visi Proyek](#1-executive-summary--visi-proyek)
- [2. Latar Belakang Masalah & Urgensi](#2-latar-belakang-masalah--urgensi)
- [3. Solusi & Value Proposition](#3-solusi--value-proposition)
- [4. Tim Developer](#4-tim-developer)
- [5. Fitur Unggulan Sistem](#5-fitur-unggulan-sistem)
- [6. Demo Aplikasi & Antarmuka](#6-demo-aplikasi--antarmuka)
- [7. Spesifikasi Teknologi (Tech Stack)](#7-spesifikasi-teknologi-tech-stack)
- [8. Arsitektur Sistem & Alur Data](#8-arsitektur-sistem--alur-data)
- [9. Struktur Direktori Proyek](#9-struktur-direktori-proyek)
- [10. Panduan Instalasi & Setup Lokal](#10-panduan-instalasi--setup-lokal)
- [11. Panduan Penggunaan (User Manual)](#11-panduan-penggunaan-user-manual)
- [12. Dokumentasi API (Endpoints)](#12-dokumentasi-api-endpoints)
- [13. Keamanan, Privasi, & Zero-Knowledge Approach](#13-keamanan-privasi--zero-knowledge-approach)
- [14. Pengujian Sistem (Testing & Coverage)](#14-pengujian-sistem-testing--coverage)
- [15. Roadmap & Pengembangan Masa Depan](#15-roadmap--pengembangan-masa-depan)
- [16. Kesimpulan](#16-kesimpulan)
- [17. Lisensi](#17-lisensi)

<br>

---
<br>

## 1. Executive Summary & Visi Proyek
<br>
**YOUTH-GUARD** adalah sistem informasi berbasis web real-time yang dirancang khusus untuk mendeteksi, mencegah, dan menanggulangi eskalasi kenakalan remaja kelas berat, dengan fokus utama pada **perkelahian antar pelajar (tawuran)** dan **teror gerombolan bermotor (geng motor)**. Menggabungkan teknologi *Geo-Spatial Mapping*, enkripsi data tanpa identitas (*Anonymous Zero-Knowledge Reporting*), dan komunikasi *WebSockets*, proyek ini menjembatani jurang komunikasi antara masyarakat, pihak institusi pendidikan (Guru BK), dan aparat penegak hukum secara instan.
<br><br>
Visi besar kami di ITECHNO CUP 2026 adalah menciptakan lingkungan pendidikan dan ruang publik yang aman dari ancaman kekerasan jalanan melalui pemanfaatan teknologi digital yang inklusif, responsif, dan akurat.
<br>

---
<br>

## 2. Latar Belakang Masalah & Urgensi
<br>
Fase remaja (usia 13–18 tahun) diwarnai oleh pencarian identitas kelompok yang tinggi. Sayangnya, dalam beberapa tahun terakhir, dinamika sosial ini mengalami pergeseran destruktif:
<br>

*   **Eskalasi Tawuran Terorganisir**: Perkelahian antar pelajar kini tidak lagi sekadar baku hantam tangan kosong selepas jam sekolah, melainkan menggunakan senjata tajam, gir motor, dan direncanakan melalui grup media sosial tertutup.
*   **Teror Gerombolan Bermotor (Geng Motor)**: Kelompok remaja yang mengatasnamakan "klub motor" sering melakukan konvoi malam hari, merusak fasilitas umum, melakukan penjarahan kecil-kecilan, hingga melukai warga sipil tanpa alasan yang jelas.
*   **Bystander Effect & Budaya Bungkam**: Siswa yang mengetahui rencana penyerangan atau titik kumpul sering kali memilih diam karena takut menjadi korban perundungan (*bullying*) lanjutan atau diintimidasi oleh senior kelompok pelaku.
*   **Keterlambatan Respons Aparat**: Polisi dan pihak sekolah sering kali baru bergerak setelah insiden berdarah terjadi karena minimnya kanal aduan dini yang cepat, aman, dan akurat secara koordinat.

<br>

---
<br>

## 3. Solusi & Value Proposition
<br>
Untuk menjawab permasalahan di atas, **YOUTH-GUARD** menawarkan pendekatan inovatif yang terintegrasi:
<br>

-   🛡️ **100% Anonim & Aman**: Sistem menghapus semua metadata pelapor (IP, nomor perangkat, nama) secara otomatis pada saat enkripsi data dikirim, memberikan rasa aman mutlak bagi pelapor.
-   📍 **Live Threat Mapping**: Pemetaan geografis zona merah tempat nongkrong atau rute yang biasa digunakan gerombolan bermotor untuk melakukan aksi kriminal.
-   ⚡ **Automated Escalation System**: Jika laporan kategori tinggi (misal: membawa sajam) tidak direspons dalam kurun waktu 10 menit oleh pihak sekolah, sistem secara otomatis meneruskan sinyal darurat langsung ke dispatch center kepolisian terdekat.

<br>

---
<br>

## 4. Tim Developer
<br>

| Nama Lengkap | Peran Utama | Institusi / Sekolah | Kontak / GitHub |
|--------------|-------------|---------------------|-----------------|
| **David Leonardo** | Project Lead & Full Stack Developer | SMKN 2 Tasikmalaya | [@davidleonardo](https://github.com/davidleonardo) |
| **[Nama Anggota 2]** | UI/UX Designer & Frontend Engineer | SMKN 2 Tasikmalaya | [@anggota2](#) |
| **[Nama Anggota 3]** | Backend Architect & Database Admin | SMKN 2 Tasikmalaya | [@anggota3](#) |

<br>

---
<br>

## 5. Fitur Unggulan Sistem
<br>

### A. Modul Pelaporan Publik (Stealth Report)
Memungkinkan pengguna (baik siswa, guru, maupun warga sekitar) mengirimkan laporan darurat dalam waktu kurang dari 30 detik tanpa harus melalui proses registrasi atau login akun yang rumit.
<br>

### B. Peta Titik Rawan Interaktif (Live Threat Map)
Peta digital berbasis WebGL yang memvisualisasikan data historis dan laporan langsung mengenai titik kumpul geng motor dan lokasi rawan tawuran, lengkap dengan indikator waktu kejadian (*timestamp*).
<br>

### C. Tombol Panik Darurat (SOS Panic Button)
Fitur instan bagi korban atau saksi mata yang sedang terancam di jalan raya untuk mengirimkan sinyal bahaya darurat beserta koordinat GPS akurat langsung ke layar *dashboard* satuan patroli terdekat.
<br>

### D. Dashboard Manajemen Kasus Aparat & Sekolah
Panel kontrol terpusat bagi Guru Bimbingan Konseling (BK) dan Kepolisian Sektor (Polsek) untuk menyortir laporan, mengubah status investigasi (*Open*, *In-Progress*, *Resolved*), dan mengekspor data statistik bulanan.

<br>

---
<br>

## 6. Demo Aplikasi & Antarmuka
<br>

🔗 **[Kunjungi Live Demo YOUTH-GUARD](https://youth-guard.vercel.app)**
<br><br>

<div align="center">
  <img src="https://via.placeholder.com/800x450/0f172a/ef4444?text=YOUTH-GUARD+Landing+Page+-+Instant+Anonymous+Reporting" alt="Landing Page" width="800"/>
  <p><em>Gambar 6.1 - Halaman Utama (Landing Page) dengan fokus kecepatan akses pelaporan darurat.</em></p>
  <br>

  <img src="https://via.placeholder.com/800x450/0f172a/3b82f6?text=Live+Map+Module+-+Red+Zone+Tracking" alt="Live Map" width="800"/>
  <p><em>Gambar 6.2 - Peta Interaktif Zona Merah Titik Kumpul Geng Motor dan Tawuran Pelajar.</em></p>
  <br>

  <img src="https://via.placeholder.com/800x450/0f172a/22c55e?text=Authority+Control+Center+-+Realtime+Dashboard" alt="Dashboard" width="800"/>
  <p><em>Gambar 6.3 - Panel Kontrol Instansi untuk Guru BK dan Kepolisian.</em></p>
</div>

<br>

---
<br>

## 7. Spesifikasi Teknologi (Tech Stack)
<br>

### Front-End Architecture
-   **Framework**: Next.js 14 (App Router, Server-Side Rendering untuk performa maksimal pada sinyal rendah).
-   **Styling**: Tailwind CSS v3 + Headless UI untuk komponen interaktif yang ringan dan responsif.
-   **State Management**: Zustand untuk manajemen data peta real-time secara efisien.
-   **Map Rendering**: Mapbox GL JS / Leaflet.js untuk pemetaan spasial berkecepatan tinggi.

### Back-End Architecture
-   **Runtime & Server**: Node.js dengan Express.js terintegrasi dalam Next.js API Routes.
-   **Real-time Communication**: Socket.io untuk pengiriman *push alerts* instan tanpa *page refresh*.
-   **Database & ORM**: PostgreSQL (dihosting via Supabase) dikombinasikan dengan Prisma ORM untuk *Type-Safety* maksimal.
-   **Storage**: AWS S3 / Supabase Bucket untuk penyimpanan arsip bukti foto kejadian secara aman.

<br>

---
<br>

## 8. Arsitektur Sistem & Alur Data
<br>

```text
[ Masyarakat / Siswa Pelapor ]
              │
              ├─ (Kirim Laporan + Geotag GPS) ──▶ [ Next.js API Gateway ]
              │                                           │
[ Sinyal SOS Darurat ]                                    │ (Sanitasi & Hapus Jejak IP)
              │                                           ▼
              └─────────────────────────────────▶ [ Express / Node Backend ]
                                                          │
                        ┌─────────────────────────────────┼──────────────────────────────┐
                        ▼                                 ▼                              ▼
                 [ Prisma ORM ]                  [ Socket.io Server ]            [ Supabase Storage ]
                        │                                 │                              │
                        ▼                                 ▼                              ▼
               [ Database PostgreSQL ]           (Broadcasting Live Alert)        (Simpan File Foto)
                                                          │
                                                          ▼
                                          [ Dashboard Instansi (BK & Polisi) ]