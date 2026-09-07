// app/(dashboard)/umkm/poin/page.tsx
"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";

const riwayat = [
  { aktivitas: "Verifikasi audit energi", perubahan: 50, tanggal: "15 Mar 2024" },
  { aktivitas: "Penghargaan partisipasi event", perubahan: 30, tanggal: "10 Mar 2024" },
  { aktivitas: "Koreksi input laporan", perubahan: -10, tanggal: "5 Mar 2024" },
];

export default function UmkmPoinPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Riwayat Poin</h1>
        <p className="text-neutral-400 mt-2">Total poin hijaumu: <b className="text-green-400">2.310</b></p>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-green-500 rounded-full" />
          Mutasi poin
        </h3>
        <div className="mt-4 space-y-2">
          {riwayat.map((r) => {
            const positif = r.perubahan > 0;
            return (
              <div key={r.aktivitas} className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${positif ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`}>
                  <History size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{r.aktivitas}</p>
                  <p className="text-[11px] text-neutral-500">{r.tanggal} • Admin Pusat</p>
                </div>
                <span className={`text-sm font-black ${positif ? "text-green-400" : "text-red-400"}`}>
                  {positif ? `+${r.perubahan}` : r.perubahan}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
