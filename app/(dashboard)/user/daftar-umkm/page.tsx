// app/(dashboard)/user/daftar-umkm/page.tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Star, ChevronRight, Award, Medal } from "lucide-react";

// --- DATA DUMMY (30 Item) ---
const rawData = [
  { name: "Kopi Dari Hati", username: "@kopidarihati", role: "Owner", points: 95, category: "Kuliner", rating: 4.8, reviews: 120, distance: "0.8 km", address: "Jl. Braga No. 45" },
  { name: "Batik Rara", username: "@rara_batik", role: "Manager", points: 85, category: "Fashion", rating: 4.6, reviews: 85, distance: "1.2 km", address: "Jl. Cibaduyut No. 12" },
  { name: "Sate Maranggi Bos", username: "@sate_bos", role: "Owner", points: 92, category: "Kuliner", rating: 4.9, reviews: 210, distance: "2.5 km", address: "Jl. Raya Cibungur" },
  { name: "Bambu Lestari", username: "@bambu_craft", role: "Admin", points: 75, category: "Kerajinan", rating: 4.4, reviews: 56, distance: "1.8 km", address: "Jl. Setiabudi No. 88" },
  { name: "Nasi Organik", username: "@organik_nasi", role: "Owner", points: 91, category: "Kuliner", rating: 4.7, reviews: 98, distance: "3.0 km", address: "Jl. Dago No. 102" },
  { name: "Sabun Herbal", username: "@herbal_care", role: "Owner", points: 72, category: "Kecantikan", rating: 4.5, reviews: 67, distance: "4.2 km", address: "Jl. Riau No. 30" },
  { name: "WoodCrafter", username: "@wood_crafter", role: "Manager", points: 65, category: "Kerajinan", rating: 4.2, reviews: 34, distance: "5.1 km", address: "Jl. Supratman 1" },
  { name: "Kebun Hijau", username: "@kebun_hijau", role: "Owner", points: 88, category: "Pertanian", rating: 4.8, reviews: 145, distance: "6.5 km", address: "Lembang" },
  { name: "Eco Fashion", username: "@eco_fash", role: "Owner", points: 96, category: "Fashion", rating: 4.9, reviews: 320, distance: "1.1 km", address: "Jl. Cihampelas" },
  { name: "Jamu Nenek", username: "@jamu_nenek", role: "Admin", points: 78, category: "Minuman", rating: 4.6, reviews: 89, distance: "2.2 km", address: "Jl. Asia Afrika" },
  { name: "Tahu Susu Murni", username: "@tahususu_bdg", role: "Owner", points: 82, category: "Kuliner", rating: 4.5, reviews: 400, distance: "7.0 km", address: "Lembang No. 10" },
  { name: "Sepatu Cibaduyut", username: "@shoes_cibaduyut", role: "Manager", points: 68, category: "Fashion", rating: 4.3, reviews: 110, distance: "3.5 km", address: "Kawasan Cibaduyut" },
  { name: "Gula Aren Asli", username: "@aren_manis", role: "Owner", points: 94, category: "Pertanian", rating: 4.8, reviews: 230, distance: "12 km", address: "Ciwidey" },
  { name: "Aksesoris Daur Ulang", username: "@recycle_art", role: "Owner", points: 89, category: "Kerajinan", rating: 4.7, reviews: 75, distance: "2.0 km", address: "Jl. Merdeka" },
  { name: "Vegan Bites", username: "@vegan_bites", role: "Admin", points: 98, category: "Kuliner", rating: 4.9, reviews: 550, distance: "0.5 km", address: "Jl. Progo" },
  { name: "Tas Anyaman", username: "@anyam_tas", role: "Owner", points: 74, category: "Fashion", rating: 4.4, reviews: 45, distance: "4.0 km", address: "Jl. Ahmad Yani" },
  { name: "Pupuk Kompos", username: "@kompos_subur", role: "Manager", points: 81, category: "Pertanian", rating: 4.6, reviews: 90, distance: "8.5 km", address: "Padalarang" },
  { name: "Skincare Alami", username: "@nature_skin", role: "Owner", points: 93, category: "Kecantikan", rating: 4.8, reviews: 310, distance: "1.5 km", address: "Jl. Riau" },
  { name: "Keripik Singkong", username: "@keripik_kriuk", role: "Admin", points: 66, category: "Kuliner", rating: 4.2, reviews: 20, distance: "5.5 km", address: "Cimahi" },
  { name: "Rotan Minimalis", username: "@rotan_min", role: "Owner", points: 86, category: "Kerajinan", rating: 4.7, reviews: 150, distance: "6.0 km", address: "Jl. Soekarno Hatta" },
  { name: "Sayur Hidroponik", username: "@hidro_fresh", role: "Owner", points: 90, category: "Pertanian", rating: 4.8, reviews: 200, distance: "4.5 km", address: "Gegerkalong" },
  { name: "Kain Tenun", username: "@tenun_indah", role: "Manager", points: 79, category: "Fashion", rating: 4.5, reviews: 85, distance: "3.2 km", address: "Jl. Pasteur" },
  { name: "Kue Basah Tradisional", username: "@kue_basah", role: "Admin", points: 71, category: "Kuliner", rating: 4.3, reviews: 60, distance: "2.8 km", address: "Pasar Baru" },
  { name: "Madu Hutan Liar", username: "@madu_liar", role: "Owner", points: 97, category: "Minuman", rating: 4.9, reviews: 420, distance: "15 km", address: "Pangalengan" },
  { name: "Lampu Hias Paralon", username: "@paralon_art", role: "Owner", points: 84, category: "Kerajinan", rating: 4.6, reviews: 115, distance: "3.8 km", address: "Antapani" },
  { name: "Jaket Kulit Asli", username: "@leather_jk", role: "Manager", points: 88, category: "Fashion", rating: 4.7, reviews: 280, distance: "9.0 km", address: "Garut (Cabang Bdg)" },
  { name: "Susu Almond", username: "@almond_milk", role: "Owner", points: 91, category: "Minuman", rating: 4.8, reviews: 190, distance: "1.0 km", address: "Jl. Trunojoyo" },
  { name: "Masker Wajah Organik", username: "@mask_organic", role: "Admin", points: 77, category: "Kecantikan", rating: 4.5, reviews: 95, distance: "2.5 km", address: "Jl. Dipatiukur" },
  { name: "Bibit Tanaman", username: "@bibit_unggul", role: "Owner", points: 83, category: "Pertanian", rating: 4.6, reviews: 140, distance: "7.5 km", address: "Cihideung" },
  { name: "Sambal Kemasan", username: "@sambal_mercon", role: "Owner", points: 69, category: "Kuliner", rating: 4.4, reviews: 300, distance: "4.8 km", address: "Margahayu" }
];

