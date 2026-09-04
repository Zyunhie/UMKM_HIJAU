"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Trophy, Zap, ShieldCheck, Leaf, Globe2, Sparkles } from "lucide-react"; // Asumsi lu pake lucide-react

// --- 1. KOMPONEN GYRO IMAGE (REFINED WITH 50MS BLUR HACK) ---
const LusionImage = ({
  src,
  alt,
  cursor = "default",
  flashFirst = true,
  enableHoverZoom = true,
}: { src: string; alt: string; cursor?: string; flashFirst?: boolean; enableHoverZoom?: boolean }) => {
  const [heroImgBlurred, setHeroImgBlurred] = useState(false);
  const [allowInteraction, setAllowInteraction] = useState(!flashFirst);
  const [flashVisible, setFlashVisible] = useState(flashFirst);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  useEffect(() => {
    if (!flashFirst) return;
    // Show flash briefly then enable interaction
    setHeroImgBlurred(true);
    const t1 = setTimeout(() => setFlashVisible(false), 380);
    const t2 = setTimeout(() => {
      setHeroImgBlurred(false);
      setAllowInteraction(true);
    }, 420);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [flashFirst]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!allowInteraction) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    if (!allowInteraction) return;
    setHeroImgBlurred(true);
    setTimeout(() => setHeroImgBlurred(false), 80);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHeroImgBlurred(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1500, cursor: cursor }}
      className="relative w-full h-full min-h-[400px] rounded-3xl overflow-hidden"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className={`w-full h-full origin-center relative ${enableHoverZoom ? "group" : ""}`}
      >
        <motion.img
          src={src}
          alt={alt}
          whileHover={enableHoverZoom ? { scale: 1.04 } : {}}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover rounded-3xl"
          style={{
            filter: heroImgBlurred
              ? "blur(15px) saturate(0.3) brightness(1.2)"
              : "blur(0px) saturate(1) brightness(1)",
            transition: heroImgBlurred ? "none" : "filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Flash overlay */}
        {flashVisible && (
          <motion.div
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-white/90 rounded-3xl pointer-events-none"
          />
        )}

        {/* Overlay dramatis */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505]/80 via-[#050505]/20 to-transparent pointer-events-none rounded-3xl" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
      </motion.div>
    </motion.div>
  );
};


// --- 2. KOMPONEN KARTU 3D TINGKAT DEWA (SILVER & GOLD) ---
const PremiumCard = ({ 
  tier, 
  title, 
  subtitle, 
  features, 
  icon: Icon 
}: { 
  tier: "silver" | "gold"; 
  title: string; 
  subtitle: string; 
  features: string[];
  icon: any;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Posisi Kursor untuk rotasi 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Posisi Kursor absolute untuk efek Glare (Cahaya senter)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]), springConfig);
  
  // Parallax untuk konten di dalam kartu
  const translateZ = useSpring(useTransform(x, [-0.5, 0.5], [-20, 20]), springConfig);

  const isGold = tier === "gold";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Untuk Rotasi 3D (normalized -0.5 to 0.5)
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    
    // Untuk Glare position (Pixel exact)
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(-1000); // Buang cahaya keluar layar
    mouseY.set(-1000);
  };

  // Dinamis bikin efek radial gradient yang nempel di kursor lu
  const backgroundGlare = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px, 
    ${isGold ? "rgba(250, 204, 21, 0.15)" : "rgba(255, 255, 255, 0.1)"}, 
    transparent 80%
  )`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className="relative w-full group cursor-pointer"
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-full rounded-3xl preserve-3d"
      >
        {/* BORDER CONTAINER (Gold dapet spinner, Silver dapet static glass) */}
        <div className={`absolute inset-0 rounded-3xl overflow-hidden ${isGold ? "p-[2px]" : "p-[1px] bg-neutral-800"}`}>
          {isGold && (
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#facc15_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>

        {/* MAIN CARD BODY */}
        <div className={`relative h-full w-full rounded-3xl p-8 overflow-hidden backdrop-blur-xl ${isGold ? "bg-[#0a0a0a]/95 m-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)]" : "bg-[#0f0f0f]/80"}`}>
          
          {/* Glare/Cahaya Kursor */}
          <motion.div 
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen"
            style={{ background: backgroundGlare }}
          />

          {/* Micro UI Design Elements */}
          <div className="absolute top-4 left-4 text-[10px] text-neutral-600 font-mono tracking-widest uppercase">SYS.{tier.substring(0,3)}</div>
          <div className="absolute bottom-4 right-4 text-[10px] text-neutral-600 font-mono tracking-widest">CO2: 0.00%</div>
          <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-green-500 transition-colors duration-500" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-green-500 transition-colors duration-500" />

          {/* PARALLAX CONTENT INNER */}
          <motion.div 
            style={{ x: translateZ, y: translateZ, translateZ: 50 }}
            className="relative z-10 flex flex-col h-full transform-style-3d"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                {isGold && (
                  <motion.div 
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1.05, filter: "drop-shadow(0 0 10px rgba(250,204,21,0.5))" }}
                    className="w-fit px-3 py-1 mb-4 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-[10px] font-black tracking-widest uppercase"
                  >
                    Top Tier
                  </motion.div>
                )}
                <h4 className={`text-4xl md:text-5xl font-black tracking-tighter ${isGold ? "text-transparent bg-clip-text bg-gradient-to-br from-yellow-200 via-yellow-400 to-amber-700" : "text-white"}`}>
                  {title}
                </h4>
                <p className="text-neutral-400 mt-2 text-sm md:text-base">{subtitle}</p>
              </div>
              
              <div className={`p-4 rounded-2xl ${isGold ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20" : "bg-white/5 text-neutral-300 border border-white/10"} shadow-2xl`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mt-auto">
              {features.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm md:text-base font-medium text-neutral-300 group-hover:text-white transition-colors">
                  <div className={`w-1.5 h-1.5 rotate-45 ${isGold ? "bg-yellow-500 shadow-[0_0_8px_rgba(250,204,21,0.8)]" : "bg-neutral-500 group-hover:bg-white"}`} />
                  {item}
                </li>
              ))}
            </ul>

            {/* Call to action button inside card */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-10 w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all ${isGold ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-black shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]" : "bg-white/10 text-white hover:bg-white hover:text-black border border-white/20 hover:border-transparent"}`}
            >
              Klaim {title}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};


