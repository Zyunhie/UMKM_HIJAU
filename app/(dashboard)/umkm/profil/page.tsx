// app/(dashboard)/umkm/profil/page.tsx
"use client";

import { motion } from "framer-motion";
import { MapPin, Pencil, Store } from "lucide-react";
import Link from "next/link";

export default function UmkmProfilPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Profil Usaha</h1>
        <p className="text-neutral-400 mt-2">
          Kelola informasi usaha hijaumu agar mudah ditemukan pelanggan.
        </p>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 border border-green-400/20 flex items-center justify-center text-green-400 font-black text-xl">
              K
            </div>
            <div>
              <h2 className="font-bold text-lg text-white flex items-center gap-2">
                Kopi Dari Hati <Store size={16} className="text-green-400" />
              </h2>
              <p className="text-sm text-neutral-400">Kuliner • Bandung</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
                <MapPin size={12} /> Jl. Braga No. 45
              </p>
            </div>
          </div>
          <span className="text-xs px-2 py-1 rounded-full font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/30">
            Gold
          </span>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10">
          <Link
            href="/umkm/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black text-sm font-bold transition-all"
          >
            <Pencil size={14} /> Edit Profil (segera hadir)
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
