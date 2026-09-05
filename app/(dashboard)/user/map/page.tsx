"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import {
  Search, Navigation, Zap, Star, Filter, X, ChevronRight,
  Award, TrendingDown, Phone, Clock, Leaf, MapPin,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// ─────────────────────────────────────────────
// Fix Leaflet default icons
// ─────────────────────────────────────────────
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
type Tier = "gold" | "silver";

interface UMKM {
  id: number; name: string; address: string; tier: Tier;
  lat: number; lng: number; savingsPercent: number; rating: number;
  category: string; phone: string; openHours: string; image: string;
}

// ─────────────────────────────────────────────
// Dummy Data
// ─────────────────────────────────────────────
const UMKM_DATA: UMKM[] = [
  { id: 1, name: "Warung Nasi Ibu Siti", address: "Jl. Siliwangi No.45, Kota Tasikmalaya", tier: "gold", lat: -7.321, lng: 108.215, savingsPercent: 42, rating: 4.9, category: "Kuliner", phone: "+62 812-3456-7890", openHours: "07:00 - 21:00", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400" },
  { id: 2, name: "Batik Tasik Sejati", address: "Jl. Otto Iskandardinata No.88, Kota Tasikmalaya", tier: "gold", lat: -7.329, lng: 108.225, savingsPercent: 38, rating: 4.8, category: "Kerajinan", phone: "+62 813-9876-5432", openHours: "08:00 - 17:00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400" },
  { id: 3, name: "Toko Oleh-oleh Mang Ujang", address: "Jl. Ahmad Yani No.12, Kota Tasikmalaya", tier: "silver", lat: -7.318, lng: 108.232, savingsPercent: 28, rating: 4.6, category: "Oleh-oleh", phone: "+62 811-2233-4455", openHours: "08:00 - 20:00", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400" },
  { id: 4, name: "Kopi Gunung Galunggung", address: "Jl. Veteran No.23, Kota Tasikmalaya", tier: "gold", lat: -7.332, lng: 108.218, savingsPercent: 35, rating: 4.7, category: "Kuliner", phone: "+62 814-5566-7788", openHours: "10:00 - 23:00", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400" },
  { id: 5, name: "Kerajinan Mendong K Craft", address: "Jl. RTA. Prawira Adiningrat No.72, Manonjaya", tier: "silver", lat: -7.355, lng: 108.285, savingsPercent: 25, rating: 4.5, category: "Kerajinan", phone: "+62 815-6677-8899", openHours: "08:00 - 16:00", image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400" },
  { id: 6, name: "Resto Sunda Bumi Parahyangan", address: "Jl. RE. Martadinata No.56, Kota Tasikmalaya", tier: "gold", lat: -7.315, lng: 108.228, savingsPercent: 40, rating: 4.9, category: "Kuliner", phone: "+62 816-7788-9900", openHours: "10:00 - 22:00", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400" },
  { id: 7, name: "Laundry EcoClean Express", address: "Jl. Ir. H. Juanda No.34, Kota Tasikmalaya", tier: "silver", lat: -7.338, lng: 108.235, savingsPercent: 22, rating: 4.4, category: "Layanan", phone: "+62 817-8899-0011", openHours: "07:00 - 20:00", image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400" },
];

// ─────────────────────────────────────────────
// Custom Marker Icons
// ─────────────────────────────────────────────
const goldIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="position:relative;width:40px;height:40px;"><div style="position:absolute;inset:-8px;border-radius:50%;background:rgba(245,158,11,0.3);animation:pulse-ring 2s infinite;"></div><div style="position:absolute;inset:-4px;border-radius:50%;background:rgba(245,158,11,0.5);animation:pulse-ring 2s infinite 0.5s;"></div><div style="width:40px;height:40px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,#f59e0b,#d97706);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(245,158,11,0.5);border:2px solid rgba(255,255,255,0.3);"><span style="transform:rotate(45deg);font-size:16px;">🥇</span></div></div>`,
  iconSize: [40, 40], iconAnchor: [20, 40], popupAnchor: [0, -42],
});

const silverIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="position:relative;width:36px;height:36px;"><div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(148,163,184,0.25);animation:pulse-ring 2.5s infinite;"></div><div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,#94a3b8,#64748b);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(148,163,184,0.4);border:2px solid rgba(255,255,255,0.3);"><span style="transform:rotate(45deg);font-size:14px;">🥈</span></div></div>`,
  iconSize: [36, 36], iconAnchor: [18, 36], popupAnchor: [0, -38],
});

const userIcon = L.divIcon({
  className: "custom-marker",
  html: `<div style="position:relative;width:20px;height:20px;"><div style="position:absolute;inset:-12px;border-radius:50%;background:rgba(16,185,129,0.2);animation:pulse-ring 2s infinite;"></div><div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(16,185,129,0.3);animation:pulse-ring 2s infinite 0.5s;"></div><div style="width:20px;height:20px;border-radius:50%;background:#10b981;border:3px solid #fff;box-shadow:0 0 20px rgba(16,185,129,0.6);"></div></div>`,
  iconSize: [20, 20], iconAnchor: [10, 10],
});

// ─────────────────────────────────────────────
// Map FlyTo Component
// ─────────────────────────────────────────────
function FlyToLocation({ lat, lng, trigger }: { lat: number; lng: number; trigger: number }) {
  const map = useMap();
  useMemo(() => {
    if (trigger > 0) map.flyTo([lat, lng], 16, { duration: 1.2 });
  }, [lat, lng, trigger, map]);
  return null;
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | Tier>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [flyTrigger, setFlyTrigger] = useState(0);

  const filteredUMKM = useMemo(() => {
    return UMKM_DATA.filter((u) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        u.name.toLowerCase().includes(q) ||
        u.address.toLowerCase().includes(q) ||
        u.category.toLowerCase().includes(q);
      const matchFilter = activeFilter === "all" || u.tier === activeFilter;
      return matchSearch && matchFilter;
    });
  }, [searchQuery, activeFilter]);

  const selectedUMKM = useMemo(
    () => UMKM_DATA.find((u) => u.id === selectedId) || null,
    [selectedId]
  );

  const handleNavigate = useCallback((umkm: UMKM) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}&travelmode=driving`,
      "_blank"
    );
  }, []);

  const handleSelectUMKM = useCallback((umkm: UMKM) => {
    setSelectedId(umkm.id);
    setFlyTrigger((prev) => prev + 1);
  }, []);

  const goldCount = UMKM_DATA.filter((u) => u.tier === "gold").length;
  const silverCount = UMKM_DATA.filter((u) => u.tier === "silver").length;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      // ✅ DIUBAH: bg-black murni untuk tampilan deep dark premium
      className="relative w-full h-[88dvh] overflow-hidden bg-black flex flex-col"
    >
      {/* Ambient background (Darker & Subtle) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-emerald-950/20 blur-[120px]" animate={{ x: [0, 45, -20, 0], y: [0, 25, -15, 0], scale: [1, 1.08, 0.96, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-[8%] -right-48 w-[560px] h-[560px] rounded-full bg-zinc-900/30 blur-[120px]" animate={{ x: [0, -45, 25, 0], y: [0, 55, -30, 0], scale: [1, 0.94, 1.08, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} />
        <motion.div className="absolute -bottom-56 left-[35%] w-[600px] h-[600px] rounded-full bg-emerald-950/10 blur-[120px]" animate={{ x: [0, -50, 35, 0], y: [0, -35, 25, 0], scale: [1, 1.09, 0.95, 1] }} transition={{ duration: 21, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .leaflet-popup-content-wrapper {
          background: rgba(0, 0, 0, 0.85) !important;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px !important;
          color: #fff;
          padding: 0 !important;
          overflow: hidden;
        }
        .leaflet-popup-tip {
          background: rgba(0, 0, 0, 0.85) !important;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .leaflet-popup-content { margin: 0 !important; width: 280px !important; }
        .leaflet-container { background: #000; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* ═════ HEADER ═════ */}
      <div className="relative z-20 w-full shrink-0 border-b border-white/[0.05] bg-black/70 backdrop-blur-2xl px-5 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center shadow-lg shadow-emerald-900/40">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-white font-bold text-base leading-tight">UMKM Hijau Map</h1>
              <p className="text-zinc-500 text-[11px]">Kab. Tasikmalaya & sekitarnya</p>
            </div>
          </div>

          <div className="relative flex-1 w-full md:max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
            <input
              type="text"
              placeholder="Cari nama, alamat, atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-3 rounded-xl text-sm placeholder:text-zinc-600 outline-none focus:border-emerald-500/40 transition-all bg-zinc-900/50 border border-white/[0.05] text-white"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setActiveFilter("all")} className={`flex-1 md:flex-none py-2 px-4 rounded-lg text-[11px] font-semibold transition-all border ${activeFilter === "all" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-zinc-900/50 border-white/[0.05] text-zinc-500 hover:text-zinc-300"}`}>
              <Filter className="w-3 h-3 inline mr-1 -mt-0.5" /> Semua ({UMKM_DATA.length})
            </button>
            <button onClick={() => setActiveFilter("gold")} className={`flex-1 md:flex-none py-2 px-4 rounded-lg text-[11px] font-semibold transition-all border ${activeFilter === "gold" ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-zinc-900/50 border-white/[0.05] text-zinc-500 hover:text-zinc-300"}`}>
              <Award className="w-3 h-3 inline mr-1 -mt-0.5" /> Gold ({goldCount})
            </button>
            <button onClick={() => setActiveFilter("silver")} className={`flex-1 md:flex-none py-2 px-4 rounded-lg text-[11px] font-semibold transition-all border ${activeFilter === "silver" ? "bg-zinc-400/10 border-zinc-400/20 text-zinc-300" : "bg-zinc-900/50 border-white/[0.05] text-zinc-500 hover:text-zinc-300"}`}>
              <Award className="w-3 h-3 inline mr-1 -mt-0.5" /> Silver ({silverCount})
            </button>
          </div>
        </div>
      </div>

      {/* ═════ BODY (sidebar + map) ═════ */}
      <div className="relative z-10 flex-1 flex min-h-0 p-4 gap-4">
        
        {/* Sidebar */}
        <aside className="relative w-full md:w-[320px] lg:w-[360px] h-full flex flex-col rounded-2xl border border-white/[0.05] bg-black/60 backdrop-blur-xl shrink-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredUMKM.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-zinc-600">
                  <Search className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm">Tidak ada UMKM ditemukan</p>
                  <p className="text-xs mt-1">Coba kata kunci lain</p>
                </motion.div>
              ) : (
                filteredUMKM.map((umkm) => (
                  <motion.div
                    key={umkm.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => handleSelectUMKM(umkm)}
                    className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-200 border min-h-[72px] ${
                      selectedId === umkm.id
                        ? umkm.tier === "gold"
                          ? "bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/20 shadow-lg shadow-amber-500/5"
                          : "bg-gradient-to-br from-zinc-400/10 to-zinc-500/5 border-zinc-400/20 shadow-lg shadow-zinc-400/5"
                        : "bg-zinc-900/30 border-white/[0.05] hover:bg-zinc-800/50 hover:border-white/[0.1]"
                    }`}
                  >
                    <div className="flex gap-3 items-center h-full">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/[0.05]">
                        <img src={umkm.image} alt={umkm.name} className="w-full h-full object-cover" />
                        <div className={`absolute top-0 right-0 w-5 h-5 flex items-center justify-center text-[10px] ${umkm.tier === "gold" ? "bg-amber-500" : "bg-zinc-400"} rounded-bl-lg`}>
                          {umkm.tier === "gold" ? "🥇" : "🥈"}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-white font-semibold text-[13px] leading-snug truncate">{umkm.name}</h3>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors flex-shrink-0 mt-0.5" />
                        </div>
                        <p className="text-zinc-500 text-[11px] mt-1 truncate">📍 {umkm.address}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                            <TrendingDown className="w-3 h-3" /> Hemat {umkm.savingsPercent}%
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md">
                            <Star className="w-3 h-3 fill-blue-400" /> {umkm.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
          
          {/* Footer Sidebar */}
          <div className="p-4 border-t border-white/[0.05] bg-black/40">
            <div className="flex items-center justify-between text-[11px] text-zinc-500">
              <span>Total UMKM Hijau</span>
              <span className="text-white font-bold">{UMKM_DATA.length} Lokasi</span>
            </div>
            <div className="w-full h-1.5 bg-zinc-900 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-zinc-400 rounded-full transition-all duration-500" style={{ width: `${(goldCount / UMKM_DATA.length) * 100}%` }} />
            </div>
          </div>
        </aside>

        {/* Map */}
        <div className="relative flex-1 min-w-0 h-full rounded-2xl overflow-hidden border border-white/[0.05] bg-black">
          <MapContainer
            center={[-7.3258, 108.2202]}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
            zoomControl={false}
          >
            <TileLayer attribution='&copy; <a href="https://carto.com/">CARTO</a>' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <Marker position={[-7.3258, 108.2202]} icon={userIcon}>
              <Popup>
                <div className="p-3 text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-white font-semibold text-sm">Lokasi Kamu</p>
                  <p className="text-zinc-400 text-xs mt-1">Kab. Tasikmalaya</p>
                </div>
              </Popup>
            </Marker>
            {filteredUMKM.map((umkm) => (
              <Marker
                key={umkm.id}
                position={[umkm.lat, umkm.lng]}
                icon={umkm.tier === "gold" ? goldIcon : silverIcon}
                eventHandlers={{ click: () => setSelectedId(umkm.id) }}
              >
                <Popup>
                  <div className="overflow-hidden">
                    <div className="relative h-28">
                      <img src={umkm.image} alt={umkm.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-bold ${umkm.tier === "gold" ? "bg-amber-500 text-white" : "bg-zinc-400 text-black"}`}>
                        {umkm.tier === "gold" ? "🥇 GOLD" : "🥈 SILVER"}
                      </div>
                    </div>
                    <div className="p-3">
                      <h4 className="text-white font-bold text-sm mb-1">{umkm.name}</h4>
                      <p className="text-zinc-400 text-[11px] mb-3 leading-relaxed">{umkm.address}</p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300"><Zap className="w-3 h-3 text-emerald-400" /> Hemat {umkm.savingsPercent}%</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300"><Star className="w-3 h-3 text-blue-400 fill-blue-400" /> {umkm.rating} rating</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300"><Phone className="w-3 h-3 text-zinc-400" /> {umkm.phone}</div>
                        <div className="flex items-center gap-1.5 text-[11px] text-zinc-300"><Clock className="w-3 h-3 text-zinc-400" /> {umkm.openHours}</div>
                      </div>
                      <button onClick={() => handleNavigate(umkm)} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 hover:from-emerald-500 hover:to-emerald-400 transition-all shadow-lg shadow-emerald-900/40 active:scale-[0.98]">
                        <Navigation className="w-3.5 h-3.5" /> Navigasi ke Sini
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
            {selectedUMKM && <FlyToLocation lat={selectedUMKM.lat} lng={selectedUMKM.lng} trigger={flyTrigger} />}
          </MapContainer>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[400] bg-black/80 backdrop-blur-xl border border-white/[0.05] rounded-xl p-3 shadow-xl">
            <p className="text-white text-xs font-bold mb-3">Legenda</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-zinc-400 text-[11px]">Gold Tier</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-zinc-400 shadow-[0_0_8px_rgba(148,163,184,0.4)]" />
                <span className="text-zinc-400 text-[11px]">Silver Tier</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-zinc-400 text-[11px]">Lokasi Kamu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
}