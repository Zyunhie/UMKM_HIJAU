// app/(dashboard)/user/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Store, TrendingUp, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Data dummy untuk trending dan rekomendasi
  const trendingUMKM = [
    { name: "Kopi Dari Hati", category: "Kuliner", distance: "0.8 km", rating: 4.8, visits: "1.2k", label: "Gold" },
    { name: "Sate Maranggi Cibungur", category: "Kuliner", distance: "2.5 km", rating: 4.9, visits: "980", label: "Gold" },
    { name: "Batik Rara Djonggrang", category: "Fashion", distance: "1.2 km", rating: 4.6, visits: "750", label: "Silver" },
  ];

  const recommendedUMKM = [
    { name: "Warung Sayur Organik", category: "Kuliner", distance: "0.3 km", rating: 4.9, label: "Gold" },
    { name: "Kerajinan Bambu", category: "Kerajinan", distance: "0.5 km", rating: 4.7, label: "Silver" },
    { name: "Toko Roti Gandum", category: "Kuliner", distance: "0.7 km", rating: 4.8, label: "Gold" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-10"
    >
      {/* Trending Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={24} className="text-green-400" />
          <h2 className="text-2xl font-black tracking-tight">Trending Minggu Ini</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingUMKM.map((umkm, i) => (
            <div
              key={i}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 border border-green-400/20 flex items-center justify-center text-green-400 font-black text-lg">
                  {umkm.name.charAt(0)}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold ${
                    umkm.label === "Gold"
                      ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                      : "bg-gray-300/10 text-gray-300 border border-gray-300/30"
                  }`}
                >
                  {umkm.label}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{umkm.name}</h3>
              <p className="text-sm text-neutral-400 mb-3">{umkm.category}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-neutral-400">
                  <MapPin size={14} /> {umkm.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{umkm.rating}</span>
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-neutral-400 flex items-center gap-1">
                  <Users size={14} /> {umkm.visits} kunjungan
                </span>
                <Link
                  href={`/user/umkm/${umkm.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-xs font-bold text-green-400 hover:text-green-300 transition"
                >
                  Lihat Detail →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistik Ringkas */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-green-400/10 border border-green-400/20 flex items-center justify-center shrink-0">
              <Star size={32} className="text-green-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Rating Diberikan</p>
              <p className="text-4xl font-black mt-1">12</p>
              <p className="text-xs text-neutral-500 mt-1">+2 dari minggu lalu</p>
            </div>
          </div>
          <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center shrink-0">
              <Store size={32} className="text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">UMKM Dikunjungi</p>
              <p className="text-4xl font-black mt-1">8</p>
              <p className="text-xs text-neutral-500 mt-1">Dari total 25 UMKM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Rekomendasi Terdekat */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <MapPin size={24} className="text-green-400" />
          <h2 className="text-2xl font-black tracking-tight">Rekomendasi UMKM Hijau Terdekat</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedUMKM.map((umkm, i) => (
            <div
              key={i}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-600/20 border border-green-400/20 flex items-center justify-center text-green-400 font-black text-lg">
                  {umkm.name.charAt(0)}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-bold ${
                    umkm.label === "Gold"
                      ? "bg-yellow-400/10 text-yellow-400 border border-yellow-400/30"
                      : "bg-gray-300/10 text-gray-300 border border-gray-300/30"
                  }`}
                >
                  {umkm.label}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{umkm.name}</h3>
              <p className="text-sm text-neutral-400 mb-3">{umkm.category}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-neutral-400">
                  <MapPin size={14} /> {umkm.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{umkm.rating}</span>
                </span>
              </div>
              <Link
                href={`/user/umkm/${umkm.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="mt-4 block w-full text-center py-2.5 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                Kunjungi
              </Link>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}