// app/(dashboard)/umkm/pengumuman/page.tsx
"use client";

import { motion } from "framer-motion";
import { Megaphone } from "lucide-react";

const daftar = [
  { judul: "Batas Lapor Audit Energi Q3", isi: "Laporkan konsumsi energi paling lambat 30 April. +50 poin jika tepat waktu.", tanggal: "15 Mar 2024" },
  { judul: "Pelatihan Kompos Gratis", isi: "Dinas LH mengadakan pelatihan pengolahan sampah organik. Kuota terbatas!", tanggal: "14 Mar 2024" },
];

export default function UmkmPengumumanPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Pengumuman</h1>
        <p className="text-neutral-400 mt-2">Info terbaru dari Admin Pusat untuk usahamu.</p>
      </div>

      <div className="space-y-3">
        {daftar.map((p) => (
          <div key={p.judul} className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
            <div className="flex items-center gap-3">
              <Megaphone size={18} className="text-green-400" />
              <h3 className="font-bold text-white">{p.judul}</h3>
            </div>
            <p className="mt-2 text-sm text-neutral-400">{p.isi}</p>
            <p className="mt-2 text-xs text-neutral-500">{p.tanggal} • Admin Pusat</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
