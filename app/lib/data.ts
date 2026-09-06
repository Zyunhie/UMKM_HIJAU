// lib/data.ts

// ---------- Tipe Data ----------
export interface RiwayatPoin {
  id: string;
  tanggal: string;
  namaUsaha: string;
  aktivitas: string;
  keterangan: string;
  admin: string;
  perubahan: number;
}

export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  target: string;
  prioritas: "info" | "penting" | "mendesak";
  tanggal: string;
  dibaca: boolean;
  gambar?: string | null;
  dari?: string;
  sampai?: string;
  edited?: boolean;
  editedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  namaUsaha: string;
  kategori: string;
  poin: number;
  badge: "Gold" | "Silver" | "Bronze" | "Hijau";
  kenaikan: number;
}

export interface UserAccount {
  id: string;
  nama: string;
  email: string;
  kota: string;
  role: "user" | "admin";
  tanggalGabung: string;
}

export interface AntreanUMKM {
  id: string;
  namaUsaha: string;
  pemilik: string;
  kota: string;
  kategori: string;
  deskripsi: string;
  skorAwal: number;
  tanggalDaftar: string;
  status: "pending" | "accepted" | "declined";
}

// ---------- Data Dummy ----------
export const initialRiwayat: RiwayatPoin[] = [
  {
    id: "R001",
    tanggal: "2024-03-15",
    namaUsaha: "Kopi Dari Hati",
    aktivitas: "Verifikasi",
    keterangan: "Lulus audit energi",
    admin: "Admin Pusat",
    perubahan: 50,
  },
  {
    id: "R002",
    tanggal: "2024-03-14",
    namaUsaha: "Batik Rara Djonggrang",
    aktivitas: "Penyesuaian",
    keterangan: "Kesalahan input",
    admin: "Admin Pusat",
    perubahan: -20,
  },
  {
    id: "R003",
    tanggal: "2024-03-13",
    namaUsaha: "Sate Maranggi Cibungur",
    aktivitas: "Penghargaan",
    keterangan: "Juara hijau bulanan",
    admin: "Admin Pusat",
    perubahan: 100,
  },
  {
    id: "R004",
    tanggal: "2024-03-12",
    namaUsaha: "Warung Nasi Organik",
    aktivitas: "Verifikasi",
    keterangan: "Lulus audit",
    admin: "Admin Pusat",
    perubahan: 40,
  },
  {
    id: "R005",
    tanggal: "2024-03-11",
    namaUsaha: "Kerajinan Bambu Lestari",
    aktivitas: "Penyesuaian",
    keterangan: "Koreksi poin",
    admin: "Admin Pusat",
    perubahan: -10,
  },
  {
    id: "R006",
    tanggal: "2024-03-10",
    namaUsaha: "Sabun Herbal Alami",
    aktivitas: "Penghargaan",
    keterangan: "Partisipasi event",
    admin: "Admin Pusat",
    perubahan: 30,
  },
];

export const initialPengumuman: Pengumuman[] = [
  {
    id: "P-001",
    judul: "Batas Lapor Audit Energi Q3",
    isi: "Seluruh UMKM binaan diwajibkan melaporkan data konsumsi energi paling lambat 30 April 2024. Laporan dapat diunggah melalui dashboard masing-masing.",
    target: "Semua UMKM",
    prioritas: "penting",
    tanggal: "2024-03-15 09:30",
    dibaca: false,
  },
  {
    id: "P-002",
    judul: "Pelatihan Kompos Gratis",
    isi: "Dinas Lingkungan Hidup akan mengadakan pelatihan pengolahan sampah organik menjadi kompos. Kuota terbatas, segera daftar!",
    target: "Semua UMKM",
    prioritas: "info",
    tanggal: "2024-03-14 14:00",
    dibaca: false,
  },
  {
    id: "P-003",
    judul: "Perbaikan Bug Sistem Poin",
    isi: "Terjadi kesalahan penambahan poin otomatis pada beberapa akun. Saat ini sedang kami koreksi. Harap bersabar.",
    target: "Semua UMKM",
    prioritas: "mendesak",
    tanggal: "2024-03-13 11:45",
    dibaca: true,
  },
];

