// src/app/(dashboard)/dashboard/user/settings/page.tsx
"use client";

import { useState } from "react";
import { Moon, Sun, Monitor, Upload, Check, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Theme = "light" | "dark" | "system";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("Asep Sunandar");
  const [username, setUsername] = useState("asepsunandar");
  const [avatarUrl, setAvatarUrl] = useState(
    "https://i.pravatar.cc/150?img=12"
  );
  const [theme, setTheme] = useState<Theme>("dark");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [usernameError, setUsernameError] = useState("");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-z0-9_-]*$/.test(value)) {
      setUsername(value);
      setUsernameError("");
    } else {
      setUsernameError("Hanya huruf kecil, angka, underscore, dan strip.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const themeOptions = [
    { value: "light", label: "Terang", icon: Sun },
    { value: "dark", label: "Gelap", icon: Moon },
    { value: "system", label: "Sistem", icon: Monitor },
  ];

  return (
    <div className="min-h-screen bg-[#020402] text-white flex items-center justify-center p-4">
      {/* Background dekoratif */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.05),_transparent_70%)]" />

      <div className="relative w-full max-w-2xl">
        {/* Tombol kembali */}
        <Link
          href="/user/dashboard"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Kembali ke Dashboard</span>
        </Link>

        {/* Card utama */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Settings</h1>
            <p className="text-neutral-400 mt-2">
              Kelola profil, akun, dan preferensi tampilan Anda.
            </p>
          </div>

          {/* Profil Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full" />
              Profil
            </h2>

            {/* Avatar */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500/30 group-hover:border-green-500/60 transition-colors">
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 cursor-pointer p-2 bg-green-500 rounded-full text-black hover:bg-green-600 transition-colors shadow-lg">
                  <Upload size={16} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div>
                <p className="text-sm text-neutral-400">
                  Klik ikon kamera untuk mengganti foto profil.
                  <br />
                  Disarankan 400x400px, maks 2MB.
                </p>
              </div>
            </div>

            {/* Nama & Username */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                  placeholder="Nama Anda"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  className={`w-full bg-white/5 border rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none transition ${
                    usernameError
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50"
                  }`}
                  placeholder="username"
                />
                {usernameError && (
                  <p className="mt-2 text-xs text-red-400">{usernameError}</p>
                )}
              </div>
            </div>
          </section>

          {/* Divider */}
          <hr className="my-8 border-white/10" />

          {/* Tema Section */}
          <section className="space-y-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-green-500 rounded-full" />
              Tema
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isActive = theme === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setTheme(option.value as Theme)}
                    className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all ${
                      isActive
                        ? "bg-green-500/10 border-green-500/50 text-green-400"
                        : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <Icon size={24} />
                    <span className="font-medium text-sm">{option.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-sm text-neutral-400">
              Tema akan diterapkan segera. Pilihan &quot;Sistem&quot; mengikuti preferensi perangkat Anda.
            </p>
          </section>

          {/* Tombol Simpan */}
          <div className="mt-8 flex items-center justify-end gap-4">
            {showSuccess && (
              <span className="inline-flex items-center gap-2 text-green-400 text-sm animate-pulse">
                <Check size={16} />
                Perubahan berhasil disimpan!
              </span>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving || !!usernameError}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Check size={18} />
              )}
              {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}