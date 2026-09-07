// app/(dashboard)/umkm/produk/page.tsx
"use client";

import { motion } from "framer-motion";
import { Leaf, Plus } from "lucide-react";

const produk = [
  { nama: "Kopi Susu Organik", harga: "Rp 25.000", status: "Aktif" },
  { nama: "Kopi Tubruk Gula Aren", harga: "Rp 20.000", status: "Aktif" },
  { nama: "Biji Kopi Robusta 250g", harga: "Rp 45.000", status: "Perlu foto" },
];

export default function UmkmProdukPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white">Produk Hijau</h1>
          <p className="text-neutral-400 mt-2">Kelola etalase produk ramah lingkunganmu.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black text-sm font-bold transition-all">
          <Plus size={16} /> Tambah Produk
        </button>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            Daftar produk
          </h2>
        </div>
        <div className="divide-y divide-white/5">
          {produk.map((p) => (
            <div key={p.nama} className="flex items-center gap-3 px-6 py-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-green-400">
                <Leaf size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-white">{p.nama}</p>
                <p className="text-xs text-neutral-400">{p.harga}</p>
              </div>
              <span className="rounded-full bg-green-500/10 px-2.5 py-0.5 text-[11px] font-bold text-green-400 border border-green-500/30">
                {p.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