export const initialLeaderboard: LeaderboardEntry[] = [
  {
    id: "L001",
    namaUsaha: "Sate Maranggi Cibungur",
    kategori: "Kuliner",
    poin: 2450,
    badge: "Gold",
    kenaikan: 120,
  },
  {
    id: "L002",
    namaUsaha: "Kopi Dari Hati",
    kategori: "Kuliner",
    poin: 2310,
    badge: "Gold",
    kenaikan: 85,
  },
  {
    id: "L003",
    namaUsaha: "Warung Nasi Organik",
    kategori: "Kuliner",
    poin: 2180,
    badge: "Gold",
    kenaikan: -15,
  },
  {
    id: "L004",
    namaUsaha: "Batik Rara Djonggrang",
    kategori: "Fashion",
    poin: 1890,
    badge: "Silver",
    kenaikan: 40,
  },
  {
    id: "L005",
    namaUsaha: "Sabun Herbal Alami",
    kategori: "Kecantikan",
    poin: 1720,
    badge: "Silver",
    kenaikan: 0,
  },
  {
    id: "L006",
    namaUsaha: "Kerajinan Bambu Lestari",
    kategori: "Kerajinan",
    poin: 1600,
    badge: "Silver",
    kenaikan: -25,
  },
  {
    id: "L007",
    namaUsaha: "Toko Roti Gandum",
    kategori: "Kuliner",
    poin: 1450,
    badge: "Bronze",
    kenaikan: 50,
  },
];

export const initialUsers: UserAccount[] = [
  {
    id: "U001",
    nama: "Asep Sunandar",
    email: "asep@email.com",
    kota: "Tasikmalaya",
    role: "user",
    tanggalGabung: "2024-01-15",
  },
  {
    id: "U002",
    nama: "Rina Marlina",
    email: "rina@email.com",
    kota: "Bandung",
    role: "admin",
    tanggalGabung: "2024-02-01",
  },
  {
    id: "U003",
    nama: "Budi Santoso",
    email: "budi@email.com",
    kota: "Yogyakarta",
    role: "user",
    tanggalGabung: "2024-03-10",
  },
  {
    id: "U004",
    nama: "Dewi Lestari",
    email: "dewi@email.com",
    kota: "Surabaya",
    role: "user",
    tanggalGabung: "2024-03-20",
  },
  {
    id: "U005",
    nama: "Eko Prasetyo",
    email: "eko@email.com",
    kota: "Semarang",
    role: "admin",
    tanggalGabung: "2024-04-05",
  },
];

export const initialAntrean: AntreanUMKM[] = [
  {
    id: "A001",
    namaUsaha: "Kopi Dari Hati",
    pemilik: "Andi Wijaya",
    kota: "Bandung",
    kategori: "Kuliner",
    deskripsi: "UMKM kopi lokal dengan fokus pada pengolahan biji kopi organik dan sistem daur ulang limbah ampas kopi.",
    skorAwal: 82,
    tanggalDaftar: "2024-03-17",
    status: "pending",
  },
  {
    id: "A002",
    namaUsaha: "Batik Rara Djonggrang",
    pemilik: "Sari Dewi",
    kota: "Yogyakarta",
    kategori: "Fashion",
    deskripsi: "Produsen batik tulis dengan praktik pewarnaan ramah lingkungan dan penggunaan bahan alami.",
    skorAwal: 76,
    tanggalDaftar: "2024-03-16",
    status: "pending",
  },
  {
    id: "A003",
    namaUsaha: "Sate Maranggi Cibungur",
    pemilik: "Ujang Suryana",
    kota: "Purwakarta",
    kategori: "Kuliner",
    deskripsi: "Warung kuliner tradisional yang menerapkan pengelolaan limbah organik dan pengurangan plastik sekali pakai.",
    skorAwal: 68,
    tanggalDaftar: "2024-03-15",
    status: "pending",
  },
  {
    id: "A004",
    namaUsaha: "Warung Nasi Organik",
    pemilik: "Fitri Handayani",
    kota: "Surabaya",
    kategori: "Kuliner",
    deskripsi: "Warung nasi organik yang memprioritaskan bahan lokal, pengurangan sampah, dan kebersihan proses produksi.",
    skorAwal: 61,
    tanggalDaftar: "2024-03-14",
    status: "pending",
  },
  {
    id: "A005",
    namaUsaha: "Kerajinan Bambu Lestari",
    pemilik: "Agus Salim",
    kota: "Solo",
    kategori: "Kerajinan",
    deskripsi: "UMKM kerajinan yang memanfaatkan bambu terbarukan dan proses produksi efisien dengan limbah minimal.",
    skorAwal: 91,
    tanggalDaftar: "2024-03-12",
    status: "accepted",
  },
];