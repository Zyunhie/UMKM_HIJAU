"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
    HomeIcon,
    Trophy,
    Shield,
    Zap,
    TrendingUp,
    Users,
    Award,
    ChevronRight,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Gauge,
    CircleCheck,
    Coins,
    Cloud,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
    const heroRef = useRef(null);
    const timelineRef = useRef(null);
    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HTMLDivElement>(null);

    const [heroImgBlurred, setHeroImgBlurred] = useState(false);
    const [flashVisibleHome, setFlashVisibleHome] = useState(true);
    const [allowHeroInteraction, setAllowHeroInteraction] = useState(false);

    // ====== DETEKSI TEMA ======
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        const checkTheme = () => {
            setIsLight(document.body.classList.contains("light-theme"));
        };
        checkTheme();

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === "class") {
                    checkTheme();
                }
            });
        });
        observer.observe(document.body, { attributes: true });

        return () => observer.disconnect();
    }, []);

    // ====== HOVER STATE UNTUK TOMBOL ======
    const [hoveredBtn, setHoveredBtn] = useState<"primary" | "secondary" | null>(null);

    // ====== OBJEK TEMA ======
    const theme = {
        mainBg: isLight ? "bg-white" : "bg-[#050505]",
        mainText: isLight ? "text-neutral-900" : "text-white",
        gridStroke: isLight ? "#000000" : "#ffffff",
        orbColor1: isLight ? "bg-green-400/30" : "bg-green-600/10",
        orbColor2: isLight ? "bg-emerald-400/30" : "bg-emerald-600/10",
        heroGradientFrom: isLight ? "from-white" : "from-[#050505]",
        heroGradientVia: isLight ? "via-white/60" : "via-[#050505]/40",
        heroGradientTo: isLight ? "to-transparent" : "to-transparent",
        borderDefault: isLight ? "border-neutral-200" : "border-white/10",
        bgCard: isLight ? "bg-white" : "bg-white/5",
        borderCard: isLight ? "border-neutral-200" : "border-white/10",
        shadowCard: isLight ? "shadow-md" : "shadow-none",
        hoverShadowCard: isLight ? "hover:shadow-xl" : "hover:shadow-none",
        textNeutral: isLight ? "text-neutral-600" : "text-neutral-300",
        textMuted: isLight ? "text-neutral-500" : "text-neutral-400",
        textSubtle: isLight ? "text-neutral-400" : "text-neutral-500",
        primaryBtnBg: isLight
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            : "bg-gradient-to-r from-green-500 to-emerald-500 text-black",
        secondaryBtnBg: isLight
            ? "border-neutral-300 text-neutral-800 hover:bg-neutral-100"
            : "border-white/10 text-white hover:bg-white/10",
        chartGridLine: isLight ? "#cbd5e1" : "rgba(255,255,255,0.05)",
        chartAxisText: isLight ? "#334155" : "#666",
        chartTooltipBg: isLight
            ? "bg-white border-neutral-300"
            : "bg-[#0a0a0a]/90 border-green-500/30",
        statCardBg: isLight ? "bg-white" : "bg-white/5",
        statCardBorder: isLight ? "border-neutral-200" : "border-white/10",
        statCardShadow: isLight ? "shadow-md" : "shadow-none",
        timelineLineBg: isLight ? "#e5e7eb" : "rgba(255,255,255,0.05)",
        timelineLineProgress: isLight ? "#10b981" : "#22c55e",
        timelineDotBorder: isLight ? "border-green-500" : "border-green-500",
        timelineDotBg: isLight ? "bg-white" : "bg-[#050505]",
        timelineCardBg: isLight ? "bg-white" : "bg-white/5",
        timelineCardBorder: isLight ? "border-neutral-200" : "border-white/10",
        timelineCardShadow: isLight ? "shadow-md" : "shadow-none",
        ctaBg: isLight
            ? "bg-green-50"
            : "bg-gradient-to-br from-green-900/40 via-emerald-900/30 to-green-800/40",
        ctaBorder: isLight ? "border-green-200" : "border-white/10",
        ctaText: isLight ? "text-neutral-900" : "text-white",
        ctaSubText: isLight ? "text-neutral-700" : "text-neutral-300",
        footerBg: isLight ? "bg-neutral-50" : "bg-black/30",
        footerBorder: isLight ? "border-neutral-200" : "border-white/5",
        footerText: isLight ? "text-neutral-600" : "text-neutral-400",
        footerHeading: isLight ? "text-neutral-900" : "text-white",
        footerIconColor: isLight ? "text-green-600" : "text-green-400",
        socialIconBg: isLight ? "bg-white border-neutral-200" : "bg-white/5",
        socialIconText: isLight ? "text-neutral-600" : "text-neutral-400",
        socialIconHover: isLight
            ? "hover:text-green-600 hover:bg-neutral-100"
            : "hover:text-green-400 hover:bg-white/10",
        btnPrimary: isLight
            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border border-transparent hover:bg-none hover:border-neutral-300 hover:text-neutral-800"
            : "bg-gradient-to-r from-green-500 to-emerald-500 text-black border border-transparent hover:bg-none hover:border-white/10 hover:text-white",
        btnSecondary: isLight
            ? "transition-all-600 bg-transparent border border-neutral-300 text-neutral-800 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white hover:border-transparent"
            : "bg-transparent border border-white/10 text-white hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-black hover:border-transparent",
    };

    // TIMELINE SCROLL
    const { scrollYProgress } = useScroll({
        target: timelineContainerRef,
        offset: ["start 0.8", "end 0.2"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const [svgHeight, setSvgHeight] = useState(1000);

    useEffect(() => {
        if (!timelineContainerRef.current) return;
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSvgHeight(entry.contentRect.height);
            }
        });
        observer.observe(timelineContainerRef.current);
        return () => observer.disconnect();
    }, []);

    const handleImageMouseEnter = () => {
        if (!allowHeroInteraction) return;
        setHeroImgBlurred(true);
        setTimeout(() => {
            setHeroImgBlurred(false);
        }, 50);
    };

    useEffect(() => {
        const t1 = setTimeout(() => setFlashVisibleHome(false), 380);
        const t2 = setTimeout(() => setAllowHeroInteraction(true), 420);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, []);

    const createCurvedPath = (height: number) => {
        const segments = 8;
        const segmentHeight = height / segments;
        let path = `M 40 0`;
        for (let i = 0; i < segments; i++) {
            const y1 = segmentHeight * i + segmentHeight * 0.3;
            const y2 = segmentHeight * i + segmentHeight * 0.7;
            const y3 = segmentHeight * (i + 1);
            const xDir = i % 2 === 0 ? 70 : 10;
            path += ` C ${xDir} ${y1}, ${xDir} ${y2}, 40 ${y3}`;
        }
        return path;
    };

    const curvedPath = createCurvedPath(svgHeight);

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMoveHero = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePosition({ x, y });
    };

    // Monthly data
    const monthlyData = [
        { month: "Jan", kWh: 420 },
        { month: "Feb", kWh: 390 },
        { month: "Mar", kWh: 370 },
        { month: "Apr", kWh: 340 },
        { month: "Mei", kWh: 310 },
        { month: "Jun", kWh: 290 },
        { month: "Jul", kWh: 270 },
        { month: "Agu", kWh: 250 },
        { month: "Sep", kWh: 230 },
        { month: "Okt", kWh: 210 },
        { month: "Nov", kWh: 190 },
        { month: "Des", kWh: 170 },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const chartWidth = 800;
    const chartHeight = 300;
    const padding = { top: 20, bottom: 30, left: 50, right: 20 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;
    const maxKwh = 450;
    const minKwh = 0;

    const getPoint = (index: number) => {
        const x = padding.left + (index / (monthlyData.length - 1)) * innerWidth;
        const y =
            padding.top +
            innerHeight -
            ((monthlyData[index].kWh - minKwh) / (maxKwh - minKwh)) * innerHeight;
        return { x, y };
    };

    const linePath = monthlyData
        .map((_, i) => {
            const point = getPoint(i);
            return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`;
        })
        .join(" ");

    const areaPath =
        monthlyData
            .map((_, i) => {
                const point = getPoint(i);
                return `${i === 0 ? "M" : "L"} ${point.x} ${point.y}`;
            })
            .join(" ") +
        ` L ${getPoint(monthlyData.length - 1).x} ${padding.top + innerHeight} L ${getPoint(0).x} ${padding.top + innerHeight} Z`;

    const handleChartMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        const svg = e.currentTarget;
        const point = svg.createSVGPoint();
        point.x = e.clientX;
        point.y = e.clientY;
        const ctm = svg.getScreenCTM();
        if (!ctm) return;
        const svgPoint = point.matrixTransform(ctm.inverse());
        const step = innerWidth / (monthlyData.length - 1);
        let index = Math.round((svgPoint.x - padding.left) / step);
        index = Math.max(0, Math.min(index, monthlyData.length - 1));
        setHoveredIndex(index);
    };

    const timelineSteps = [
        {
            title: "Daftar Akun",
            desc: "Buat akun sebagai UMKM atau User dengan data yang valid.",
            icon: Users,
            color: "emerald",
            bgClass: isLight ? "bg-emerald-100" : "bg-emerald-500/10",
            borderClass: isLight ? "border-emerald-200" : "border-emerald-500/20",
            textClass: isLight ? "text-emerald-700" : "text-emerald-400",
        },
        {
            title: "Audit Energi",
            desc: "Isi data inventaris dan konsumsi listrik untuk dihitung IKE.",
            icon: Gauge,
            color: "blue",
            bgClass: isLight ? "bg-blue-100" : "bg-blue-500/10",
            borderClass: isLight ? "border-blue-200" : "border-blue-500/20",
            textClass: isLight ? "text-blue-700" : "text-blue-400",
        },
        {
            title: "Penilaian & Verifikasi",
            desc: "Tim ahli memverifikasi data dan memberikan penilaian.",
            icon: CircleCheck,
            color: "amber",
            bgClass: isLight ? "bg-amber-100" : "bg-amber-500/10",
            borderClass: isLight ? "border-amber-200" : "border-amber-500/20",
            textClass: isLight ? "text-amber-700" : "text-amber-400",
        },
        {
            title: "Dapatkan Label",
            desc: "Terima label UMKM Hijau Gold atau Silver.",
            icon: Award,
            color: "green",
            bgClass: isLight ? "bg-green-100" : "bg-green-500/10",
            borderClass: isLight ? "border-green-200" : "border-green-500/20",
            textClass: isLight ? "text-green-700" : "text-green-400",
        },
    ];

    return (
        <main
            className={`relative overflow-x-hidden ${theme.mainBg} ${theme.mainText} transition-colors duration-500`}
        >
            {/* Background garis 45 derajat */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <svg
                    className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.03] light:opacity-[0.06]"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="grid"
                            width="60"
                            height="60"
                            patternUnits="userSpaceOnUse"
                            patternTransform="rotate(45)"
                        >
                            <path
                                d="M 60 0 L 0 0 0 60"
                                fill="none"
                                stroke={theme.gridStroke}
                                strokeWidth="0.5"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
                <div
                    className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] ${theme.orbColor1} rounded-full blur-[120px]`}
                />
                <div
                    className={`absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] ${theme.orbColor2} rounded-full blur-[120px]`}
                />
            </div>

            {/* ===== HERO ===== */}
            <section
                ref={heroRef}
                className="relative z-10 flex flex-col lg:flex-row min-h-screen pt-24 pb-12 lg:pt-32 lg:pb-0"
            >
                {/* Kiri: Teks */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-20 xl:px-24 py-8 lg:py-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-2xl"
                    >
                        <div
                            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.bgCard} ${theme.borderDefault} mb-8 backdrop-blur-md ${theme.shadowCard}`}
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span
                                className={`text-xs sm:text-sm ${theme.textNeutral} font-medium tracking-wide`}
                            >
                                Hemat listrik hingga 15% khusus UMKM
                            </span>
                        </div>

                        <h1
                            className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] mb-6 ${theme.mainText}`}
                        >
                            Bersama UMKM,
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-500">
                                Wujudkan Indonesia
                            </span>
                            <br />
                            yang Lebih Hijau.
                        </h1>

                        <p
                            className={`text-base sm:text-lg ${theme.textMuted} leading-relaxed max-w-lg mb-10`}
                        >
                            Platform yang membantu pelaku usaha meningkatkan efisiensi energi,
                            mendapatkan sertifikasi hijau, dan tumbuh di ekosistem ramah
                            lingkungan.
                        </p>

                        {/* ===== TOMBOL DENGAN ANIMASI KHUSUS (DURASI 0.3s, OFFSET KECIL, BORDER 4px) ===== */}
{/* ===== TOMBOL DENGAN ANIMASI KHUSUS (DURASI 0.3s, OFFSET KECIL, BORDER 4px) ===== */}
<div className="flex flex-nowrap gap-4 mb-12">
    {/* Tombol Hijau — "Jelajahi UMKM" */}
    <Link href="/map">
        <motion.button
            onHoverStart={() => setHoveredBtn("primary")}
            onHoverEnd={() => setHoveredBtn(null)}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3.5 rounded-full font-bold text-sm tracking-wide cursor-pointer flex items-center border-[4px] transition-colors duration-300 flex-shrink-0 ${
                hoveredBtn === "primary"
                    ? "bg-transparent border-green-500 text-green-500"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 border-transparent text-white"
            }`}
        >
            <span className="relative inline-flex items-center whitespace-nowrap">
                {/* Ikon kiri — muncul dari kiri saat hover */}
                <motion.span
                    animate={{
                        x: hoveredBtn === "primary" ? 0 : -12,
                        opacity: hoveredBtn === "primary" ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0"
                >
                    <ChevronRight className="w-4 h-4" />
                </motion.span>

                {/* Teks — bergeser sedikit ke kanan */}
                <motion.span
                    animate={{
                        paddingLeft: hoveredBtn === "primary" ? 14 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    Jelajahi UMKM
                </motion.span>

                {/* Ikon kanan — menghilang ke kanan */}
                <motion.span
                    animate={{
                        x: hoveredBtn === "primary" ? 12 : 0,
                        opacity: hoveredBtn === "primary" ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronRight className="w-4 h-4" />
                </motion.span>
            </span>
        </motion.button>
    </Link>

    {/* Tombol Transparan — "Pelajari Lebih Lanjut" */}
    <Link href="/about">
        <motion.button
            onHoverStart={() => setHoveredBtn("secondary")}
            onHoverEnd={() => setHoveredBtn(null)}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3.5 rounded-full font-medium text-sm tracking-wide cursor-pointer flex items-center border-[4px] transition-colors duration-300 flex-shrink-0 ${
                hoveredBtn === "secondary"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 text-black"
                    : `bg-transparent ${isLight ? "border-neutral-300 text-neutral-800" : "border-white/10 text-white"}`
            }`}
        >
            <span className="relative inline-flex items-center whitespace-nowrap">
                {/* Ikon kiri — muncul dari kiri saat hover */}
                <motion.span
                    animate={{
                        x: hoveredBtn === "secondary" ? 0 : -12,
                        opacity: hoveredBtn === "secondary" ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-0"
                >
                    <ChevronRight className="w-4 h-4" />
                </motion.span>

                {/* Teks — bergeser sedikit ke kanan */}
                <motion.span
                    animate={{
                        paddingLeft: hoveredBtn === "secondary" ? 14 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    Pelajari Lebih Lanjut
                </motion.span>

                {/* Ikon kanan — menghilang ke kanan */}
                <motion.span
                    animate={{
                        x: hoveredBtn === "secondary" ? 12 : 0,
                        opacity: hoveredBtn === "secondary" ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <ChevronRight className="w-4 h-4" />
                </motion.span>
            </span>
        </motion.button>
    </Link>
</div>

                        {/* Social Proof */}
                        <div
                            className={`flex items-center gap-6 pt-6 border-t ${theme.borderDefault}`}
                        >
                            <div className="flex -space-x-3">
                                {["U", "A", "R", "D"].map((initial, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className={`w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-xs font-bold border-2 ${isLight ? "border-white" : "border-[#050505]"} text-black`}
                                    >
                                        {initial}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-baseline gap-2">
                                    <span className={`text-xl font-bold ${theme.mainText}`}>
                                        1.2K+
                                    </span>
                                    <span className={`text-xs ${theme.textSubtle}`}>
                                        UMKM Terdaftar
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-green-400">
                                    <TrendingUp className="w-3 h-3" />
                                    <span>Tumbuh 12% bulan ini</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Kanan: Gambar dengan BLUR EFFECT */}
                <div
                    className="w-full lg:w-1/2 relative overflow-hidden min-h-[400px] lg:min-h-screen group"
                    onMouseMove={handleMouseMoveHero}
                    onMouseEnter={handleImageMouseEnter}
                    onMouseLeave={() => {
                        setMousePosition({ x: 0, y: 0 });
                        setHeroImgBlurred(false);
                    }}
                >
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            x: mousePosition.x * -15,
                            y: mousePosition.y * -15,
                            scale: 1,
                        }}
                        transition={{ type: "spring", damping: 30, stiffness: 100 }}
                    >
                        <motion.img
                            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                            alt="Hijau dan Energi"
                            className="w-full h-full object-cover"
                            whileHover={allowHeroInteraction ? { scale: 1.06 } : {}}
                            style={{
                                filter: heroImgBlurred
                                    ? "blur(15px) saturate(0.3) brightness(1.7)"
                                    : "blur(0px) saturate(1) brightness(1.0)",
                                transition: heroImgBlurred ? "none" : "filter 0.5s ease-out",
                            }}
                            transition={{ duration: 0.6 }}
                        />
                        <div
                            className={`absolute inset-0 bg-gradient-to-l ${theme.heroGradientFrom} ${theme.heroGradientVia} ${theme.heroGradientTo}`}
                        />
                        <div
                            className={`absolute inset-0 bg-gradient-to-t ${theme.heroGradientFrom} via-transparent to-transparent`}
                        />
                    </motion.div>

                    {flashVisibleHome && (
                        <motion.div
                            initial={{ opacity: 1, scale: 0.9 }}
                            animate={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="absolute inset-0 bg-white rounded-2xl pointer-events-none"
                        />
                    )}

                    {/* Floating Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, y: -20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className={`absolute top-12 right-6 md:right-12 ${isLight ? "bg-white/80 border-neutral-200 shadow-lg" : "bg-black/60 border-white/10 shadow-2xl"} backdrop-blur-xl border rounded-2xl px-5 py-4 flex items-center gap-4`}
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
                            <Trophy className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className={`text-sm font-bold ${theme.mainText}`}>UMKM Gold</p>
                            <p className={`text-xs ${theme.textMuted}`}>856+ Terverifikasi</p>
                        </div>
                    </motion.div>

                    {/* Floating Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, x: -30, y: 20 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        className={`absolute bottom-12 left-6 md:left-12 ${isLight ? "bg-white/80 border-neutral-200 shadow-lg" : "bg-black/60 border-white/10 shadow-2xl"} backdrop-blur-xl border rounded-2xl px-5 py-4 flex items-center gap-4`}
                    >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className={`text-sm font-bold ${theme.mainText}`}>15% Hemat</p>
                            <p className={`text-xs ${theme.textMuted}`}>
                                Rata-rata pengurangan
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== STATS CARDS ===== */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: HomeIcon,
                                label: "Total UMKM Hijau",
                                value: "1.247",
                                trend: "+12% dari bulan lalu",
                                color: "green",
                                bg: isLight
                                    ? "bg-green-50"
                                    : "from-green-500/10 to-emerald-500/5",
                                iconBg: "bg-green-500",
                                border: isLight ? "border-green-200" : "border-white/5",
                                shadow: isLight ? "shadow-md" : "shadow-none",
                            },
                            {
                                icon: Trophy,
                                label: "UMKM Gold",
                                value: "856",
                                trend: "Sertifikasi Premium",
                                color: "yellow",
                                bg: isLight
                                    ? "bg-yellow-50"
                                    : "from-yellow-500/10 to-amber-500/5",
                                iconBg: "bg-yellow-500",
                                border: isLight ? "border-yellow-200" : "border-white/5",
                                shadow: isLight ? "shadow-md" : "shadow-none",
                            },
                            {
                                icon: Shield,
                                label: "UMKM Silver",
                                value: "391",
                                trend: "Sertifikasi Standar",
                                color: "gray",
                                bg: isLight ? "bg-gray-50" : "from-gray-400/10 to-gray-300/5",
                                iconBg: "bg-gray-400",
                                border: isLight ? "border-gray-200" : "border-white/5",
                                shadow: isLight ? "shadow-md" : "shadow-none",
                            },
                            {
                                icon: Zap,
                                label: "Energi Dihemat",
                                value: "2.4M",
                                trend: "kWh/bulan",
                                color: "red",
                                bg: isLight ? "bg-red-50" : "from-red-500/10 to-rose-500/5",
                                iconBg: "bg-red-500",
                                border: isLight ? "border-red-200" : "border-white/5",
                                shadow: isLight ? "shadow-md" : "shadow-none",
                            },
                        ].map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02,
                                    boxShadow: isLight
                                        ? "0 20px 40px rgba(0,0,0,0.1)"
                                        : "0 20px 60px rgba(0,0,0,0.4)",
                                }}
                                className={`relative overflow-hidden rounded-3xl border ${card.border} bg-gradient-to-br ${card.bg} backdrop-blur-sm p-6 transition-all duration-300 cursor-default group ${card.shadow}`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className={`text-sm ${theme.textMuted} font-medium`}>
                                            {card.label}
                                        </p>
                                        <p className={`text-3xl font-black mt-2 ${theme.mainText}`}>
                                            {card.value}
                                        </p>
                                        <p
                                            className={`text-xs ${theme.textSubtle} mt-2 flex items-center gap-1`}
                                        >
                                            <TrendingUp className="w-3 h-3 text-green-400" />
                                            {card.trend}
                                        </p>
                                    </div>
                                    <div
                                        className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-lg`}
                                    >
                                        <card.icon className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== LINE CHART ===== */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 py-16">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-3xl md:text-4xl font-black tracking-tight ${theme.mainText}`}
                        >
                            Tren Penggunaan Listrik UMKM
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`${theme.textMuted} max-w-2xl mx-auto mt-3`}
                        >
                            Penggunaan listrik UMKM terus mengalami penurunan berkat program
                            efisiensi energi yang terstruktur dan berkelanjutan.
                        </motion.p>
                    </div>

                    <div
                        ref={chartRef}
                        className={`relative ${theme.bgCard} ${theme.borderDefault} rounded-3xl p-6 md:p-8 backdrop-blur-sm overflow-x-auto ${theme.shadowCard}`}
                    >
                        <svg
                            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                            className="w-full h-auto min-w-[600px] max-h-[350px]"
                            preserveAspectRatio="xMidYMid meet"
                            onMouseMove={handleChartMouseMove}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{ cursor: "crosshair" }}
                        >
                            {/* Grid horizontal */}
                            {[0, 100, 200, 300, 400].map((val) => {
                                const y =
                                    padding.top +
                                    innerHeight -
                                    ((val - minKwh) / (maxKwh - minKwh)) * innerHeight;
                                return (
                                    <g key={val}>
                                        <line
                                            x1={padding.left}
                                            y1={y}
                                            x2={padding.left + innerWidth}
                                            y2={y}
                                            stroke={theme.chartGridLine}
                                            strokeWidth="1"
                                            strokeDasharray="4"
                                        />
                                        <text
                                            x={padding.left - 12}
                                            y={y + 4}
                                            fill={theme.chartAxisText}
                                            fontSize="11"
                                            textAnchor="end"
                                            className="select-none font-medium"
                                        >
                                            {val}
                                        </text>
                                    </g>
                                );
                            })}

                            <defs>
                                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="0%"
                                        stopColor={isLight ? "#10b981" : "#22c55e"}
                                        stopOpacity="0.15"
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={isLight ? "#10b981" : "#22c55e"}
                                        stopOpacity="0.0"
                                    />
                                </linearGradient>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                            </defs>

                            <path d={areaPath} fill="url(#areaGradient)" />

                            <motion.path
                                d={linePath}
                                fill="none"
                                stroke={isLight ? "#10b981" : "#22c55e"}
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />

                            {monthlyData.map((item, idx) => {
                                const point = getPoint(idx);
                                return (
                                    <text
                                        key={idx}
                                        x={point.x}
                                        y={padding.top + innerHeight + 20}
                                        fill={
                                            hoveredIndex === idx
                                                ? isLight
                                                    ? "#111827"
                                                    : "#fff"
                                                : theme.chartAxisText
                                        }
                                        fontSize="11"
                                        textAnchor="middle"
                                        className="select-none transition-colors duration-200 font-medium"
                                    >
                                        {item.month}
                                    </text>
                                );
                            })}

                            {monthlyData.map((item, idx) => {
                                const point = getPoint(idx);
                                const isHovered = hoveredIndex === idx;
                                return (
                                    <g key={idx}>
                                        {isHovered && (
                                            <motion.line
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                x1={point.x}
                                                y1={padding.top}
                                                x2={point.x}
                                                y2={padding.top + innerHeight}
                                                stroke={isLight ? "#d1d5db" : "rgba(255,255,255,0.2)"}
                                                strokeWidth="1"
                                                strokeDasharray="4"
                                            />
                                        )}
                                        <motion.circle
                                            cx={point.x}
                                            cy={point.y}
                                            r={isHovered ? 7 : 4}
                                            fill={isLight ? "#ffffff" : "#22c55e"}
                                            stroke={isLight ? "#10b981" : "#22c55e"}
                                            strokeWidth={isHovered ? 3 : 2}
                                            filter={isHovered ? "url(#glow)" : ""}
                                        />
                                        {isHovered && (
                                            <motion.g
                                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 25,
                                                }}
                                            >
                                                <foreignObject
                                                    x={point.x + 15}
                                                    y={point.y - 45}
                                                    width="140"
                                                    height="60"
                                                    className="overflow-visible pointer-events-none"
                                                >
                                                    <div
                                                        className={`${theme.chartTooltipBg} backdrop-blur-md px-4 py-2.5 rounded-xl border relative`}
                                                    >
                                                        <p
                                                            className={`text-xs ${theme.textMuted} font-medium mb-0.5`}
                                                        >
                                                            {item.month} 2024
                                                        </p>
                                                        <div className="flex items-baseline gap-1.5">
                                                            <p
                                                                className={`text-lg font-black ${isLight ? "text-green-600" : "text-green-400"}`}
                                                            >
                                                                {item.kWh}
                                                            </p>
                                                            <p
                                                                className={`text-xs ${theme.textMuted} font-medium`}
                                                            >
                                                                kWh
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={`absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 ${theme.chartTooltipBg} border-l border-b rotate-45`}
                                                        />
                                                    </div>
                                                </foreignObject>
                                            </motion.g>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                        {[
                            {
                                icon: TrendingUp,
                                value: "-18%",
                                label: "Rata-rata pengurangan konsumsi",
                                color: "green",
                            },
                            {
                                icon: Coins,
                                value: "Rp 3.2M",
                                label: "Rata-rata penghematan biaya",
                                color: "amber",
                            },
                            {
                                icon: Cloud,
                                value: "2.1 ton",
                                label: "CO₂ yang dikurangi",
                                color: "blue",
                            },
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className={`${theme.statCardBg} ${theme.statCardBorder} rounded-2xl p-6 text-center backdrop-blur-sm ${theme.statCardShadow} hover:shadow-lg transition-all duration-300`}
                            >
                                <stat.icon
                                    className={`w-8 h-8 mx-auto mb-3 ${isLight ? "text-green-600" : "text-green-400"}`}
                                />
                                <p className={`text-2xl font-black ${theme.mainText}`}>
                                    {stat.value}
                                </p>
                                <p className={`text-sm ${theme.textMuted} mt-1`}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE (MELINGKUNG + KONSISTEN) ===== */}
            <section
                ref={timelineRef}
                className="relative z-10 px-6 md:px-12 lg:px-20 py-24"
            >
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={`text-3xl md:text-4xl font-black tracking-tight ${theme.mainText}`}
                        >
                            Cara Kerja UMKM Hijau
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className={`${theme.textMuted} max-w-2xl mx-auto mt-4`}
                        >
                            Empat langkah mudah untuk mendapatkan sertifikasi UMKM Hijau.
                        </motion.p>
                    </div>

                    <div ref={timelineContainerRef} className="relative">
                        {/* SVG Melengkung */}
                        <svg
                            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[80px]"
                            style={{ height: "100%" }}
                            viewBox={`0 0 80 ${svgHeight}`}
                            preserveAspectRatio="none"
                        >
                            <path
                                d={curvedPath}
                                stroke={theme.timelineLineBg}
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <motion.path
                                d={curvedPath}
                                stroke={theme.timelineLineProgress}
                                strokeWidth="6"
                                fill="none"
                                strokeLinecap="round"
                                style={{ pathLength: pathLength }}
                                initial={{ pathLength: 0 }}
                            />
                        </svg>

                        <div className="space-y-24 md:space-y-32 relative">
                            {timelineSteps.map((step, idx) => {
                                const isEven = idx % 2 === 0;
                                const Icon = step.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 relative ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                                    >
                                        <div className="hidden md:block w-5/12" />

                                        <div
                                            className={`absolute left-4 md:left-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full ${theme.timelineDotBg} border-4 ${theme.timelineDotBorder} shadow-xl shadow-green-500/30 z-10 flex items-center justify-center`}
                                        >
                                            <motion.div
                                                className="w-3 h-3 rounded-full bg-green-400"
                                                animate={{ scale: [1, 1.4, 1] }}
                                                transition={{
                                                    duration: 2,
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        </div>

                                        <motion.div
                                            whileHover={{ scale: 1.02, y: -5 }}
                                            className={`w-full md:w-5/12 p-6 md:p-8 rounded-3xl ${theme.timelineCardBg} ${theme.timelineCardBorder} backdrop-blur-sm ${theme.timelineCardShadow} transition-all duration-300 group ${isEven ? "md:text-right" : "md:text-left"}`}
                                        >
                                            <div
                                                className={`flex items-center gap-4 mb-4 ${isEven ? "md:flex-row-reverse" : ""}`}
                                            >
                                                <div
                                                    className={`w-14 h-14 rounded-2xl ${step.bgClass} ${step.borderClass} border flex items-center justify-center ${step.textClass} group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    <Icon className="w-7 h-7" />
                                                </div>
                                                <h3
                                                    className={`text-xl md:text-2xl font-bold ${theme.mainText}`}
                                                >
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p
                                                className={`text-sm md:text-base ${theme.textMuted} leading-relaxed`}
                                            >
                                                {step.desc}
                                            </p>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className={`relative overflow-hidden rounded-3xl ${theme.ctaBg} ${theme.ctaBorder} border p-8 md:p-12 text-center backdrop-blur-sm ${isLight ? "shadow-lg" : "shadow-none"}`}
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
                        <div className="relative z-10">
                            <h2
                                className={`text-3xl md:text-5xl font-black tracking-tight ${theme.ctaText} mb-6`}
                            >
                                Sudah siap menjadi bagian dari <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                                    UMKM Hijau?
                                </span>
                            </h2>
                            <p
                                className={`${theme.ctaSubText} max-w-2xl mx-auto mb-8 text-sm md:text-base leading-relaxed`}
                            >
                                Bergabunglah dengan ratusan UMKM di seluruh Indonesia yang telah
                                mendapatkan sertifikasi hijau dan mulai menghemat biaya
                                operasional Anda hari ini.
                            </p>
                            <Link href="/auth?mode=signup">
                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: isLight
                                            ? "0 0 60px rgba(16,185,129,0.3)"
                                            : "0 0 60px rgba(34,197,94,0.4)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 font-extrabold text-sm tracking-wider shadow-xl shadow-green-500/25 transition-all inline-flex items-center gap-3 ${isLight ? "text-white" : "text-black"}`}
                                >
                                    Daftar Sekarang <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer
                className={`relative z-10 border-t ${theme.footerBorder} ${theme.footerBg} px-6 md:px-12 lg:px-20 py-16 backdrop-blur-sm`}
            >
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div>
                        <h3
                            className={`text-2xl font-black ${theme.footerHeading} tracking-tight`}
                        >
                            UMKM<span className="text-green-400">Hijau</span>
                        </h3>
                        <p
                            className={`text-sm ${theme.footerText} mt-4 max-w-xs leading-relaxed`}
                        >
                            Membantu UMKM di Indonesia menuju efisiensi energi dan sertifikasi
                            hijau yang berkelanjutan.
                        </p>
                        <div className="flex gap-4 mt-6">
                            {["Facebook", "Twitter", "Instagram", "Youtube"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className={`w-9 h-9 rounded-full ${theme.socialIconBg} flex items-center justify-center ${theme.socialIconText} ${theme.socialIconHover} transition-all`}
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-4 h-4 bg-current rounded-sm" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4
                            className={`text-sm font-bold ${theme.footerHeading} uppercase tracking-wider`}
                        >
                            Perusahaan
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            {["Tentang Kami", "Tim", "Karir", "Blog"].map((item) => (
                                <li key={item}>
                                    <a
                                        href="#"
                                        className={`${theme.footerText} hover:text-green-400 transition-colors`}
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4
                            className={`text-sm font-bold ${theme.footerHeading} uppercase tracking-wider`}
                        >
                            Bantuan
                        </h4>
                        <ul className="mt-4 space-y-3 text-sm">
                            {["FAQ", "Panduan", "Hubungi Kami", "Syarat & Ketentuan"].map(
                                (item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className={`${theme.footerText} hover:text-green-400 transition-colors`}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ),
                            )}
                        </ul>
                    </div>

                    <div>
                        <h4
                            className={`text-sm font-bold ${theme.footerHeading} uppercase tracking-wider`}
                        >
                            Kontak
                        </h4>
                        <ul className="mt-4 space-y-4 text-sm">
                            <li className={`flex items-start gap-3 ${theme.footerText}`}>
                                <Mail className={`w-4 h-4 ${theme.footerIconColor} mt-0.5`} />
                                <span>hello@umkmhijau.id</span>
                            </li>
                            <li className={`flex items-start gap-3 ${theme.footerText}`}>
                                <Phone className={`w-4 h-4 ${theme.footerIconColor} mt-0.5`} />
                                <span>+62 812 3456 7890</span>
                            </li>
                            <li className={`flex items-start gap-3 ${theme.footerText}`}>
                                <MapPin className={`w-4 h-4 ${theme.footerIconColor} mt-0.5`} />
                                <span>Jakarta, Indonesia</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div
                    className={`max-w-7xl mx-auto mt-16 pt-8 border-t ${theme.footerBorder} text-center text-xs ${theme.footerText}`}
                >
                    &copy; {new Date().getFullYear()} UMKM Hijau. All rights reserved.
                    Dibuat dengan ❤️ untuk Indonesia yang lebih hijau.
                </div>
            </footer>
        </main>
    );
}