// --- 3. MAIN PAGE COMPONENT ---
export default function AboutPage() {
  return (
    <main className="relative z-10 pt-32 pb-32 px-4 md:px-8 flex flex-col items-center min-h-screen overflow-hidden bg-[#050505] selection:bg-green-500 selection:text-black">
      
      {/* Grid Pattern Background ala Designer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* About specific orb background (distinct from global orbs) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-20 w-[520px] h-[520px] rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(59,130,246,0.16), transparent 25%)' }} />
        <div className="absolute bottom-[-18%] right-[-8%] w-[420px] h-[420px] rounded-full blur-[120px]" style={{ background: 'radial-gradient(circle at 70% 70%, rgba(16,185,129,0.12), transparent 28%)' }} />
      </div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center w-full max-w-6xl mb-40 mt-20 relative z-10"
      >
        <div className="flex justify-center items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-green-400 text-xs font-bold tracking-[0.3em] uppercase">Visi & Pergerakan</span>
          <Sparkles className="w-4 h-4 text-green-400" />
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter text-white leading-[0.85] mb-8">
          MEMBANGUN <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-500 italic pr-6 pb-4">
            MASA DEPAN.
          </span>
        </h2>
        <p className="text-lg md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
          Kami bukan sekadar platform. Kami adalah revolusi <b className="text-white font-medium border-b border-green-500/50 pb-1">UMKM Hijau</b> yang mengubah cara bisnis bernapas di Indonesia.
        </p>
      </motion.div>

      {/* VISI MISI - ASYMMETRIC 70/30 GRID WITH DESIGNER TOUCHES */}
      <div className="w-full max-w-[1400px] flex flex-col gap-32 mb-40 relative z-10">
        
        {/* ROW 1: VISI (Kiri 65, Kanan 35) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 relative"
          >
            {/* Dekorasi tipografi besar di background */}
            <div className="absolute -left-10 -top-20 text-[10rem] font-black text-white/[0.02] pointer-events-none select-none hidden md:block">01</div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-green-500" />
              <span className="text-green-400 text-sm font-bold tracking-widest uppercase">Manifesto Kami</span>
            </div>
            
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Ekosistem Bisnis <br/> <span className="text-neutral-600">Nol Karbon.</span>
            </h3>
            <p className="text-xl text-neutral-400 leading-relaxed font-light mb-8 max-w-2xl">
              Mengintegrasikan transformasi ekonomi akar rumput dengan keberlanjutan lingkungan. Proyeksi kami jelas: <span className="text-green-400 font-medium">100% UMKM Indonesia</span> melek energi hijau sebelum akhir dekade ini.
            </p>
            
            {/* Data point kecil ala Lusion */}
            <div className="flex gap-12 border-t border-white/10 pt-8 max-w-2xl">
              <div>
                <p className="text-3xl font-black text-white mb-1">2030</p>
                <p className="text-xs text-neutral-500 tracking-widest uppercase">Target Tahun</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white mb-1">0<span className="text-green-500">CO2</span></p>
                <p className="text-xs text-neutral-500 tracking-widest uppercase">Emisi Bersih</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[500px] p-2 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl relative"
          >
            {/* Lusion Image Component dengan efek 50ms blur lu */}
            <LusionImage src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop" alt="Green Abstract" cursor="default" flashFirst={true} enableHoverZoom={true} />
          </motion.div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent my-10" />

        {/* ROW 2: MISI (Kiri 40, Kanan 60) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[600px] p-2 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl order-2 lg:order-1 relative"
          >
            <LusionImage src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop" alt="Sprout" cursor="default" flashFirst={true} enableHoverZoom={true} />
            
            {/* Floating Card ala buatan lu yang di copy paste */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-12 -right-6 lg:-right-12 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl z-20"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Eksekusi Nyata</p>
                <p className="text-xs text-neutral-400">Implementasi Akar Rumput</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 relative order-1 lg:order-2 lg:pl-12"
          >
            <div className="absolute -right-10 -top-20 text-[10rem] font-black text-white/[0.02] pointer-events-none select-none hidden md:block">02</div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-emerald-500" />
              <span className="text-emerald-400 text-sm font-bold tracking-widest uppercase">Strategi & Misi</span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-12 leading-[1.1] tracking-tight">
              Tiga Pilar <br/> <span className="text-neutral-600">Pergerakan.</span>
            </h3>
            
            <div className="space-y-8">
              {[
                { title: "Edukasi Definitif", desc: "Mendemokratisasi ilmu efisiensi energi ke lapisan usaha terkecil dengan modul yang mudah dicerna.", icon: ShieldCheck },
                { title: "Akses Teknologi", desc: "Menjembatani UMKM dengan infrastruktur hijau (seperti solar panel mini) yang disubsidi dan terjangkau.", icon: Zap },
                { title: "Komunitas Berkelanjutan", desc: "Membangun jaringan bisnis lokal yang saling memasok dan mendukung praktik sirkular ekonomi.", icon: Leaf }
              ].map((item, i) => (
                <div key={i} className="group relative pl-8 md:pl-12">
                  {/* Garis vertikal & Dot animasi */}
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-neutral-800">
                    <div className="absolute top-2 -left-[4px] w-2 h-2 rounded-full bg-neutral-600 group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300" />
                    <div className="absolute top-2 left-0 w-[1px] h-0 bg-emerald-400 group-hover:h-full transition-all duration-700 ease-out" />
                  </div>
                  
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="mt-1 p-2 rounded-lg bg-white/5 text-neutral-500 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>


      {/* THE BADGES - PREMIUM 3D TILT CARDS */}
      <div className="w-full max-w-6xl mt-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-xs font-bold tracking-[0.2em] mb-6">
            PROGRAM REWARD
          </div>
          <h3 className="text-5xl md:text-6xl font-black text-white tracking-tight">The Badges.</h3>
          <p className="text-neutral-400 mt-4 text-xl font-light">Validasi mutlak untuk pahlawan bumi.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {/* SILVER BADGE - 3D GLASSMORPHISM */}
          <PremiumCard 
            tier="silver"
            title="Silver"
            subtitle="Fondasi awal untuk efisiensi energi bisnis Anda."
            features={[
              "E-Sertifikat Ekologi Terverifikasi",
              "Modul Efisiensi Listrik UMKM",
              "Pin Spesifik 'Eco-Friendly' di Maps",
              "Konsultasi Komunitas Bulanan"
            ]}
            icon={ShieldCheck}
          />

          {/* GOLD BADGE - 3D GLOWING ROYAL */}
          <PremiumCard 
            tier="gold"
            title="Gold"
            subtitle="Puncak eksekusi hijau. Dicari investor & konsumen."
            features={[
              "Semua Benefit dari Tier Silver",
              "Prioritas Tampil di Halaman Utama",
              "Badge 3D Interaktif di Profil Usaha",
              "Akses Langsung Investor Hijau",
              "Subsidi Panel Surya Tahap 1"
            ]}
            icon={Trophy}
          />

        </div>
      </div>
      
    </main>
  );
}