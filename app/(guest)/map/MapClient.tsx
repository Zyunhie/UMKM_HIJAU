"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import {
  Search,
  Navigation,
  Zap,
  Star,
  MapPin,
  Filter,
  X,
  ChevronRight,
  Award,
  TrendingDown,
  Phone,
  Clock,
  Leaf,
} from "lucide-react";
import "leaflet/dist/leaflet.css";

// (Copy of the page implementation)
// ... Duplicated content from previous Map page

// ─── Fix Leaflet default icons ───
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ─── Types ───
type Tier = "gold" | "silver";

interface UMKM {
  id: number;
  name: string;
  address: string;
  tier: Tier;
  lat: number;
  lng: number;
  savingsPercent: number;
  rating: number;
  category: string;
  phone: string;
  openHours: string;
  image: string;
}

// ─── Dummy Data: 7 UMKM Hijau di sekitar Kab. Tasikmalaya ───
const UMKM_DATA: UMKM[] = [
  {
    id: 1,
    name: "Warung Nasi Ibu Siti",
    address: "Jl. Siliwangi No.45, Kota Tasikmalaya",
    tier: "gold",
    lat: -7.321,
    lng: 108.215,
    savingsPercent: 42,
    rating: 4.9,
    category: "Kuliner",
    phone: "+62 812-3456-7890",
    openHours: "07:00 - 21:00",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
  },
  {
    id: 2,
    name: "Batik Tasik Sejati",
    address: "Jl. Otto Iskandardinata No.88, Kota Tasikmalaya",
    tier: "gold",
    lat: -7.329,
    lng: 108.225,
    savingsPercent: 38,
    rating: 4.8,
    category: "Kerajinan",
    phone: "+62 813-9876-5432",
    openHours: "08:00 - 17:00",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400",
  },
  {
    id: 3,
    name: "Toko Oleh-oleh Mang Ujang",
    address: "Jl. Ahmad Yani No.12, Kota Tasikmalaya",
    tier: "silver",
    lat: -7.318,
    lng: 108.232,
    savingsPercent: 28,
    rating: 4.6,
    category: "Oleh-oleh",
    phone: "+62 811-2233-4455",
    openHours: "08:00 - 20:00",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400",
  },
  {
    id: 4,
    name: "Kopi Gunung Galunggung",
    address: "Jl. Veteran No.23, Kota Tasikmalaya",
    tier: "gold",
    lat: -7.332,
    lng: 108.218,
    savingsPercent: 35,
    rating: 4.7,
    category: "Kuliner",
    phone: "+62 814-5566-7788",
    openHours: "10:00 - 23:00",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
  },
  {
    id: 5,
    name: "Kerajinan Mendong K Craft",
    address: "Jl. RTA. Prawira Adiningrat No.72, Manonjaya",
    tier: "silver",
    lat: -7.355,
    lng: 108.285,
    savingsPercent: 25,
    rating: 4.5,
    category: "Kerajinan",
    phone: "+62 815-6677-8899",
    openHours: "08:00 - 16:00",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400",
  },
  {
    id: 6,
    name: "Resto Sunda Bumi Parahyangan",
    address: "Jl. RE. Martadinata No.56, Kota Tasikmalaya",
    tier: "gold",
    lat: -7.315,
    lng: 108.228,
    savingsPercent: 40,
    rating: 4.9,
    category: "Kuliner",
    phone: "+62 816-7788-9900",
    openHours: "10:00 - 22:00",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
  },
  {
    id: 7,
    name: "Laundry EcoClean Express",
    address: "Jl. Ir. H. Juanda No.34, Kota Tasikmalaya",
    tier: "silver",
    lat: -7.338,
    lng: 108.235,
    savingsPercent: 22,
    rating: 4.4,
    category: "Layanan",
    phone: "+62 817-8899-0011",
    openHours: "07:00 - 20:00",
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400",
  },
];

