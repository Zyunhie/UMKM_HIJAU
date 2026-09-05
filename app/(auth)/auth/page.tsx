"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
    AnimatePresence,
} from "framer-motion";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

/* ============================================================================
   BAGIAN 1: KONFIGURASI ASSET & SVG CONSTANTS
   ============================================================================ */

// Wave Paths
const WAVE_A =
    "M0,-200 L60,-200 C120,150 0,400 80,750 C130,950 20,1050 50,1200 L0,1200 Z";
const WAVE_B =
    "M0,-200 L40,-200 C0,150 120,400 30,750 C-10,950 90,1050 60,1200 L0,1200 Z";
const SWEEP_WAVE =
    "M0,-200 L80,-200 C150,200 -20,500 90,800 C160,1000 30,1100 70,1200 L0,1200 Z";

const EASE_FAST: [number, number, number, number] = [0.16, 1, 0.3, 1];

const QUOTES = [
    {
        text: "Supporting local UMKM creates a sustainable future for our community.",
        author: "Eco Daily",
    },
    {
        text: "Small green steps lead to giant leaps for our planet.",
        author: "Green Earth",
    },
    {
        text: "Every eco-friendly purchase is a vote for the world you want.",
        author: "Sustainability Now",
    },
];

/* ============================================================================
   ICONS
   ============================================================================ */

// User / Person
const ICON_USER = (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M5 21a7 7 0 0114 0"
        />
    </svg>
);

// Email
const ICON_MAIL = (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
        />
        <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
        />
    </svg>
);

// Lock
const ICON_LOCK = (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <rect
            x="4"
            y="10"
            width="16"
            height="11"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.7"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M8 10V7a4 4 0 018 0v3"
        />
    </svg>
);

// Eye
const ICON_EYE = (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
    </svg>
);

// Eye Off
const ICON_EYEOFF = (
    <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M9.878 9.878a3 3 0 104.243 4.243"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M3 3l18 18"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M14.12 14.12a3 3 0 01-4.24-4.24"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M6.53 6.53A10.04 10.04 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.02 10.02 0 01-4.043 5.25"
        />
    </svg>
);

// House / Store
const ICON_STORE = (
    <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M3 10.5L5 4h14l2 6.5"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M4 10v10h16V10"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M9 20v-5h6v5"
        />
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.7}
            d="M3 10c0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2 2s2-.9 2-2c0 1.1.9 2 2-2"
        />
    </svg>
);

/* ============================================================================
   BAGIAN 2: KOMPONEN UI
   ============================================================================ */

const MagneticButton = ({
    children,
    className,
    onClick,
    type = "button",
}: any) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, {
        stiffness: 200,
        damping: 15,
    });

    const springY = useSpring(y, {
        stiffness: 200,
        damping: 15,
    });

    const handleMouseMove = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={className}
        >
            {children}
        </motion.button>
    );
};

/* ============================================================================
   FLOATING INPUT
   ============================================================================ */

const FloatingInput = ({
    type,
    label,
    icon,
    value,
    onChange,
}: any) => {
    const [focused, setFocused] = useState(false);
    const [showPw, setShowPw] = useState(false);

    const isPassword = type === "password";
    const actualType = isPassword
        ? showPw
            ? "text"
            : "password"
        : type;

    const isActive = focused || value.length > 0;

    return (
        <div className="relative group w-full">
            {/* ICON BOX */}
            <div
                className="
                    absolute left-3 top-1/2 -translate-y-1/2
                    w-9 h-9
                    rounded-xl
                    flex items-center justify-center
                    text-[var(--text-secondary)]
                    bg-[var(--input-bg)]
                    border border-[var(--input-border)]
                    group-focus-within:text-green-400
                    group-focus-within:bg-green-400/10
                    group-focus-within:border-green-400/20
                    transition-all duration-200
                    pointer-events-none
                    z-10
                "
            >
                {icon}
            </div>

            <input
                type={actualType}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="
                    w-full
                    h-[58px]
                    bg-[var(--input-bg)]
                    border border-[var(--input-border)]
                    rounded-2xl
                    pl-14 pr-12
                    text-sm text-[var(--text-primary)]
                    outline-none
                    backdrop-blur-sm
                    hover:bg-[var(--input-hover-bg)]
                    focus:border-green-400/80
                    focus:bg-[var(--input-focus-bg)]
                    focus:ring-2
                    focus:ring-green-400/15
                    transition-all duration-200
                "
            />

            <label
                className={`
                    absolute
                    left-14
                    cursor-text
                    pointer-events-none
                    transition-all duration-200
                    ${
                        isActive
                            ? "-top-2.5 text-[11px] bg-[var(--label-active-bg)] px-2 text-green-400 font-bold tracking-wider rounded-full border border-green-400/30"
                            : "top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]"
                    }
                `}
            >
                {label}
            </label>

            {isPassword && (
                <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="
                        absolute
                        inset-y-0
                        right-0
                        pr-4
                        flex items-center
                        text-[var(--text-secondary)]
                        hover:text-green-400
                        transition-colors
                    "
                >
                    {showPw ? ICON_EYEOFF : ICON_EYE}
                </button>
            )}
        </div>
    );
};

