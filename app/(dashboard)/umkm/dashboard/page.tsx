// app/(dashboard)/umkm/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Eye,
  Leaf,
  MapPin,
  Pencil,
  Plus,
  Star,
  Store,
  History,
  Trophy,
  TrendingUp,
  Zap,
} from "lucide-react";

const ulasanTerbaru = [
  {
    nama: "Asep Sunandar",
    rating: 5,
    tanggal: "12 Sep 2026",
    isi: "Kopinya enak, ampasnya didaur ulang. Tempatnya bersih dan adem!",
  },
  {
    nama: "Rina Marlina",
    rating: 4,
    tanggal: "10 Sep 2026",
    isi: "Suka konsep zero waste-nya. Parkiran agak sempit tapi oke.",
  },
  {
    nama: "Budi Santoso",
    rating: 5,
    tanggal: "8 Sep 2026",
    isi: "Pelayanan ramah, ada sedotan bambu. Recommended!",
  },
];

const riwayatPoin = [
  { aktivitas: "Verifikasi audit energi", perubahan: 50, tanggal: "15 Mar 2024", positif: true },
  { aktivitas: "Penghargaan partisipasi event", perubahan: 30, tanggal: "10 Mar 2024", positif: true },
  { aktivitas: "Koreksi input laporan", perubahan: -10, tanggal: "5 Mar 2024", positif: false },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          className={
            s <= value ? "text-yellow-400 fill-yellow-400" : "text-neutral-600"
          }
        />
      ))}
    </div>
  );
}

export default function UmkmDashboardPage() {
  const stats = [
    { label: "Poin Hijau", value: "2.310", sub: "+85 bulan ini", icon: Zap },
    { label: "Peringkat", value: "#2", sub: "dari 128 UMKM", icon: Trophy },
    { label: "Rating Rata-rata", value: "4.8", sub: "dari 120 ulasan", icon: Star },
    { label: "Dikunjungi", value: "1,2k", sub: "30 hari terakhir", icon: Eye },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Hero */}
      <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 via-green-700 to-green-900 p-8 text-white">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold">
          <Award size={14} /> 🏅 Badge Gold • Terverifikasi Hijau
        </p>
        <h2 className="mt-3 max-w-xl text-2xl sm:text-3xl font-black leading-tight">
          Halo, Kopi Dari Hati! Pertahankan hijaumu hari ini.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          Kamu di peringkat #2 leaderboard. Butuh 140 poin lagi untuk menyalip
          Sate Maranggi Cibungur — lengkapi laporan audit energi Q3.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/umkm/produk"
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-green-700 hover:bg-green-50 transition-colors inline-flex items-center gap-2"
          >
            <Plus size={16} /> Kelola Produk
          </Link>
          <Link
            href="/umkm/ulasan"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 hover:bg-white/10 transition-colors inline-flex items-center gap-2"
          >
            <Star size={16} /> Lihat Ulasan ⭐
          </Link>
        </div>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all"
          >
            <s.icon className="h-5 w-5 text-green-400" />
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {s.label}
            </p>
            <p className="mt-1 truncate text-2xl font-black text-white" title={s.value}>
              {s.value}
            </p>
            <p className="truncate text-xs text-neutral-500">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress + Profil singkat */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Progress badge */}
        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1 h-5 bg-green-500 rounded-full" />
            Perjalanan poinmu
          </h3>
          <p className="mt-1 text-sm text-neutral-400">
            2.310 / 2.450 poin menuju peringkat #1
          </p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400"
              style={{ width: "94%" }}
            />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <Leaf size={18} className="text-green-400" />
              <p className="mt-2 text-sm font-bold text-white">Audit Energi Q3</p>
              <p className="text-xs text-neutral-500">Belum lapor • +50 poin</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <TrendingUp size={18} className="text-green-400" />
              <p className="mt-2 text-sm font-bold text-white">Kunjungan naik 12%</p>
              <p className="text-xs text-neutral-500">1,2k bulan ini</p>
            </div>
            <div className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
              <Store size={18} className="text-green-400" />
              <p className="mt-2 text-sm font-bold text-white">3 produk hijau</p>
              <p className="text-xs text-neutral-500">2 perlu foto baru</p>
            </div>
          </div>
        </div>

        {/* Kartu profil usaha */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-start justify-between">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 border border-green-400/20 flex items-center justify-center text-green-400 font-black text-xl">
              K
            </div>
            <span className="text-xs px-2 py-1 rounded-full font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
              Gold
            </span>
          </div>
          <h3 className="mt-4 font-bold text-lg text-white">Kopi Dari Hati</h3>
          <p className="text-sm text-neutral-400">Kuliner • Bandung</p>
          <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
            <MapPin size={12} /> Jl. Braga No. 45
          </p>
          <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
            <Link
              href="/umkm/profil"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black text-sm font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Pencil size={14} /> Edit Profil
            </Link>
            <Link
              href="/user/map"
              className="w-full block text-center py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold text-neutral-300 transition-all"
            >
              Lihat di Peta →
            </Link>
          </div>
        </div>
      </div>

      {/* Dua kolom */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Ulasan terbaru */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full" />
              Ulasan terbaru
            </h3>
            <Link
              href="/umkm/ulasan"
              className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
            >
              Lihat semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {ulasanTerbaru.map((u) => (
              <div
                key={u.nama}
                className="rounded-lg bg-white/[0.03] border border-white/5 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-white">{u.nama}</p>
                  <span className="text-[11px] text-neutral-500">{u.tanggal}</span>
                </div>
                <div className="mt-1">
                  <Stars value={u.rating} />
                </div>
                <p className="mt-1.5 text-sm text-neutral-400 leading-relaxed">{u.isi}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Riwayat poin */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full" />
              Riwayat poin
            </h3>
            <Link
              href="/umkm/poin"
              className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
            >
              Lihat semua <ArrowRight size={14} />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {riwayatPoin.map((r) => (
              <div
                key={r.aktivitas}
                className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5"
              >
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold ${
                    r.positif
                      ? "bg-green-500/10 text-green-400 border border-green-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  <History size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{r.aktivitas}</p>
                  <p className="text-[11px] text-neutral-500">{r.tanggal} • Admin Pusat</p>
                </div>
                <span
                  className={`text-sm font-black ${
                    r.positif ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {r.positif ? `+${r.perubahan}` : r.perubahan}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2.5 text-xs text-green-400">
            Tips: selesaikan <b>Audit Energi Q3</b> untuk +50 poin dan amankan badge Gold-mu.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
