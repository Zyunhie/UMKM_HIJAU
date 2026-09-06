"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Inbox, ShieldCheck, Trophy, Zap } from "lucide-react";
import { initialAntrean, initialLeaderboard, initialRiwayat, type AntreanUMKM, type LeaderboardEntry, type RiwayatPoin } from "@/lib/data";

function DashboardSection({
  antrean,
  leaderboard,
  riwayat,
}: {
  antrean: AntreanUMKM[];
  leaderboard: LeaderboardEntry[];
  riwayat: RiwayatPoin[];
}) {
  const pending = antrean.filter((a) => a.status === "pending").length;
  const top = [...leaderboard].sort((a, b) => b.poin - a.poin)[0];

  const stats = [
    { label: "UMKM Hijau Aktif", value: "128", sub: "+6 bulan ini", icon: ShieldCheck },
    { label: "Antrean Pending", value: String(pending), sub: "perlu verifikasi", icon: Inbox },
    { label: "Poin dibagikan Sep", value: "+640", sub: "8 mutasi", icon: Zap },
    { label: "Pemuncak", value: top ? `${top.poin.toLocaleString("id-ID")}` : "—", sub: top?.namaUsaha ?? "", icon: Trophy },
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
        <p className="inline-flex px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold">
          🌿 Eco-System Admin
        </p>
        <h2 className="mt-3 max-w-xl text-2xl sm:text-3xl font-black leading-tight">
          Selamat pagi! {pending} UMKM menunggu keputusan hijaumu hari ini.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-white/80">
          Verifikasi antrean, pantau audit energi, dan kirim pengumuman — semua tercatat transparan di riwayat poin.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/admin/antrean"
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-green-700 hover:bg-green-50 transition-colors"
          >
            Tinjau Antrean →
          </Link>
          <Link
            href="/admin/pengumuman"
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 hover:bg-white/10 transition-colors"
          >
            Kirim Pengumuman 🔔
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

      {/* Dua kolom */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Antrean terbaru */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full" />
              Antrean terbaru
            </h3>
            <Link
              href="/admin/antrean"
              className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
            >
              Lihat semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {antrean
              .filter((a) => a.status === "pending")
              .slice(0, 3)
              .map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-xs font-bold text-green-400">
                    {a.namaUsaha.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{a.namaUsaha}</p>
                    <p className="text-[11px] text-neutral-500">
                      {a.pemilik} • {a.kota}
                    </p>
                  </div>
                  <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] font-bold text-yellow-400 border border-yellow-500/30">
                    PENDING
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Leaderboard teratas */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-1 h-5 bg-green-500 rounded-full" />
              3 teratas leaderboard
            </h3>
            <Link
              href="/admin/leaderboard"
              className="text-xs font-bold text-green-400 hover:text-green-300 transition-colors inline-flex items-center gap-1"
            >
              Lihat semua <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            {[...leaderboard]
              .sort((a, b) => b.poin - a.poin)
              .slice(0, 3)
              .map((l, i) => (
                <div
                  key={l.id}
                  className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5"
                >
                  <span className="w-6 text-center text-base font-black text-green-400">#{i + 1}</span>
                  <p className="flex-1 truncate text-sm font-bold text-white">{l.namaUsaha}</p>
                  <p className="text-sm font-black text-green-400">{l.poin.toLocaleString("id-ID")}</p>
                </div>
              ))}
          </div>
          <div className="mt-4 rounded-lg border border-green-500/20 bg-green-500/5 px-3 py-2.5 text-xs text-green-400">
            Mutasi terakhir: <b>{riwayat[0]?.namaUsaha}</b>{" "}
            {riwayat[0] && riwayat[0].perubahan > 0 ? `+${riwayat[0].perubahan}` : riwayat[0]?.perubahan} —{" "}
            {riwayat[0]?.aktivitas}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const [antrean] = useState(initialAntrean);
  const [leaderboard] = useState(initialLeaderboard);
  const [riwayat] = useState(initialRiwayat);

  return <DashboardSection antrean={antrean} leaderboard={leaderboard} riwayat={riwayat} />;
}