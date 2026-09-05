"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { Trophy, Zap, ShieldCheck, Leaf, Globe2, Sparkles } from "lucide-react";

// --- 1. KOMPONEN GYRO IMAGE (REFINED) ---
const LusionImage = ({
  src,
  alt,
  cursor = "default",
  flashFirst = true,
  enableHoverZoom = true,
}: {
  src: string;
  alt: string;
  cursor?: string;
  flashFirst?: boolean;
  enableHoverZoom?: boolean;
}) => {
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
          whileHover={enableHoverZoom ? { scale: 1.06 } : {}}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full object-cover rounded-3xl"
          style={{
            filter: heroImgBlurred
              ? "blur(15px) saturate(0.3) brightness(1.2)"
              : "blur(0px) saturate(1) brightness(1)",
            transition: heroImgBlurred
              ? "none"
              : "filter 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {flashVisible && (
          <motion.div
            initial={{ opacity: 1, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.6 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-white/90 rounded-3xl pointer-events-none"
          />
        )}

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
  icon: Icon,
}: {
  tier: "silver" | "gold";
  title: string;
  subtitle: string;
  features: string[];
  icon: any;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], ["15deg", "-15deg"]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], ["-15deg", "15deg"]),
    springConfig,
  );
  const translateZ = useSpring(
    useTransform(x, [-0.5, 0.5], [-20, 20]),
    springConfig,
  );

  const isGold = tier === "gold";

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  const backgroundGlare = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px, 
    ${isGold ? "rgba(250, 204, 21, 0.15)" : "var(--ab-glare)"}, 
    transparent 80%
  )`;

  const labelBg = isGold
    ? "bg-yellow-500 text-black shadow-[0_0_20px_rgba(250,204,21,0.6)]"
    : "bg-slate-300 text-black shadow-[0_0_20px_rgba(203,213,225,0.4)]";

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
        {/* BORDER CONTAINER */}
        <div
          className={`absolute inset-0 rounded-3xl overflow-hidden ${isGold ? "p-[2px]" : "p-[1px] bg-[var(--ab-border-strong)]"}`}
        >
          {isGold && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_280deg,#facc15_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
        </div>

        {/* MAIN CARD BODY - background via class tema (globals.css) */}
        <div
          className={`relative h-full w-full rounded-3xl p-8 overflow-hidden backdrop-blur-xl ${
            isGold ? "about-gold-card" : "about-silver-card"
          } ${isGold ? "m-[2px] w-[calc(100%-4px)] h-[calc(100%-4px)]" : ""}`}
        >
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 mix-blend-screen"
            style={{ background: backgroundGlare }}
          />

          <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[var(--ab-dot)] group-hover:bg-green-500 transition-colors duration-500" />
          <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[var(--ab-dot)] group-hover:bg-green-500 transition-colors duration-500" />

          {/* PARALLAX CONTENT INNER */}
          <motion.div
            style={{ x: translateZ, y: translateZ, translateZ: 50 }}
            className="relative z-10 flex flex-col h-full transform-style-3d"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <motion.div
                  initial={{ opacity: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  className={`w-fit px-4 py-1.5 mb-5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${labelBg}`}
                >
                  {isGold ? "Legendary Tier" : "Essential Tier"}
                </motion.div>

                <h4
                  className={`text-4xl md:text-5xl font-black tracking-tighter ${
                    isGold
                      ? "gold-title"
                      : "text-[var(--ab-text)]"
                  }`}
                >
                  {title}
                </h4>
                <p className="text-[var(--ab-muted)] mt-2 text-sm md:text-base max-w-[250px]">
                  {subtitle}
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl ${
                  isGold
                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30"
                    : "bg-slate-500/10 text-slate-500 border border-slate-500/30"
                } shadow-2xl`}
              >
                <Icon size={28} strokeWidth={1.5} />
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mt-auto pt-6">
              {features.map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm md:text-base font-medium text-[var(--ab-feature)] group-hover:text-[var(--ab-text)] transition-colors"
                >
                  <div
                    className={`w-1.5 h-1.5 rotate-45 ${
                      isGold
                        ? "bg-yellow-500 shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                        : "bg-slate-400 group-hover:bg-[var(--ab-text)]"
                    }`}
                  />
                  {item}
                </li>
              ))}
            </ul>

            {/* Call to action button inside card */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`mt-10 w-full py-3 rounded-xl font-bold text-sm tracking-wide transition-all ${
                isGold
                  ? "bg-gradient-to-r from-yellow-500 to-amber-600 !text-black shadow-[0_0_20px_rgba(250,204,21,0.3)] hover:shadow-[0_0_30px_rgba(250,204,21,0.5)]"
                  : "bg-slate-800 !text-white shadow-[0_0_15px_rgba(0,0,0,0.2)] hover:shadow-[0_0_25px_rgba(100,116,139,0.4)]"
              }`}
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
    <main className="about-page relative z-10 pt-32 pb-32 px-4 md:px-8 flex flex-col items-center min-h-screen overflow-hidden bg-[var(--ab-bg)] selection:bg-green-500 selection:text-black">
      {/* Grid Pattern Background - warna via variable biar ikut tema */}
      <div className="absolute inset-0 bg-[linear-gradient(var(--ab-grid)_1px,transparent_1px),linear-gradient(90deg,var(--ab-grid)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* ANIMATED BACKGROUND ORBS - warna via --orb-* (adaptif di globals.css) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1.1, 1.2, 1.1],
            x: [0, 30, 0],
            y: [0, -40, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-20 w-[550px] h-[550px] rounded-full bg-[var(--orb-1)] blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1.05, 1.15, 1.05],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-[30%] -right-[10%] w-[600px] h-[600px] rounded-full bg-[var(--orb-2)] blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1.05, 1.15, 1.05],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--orb-3)] blur-[150px]"
        />
      </div>

      {/* HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center w-full max-w-6xl mb-40 mt-20 relative z-10 cursor-default"
      >
        <div className="flex justify-center items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-green-500" />
          <span className="text-green-500 text-xs font-bold tracking-[0.3em] uppercase">
            Visi & Pergerakan
          </span>
          <Sparkles className="w-4 h-4 text-green-500" />
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-[7.5rem] font-black tracking-tighter text-[var(--ab-text)] leading-[0.85] mb-8">
          MEMBANGUN <br />
          <span className="hero-grad text-transparent bg-clip-text italic pr-6 pb-4 inline-block">
            MASA DEPAN.
          </span>
        </h2>
        <p className="text-lg md:text-2xl text-[var(--ab-muted)] max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
          Kami bukan sekadar platform. Kami adalah revolusi{" "}
          <b className="text-[var(--ab-text)] font-medium border-b border-green-500/50 pb-1">
            UMKM Hijau
          </b>{" "}
          yang mengubah cara bisnis bernapas di Indonesia.
        </p>
      </motion.div>

      {/* VISI MISI */}
      <div className="w-full max-w-[1400px] flex flex-col gap-32 mb-40 relative z-10">
        {/* ROW 1: VISI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute -left-10 -top-20 text-[10rem] font-black text-[var(--ab-watermark)] pointer-events-none select-none hidden md:block">
              01
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-green-500" />
              <span className="text-green-500 text-sm font-bold tracking-widest uppercase">
                Manifesto Kami
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--ab-text)] mb-8 leading-[1.1] tracking-tight">
              Ekosistem Bisnis <br />{" "}
              <span className="text-[var(--ab-dim)]">Nol Karbon.</span>
            </h3>
            <p className="text-xl text-[var(--ab-muted)] leading-relaxed font-light mb-8 max-w-2xl">
              Mengintegrasikan transformasi ekonomi akar rumput dengan
              keberlanjutan lingkungan. Proyeksi kami jelas:{" "}
              <span className="text-green-500 font-medium">
                100% UMKM Indonesia
              </span>{" "}
              melek energi hijau sebelum akhir dekade ini.
            </p>

            <div className="flex gap-12 border-t border-[var(--ab-border)] pt-8 max-w-2xl">
              <div>
                <p className="text-3xl font-black text-[var(--ab-text)] mb-1">
                  2030
                </p>
                <p className="text-xs text-[var(--ab-dim)] tracking-widest uppercase">
                  Target Tahun
                </p>
              </div>
              <div>
                <p className="text-3xl font-black text-[var(--ab-text)] mb-1">
                  0<span className="text-green-500">CO2</span>
                </p>
                <p className="text-xs text-[var(--ab-dim)] tracking-widest uppercase">
                  Emisi Bersih
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[500px] p-2 bg-[var(--ab-card)] rounded-[2.5rem] border border-[var(--ab-border)] shadow-2xl relative"
          >
            <LusionImage
              src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=1000&auto=format&fit=crop"
              alt="Green Abstract"
              cursor="default"
              flashFirst={true}
              enableHoverZoom={true}
            />
          </motion.div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--ab-border)] to-transparent my-10" />

        {/* ROW 2: MISI */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 h-[600px] p-2 bg-[var(--ab-card)] rounded-[2.5rem] border border-[var(--ab-border)] shadow-2xl order-2 lg:order-1 relative"
          >
            <LusionImage
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000&auto=format&fit=crop"
              alt="Sprout"
              cursor="default"
              flashFirst={true}
              enableHoverZoom={true}
            />

            <motion.div
              initial={{ opacity: 0, x: -30, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute bottom-12 -right-6 lg:-right-12 bg-[var(--ab-chip)] backdrop-blur-xl border border-[var(--ab-border)] rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl z-20"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--ab-text)]">
                  Eksekusi Nyata
                </p>
                <p className="text-xs text-[var(--ab-muted)]">
                  Implementasi Akar Rumput
                </p>
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
            <div className="absolute -right-10 -top-20 text-[10rem] font-black text-[var(--ab-watermark)] pointer-events-none select-none hidden md:block">
              02
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-emerald-500" />
              <span className="text-emerald-500 text-sm font-bold tracking-widest uppercase">
                Strategi & Misi
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--ab-text)] mb-12 leading-[1.1] tracking-tight">
              Tiga Pilar <br />{" "}
              <span className="text-[var(--ab-dim)]">Pergerakan.</span>
            </h3>

            <div className="space-y-8">
              {[
                {
                  title: "Edukasi Definitif",
                  desc: "Mendemokratisasi ilmu efisiensi energi ke lapisan usaha terkecil dengan modul yang mudah dicerna.",
                  icon: ShieldCheck,
                },
                {
                  title: "Akses Teknologi",
                  desc: "Menjembatani UMKM dengan infrastruktur hijau (seperti solar panel mini) yang disubsidi dan terjangkau.",
                  icon: Zap,
                },
                {
                  title: "Komunitas Berkelanjutan",
                  desc: "Membangun jaringan bisnis lokal yang saling memasok dan mendukung praktik sirkular ekonomi.",
                  icon: Leaf,
                },
              ].map((item, i) => (
                <div key={i} className="group relative pl-8 md:pl-12">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[var(--ab-track)]">
                    <div className="absolute top-2 -left-[4px] w-2 h-2 rounded-full bg-[var(--ab-track-dot)] group-hover:bg-emerald-400 group-hover:scale-150 transition-all duration-300" />
                    <div className="absolute top-2 left-0 w-[1px] h-0 bg-emerald-400 group-hover:h-full transition-all duration-700 ease-out" />
                  </div>

                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="mt-1 p-2 rounded-lg bg-[var(--ab-icon-box)] text-[var(--ab-dim)] group-hover:text-emerald-500 group-hover:bg-emerald-500/10 transition-colors duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-bold text-[var(--ab-text)] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[var(--ab-muted)] leading-relaxed transition-colors">
                        {item.desc}
                      </p>
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
          <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--ab-card)] border border-[var(--ab-border)] text-[var(--ab-muted)] text-xs font-bold tracking-[0.2em] mb-6">
            PROGRAM REWARD
          </div>
          <h3 className="text-5xl md:text-6xl font-black text-[var(--ab-text)] tracking-tight">
            The Badges.
          </h3>
          <p className="text-[var(--ab-muted)] mt-4 text-xl font-light">
            Validasi mutlak untuk pahlawan bumi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* SILVER BADGE */}
          <PremiumCard
            tier="silver"
            title="Silver"
            subtitle="Fondasi awal untuk efisiensi energi bisnis Anda."
            features={[
              "E-Sertifikat Ekologi Terverifikasi",
              "Modul Efisiensi Listrik UMKM",
              "Pin Spesifik 'Eco-Friendly' di Maps",
              "Konsultasi Komunitas Bulanan",
            ]}
            icon={ShieldCheck}
          />

          {/* GOLD BADGE */}
          <PremiumCard
            tier="gold"
            title="Gold"
            subtitle="Puncak eksekusi hijau. Dicari investor & konsumen."
            features={[
              "Semua Benefit dari Tier Silver",
              "Prioritas Tampil di Halaman Utama",
              "Badge 3D Interaktif di Profil Usaha",
              "Akses Langsung Investor Hijau",
              "Subsidi Panel Surya Tahap 1",
            ]}
            icon={Trophy}
          />
        </div>
      </div>
    </main>
  );
}