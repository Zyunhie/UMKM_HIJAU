"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";

export default function AuthPageFull() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");

    // false = Sign Up (kiri) | true = Log In (kanan)
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState<"user" | "umkm">("user");

    // Sync state dengan URL parameter
    useEffect(() => {
        if (mode === "login") {
            setIsLogin(true);
        } else if (mode === "signup") {
            setIsLogin(false);
        }
    }, [mode]);

    return (
        <main className="relative w-screen h-screen overflow-hidden bg-[#050505] text-white font-sans">

            {/* ===== BACKGROUND DECORASI ===== */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-30%] left-[-10%] w-[600px] h-[600px] bg-green-600/20 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-30%] right-[-10%] w-[600px] h-[600px] bg-emerald-600/20 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[200px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>

            {/* ===== 1. SIGN UP FORM (KIRI) ===== */}
            <div className="absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center p-8 lg:p-16 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                            Create Account
                        </h2>
                        <p className="text-neutral-400 text-sm mt-2">
                            Join the green movement today
                        </p>
                    </div>

                    <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 backdrop-blur-sm"
                        />
                        <input
                            type="text"
                            placeholder="Nickname"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 backdrop-blur-sm"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 backdrop-blur-sm"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 backdrop-blur-sm"
                        />

                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-3 mt-1">
                            <button
                                type="button"
                                onClick={() => setRole("user")}
                                className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${role === "user"
                                        ? "border-green-400 bg-green-500/15 text-green-300 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                                        : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm font-bold">User</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setRole("umkm")}
                                className={`flex flex-col items-center justify-center gap-1.5 p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm ${role === "umkm"
                                        ? "border-green-400 bg-green-500/15 text-green-300 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
                                        : "border-white/10 bg-white/5 text-neutral-400 hover:border-white/20 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-sm font-bold">UMKM</span>
                            </button>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-3 w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-extrabold text-sm tracking-wide hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all duration-300"
                        >
                            SIGN UP
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* ===== 2. LOG IN FORM (KANAN) ===== */}
            <div className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center p-8 lg:p-16 z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-green-300 bg-clip-text text-transparent">
                            Welcome Back!
                        </h2>
                        <p className="text-neutral-400 text-sm mt-2">
                            Good to see you again
                        </p>
                    </div>

                    <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Username / Email"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 backdrop-blur-sm"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/30 transition-all duration-300 backdrop-blur-sm"
                        />

                        <div className="flex justify-end -mt-1">
                            <a href="#" className="text-sm text-neutral-400 hover:text-green-400 transition-colors duration-300">
                                Forgot password?
                            </a>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="mt-1 w-full py-3.5 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-black font-extrabold text-sm tracking-wide hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] transition-all duration-300"
                        >
                            LOG IN
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* ===== 3. SLIDING OVERLAY (GLASSMORPHISM) ===== */}
            <motion.div
                className="absolute top-0 left-0 w-1/2 h-full z-50 flex flex-col items-center justify-center overflow-hidden"
                animate={{ x: isLogin ? "0%" : "100%" }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            >
                {/* Background Overlay dengan efek glass + gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a1f0e] via-[#0d2a14] to-[#051a0a] backdrop-blur-sm" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="absolute top-[-30%] right-[-20%] w-96 h-96 bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-[-30%] left-[-20%] w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute inset-0 border-x border-white/5" />

                {/* Konten */}
                <div className="relative w-full max-w-sm h-56 flex items-center justify-center text-center px-6">
                    <AnimatePresence mode="wait">
                        {!isLogin ? (
                            <motion.div
                                key="signup-overlay"
                                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -40, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute w-full flex flex-col items-center gap-4 z-10"
                            >
                                <div className="inline-block px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    Already a member?
                                </div>
                                <h3 className="text-4xl font-black text-white tracking-tight leading-tight">
                                    Welcome back!
                                </h3>
                                <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
                                    If you already have an account, just sign in. We&apos;ve missed you!
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsLogin(true)}
                                    className="px-10 py-3 rounded-full border-2 border-green-400 text-green-300 font-bold text-sm uppercase tracking-wider hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                                >
                                    Log In →
                                </motion.button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="login-overlay"
                                initial={{ opacity: 0, x: -40, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 40, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="absolute w-full flex flex-col items-center gap-4 z-10"
                            >
                                <div className="inline-block px-4 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-bold uppercase tracking-wider mb-1">
                                    New here?
                                </div>
                                <h3 className="text-4xl font-black text-white tracking-tight leading-tight">
                                    Join the community
                                </h3>
                                <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
                                    Discover local eco-friendly products and support UMKM today.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsLogin(false)}
                                    className="px-10 py-3 rounded-full border-2 border-green-400 text-green-300 font-bold text-sm uppercase tracking-wider hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                                >
                                    Sign Up →
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

        </main>
    );
}