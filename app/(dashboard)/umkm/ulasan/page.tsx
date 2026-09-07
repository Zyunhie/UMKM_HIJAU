// app/(dashboard)/umkm/ulasan/page.tsx
"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const ulasan = [
  { nama: "Asep Sunandar", rating: 5, tanggal: "12 Sep 2026", isi: "Kopinya enak, ampasnya didaur ulang. Tempatnya bersih dan adem!" },
  { nama: "Rina Marlina", rating: 4, tanggal: "10 Sep 2026", isi: "Suka konsep zero waste-nya. Parkiran agak sempit tapi oke." },
  { nama: "Budi Santoso", rating: 5, tanggal: "8 Sep 2026", isi: "Pelayanan ramah, ada sedotan bambu. Recommended!" },
];

export default function UmkmUlasanPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Ulasan & Rating</h1>
        <p className="text-neutral-400 mt-2">Rating rata-rata <b className="text-white">4.8</b> dari 120 ulasan.</p>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="w-1 h-5 bg-green-500 rounded-full" />
          Semua ulasan
        </h3>
        <div className="mt-4 space-y-2">
          {ulasan.map((u) => (
            <div key={u.nama} className="rounded-lg bg-white/[0.03] border border-white/5 px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-white">{u.nama}</p>
                <span className="text-[11px] text-neutral-500">{u.tanggal}</span>
              </div>
              <div className="mt-1 flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={14} className={s <= u.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-600"} />
                ))}
              </div>
              <p className="mt-1.5 text-sm text-neutral-400">{u.isi}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
