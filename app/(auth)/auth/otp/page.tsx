"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function OtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (otp.length < 6 || otp.length > 8) {
      setError("Kode OTP harus 6–8 digit.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      });

      if (error) throw error;

      // Ambil user setelah verifikasi
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("User tidak ditemukan");

      // Buat atau update profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile) {
        await supabase.from("profiles").insert({
          id: user.id,
          username: user.user_metadata?.username || email,
          name: user.user_metadata?.name || email,
          role: user.user_metadata?.role || "user",
          is_active: true,
          email_verified_at: new Date().toISOString(),
        });
      }

      // Redirect sesuai role
      const role = user.user_metadata?.role || "user";
      if (role === "umkm") {
        router.push("/auth/profile");
      } else {
        router.push("/dashboard/user");
      }
    } catch (err: any) {
      setError(err.message || "Verifikasi gagal. Periksa kembali kode Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020402] text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl"
      >
        <Link
          href="/auth?mode=login"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-green-400/10 border border-green-400/30 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-black">Kode OTP</h1>
            <p className="text-sm text-gray-400">
              Masukkan kode 6–8 digit yang dikirim ke email Anda.
            </p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Email Tujuan
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-gray-300 cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Kode OTP (6–8 digit)
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-2xl tracking-[0.3em] text-center focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-transparent transition"
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-400/20 text-red-400 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-black py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Memverifikasi..." : "Verifikasi"}
          </button>
        </form>
      </motion.div>
    </main>
  );
}