/* ============================================================================
   PARTICLES ENGINE
   ============================================================================ */

const FIREFLY_CONFIG = [
    { size: 3.1, left: "12%", top: "18%", dur: 9, delay: 0.5 },
    { size: 2.8, left: "28%", top: "72%", dur: 11, delay: 1.2 },
    { size: 3.6, left: "43%", top: "31%", dur: 8, delay: 0.2 },
    { size: 4.2, left: "57%", top: "84%", dur: 12, delay: 1.8 },
    { size: 2.7, left: "68%", top: "15%", dur: 10, delay: 0.9 },
    { size: 3.8, left: "79%", top: "56%", dur: 13, delay: 1.5 },
    { size: 2.4, left: "91%", top: "27%", dur: 9, delay: 0.4 },
    { size: 4.0, left: "7%", top: "63%", dur: 11, delay: 1.1 },
    { size: 3.3, left: "36%", top: "93%", dur: 10, delay: 2.0 },
    { size: 2.6, left: "52%", top: "48%", dur: 12, delay: 0.7 },
    { size: 4.1, left: "84%", top: "78%", dur: 8, delay: 1.4 },
    { size: 3.0, left: "19%", top: "42%", dur: 13, delay: 0.3 },
];

const LEAF_CONFIG = [
    {
        left: "5%",
        delay: 0,
        dur: 14,
        scale: 0.68,
        rotate: 40,
    },
    {
        left: "23%",
        delay: 2,
        dur: 17,
        scale: 0.58,
        rotate: 120,
    },
    {
        left: "41%",
        delay: 4,
        dur: 15,
        scale: 0.72,
        rotate: 200,
    },
    {
        left: "63%",
        delay: 1,
        dur: 18,
        scale: 0.55,
        rotate: 280,
    },
    {
        left: "78%",
        delay: 5,
        dur: 16,
        scale: 0.74,
        rotate: 320,
    },
    {
        left: "92%",
        delay: 3,
        dur: 19,
        scale: 0.62,
        rotate: 160,
    },
];

const ParticlesEngine = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">

            {/* FIRE FLIES */}
            {FIREFLY_CONFIG.map((f, i) => (
                <motion.div
                    key={`fly-${i}`}
                    className="absolute rounded-full bg-green-300 blur-[1px]"
                    style={{
                        left: f.left,
                        top: f.top,
                        width: f.size,
                        height: f.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        opacity: [0.2, 0.9, 0.2],
                    }}
                    transition={{
                        duration: f.dur,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: f.delay,
                    }}
                />
            ))}

            {/* FALLING LEAVES */}
            {LEAF_CONFIG.map((l, i) => (
                <motion.svg
                    key={`leaf-${i}`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute text-green-400/15"
                    style={{
                        left: l.left,
                        width: 22 * l.scale,
                        height: 22 * l.scale,
                        top: "-5%",
                    }}
                    animate={{
                        y: ["0vh", "105vh"],
                        x: [0, 40, -40, 0],
                        rotate: [
                            l.rotate,
                            l.rotate + 360,
                        ],
                        opacity: [0, 0.8, 0],
                    }}
                    transition={{
                        duration: l.dur,
                        repeat: Infinity,
                        ease: "linear",
                        delay: l.delay,
                    }}
                >
                    <path d="M17.5 22c.8 0 1.5-.7 1.5-1.5 0-3.6-1.5-7-4.2-9.6C12.1 8.2 8.7 6.8 5 6.8c-.8 0-1.5.7-1.5 1.5 0 3.6 1.5 7 4.2 9.6 2.7 2.7 6.1 4.1 9.8 4.1zm-8.8-11c1.9-.3 3.8.3 5.3 1.8 1.5 1.5 2.1 3.4 1.8 5.3-2.3-1.4-4.5-3.6-5.9-5.9-1.3-2.3-1.6-4.9-.8-7.2.3-.9.7-1.7 1.3-2.5-1.9 1-3.6 2.5-4.7 4.4-1.2 2-1.7 4.4-1.4 6.8 2.2-.8 4.1-2 5.4-3.7z" />
                </motion.svg>
            ))}
        </div>
    );
};
/* ============================================================================
   MAIN AUTH PAGE
   ============================================================================ */