const allUMKM = rawData.map((u, index) => {
  let label = "Bronze";
  if (u.points >= 90) label = "Gold";
  else if (u.points >= 70) label = "Silver";
  return { id: index + 1, ...u, label };
});

export default function DaftarUMKMPage() {
  const [search, setSearch] = useState("");
  const [filterLabel, setFilterLabel] = useState<"All" | "Gold" | "Silver" | "Bronze">("All");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", ...new Set(allUMKM.map((u) => u.category))];
  const isSearching = search.trim().length > 0;

  const filtered = useMemo(() => {
    if (!isSearching) return [];
    return allUMKM.filter((u) => {
      const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.address.toLowerCase().includes(search.toLowerCase()) || u.username.toLowerCase().includes(search.toLowerCase());
      const matchLabel = filterLabel === "All" || u.label === filterLabel;
      const matchCategory = filterCategory === "All" || u.category === filterCategory;
      return matchSearch && matchLabel && matchCategory;
    });
  }, [search, filterLabel, filterCategory, isSearching]);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden bg-[#020402] flex flex-col items-center">
      
      {/* --- BACKGROUND ANIMASI (Disabled, Opacity Rendah) --- */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes driftLeft { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes floatUp { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes floatDown { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .bg-drift-container { display: flex; width: 200vw; animation: driftLeft 60s linear infinite; }
        .col-up { animation: floatUp 40s linear infinite; display: flex; flex-direction: column; gap: 1rem; }
        .col-down { animation: floatDown 40s linear infinite; display: flex; flex-direction: column; gap: 1rem; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.5); }
      `}} />
      
      <div className="absolute inset-0 z-0 overflow-hidden opacity-100 pointer-events-none">
        <div className="bg-drift-container h-[200vh] gap-4 pt-10">
          {Array.from({ length: 12 }).map((_, colIndex) => (
            <div key={colIndex} className={`w-64 ${colIndex % 2 === 0 ? 'col-down' : 'col-up'}`}>
              {[...allUMKM, ...allUMKM].slice(0, 15).map((u, i) => (
                <div key={i} className="h-32 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 mb-2 flex items-center justify-center text-green-500/50 font-bold">{u.name.charAt(0)}</div>
                  <div className="text-white/40 text-sm font-bold truncate w-full text-center">{u.name}</div>
                  <div className="text-white/20 text-xs truncate w-full text-center">{u.category}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#020402]/80 to-[#020402] pointer-events-none"></div>

      {/* --- FOREGROUND (Search & Filters di Tengah Atas) --- */}
      <div className={`relative z-10 w-full max-w-4xl px-6 transition-all duration-500 ${isSearching ? 'pt-8' : 'pt-[20vh]'}`}>
        
        <div className="flex flex-col gap-4">
          {/* Search Bar Lebar */}
          <div className="relative group w-full">
            <Search size={24} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-green-400 transition-colors" />
            <input
              type="text"
              placeholder="Cari UMKM Hijau berdasarkan nama, alamat, atau username..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-black/60 backdrop-blur-xl border border-white/10 rounded-full pl-16 pr-6 py-5 text-lg outline-none focus:border-green-500/50 focus:bg-black/80 focus:ring-4 ring-green-500/10 transition-all placeholder:text-neutral-600 shadow-2xl text-white"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-3 justify-center">
            <select
              value={filterLabel}
              onChange={(e) => setFilterLabel(e.target.value as any)}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-sm text-neutral-300 outline-none text-center focus:border-green-500/50 appearance-none cursor-pointer hover:bg-white/5 transition-colors"
            >
              <option value="All">Semua Rank</option>
              <option value="Gold">🏅 Gold (90+)</option>
              <option value="Silver">🥈 Silver (70+)</option>
              <option value="Bronze">No Label</option>
            </select>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-5 py-2.5 text-sm text-neutral-300 outline-none text-center focus:border-green-500/50 appearance-none cursor-pointer hover:bg-white/5 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === "All" ? "Semua Kategori" : cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* --- HASIL PENCARIAN (Hanya Muncul Jika Ngetik) --- */}
        {isSearching && (
          <div className="mt-8 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2 pb-10 space-y-3 custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filtered.map((umkm, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                  key={umkm.id}
                  className="group flex flex-col sm:flex-row items-center gap-4 bg-black/60 backdrop-blur-xl hover:bg-white/[0.05] border border-white/10 hover:border-white/20 p-4 rounded-2xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4 w-full sm:w-1/3 shrink-0">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center text-white font-black text-xl">
                        {umkm.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base truncate">{umkm.name}</h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-neutral-500 font-medium">{umkm.username}</span>
                        <span className="text-[10px] uppercase tracking-wider text-green-400/80 bg-green-400/10 px-2 py-0.5 rounded-full">{umkm.role}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-1/3 flex flex-col sm:items-center text-sm text-neutral-400 border-l border-white/5 sm:border-transparent pl-4 sm:pl-0">
                    <div className="flex items-center gap-2 text-white/80 font-medium bg-white/5 px-3 py-1 rounded-lg">
                      {umkm.category}
                    </div>
                    <div className="flex items-center gap-1.5 mt-2 text-xs">
                      <MapPin size={12} className="text-neutral-500" />
                      <span className="truncate max-w-[150px]">{umkm.address}</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-1/3 flex items-center justify-between sm:justify-end gap-6 shrink-0 border-t border-white/5 sm:border-none pt-3 sm:pt-0">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1">
                        <Star size={14} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-white text-sm">{umkm.rating}</span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        Poin: <span className="font-bold text-white">{umkm.points}</span>
                      </div>
                    </div>

                    {umkm.label === "Gold" && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400">
                        <Award size={16} /> <span className="text-xs font-bold uppercase">Gold</span>
                      </div>
                    )}
                    {umkm.label === "Silver" && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-300/10 border border-slate-300/30 text-slate-300">
                        <Medal size={16} /> <span className="text-xs font-bold uppercase">Silver</span>
                      </div>
                    )}
                    {umkm.label === "Bronze" && (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-900/20 border border-orange-900/30 text-orange-400">
                        <span className="text-xs font-bold uppercase">Bronze</span>
                      </div>
                    )}

                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-black transition-colors">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-10 text-neutral-400">Tidak ada hasil yang sesuai dengan pencarian.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}