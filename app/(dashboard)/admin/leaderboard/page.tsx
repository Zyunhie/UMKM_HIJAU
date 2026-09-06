"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Medal, Minus, Search } from "lucide-react";
import { initialLeaderboard, type LeaderboardEntry } from "@/lib/data";
import { motion } from "framer-motion";
import clsx from "clsx";

const badgeStyle: Record<string, string> = {
  Gold: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
  Silver: "bg-slate-300/10 text-slate-300 border border-slate-300/30",
  Bronze: "bg-amber-700/10 text-amber-700 border border-amber-700/30",
  Hijau: "bg-green-500/10 text-green-400 border border-green-500/30",
};

function LeaderboardSection({ data, query }: { data: LeaderboardEntry[]; query: string }) {
  const [q, setQLocal] = useState("");
  const g = query.toLowerCase().trim();
  const l = q.toLowerCase().trim();

  const sorted = useMemo(
    () =>
      [...data]
        .sort((a, b) => b.poin - a.poin)
        .filter(
          (d) =>
            (!g || d.namaUsaha.toLowerCase().includes(g) || d.kategori.toLowerCase().includes(g)) &&
            (!l || d.namaUsaha.toLowerCase().includes(l) || d.kategori.toLowerCase().includes(l))
        ),
    [data, g, l]
  );

  const top3 = sorted.slice(0, 3);
  const max = Math.max(...sorted.map((s) => s.poin), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Leaderboard UMKM Hijau</h1>
        <p className="text-neutral-400 mt-2">
          Diurut otomatis tertinggi → terendah, terhubung ke Riwayat Poin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {top3.map((t, i) => (
          <div
            key={t.id}
            className={clsx(
              "relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border p-6",
              i === 0 ? "border-yellow-500/30 shadow-[0_0_30px_rgba(250,204,21,0.1)]" : "border-white/10"
            )}
          >
            {i === 0 && (
              <div className="absolute right-0 top-0 rounded-bl-xl bg-yellow-500 px-3 py-1 text-[11px] font-bold text-black">
                #1 TOP
              </div>
            )}
            <div className="flex items-center gap-2">
              <Medal className={clsx("h-5 w-5", i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : "text-amber-700")} />
              <span className={clsx("rounded-full px-2.5 py-0.5 text-[11px] font-bold", badgeStyle[t.badge])}>{t.badge}</span>
            </div>
            <p className="mt-3 text-lg font-bold text-white leading-snug">{t.namaUsaha}</p>
            <p className="text-sm text-neutral-400">{t.kategori}</p>
            <p className="mt-3 text-3xl font-black text-green-400">
              {t.poin.toLocaleString("id-ID")} <span className="text-xs font-semibold text-neutral-500">pts</span>
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full" />
              Leaderboard berdasarkan poin UMKM
            </h2>
          </div>
          <div className="relative flex w-full items-center sm:w-auto">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-neutral-500" />
            <input
              value={q}
              onChange={(e) => setQLocal(e.target.value)}
              placeholder="Cari UMKM…"
              className="w-full sm:w-56 bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
            />
          </div>
        </div>
        <div className="divide-y divide-white/5">
          {sorted.map((d, idx) => (
            <div key={d.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
              <span
                className={clsx(
                  "w-8 text-center text-lg font-black",
                  idx === 0 ? "text-yellow-400" : idx < 3 ? "text-green-400" : "text-neutral-500"
                )}
              >
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-bold text-white">{d.namaUsaha}</p>
                  <span className={clsx("rounded-full px-2 py-0.5 text-[10px] font-bold", badgeStyle[d.badge])}>{d.badge}</span>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 text-[11px]">{d.kategori}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: `${(d.poin / max) * 100}%` }} />
                </div>
              </div>
              <div className="text-right">
                <p className="text-base font-black text-white">{d.poin.toLocaleString("id-ID")}</p>
                <p className="flex items-center justify-end gap-1 text-[11px] font-semibold">
                  {d.kenaikan > 0 ? (
                    <span className="flex items-center text-green-400">
                      <ArrowUp className="h-3 w-3" />
                      {d.kenaikan}
                    </span>
                  ) : d.kenaikan < 0 ? (
                    <span className="flex items-center text-red-400">
                      <ArrowDown className="h-3 w-3" />
                      {Math.abs(d.kenaikan)}
                    </span>
                  ) : (
                    <span className="flex items-center text-neutral-500">
                      <Minus className="h-3 w-3" />0
                    </span>
                  )}
                </p>
              </div>
            </div>
          ))}
          {sorted.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-neutral-400">Tidak ada UMKM yang cocok.</p>
          )}
        </div>
        <p className="border-t border-white/10 px-5 py-3 text-xs text-neutral-500">
          Menampilkan {sorted.length} UMKM • diperbarui otomatis tiap ada mutasi poin
        </p>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const [data] = useState(initialLeaderboard);
  return <LeaderboardSection data={data} query="" />;
}