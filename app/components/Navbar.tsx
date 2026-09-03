"use client";

import { useState, MouseEvent, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";

const LusionButton = ({ text }: { text: string }) => {
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center justify-center w-24 h-10 rounded-full bg-transparent border border-white/20 overflow-hidden transition-all duration-500 hover:bg-green-500 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
    >
      <div className="absolute left-2 opacity-0 -translate-x-5 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-10">
        <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
      <span className="text-sm font-semibold text-neutral-200 group-hover:text-black group-hover:translate-x-3 group-hover:tracking-wide transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] relative z-10">
        {text}
      </span>
    </motion.button>
  );
};

const RippleGearButton = () => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isHovering, setIsHovering] = useState(false);
  
  // State Modal & Tema
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<"dark" | "white">("dark");
  const [mounted, setMounted] = useState(false);

  // Pastikan render portal hanya di client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleSaveTheme = () => {
    setIsModalOpen(false);
    if (previewTheme === "white") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  };

  return (
    <>
      {/* SVG FILTER UNTUK TURBULENT DISPLACE */}
      <svg className="hidden">
        <defs>
          <filter id="turbulent-displace">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="12"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Tombol Gear Bawaan */}
      <motion.button
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-10 h-10 rounded-full border border-white/20 overflow-hidden flex items-center justify-center transition-all duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white transition-colors duration-300"></div>
        <div
          className="absolute bg-white rounded-full pointer-events-none transition-all duration-500 ease-out z-0"
          style={{
            left: coords.x,
            top: coords.y,
            width: isHovering ? 150 : 0,
            height: isHovering ? 150 : 0,
            transform: "translate(-50%, -50%)",
          }}
        />
        <div className="relative z-10 group-hover:rotate-180 transition-transform duration-700 ease-in-out">
          <svg className="w-5 h-5 text-neutral-300 group-hover:text-black transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </motion.button>

      {/* PORTAL: MENGELUARKAN MODAL KE LEVEL BODY UTAMA */}
      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" style={{ perspective: "1200px" }}>
              
              {/* OVERLAY GELAP UNTUK SELURUH HALAMAN (Gak bisa diklik) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="fixed inset-0 bg-black/70 backdrop-blur-md"
              />

              {/* MODAL KERTAS - GUARANTEED DEAD CENTER */}
              <motion.div
                initial={{ 
                  opacity: 0, 
                  scale: 0.1, 
                  x: "35vw", 
                  y: "-40vh",
                  rotateX: 140, 
                  rotateY: 180, 
                  rotateZ: 45,
                  filter: "url(#turbulent-displace)"
                }}
                animate={{
                  opacity: [0, 1, 1, 1],
                  scale: [0.1, 0.6, 1.12, 1],
                  x: ["35vw", "10vw", "-2vw", "0vw"],
                  y: ["-40vh", "5vh", "-2vh", "0vh"],
                  rotateX: [140, -45, 15, 0],
                  rotateY: [180, 45, -15, 0],
                  rotateZ: [45, -20, 5, 0],
                  filter: [
                    "url(#turbulent-displace)",
                    "url(#turbulent-displace)",
                    "blur(1px)",
                    "none"
                  ]
                }}
                transition={{
                  duration: 0.85,
                  times: [0, 0.45, 0.8, 1],
                  ease: "easeOut"
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.9, 
                  y: 20, 
                  transition: { duration: 0.25, ease: "easeOut" } 
                }}
                className="relative z-10 w-full max-w-sm bg-[#111111] border border-white/20 rounded-2xl p-6 shadow-[0_0_60px_rgba(34,197,94,0.2)] flex flex-col"
              >
                <h2 className="text-2xl font-black text-white mb-2 tracking-tight text-center">Settings</h2>
                <p className="text-neutral-400 text-sm text-center mb-6">Choose your environment theme.</p>

                {/* Theme Selection */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {/* Dark */}
                  <button
                    onClick={() => setPreviewTheme("dark")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      previewTheme === "dark" 
                        ? "border-green-500 bg-green-500/10 text-green-400" 
                        : "border-white/10 bg-white/5 text-neutral-400"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[#050505] border border-white/20"></div>
                    <span className="text-sm font-bold">Dark</span>
                  </button>

                  {/* White */}
                  <button
                    onClick={() => setPreviewTheme("white")}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      previewTheme === "white" 
                        ? "border-green-500 bg-green-500/10 text-green-400" 
                        : "border-white/10 bg-white/5 text-neutral-400"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white border border-neutral-300"></div>
                    <span className="text-sm font-bold">White</span>
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTheme}
                    className="flex-1 py-3 rounded-xl bg-green-500 hover:bg-green-400 text-black font-extrabold text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all"
                  >
                    Save Theme
                  </button>
                </div>
              </motion.div>

            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

const NAV_MENU = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Map", href: "/map" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed top-8 inset-x-0 mx-auto w-[92%] max-w-7xl rounded-full bg-black/20 backdrop-blur-2xl border border-white/10 px-4 py-3 flex items-center justify-between z-50 shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)]">
      {/* Brand Logo */}
      <div className="flex-1 flex items-center justify-start pl-2">
        <div
          className="group flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
            <span className="text-black font-black text-sm">UH</span>
          </div>
          <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-green-400 transition-colors">
            UMKM Hijau
          </span>
        </div>
      </div>

      {/* Magnetic Nav Links */}
      <div className="shrink-0 flex justify-center">
        <ul
          className="flex items-center p-1.5 rounded-full bg-white/5 border border-white/5 backdrop-blur-sm"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {NAV_MENU.map((item, index) => {
            const isActive = pathname === item.href;
            const isHovered = hoveredIndex === index;
            const isSiblingHovered = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.li
                key={item.label}
                onMouseEnter={() => {
                  if (!isActive) setHoveredIndex(index);
                }}
                onClick={() => {
                  if (!isActive) router.push(item.href);
                }}
                className={`
                  relative flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                  ${isActive ? "cursor-default" : "cursor-pointer"}
                  ${
                    isActive || isHovered
                      ? "w-32 text-green-400 font-bold scale-110 tracking-wide"
                      : isSiblingHovered
                      ? "w-16 text-neutral-600 text-sm blur-[1px] scale-90"
                      : "w-24 text-neutral-300 font-medium scale-100"
                  }
                `}
                whileHover={isActive ? {} : { scale: 1.04 }}
                whileTap={isActive ? {} : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
              >
                <span className="relative z-10 pointer-events-none">{item.label}</span>
                {(isHovered || isActive) && (
                  <div className="absolute inset-0 bg-green-500/10 rounded-full blur-md -z-10 animate-pulse"></div>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex-1 flex items-center justify-end gap-2 pr-1">
        <Link href="/auth?mode=signup">
          <LusionButton text="Sign up" />
        </Link>
        <Link href="/auth?mode=login">
          <LusionButton text="Log in" />
        </Link>
        <div className="w-px h-6 bg-white/20 mx-1"></div>
        <RippleGearButton />
      </div>
    </nav>
  );
}