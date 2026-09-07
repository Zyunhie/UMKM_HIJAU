"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [form, setForm] = useState({
    nama_usaha: "",
    alamat: "",
    tipe_tempat: "warung",
    tipe_produk: "bahan_mentah",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push("/auth");
        return;
      }
      setUser(data.user);
    });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user) return;

    const { error } = await supabase.from("umkm").insert({
      user_id: user.id,
      nama_usaha: form.nama_usaha,
      alamat: form.alamat,
      tipe_tempat: form.tipe_tempat,
      tipe_produk: form.tipe_produk,
      label: "nonlabel",
      poin: 0,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/umkm");
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-2">Lengkapi Profil Usaha</h1>
        <p className="text-sm text-gray-400 mb-6">Anda terdaftar sebagai UMKM. Silakan lengkapi data usaha Anda.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nama_usaha"
            placeholder="Nama Usaha"
            value={form.nama_usaha}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
            required
          />
          <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={form.alamat}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
            required
          />
          <select
            name="tipe_tempat"
            value={form.tipe_tempat}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
          >
            <option value="warung">Warung</option>
            <option value="gerobak">Gerobak</option>
            <option value="kios">Kios</option>
            <option value="toko">Toko</option>
            <option value="lapak">Lapak</option>
            <option value="lainnya">Lainnya</option>
          </select>
          <select
            name="tipe_produk"
            value={form.tipe_produk}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
          >
            <option value="bahan_mentah">Bahan Mentah</option>
            <option value="bahan_matang">Bahan Matang</option>
            <option value="bahan_olahan">Bahan Olahan</option>
            <option value="campuran">Campuran</option>
          </select>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg"
          >
            {loading ? "Menyimpan..." : "Simpan & Lanjut"}
          </button>
        </form>
      </div>
    </main>
  );
}