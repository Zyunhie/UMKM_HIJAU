// app/(dashboard)/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  History,
  Megaphone,
  Trophy,
  Users,
  Calculator,
  Inbox
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Riwayat Poin", href: "/admin/riwayat", icon: History },
  { label: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
  { label: "Leaderboard", href: "/admin/leaderboard", icon: Trophy },
  { label: "Antrean", href: "/admin/antrean", icon: Inbox },
];

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#020402] text-white flex overflow-x-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col fixed inset-y-0 left-0 z-40">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.5)]">
              <span className="text-black font-black text-sm">UH</span>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-green-400">
              UMKM Hijau
            </span>
          </Link>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-green-500/10 text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-neutral-400 hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Konten utama */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar atas */}
        <header className="h-20 bg-black/20 backdrop-blur-xl border-b border-white/10 flex items-center justify-end px-8 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <Bell size={20} className="text-neutral-300" />
              <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black animate-pulse" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-white leading-tight">Admin Pusat</p>
                <p className="text-xs text-neutral-400">Administrator</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 border-2 border-green-500/30 overflow-hidden">
                <img
                  src="https://i.pravatar.cc/100?img=59"
                  alt="Profile Admin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Isi halaman */}
        <main className="flex-1 relative p-8">
          {children}
        </main>
      </div>
    </div>
  );
}