// app/(dashboard)/user/leaderboard/page.tsx
"use client";

import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";

const topUMKM = [
  { rank: 1, name: "Sate Maranggi Cibungur", points: 2450, rating: 4.9, reviews: 210, label: "Gold" },
  { rank: 2, name: "Kopi Dari Hati", points: 2310, rating: 4.8, reviews: 120, label: "Gold" },
  { rank: 3, name: "Warung Nasi Organik", points: 2180, rating: 4.7, reviews: 98, label: "Gold" },
  { rank: 4, name: "Batik Rara Djonggrang", points: 1890, rating: 4.6, reviews: 85, label: "Silver" },
  { rank: 5, name: "Sabun Herbal Alami", points: 1720, rating: 4.5, reviews: 67, label: "Silver" },
  { rank: 6, name: "Kerajinan Bambu Lestari", points: 1600, rating: 4.4, reviews: 56, label: "Silver" },
];

export default function LeaderboardPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Leaderboard UMKM Hijau</h1>
        <p className="text-neutral-400 mt-2">Peringkat berdasarkan poin yang dikumpulkan selama 3 bulan terakhir.</p>
      </div>

      {/* Podium 3 besar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topUMKM.slice(0, 3).map((umkm, idx) => (
          <div
            key={umkm.rank}
            className={`relative bg-white/[0.03] backdrop-blur-sm rounded-2xl border p-6 text-center ${
              idx === 0
                ? "border-yellow-400/30 shadow-[0_0_30px_rgba(250,204,21,0.1)]"
                : idx === 1
                ? "border-gray-400/30 shadow-[0_0_20px_rgba(156,163,175,0.05)]"
                : "border-amber-700/30 shadow-[0_0_20px_rgba(180,83,9,0.05)]"
            }`}
          >
            <div className="absolute top-4 left-4 text-4xl font-black opacity-20">#{umkm.rank}</div>
            <Trophy size={40} className={`mx-auto mb-4 ${idx === 0 ? "text-yellow-400" : idx === 1 ? "text-gray-300" : "text-amber-700"}`} />
            <h3 className="text-xl font-bold">{umkm.name}</h3>
            <p className="text-neutral-400 text-sm mt-1">{umkm.label} • ⭐ {umkm.rating}</p>
            <div className="mt-4 text-3xl font-black text-green-400">{umkm.points.toLocaleString()}</div>
            <p className="text-xs text-neutral-500 mt-1">poin</p>
          </div>
        ))}
      </div>

      {/* Tabel */}
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/[0.05]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Peringkat</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Nama UMKM</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Label</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-300">Rating</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-neutral-300">Poin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {topUMKM.map((umkm) => (
              <tr key={umkm.rank} className="hover:bg-white/[0.03] transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black ${
                    umkm.rank === 1 ? "bg-yellow-400/10 text-yellow-400" :
                    umkm.rank === 2 ? "bg-gray-300/10 text-gray-300" :
                    umkm.rank === 3 ? "bg-amber-700/10 text-amber-700" :
                    "bg-white/5 text-neutral-400"
                  }`}>
                    {umkm.rank}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium">{umkm.name}</td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    umkm.label === "Gold" ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30" : "bg-gray-300/10 text-gray-300 border border-gray-300/30"
                  }`}>
                    {umkm.label}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span>{umkm.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-bold text-green-400">{umkm.points.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}