// ─── Custom Marker Icons ───
const goldIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="position:relative;width:40px;height:40px;">
      <div style="position:absolute;inset:-8px;border-radius:50%;background:rgba(245,158,11,0.3);animation:pulse-ring 2s infinite;"></div>
      <div style="position:absolute;inset:-4px;border-radius:50%;background:rgba(245,158,11,0.5);animation:pulse-ring 2s infinite 0.5s;"></div>
      <div style="width:40px;height:40px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,#f59e0b,#d97706);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(245,158,11,0.5);border:2px solid rgba(255,255,255,0.3);">
        <span style="transform:rotate(45deg);font-size:16px;">🥇</span>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -42],
});

const silverIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="position:relative;width:36px;height:36px;">
      <div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(148,163,184,0.25);animation:pulse-ring 2.5s infinite;"></div>
      <div style="width:36px;height:36px;border-radius:50% 50% 50% 0;background:linear-gradient(135deg,#94a3b8,#64748b);transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 15px rgba(148,163,184,0.4);border:2px solid rgba(255,255,255,0.3);">
        <span style="transform:rotate(45deg);font-size:14px;">🥈</span>
      </div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -38],
});

const userIcon = L.divIcon({
  className: "custom-marker",
  html: `
    <div style="position:relative;width:20px;height:20px;">
      <div style="position:absolute;inset:-12px;border-radius:50%;background:rgba(16,185,129,0.2);animation:pulse-ring 2s infinite;"></div>
      <div style="position:absolute;inset:-6px;border-radius:50%;background:rgba(16,185,129,0.3);animation:pulse-ring 2s infinite 0.5s;"></div>
      <div style="width:20px;height:20px;border-radius:50%;background:#10b981;border:3px solid #fff;box-shadow:0 0 20px rgba(16,185,129,0.6);"></div>
    </div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

// ─── Map FlyTo Component ───
function FlyToLocation({ lat, lng, trigger }: { lat: number; lng: number; trigger: number; }) {
  const map = useMap();
  useMemo(() => {
    if (trigger > 0) {
      map.flyTo([lat, lng], 16, { duration: 1.2 });
    }
  }, [lat, lng, trigger, map]);
  return null;
}

export default function MapClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | Tier>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [flyTrigger, setFlyTrigger] = useState(0);

  // Filter UMKM
  const filteredUMKM = useMemo(() => {
    return UMKM_DATA.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" || u.tier === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const selectedUMKM = useMemo(() => UMKM_DATA.find((u) => u.id === selectedId) || null, [selectedId]);

  const handleNavigate = useCallback((umkm: UMKM) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${umkm.lat},${umkm.lng}&travelmode=driving`;
    if (typeof window === "undefined") return;
    window.open(url, "_blank");
  }, []);

  const handleSelectUMKM = useCallback((umkm: UMKM) => {
    setSelectedId(umkm.id);
    setFlyTrigger((prev) => prev + 1);
  }, []);

  const goldCount = UMKM_DATA.filter((u) => u.tier === "gold").length;
  const silverCount = UMKM_DATA.filter((u) => u.tier === "silver").length;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full h-[calc(100vh-9rem)] mt-28 px-3 md:px-4">
      <div className="relative mx-auto flex h-full w-full max-w-[1700px] overflow-hidden rounded-[30px] border border-white/10 bg-[#0b1120]/35 shadow-[0_40px_120px_rgba(15,23,42,0.8)] backdrop-blur-xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_35%)]" />

        <style>{`
          @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(1.6); opacity: 0; } }
          .leaflet-popup-content-wrapper { background: rgba(15, 23, 42, 0.95) !important; backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px !important; color: #fff; padding: 0 !important; overflow: hidden; }
          .leaflet-popup-tip { background: rgba(15, 23, 42, 0.95) !important; border: 1px solid rgba(255,255,255,0.08); }
          .leaflet-popup-content { margin: 0 !important; width: 280px !important; }
          .leaflet-container { background: #0f172a; }
          .custom-scrollbar::-webkit-scrollbar { width: 5px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        `}</style>

        <aside className="relative z-10 w-[30%] min-w-[340px] max-w-[420px] h-full flex flex-col border-r border-white/[0.06] bg-slate-950/30 backdrop-blur-2xl">
          <div className="p-5 pt-6 pb-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-base leading-tight">UMKM Hijau Map</h1>
                <p className="text-slate-500 text-[11px]">Kab. Tasikmalaya & sekitarnya</p>
              </div>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Cari nama, alamat, atau kategori..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className="w-full pl-10 pr-9 py-3 rounded-xl text-sm placeholder:text-slate-600 outline-none focus:border-emerald-500/40 transition-all map-search-input" />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"><X className="w-4 h-4" /></button>
              )}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setActiveFilter("all")} className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-semibold transition-all border ${activeFilter === "all" ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400" : "bg-white/[0.02] border-white/[0.06] text-slate-500 hover:text-slate-300"}`}>
                <Filter className="w-3 h-3 inline mr-1 -mt-0.5" /> Semua ({UMKM_DATA.length})
              </button>
              <button onClick={() => setActiveFilter("gold")} className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-semibold transition-all border ${activeFilter === "gold" ? "bg-amber-500/15 border-amber-500/30 text-amber-400" : "bg-white/[0.02] border-white/[0.06] text-slate-500 hover:text-slate-300"}`}>
                <Award className="w-3 h-3 inline mr-1 -mt-0.5" /> Gold ({goldCount})
              </button>
              <button onClick={() => setActiveFilter("silver")} className={`flex-1 py-2 px-3 rounded-lg text-[11px] font-semibold transition-all border ${activeFilter === "silver" ? "bg-slate-400/15 border-slate-400/30 text-slate-300" : "bg-white/[0.02] border-white/[0.06] text-slate-500 hover:text-slate-300"}`}>
                <Award className="w-3 h-3 inline mr-1 -mt-0.5" /> Silver ({silverCount})
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5">
            <AnimatePresence mode="popLayout">
              {filteredUMKM.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 text-slate-600">
                  <Search className="w-10 h-10 mb-3 opacity-30" />
                  <p className="text-sm">Tidak ada UMKM ditemukan</p>
                  <p className="text-xs mt-1">Coba kata kunci lain</p>
                </motion.div>
              ) : (
                filteredUMKM.map((umkm) => (
                  <motion.div key={umkm.id} layout onClick={() => handleSelectUMKM(umkm)} className="group relative p-3 rounded-xl bg-white/5 hover:bg-white/6 transition-all border border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={umkm.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-sm">{umkm.name}</h3>
                            <p className="text-[12px] text-slate-400">{umkm.address}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-[11px] text-slate-300">{umkm.rating} ★</div>
                            <div className="text-[10px] text-slate-500">{umkm.savingsPercent}% hemat</div>
                          </div>
                        </div>

                        <div className="mt-2 text-[12px] text-slate-400 flex gap-2 items-center">
                          <span className="px-2 py-1 rounded-md bg-white/3 text-[11px]">{umkm.category}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleNavigate(umkm); }} className="ml-auto text-[12px] text-emerald-400 hover:underline">Arah</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </aside>

        <div className="flex-1 relative">
          <MapContainer center={[-7.321, 108.215]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {UMKM_DATA.map((u) => (
              <Marker key={u.id} position={[u.lat, u.lng]} icon={u.tier === 'gold' ? goldIcon : u.tier === 'silver' ? silverIcon : userIcon}>
                <Popup>
                  <div style={{ width: 280 }}>
                    <img src={u.image} className="w-full h-40 object-cover rounded-t-lg" />
                    <div className="p-3">
                      <h4 className="font-bold text-sm">{u.name}</h4>
                      <p className="text-xs text-slate-400">{u.address}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {selectedUMKM && <FlyToLocation lat={selectedUMKM.lat} lng={selectedUMKM.lng} trigger={flyTrigger} />}
          </MapContainer>
        </div>
      </div>
    </motion.main>
  );
}
