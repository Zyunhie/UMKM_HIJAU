"use client";

import { useMemo, useState } from "react";
import { MinusCircle, PlusCircle } from "lucide-react";
import { initialRiwayat, type RiwayatPoin } from "@/lib/data";
import { motion } from "framer-motion";
import clsx from "clsx";

function RiwayatSection({ data, query }: { data: RiwayatPoin[]; query: string }) {
  const [tipe, setTipe] = useState<"semua" | "plus" | "minus">("semua");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(
      (d) =>
        (tipe === "semua" || (tipe === "plus" ? d.perubahan > 0 : d.perubahan < 0)) &&
        (d.namaUsaha.toLowerCase().includes(q) || d.aktivitas.toLowerCase().includes(q) || d.admin.toLowerCase().includes(q))
    );
  }, [data, query, tipe]);

  const totalPlus = data.filter((d) => d.perubahan > 0).reduce((a, b) => a + b.perubahan, 0);
  const totalMinus = data.filter((d) => d.perubahan < 0).reduce((a, b) => a + b.perubahan, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Riwayat Poin</h1>
        <p className="text-neutral-400 mt-2">
          Setiap pemberian / pengurangan poin oleh admin tercatat di sini.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
          <p className="text-sm font-medium text-neutral-400">Total poin masuk</p>
          <p className="mt-2 text-3xl font-black text-green-400">+{totalPlus}</p>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
          <p className="text-sm font-medium text-neutral-400">Total poin keluar</p>
          <p className="mt-2 text-3xl font-black text-red-400">{totalMinus}</p>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
          <p className="text-sm font-medium text-neutral-400">Transaksi</p>
          <p className="mt-2 text-3xl font-black text-white">
            {data.length} <span className="text-base font-semibold text-neutral-400">mutasi</span>
          </p>
        </div>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/10 px-6 py-5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full" />
              Riwayat Poin UMKM Hijau
            </h2>
          </div>
          <div className="flex gap-2">
            {(["semua", "plus", "minus"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTipe(t)}
                className={clsx(
                  "rounded-full px-4 py-1.5 text-xs font-bold capitalize transition-all border",
                  tipe === t
                    ? "bg-green-500/10 border-green-500/50 text-green-400"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                )}
              >
                {t === "semua" ? "Semua" : t === "plus" ? "+ Masuk" : "− Keluar"}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-neutral-500">
                <th className="px-6 py-3">Tanggal</th>
                <th className="px-6 py-3">UMKM & Aktivitas</th>
                <th className="px-6 py-3">Admin</th>
                <th className="px-6 py-3 text-right">Perubahan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="whitespace-nowrap px-6 py-3 text-xs text-neutral-500">{r.tanggal}</td>
                  <td className="px-6 py-3">
                    <p className="font-semibold text-white">{r.namaUsaha}</p>
                    <p className="text-xs text-neutral-400">
                      {r.aktivitas} — <span className="italic">{r.keterangan}</span>
                    </p>
                  </td>
                  <td className="px-6 py-3 text-xs">
                    <span className="inline-flex px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 text-[11px]">{r.admin}</span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span
                      className={clsx(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold",
                        r.perubahan > 0 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                      )}
                    >
                      {r.perubahan > 0 ? <PlusCircle className="h-3.5 w-3.5" /> : <MinusCircle className="h-3.5 w-3.5" />}
                      {r.perubahan > 0 ? `+${r.perubahan}` : r.perubahan}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-neutral-400">
                    Tidak ada riwayat yang cocok.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export default function RiwayatPage() {
  const [data] = useState(initialRiwayat);
  return <RiwayatSection data={data} query="" />;
}