export default function AuthPageVibrance() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryMode = searchParams.get("mode");

    const [activeForm, setActiveForm] =
        useState<"signup" | "login">("signup");

    const [isSweeping, setIsSweeping] = useState(false);

    const [sweepDir, setSweepDir] =
        useState<"ltr" | "rtl">("ltr");

    const [role, setRole] =
        useState<"user" | "umkm">("user");

    const [quoteIdx, setQuoteIdx] = useState(0);

    const [theme, setTheme] =
        useState<"dark" | "light">("dark");

    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
        remember: false,
    });

    // Inisialisasi tema dari localStorage / body class
    useEffect(() => {
        const savedTheme = localStorage.getItem("site-theme");
        if (savedTheme === "white") {
            setTheme("light");
            document.body.classList.add("light-theme");
        } else {
            setTheme("dark");
            document.body.classList.remove("light-theme");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        if (newTheme === "light") {
            document.body.classList.add("light-theme");
            localStorage.setItem("site-theme", "white");
        } else {
            document.body.classList.remove("light-theme");
            localStorage.setItem("site-theme", "dark");
        }
    };

    /* ============================================================================
       PARALLAX
       ============================================================================ */

    const mx = useMotionValue(50);
    const my = useMotionValue(50);

    const smx = useSpring(mx, {
        stiffness: 60,
        damping: 25,
    });

    const smy = useSpring(my, {
        stiffness: 60,
        damping: 25,
    });

    const blobX = useTransform(
        smx,
        [0, 100],
        [-60, 60]
    );

    const blobY = useTransform(
        smy,
        [0, 100],
        [-40, 40]
    );

    const spotlight = useMotionTemplate`
        radial-gradient(
            700px circle at ${smx}% ${smy}%,
            rgba(74,222,128,0.12),
            transparent 70%
        )
    `;

    /* ============================================================================
       QUOTES
       ============================================================================ */

    useEffect(() => {
        const interval = setInterval(() => {
            setQuoteIdx(
                (prev) => (prev + 1) % QUOTES.length
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    /* ============================================================================
       QUERY MODE
       ============================================================================ */

    useEffect(() => {
        if (
            queryMode === "login" &&
            activeForm !== "login"
        ) {
            setActiveForm("login");
        } else if (
            queryMode === "signup" &&
            activeForm !== "signup"
        ) {
            setActiveForm("signup");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* ============================================================================
       SWITCH MODE
       ============================================================================ */

    const handleSwitchMode = useCallback(
        (targetMode: "signup" | "login") => {
            if (
                targetMode === activeForm ||
                isSweeping
            )
                return;

            setIsSweeping(true);

            setSweepDir(
                targetMode === "login"
                    ? "ltr"
                    : "rtl"
            );

            setTimeout(() => {
                setActiveForm(targetMode);

                router.replace(
                    `${pathname}?mode=${targetMode}`,
                    { scroll: false }
                );

                setTimeout(() => {
                    setIsSweeping(false);
                }, 350);
            }, 250);
        },
        [
            activeForm,
            isSweeping,
            pathname,
            router,
        ]
    );

    const handleInput = (
        key: string,
        val: string | boolean
    ) => {
        setFormState((prev) => ({
            ...prev,
            [key]: val,
        }));
    };

    const isSignup = activeForm === "signup";

    const blackPanelLeft = isSignup
        ? "0%"
        : "50%";

    const greenPanelLeft = isSignup
        ? "50%"
        : "0%";

    /* ============================================================================
       THEME CSS VARIABLES
       ============================================================================ */
    const themeVars = {
        dark: {
            "--bg-primary": "#020402",
            "--bg-panel": "#050505",
            "--text-primary": "#ffffff",
            "--text-secondary": "#a3a3a3",
            "--border": "rgba(255,255,255,0.1)",
            "--input-bg": "rgba(255,255,255,0.035)",
            "--input-border": "rgba(255,255,255,0.1)",
            "--input-hover-bg": "rgba(255,255,255,0.05)",
            "--input-focus-bg": "rgba(255,255,255,0.07)",
            "--label-active-bg": "#050505",
            "--wave-color": "#050505",
            "--green-text": "#4ade80",
        },
        light: {
            "--bg-primary": "#f0fdf4",
            "--bg-panel": "#ffffff",
            "--text-primary": "#111827",
            "--text-secondary": "#4b5563",
            "--border": "rgba(0,0,0,0.1)",
            "--input-bg": "rgba(0,0,0,0.03)",
            "--input-border": "rgba(0,0,0,0.15)",
            "--input-hover-bg": "rgba(0,0,0,0.05)",
            "--input-focus-bg": "rgba(0,0,0,0.07)",
            "--label-active-bg": "#ffffff",
            "--wave-color": "#ffffff",
            "--green-text": "#059669",
        },
    };

    return (
        <main
            style={themeVars[theme] as React.CSSProperties}
            className="
                relative
                w-screen
                h-screen
                overflow-hidden
                bg-[var(--bg-primary)]
                text-[var(--text-primary)]
                font-sans
            "
            onMouseMove={(e) => {
                mx.set(
                    (e.clientX / window.innerWidth) *
                        100
                );

                my.set(
                    (e.clientY / window.innerHeight) *
                        100
                );
            }}
        >

            {/* BACK TO HOME */}
<div className="absolute top-6 left-6 z-30">
    <motion.button
        type="button"
        onClick={() => router.push("/")}
        whileHover={{ x: -3, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="
            group
            flex
            items-center
            gap-2
            px-4
            py-2.5
            rounded-full
            border
            border-[var(--border)]
            bg-black/20
            backdrop-blur-md
            text-[var(--text-secondary)]
            hover:text-[var(--text-primary)]
            hover:border-green-400/30
            hover:bg-green-400/10
            transition-all
            duration-200
            text-xs
            font-bold
            tracking-wide
        "
    >
        <svg
            className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
            />
        </svg>

        Back to Home
    </motion.button>
</div>

{/* THEME TOGGLE */}
<div className="absolute top-6 right-6 z-30">
    <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
            p-2.5 rounded-full
            border border-[var(--border)]
            bg-black/20 backdrop-blur-md
            text-[var(--text-secondary)]
            hover:text-[var(--text-primary)]
            hover:border-green-400/30
            transition-all
            flex items-center justify-center
        "
    >
        {theme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
</div>
            
            {/* ====================================================================
                BACKGROUND
            ==================================================================== */}

            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#021508] via-[#083317] to-[#011206]" />

            <motion.div
                style={{
                    x: blobX,
                    y: blobY,
                }}
                className="
                    absolute
                    z-0
                    top-[-25%]
                    right-[-10%]
                    w-[55vw]
                    h-[55vw]
                    rounded-full
                    bg-emerald-400/25
                    blur-[140px]
                "
            />

            <motion.div
                style={{
                    x: blobX,
                    y: blobY,
                }}
                className="
                    absolute
                    z-0
                    bottom-[-25%]
                    left-[5%]
                    w-[45vw]
                    h-[45vw]
                    rounded-full
                    bg-green-400/20
                    blur-[130px]
                "
            />

            <div
                className="
                    absolute
                    inset-0
                    z-0
                    bg-[linear-gradient(rgba(134,239,172,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(134,239,172,0.07)_1px,transparent_1px)]
                    bg-[size:64px_64px]
                    [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]
                    pointer-events-none
                "
            />

            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden select-none">
                <motion.div
                    className="
                        font-black
                        text-[18vw]
                        leading-none
                        text-transparent
                        tracking-tighter
                        whitespace-nowrap
                        opacity-60
                        flex flex-col
                        items-center
                    "
                    style={{
                        WebkitTextStroke:
                            "2px rgba(134,239,172,0.15)",
                    }}
                    animate={{
                        x: [-15, 15, -15],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <span>GREEN</span>
                    <span className="mt-[-8vw]">
                        ECO
                    </span>
                </motion.div>
            </div>

            <ParticlesEngine />

            {/* ====================================================================
                MAIN CONTENT
            ==================================================================== */}

            <div className="absolute inset-0 z-10 flex">

                {/* ==================================================================
                    GREEN PANEL
                ================================================================== */}

                <motion.div
                    initial={false}
                    animate={{
                        left: greenPanelLeft,
                    }}
                    transition={{
                        duration: 0,
                    }}
                    className="
                        absolute
                        top-0
                        h-full
                        w-[50vw]
                        flex
                        items-center
                        justify-center
                        p-12
                    "
                >
                    <AnimatePresence mode="wait">
                        {!isSweeping && (
                            <motion.div
                                key={activeForm}
                                initial={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.96,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: EASE_FAST,
                                }}
                                className="
                                    relative
                                    z-10
                                    flex
                                    flex-col
                                    items-center
                                    text-center
                                    gap-6
                                    max-w-lg
                                "
                            >
                                <div
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-2
                                        rounded-full
                                        border
                                        border-green-300/30
                                        bg-green-500/10
                                        backdrop-blur-md
                                        text-green-300
                                        text-xs
                                        font-bold
                                        uppercase
                                        tracking-widest
                                        shadow-[0_0_20px_rgba(34,197,94,0.15)]
                                    "
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                                    </span>

                                    {isSignup
                                        ? "Already a member?"
                                        : "New to the movement?"}
                                </div>

                                <h3
                                    className="
                                        text-5xl
                                        lg:text-6xl
                                        font-black
                                        tracking-tighter
                                        leading-[1.05]
                                        text-[var(--text-primary)]
                                        drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]
                                        whitespace-pre-line
                                        !text-white
                                    "
                                >
                                    {isSignup
                                        ? "Welcome\nBack!"
                                        : "Join The\nFuture"}
                                </h3>

                                <div className="h-[75px] flex items-center justify-center relative w-full mt-1">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={quoteIdx}
                                            initial={{
                                                opacity: 0,
                                                y: 10,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -10,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                            }}
                                            className="absolute text-center"
                                        >
                                            <p className="text-green-100/90 text-sm lg:text-base leading-relaxed italic">
                                                "
                                                {
                                                    QUOTES[
                                                        quoteIdx
                                                    ].text
                                                }
                                                "
                                            </p>

                                            <p className="text-xs font-bold text-green-400 mt-2 uppercase tracking-widest">
                                                —
                                                {
                                                    QUOTES[
                                                        quoteIdx
                                                    ].author
                                                }
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                <MagneticButton
                                    onClick={() =>
                                        handleSwitchMode(
                                            isSignup
                                                ? "login"
                                                : "signup"
                                        )
                                    }
                                    className="
                                        mt-4
                                        px-12
                                        py-4
                                        rounded-full
                                        border
                                        border-green-400/50
                                        text-[var(--text-primary)]
                                        font-black
                                        text-sm
                                        uppercase
                                        tracking-widest
                                        bg-emerald-500/20
                                        backdrop-blur-md
                                        hover:bg-green-400
                                        hover:text-black
                                        transition-all
                                        duration-300
                                        shadow-[0_0_30px_rgba(34,197,94,0.25)]
                                        flex
                                        items-center
                                        gap-3
                                        group
                                        !text-white
                                    "
                                >
                                    {isSignup
                                        ? "Log In Now"
                                        : "Create Account"}

                                    <svg
                                        className="
                                            w-4 h-4
                                            group-hover:translate-x-1
                                            transition-transform
                                        "
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2.5}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </MagneticButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* ==================================================================
                    BLACK PANEL
                ================================================================== */}

                <motion.div
                    initial={false}
                    animate={{
                        left: blackPanelLeft,
                    }}
                    transition={{
                        duration: 0,
                    }}
                    className="
                        absolute
                        top-0
                        h-full
                        w-[50vw]
                        bg-[var(--bg-panel)]
                        z-20
                    "
                >
                    {/* WAVE BORDER */}
                    <div
                        className={`
                            absolute
                            top-0
                            h-full
                            w-[100px]
                            pointer-events-none
                            ${
                                isSignup
                                    ? "-right-[99px]"
                                    : "-left-[99px] scale-x-[-1]"
                            }
                        `}
                    >
                        <svg
                            className="w-full h-full"
                            viewBox="0 0 100 1000"
                            preserveAspectRatio="none"
                        >
                            <motion.path
                                fill="var(--wave-color)"
                                animate={{
                                    d: [
                                        WAVE_A,
                                        WAVE_B,
                                        WAVE_A,
                                    ],
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                        </svg>
                    </div>

                    {/* ==============================================================
                        FORM CONTAINER
                        CENTER VERTIKAL
                    ============================================================== */}

                    <div
                        className="
                            absolute
                            inset-0
                            z-10
                            flex
                            items-center
                            justify-center
                            px-8
                            py-10
                            lg:px-16
                        "
                    >
                        <AnimatePresence mode="wait">
                            {!isSweeping && (
                                <motion.div
                                    key={activeForm}
                                    initial={{
                                        opacity: 0,
                                        x: isSignup
                                            ? 20
                                            : -20,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: isSignup
                                            ? -20
                                            : 20,
                                    }}
                                    transition={{
                                        duration: 0.25,
                                        ease: EASE_FAST,
                                    }}
                                    className="
                                        w-full
                                        max-w-md
                                        flex
                                        flex-col
                                        justify-center
                                    "
                                >
                                    {/* ==================================================
                                        HEADER
                                    ================================================== */}

                                    <div className="mb-7">
                                        <h2
                                            className="
                                                text-4xl
                                                font-black
                                                tracking-tight
                                                text-[var(--text-primary)]
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >
                                            {isSignup
                                                ? "Get Started"
                                                : "Welcome Back"}

                                            <div
                                                className="
                                                    h-2.5
                                                    w-2.5
                                                    rounded-full
                                                    bg-green-400
                                                    animate-pulse
                                                    shadow-[0_0_10px_#4ade80]
                                                "
                                            />
                                        </h2>

                                        <p className="text-[var(--text-secondary)] text-sm mt-2 font-medium">
                                            {isSignup
                                                ? "Start your eco-journey and make an impact."
                                                : "Sign in to continue your green mission."}
                                        </p>
                                    </div>

                                    {/* ==================================================
                                        SIGN UP
                                    ================================================== */}

                                    {isSignup ? (
                                        <form
                                            className="
                                                flex
                                                flex-col
                                                gap-4
                                            "
                                            onSubmit={(e) =>
                                                e.preventDefault()
                                            }
                                        >
                                            {/* FULL NAME */}
                                            <FloatingInput
                                                type="text"
                                                label="Full Name"
                                                icon={ICON_USER}
                                                value={
                                                    formState.username
                                                }
                                                onChange={(e: any) =>
                                                    handleInput(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            {/* EMAIL */}
                                            <FloatingInput
                                                type="email"
                                                label="Email Address"
                                                icon={ICON_MAIL}
                                                value={
                                                    formState.email
                                                }
                                                onChange={(e: any) =>
                                                    handleInput(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            {/* PASSWORD */}
                                            <FloatingInput
                                                type="password"
                                                label="Create Password"
                                                icon={ICON_LOCK}
                                                value={
                                                    formState.password
                                                }
                                                onChange={(e: any) =>
                                                    handleInput(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            {/* ==================================================
                                                ROLE SELECTOR
                                            ================================================== */}

                                            <div className="grid grid-cols-2 gap-3 mt-1">

                                                {/* USER */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setRole(
                                                            "user"
                                                        )
                                                    }
                                                    className={`
                                                        relative
                                                        group
                                                        h-[92px]
                                                        rounded-2xl
                                                        border
                                                        overflow-hidden
                                                        transition-all
                                                        duration-200
                                                        flex
                                                        flex-col
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        ${
                                                            role ===
                                                            "user"
                                                                ? "border-green-400/80 bg-green-500/10 text-green-300 shadow-[0_0_25px_rgba(34,197,94,0.12)]"
                                                                : "border-[var(--border)] bg-[var(--input-bg)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--input-hover-bg)] hover:text-[var(--text-primary)]"
                                                        }
                                                    `}
                                                >
                                                    <div
                                                        className={`
                                                            w-10
                                                            h-10
                                                            rounded-xl
                                                            flex
                                                            items-center
                                                            justify-center
                                                            transition-all
                                                            ${
                                                                role ===
                                                                "user"
                                                                    ? "bg-green-400/15 text-green-400"
                                                                    : "bg-[var(--input-bg)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                                                            }
                                                        `}
                                                    >
                                                        {ICON_USER}
                                                    </div>

                                                    <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                                                        User
                                                    </span>

                                                    {role ===
                                                        "user" && (
                                                        <motion.div
                                                            layoutId="roleActive"
                                                            className="
                                                                absolute
                                                                bottom-0
                                                                left-5
                                                                right-5
                                                                h-[2px]
                                                                bg-green-400
                                                                rounded-full
                                                            "
                                                        />
                                                    )}
                                                </button>

                                                {/* UMKM */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setRole(
                                                            "umkm"
                                                        )
                                                    }
                                                    className={`
                                                        relative
                                                        group
                                                        h-[92px]
                                                        rounded-2xl
                                                        border
                                                        overflow-hidden
                                                        transition-all
                                                        duration-200
                                                        flex
                                                        flex-col
                                                        items-center
                                                        justify-center
                                                        gap-2
                                                        ${
                                                            role ===
                                                            "umkm"
                                                                ? "border-green-400/80 bg-green-500/10 text-green-300 shadow-[0_0_25px_rgba(34,197,94,0.12)]"
                                                                : "border-[var(--border)] bg-[var(--input-bg)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--input-hover-bg)] hover:text-[var(--text-primary)]"
                                                        }
                                                    `}
                                                >
                                                    <div
                                                        className={`
                                                            w-10
                                                            h-10
                                                            rounded-xl
                                                            flex
                                                            items-center
                                                            justify-center
                                                            transition-all
                                                            ${
                                                                role ===
                                                                "umkm"
                                                                    ? "bg-green-400/15 text-green-400"
                                                                    : "bg-[var(--input-bg)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                                                            }
                                                        `}
                                                    >
                                                        {ICON_STORE}
                                                    </div>

                                                    <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                                                        UMKM
                                                    </span>

                                                    {role ===
                                                        "umkm" && (
                                                        <motion.div
                                                            layoutId="roleActive"
                                                            className="
                                                                absolute
                                                                bottom-0
                                                                left-5
                                                                right-5
                                                                h-[2px]
                                                                bg-green-400
                                                                rounded-full
                                                            "
                                                        />
                                                    )}
                                                </button>
                                            </div>

                                            {/* TERMS */}
                                            <label className="flex items-start gap-3 mt-1 cursor-pointer group">
                                                <div
                                                    className="
                                                        relative
                                                        flex
                                                        items-center
                                                        justify-center
                                                        w-5
                                                        h-5
                                                        mt-0.5
                                                        rounded-md
                                                        border
                                                        border-[var(--border)]
                                                        bg-[var(--input-bg)]
                                                        group-hover:border-green-400/50
                                                        transition-colors
                                                    "
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="absolute opacity-0 cursor-pointer"
                                                        checked={
                                                            formState.remember
                                                        }
                                                        onChange={(e) =>
                                                            handleInput(
                                                                "remember",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />

                                                    {formState.remember && (
                                                        <motion.svg
                                                            initial={{
                                                                scale: 0,
                                                            }}
                                                            animate={{
                                                                scale: 1,
                                                            }}
                                                            className="w-3.5 h-3.5 text-green-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={
                                                                    3
                                                                }
                                                                d="M5 13l4 4L19 7"
                                                            />
                                                        </motion.svg>
                                                    )}
                                                </div>

                                                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                                                    I agree to the{" "}
                                                    <span className="text-green-400 hover:underline">
                                                        Terms of
                                                        Service
                                                    </span>{" "}
                                                    and{" "}
                                                    <span className="text-green-400 hover:underline">
                                                        Privacy
                                                        Policy
                                                    </span>
                                                    .
                                                </p>
                                            </label>

                                            {/* SUBMIT */}
                                            <MagneticButton
                                                type="submit"
                                                className="
                                                    mt-2
                                                    w-full
                                                    py-4
                                                    rounded-2xl
                                                    bg-gradient-to-r
                                                    from-green-400
                                                    via-emerald-400
                                                    to-green-500
                                                    text-black
                                                    font-black
                                                    text-sm
                                                    uppercase
                                                    tracking-widest
                                                    hover:shadow-[0_0_35px_rgba(74,222,128,0.5)]
                                                    transition-all
                                                    duration-300
                                                    relative
                                                    overflow-hidden
                                                    group
                                                "
                                            >
                                                <span className="relative z-10 flex justify-center items-center gap-2">
                                                    Create Account

                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={
                                                                2.5
                                                            }
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                        />
                                                    </svg>
                                                </span>
                                            </MagneticButton>
                                        </form>
                                    ) : (
                                        /* ==================================================
                                            LOGIN
                                        ================================================== */

                                        <form
                                            className="
                                                flex
                                                flex-col
                                                gap-5
                                            "
                                            onSubmit={(e) =>
                                                e.preventDefault()
                                            }
                                        >
                                            <FloatingInput
                                                type="text"
                                                label="Email / Username"
                                                icon={ICON_USER}
                                                value={
                                                    formState.username
                                                }
                                                onChange={(e: any) =>
                                                    handleInput(
                                                        "username",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <FloatingInput
                                                type="password"
                                                label="Password"
                                                icon={ICON_LOCK}
                                                value={
                                                    formState.password
                                                }
                                                onChange={(e: any) =>
                                                    handleInput(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                            />

                                            <div className="flex items-center justify-between">
                                                <label className="flex items-center gap-2 cursor-pointer group">
                                                    <div
                                                        className="
                                                            relative
                                                            flex
                                                            items-center
                                                            justify-center
                                                            w-4
                                                            h-4
                                                            rounded
                                                            border
                                                            border-[var(--border)]
                                                            bg-[var(--input-bg)]
                                                            group-hover:border-green-400/50
                                                            transition-colors
                                                        "
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="absolute opacity-0 cursor-pointer"
                                                            checked={
                                                                formState.remember
                                                            }
                                                            onChange={(e) =>
                                                                handleInput(
                                                                    "remember",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />

                                                        {formState.remember && (
                                                            <svg
                                                                className="w-3 h-3 text-green-400"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={
                                                                        3
                                                                    }
                                                                    d="M5 13l4 4L19 7"
                                                                />
                                                            </svg>
                                                        )}
                                                    </div>

                                                    <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                                        Remember
                                                        me
                                                    </span>
                                                </label>

                                                <a
                                                    href="#"
                                                    className="
                                                        text-xs
                                                        font-bold
                                                        text-green-400
                                                        hover:text-green-300
                                                        transition-colors
                                                    "
                                                >
                                                    Forgot Password?
                                                </a>
                                            </div>

                                            <MagneticButton
                                                type="submit"
                                                className="
                                                    mt-2
                                                    w-full
                                                    py-4
                                                    rounded-2xl
                                                    bg-gradient-to-r
                                                    from-green-400
                                                    via-emerald-400
                                                    to-green-500
                                                    text-black
                                                    font-black
                                                    text-sm
                                                    uppercase
                                                    tracking-widest
                                                    hover:shadow-[0_0_35px_rgba(74,222,128,0.5)]
                                                    transition-all
                                                    duration-300
                                                    relative
                                                    overflow-hidden
                                                    group
                                                "
                                            >
                                                <span className="relative z-10 flex justify-center items-center gap-2">
                                                    Sign In
                                                    Securely

                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={
                                                                2.5
                                                            }
                                                            d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                                        />
                                                    </svg>
                                                </span>
                                            </MagneticButton>
                                        </form>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* ====================================================================
                SWEEP OVERLAY
            ==================================================================== */}

            <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
                <AnimatePresence>
                    {isSweeping && (
                        <motion.div
                            initial={{
                                x:
                                    sweepDir === "ltr"
                                        ? "-100vw"
                                        : "100vw",
                            }}
                            animate={{
                                x: "0vw",
                            }}
                            exit={{
                                x:
                                    sweepDir === "ltr"
                                        ? "100vw"
                                        : "-100vw",
                            }}
                            transition={{
                                duration: 0.35,
                                ease: EASE_FAST,
                            }}
                            className="
                                absolute
                                top-0
                                h-full
                                w-full
                                bg-gradient-to-br
                                from-emerald-500
                                via-green-500
                                to-emerald-700
                                shadow-[0_0_100px_rgba(34,197,94,0.8)]
                                flex
                                items-center
                                justify-center
                                overflow-visible
                            "
                        >
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-md" />

                            <div
                                className={`
                                    absolute
                                    top-0
                                    h-full
                                    w-[120px]
                                    pointer-events-none
                                    ${
                                        sweepDir === "ltr"
                                            ? "-right-[119px]"
                                            : "-left-[119px] scale-x-[-1]"
                                    }
                                `}
                            >
                                <svg
                                    className="w-full h-full overflow-visible"
                                    viewBox="0 0 100 1000"
                                    preserveAspectRatio="none"
                                >
                                    <path
                                        fill="#22c55e"
                                        d={SWEEP_WAVE}
                                    />
                                </svg>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* SPOTLIGHT */}
            <motion.div
                className="
                    absolute
                    inset-0
                    z-40
                    pointer-events-none
                    mix-blend-overlay
                "
                style={{
                    background: spotlight,
                }}
            />
        </main>
    );
}