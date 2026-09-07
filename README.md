<div align="center">
  
  # 🌱 UMKM HIJAU (DIGITAL SUSTAINABILITY ASSESSMENT & CERTIFICATION SYSTEM)
  ### Platform Digital Penilaian Keberlanjutan UMKM, Monitoring Konsumsi Energi, Verifikasi Lapangan, dan Sertifikasi UMKM Ramah Lingkungan
  <br>

  [![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-success?style=for-the-badge)](https://umkm-hijau.vercel.app)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/)
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

**UMKM HIJAU** adalah platform digital berbasis web yang dirancang untuk membantu UMKM melakukan penilaian keberlanjutan usaha secara terstruktur. Platform ini memanfaatkan data seperti konsumsi listrik dan teknologi yang digunakan untuk menghasilkan penilaian yang dapat menjadi dasar peningkatan praktik usaha ramah lingkungan.

<br>

Visi besar **UMKM HIJAU** adalah membantu UMKM memahami kondisi keberlanjutan usahanya, meningkatkan efisiensi penggunaan sumber daya, serta mendorong penerapan praktik bisnis yang lebih ramah lingkungan melalui proses penilaian, verifikasi, dan sertifikasi digital.
<br>

---
<br>

## 2. Latar Belakang Masalah & Urgensi
<br>

UMKM memiliki peran penting dalam perekonomian. Namun, penerapan prinsip keberlanjutan pada sektor UMKM masih menghadapi beberapa tantangan:
<br>

*   **Konsumsi Energi yang Belum Terukur**: Banyak UMKM belum memiliki gambaran yang jelas mengenai penggunaan listrik dan efisiensi energi dalam kegiatan usaha.
*   **Pemanfaatan Teknologi yang Belum Optimal**: Teknologi dapat membantu meningkatkan efisiensi usaha, tetapi pemilihannya perlu disesuaikan dengan kebutuhan dan dampaknya terhadap keberlanjutan.
*   **Minimnya Pemahaman Praktik Ramah Lingkungan**: UMKM membutuhkan indikator dan panduan sederhana agar dapat mengetahui langkah perbaikan yang dapat dilakukan.
*   **Belum Adanya Penilaian dan Verifikasi Terintegrasi**: Data usaha, hasil penilaian, verifikasi lapangan, dan sertifikasi perlu dikelola dalam satu sistem digital.

<br>

---
<br>

## 3. Solusi & Value Proposition
<br>

Untuk menjawab permasalahan di atas, **UMKM HIJAU** menawarkan pendekatan digital yang terintegrasi:
<br>

-   📊 **Penilaian Digital & Terstruktur**: Mengolah data UMKM berdasarkan indikator keberlanjutan untuk menghasilkan skor penilaian.
-   ⚡ **Monitoring Konsumsi Energi**: Membantu UMKM melihat data penggunaan listrik sebagai salah satu aspek dalam evaluasi keberlanjutan.
-   🔎 **Verifikasi Lapangan**: Hasil penilaian dapat dilanjutkan ke proses verifikasi untuk memastikan data dan kondisi usaha.
-   🏆 **Sertifikasi UMKM Hijau**: Hasil penilaian dan verifikasi dapat menjadi dasar pemberian status sertifikasi seperti **Gold** atau **Silver**.

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

### A. Modul Penilaian UMKM
Memungkinkan pelaku UMKM memasukkan data usaha seperti konsumsi listrik, teknologi yang digunakan, dan informasi pendukung lainnya untuk memperoleh hasil penilaian keberlanjutan.
<br>

### B. Monitoring & Visualisasi Data UMKM
Peta digital berbasis WebGL yang memvisualisasikan data historis dan laporan langsung mengenai titik kumpul geng motor dan lokasi rawan tawuran, lengkap dengan indikator waktu kejadian (*timestamp*).
<br>

### C. Verifikasi Lapangan
Fitur instan bagi korban atau saksi mata yang sedang terancam di jalan raya untuk mengirimkan sinyal bahaya darurat beserta koordinat GPS akurat langsung ke layar *dashboard* satuan patroli terdekat.
<br>

### D. Dashboard Manajemen UMKM & Sertifikasi
Panel kontrol terpusat bagi Guru Bimbingan Konseling (BK) dan Kepolisian Sektor (Polsek) untuk menyortir laporan, mengubah status investigasi (*Open*, *In-Progress*, *Resolved*), dan mengekspor data statistik bulanan.

<br>

---
<br>

## 6. Demo Aplikasi & Antarmuka
<br>

🔗 **[Kunjungi Live Demo UMKM HIJAU](https://umkm-hijau.vercel.app)**
<br><br>

<div align="center">
  <img src="https://via.placeholder.com/800x450/0f172a/ef4444?text=UMKM HIJAU+Landing+Page+-+Instant+Anonymous+Reporting" alt="Landing Page" width="800"/>
  <p><em>Gambar 6.1 - Halaman utama UMKM HIJAU untuk memperkenalkan platform penilaian keberlanjutan UMKM.</em></p>
  <br>

  <img src="https://via.placeholder.com/800x450/0f172a/3b82f6?text=Live+Map+Module+-+Red+Zone+Tracking" alt="Live Map" width="800"/>
  <p><em>Gambar 6.2 - Dashboard penilaian keberlanjutan dan monitoring data UMKM.</em></p>
  <br>

  <img src="https://via.placeholder.com/800x450/0f172a/22c55e?text=Authority+Control+Center+-+Realtime+Dashboard" alt="Dashboard" width="800"/>
  <p><em>Gambar 6.3 - Panel pengelolaan verifikasi dan sertifikasi UMKM.</em></p>
</div>

<br>

---
<br>

## 7. Spesifikasi Teknologi (Tech Stack)
<br>

### Front-End Architecture
-   **Framework**: Next.js 14 (App Router, Server-Side Rendering untuk performa maksimal pada sinyal rendah).
-   **Styling**: Tailwind CSS v3 + Headless UI untuk komponen interaktif yang ringan dan responsif.
-   **State Management**: Zustand untuk manajemen state data penilaian dan dashboard secara efisien.
-   **Map Rendering**: Chart library / visualisasi data untuk menampilkan hasil penilaian dan monitoring UMKM.

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
[ Pelaku UMKM ]
              │
              ├─ (Input Data Usaha + Konsumsi Energi) ──▶ [ Next.js API Gateway ]
              │                                           │
[ Data Penilaian UMKM ]                                    │ (Validasi & Pengolahan Data)
              │                                           ▼
              └─────────────────────────────────▶ [ Next.js Backend / API ]
                                                          │
                        ┌─────────────────────────────────┼──────────────────────────────┐
                        ▼                                 ▼                              ▼
                 [ Prisma ORM ]                  [ Service Penilaian ]            [ Supabase Storage ]
                        │                                 │                              │
                        ▼                                 ▼                              ▼
               [ Database PostgreSQL ]           (Sinkronisasi Data)        (Simpan File Foto)
                                                          │
                                                          ▼
                                          [ Dashboard UMKM & Admin ]