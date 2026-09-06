"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Eye, MapPin, X } from "lucide-react";
import { initialAntrean, type AntreanUMKM } from "@/lib/data";
import clsx from "clsx";

function AntreanSection({
  data,
  query,
  onAccept,
  onDecline,
}: {
  data: AntreanUMKM[];
  query: string;
  onAccept: (id: string) => void;
  onDecline: (id: string, alasan: string) => void;
}) {
  const [detail, setDetail] = useState<AntreanUMKM | null>(null);
  const [rejectFor, setRejectFor] = useState<AntreanUMKM | null>(null);
  const [alasan, setAlasan] = useState("");

  const AMBANG = 70;
  const lolos = (skor: number) => skor >= AMBANG;

  const openDecline = (d: AntreanUMKM) => {
    setRejectFor(d);
    setAlasan(
      lolos(d.skorAwal)
        ? ""
        : `Skor ${d.skorAwal}/100 di bawah ambang ${AMBANG} — poin masih kurang. Silakan lengkapi dokumen & audit energi lalu ajukan ulang.`
    );
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return data.filter(
      (d) =>
        d.namaUsaha.toLowerCase().includes(q) ||
        d.pemilik.toLowerCase().includes(q) ||
        d.kategori.toLowerCase().includes(q) ||
        d.kota.toLowerCase().includes(q)
    );
  }, [data, query]);

  const pending = data.filter((d) => d.status === "pending");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Antrean Verifikasi</h1>
        <p className="text-neutral-400 mt-2">
          Tinjau UMKM yang mendaftar. ACCEPT hanya jika skor ≥ {AMBANG}.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
          <p className="text-sm font-medium text-neutral-400">Menunggu verifikasi</p>
          <p className="mt-2 text-3xl font-black text-yellow-400">{pending.length}</p>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
          <p className="text-sm font-medium text-neutral-400">Diterima</p>
          <p className="mt-2 text-3xl font-black text-green-400">
            {data.filter((d) => d.status === "accepted").length}
          </p>
        </div>
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:bg-white/[0.06] transition-all">
          <p className="text-sm font-medium text-neutral-400">Ditolak</p>
          <p className="mt-2 text-3xl font-black text-red-400">
            {data.filter((d) => d.status === "declined").length}
          </p>
        </div>
      </div>

      {/* Daftar antrean */}
      <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
        <div className="border-b border-white/10 px-6 py-5">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            Antrean pendaftaran UMKM Hijau
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Lihat Detail skor dulu — ACCEPT hanya jika skor ≥ {AMBANG}. Di bawah itu wajib DECLINE dengan catatan poin masih kurang.
          </p>
        </div>
        <div className="divide-y divide-white/5">
          {filtered.length === 0 && (
            <p className="px-6 py-10 text-center text-neutral-400">Tidak ada antrean yang cocok.</p>
          )}
          {filtered.map((d) => (
            <div key={d.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center hover:bg-white/[0.03] transition-colors">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 font-black text-sm text-green-400">
                {d.namaUsaha.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-white">{d.namaUsaha}</p>
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-white/5 text-neutral-300 text-[11px]">
                    {d.kategori}
                  </span>
                  <span
                    className={clsx(
                      "rounded-full px-2.5 py-0.5 text-[11px] font-bold border",
                      d.status === "pending" && "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
                      d.status === "accepted" && "bg-green-500/10 text-green-400 border-green-500/30",
                      d.status === "declined" && "bg-red-500/10 text-red-400 border-red-500/30"
                    )}
                  >
                    {d.status === "pending" ? "PENDING" : d.status === "accepted" ? "ACCEPTED" : "DECLINED"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-neutral-400">
                  {d.id} • {d.pemilik} • <MapPin className="inline h-3 w-3" /> {d.kota} • {d.tanggalDaftar} • Skor awal {d.skorAwal}/{AMBANG}
                </p>
                <p className="mt-1 text-[11px] font-bold">
                  {lolos(d.skorAwal) ? (
                    <span className="text-green-400">✅ Lolos ambang (≥ {AMBANG}) — layak ACCEPT</span>
                  ) : (
                    <span className="text-red-400">❌ Di bawah ambang — wajib DECLINE, poin masih kurang</span>
                  )}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap items-center gap-2">
                <button
                  onClick={() => setDetail(d)}
                  className="inline-flex items-center gap-1 px-3 py-2 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-lg text-xs transition-colors"
                >
                  <Eye className="h-4 w-4" /> Detail
                </button>
                {d.status === "pending" && (
                  <>
                    <button
                      onClick={() => onAccept(d.id)}
                      disabled={!lolos(d.skorAwal)}
                      title={lolos(d.skorAwal) ? "Skor memenuhi ambang" : `Terkunci: skor ${d.skorAwal} < ${AMBANG}`}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg text-xs transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Check className="h-4 w-4" /> ACCEPT
                    </button>
                    <button
                      onClick={() => openDecline(d)}
                      className="inline-flex items-center gap-1 px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors"
                    >
                      <X className="h-4 w-4" /> DECLINE
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Detail */}
      {detail && (
        <Modal onClose={() => setDetail(null)} title={detail.namaUsaha}>
          <p className="text-sm text-neutral-300">{detail.deskripsi}</p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-neutral-500">Pemilik</dt>
              <dd className="font-semibold text-white">{detail.pemilik}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Kategori</dt>
              <dd className="font-semibold text-white">{detail.kategori}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Kota</dt>
              <dd className="font-semibold text-white">{detail.kota}</dd>
            </div>
            <div>
              <dt className="text-xs text-neutral-500">Skor awal</dt>
              <dd className="font-semibold text-white">{detail.skorAwal}/100</dd>
            </div>
          </dl>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-gradient-to-r from-green-600 to-green-400" style={{ width: `${detail.skorAwal}%` }} />
          </div>
          <div
            className={clsx(
              "mt-3 rounded-lg px-3 py-2 text-sm font-semibold",
              lolos(detail.skorAwal)
                ? "bg-green-500/10 text-green-400"
                : "bg-red-500/10 text-red-400"
            )}
          >
            {lolos(detail.skorAwal)
              ? `✅ Skor ${detail.skorAwal} ≥ ambang ${AMBANG} — boleh ACCEPT.`
              : `❌ Skor ${detail.skorAwal} < ambang ${AMBANG} — poin masih kurang, wajib DECLINE.`}
          </div>
          {detail.status === "pending" && (
            <div className="mt-5 flex gap-2">
              <button
                className="flex-1 px-4 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                disabled={!lolos(detail.skorAwal)}
                title={lolos(detail.skorAwal) ? "Skor memenuhi ambang" : "Terkunci: skor di bawah ambang"}
                onClick={() => {
                  onAccept(detail.id);
                  setDetail(null);
                }}
              >
                ACCEPT (≥ {AMBANG})
              </button>
              <button
                className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-lg transition-colors"
                onClick={() => {
                  openDecline(detail);
                  setDetail(null);
                }}
              >
                DECLINE
              </button>
            </div>
          )}
        </Modal>
      )}

      {/* Modal Tolak */}
      {rejectFor && (
        <Modal onClose={() => setRejectFor(null)} title={`Tolak ${rejectFor.namaUsaha}?`}>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Alasan penolakan (wajib, terkirim ke UMKM)
          </label>
          <textarea
            value={alasan}
            onChange={(e) => setAlasan(e.target.value)}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition resize-none"
            placeholder="cth: Dokumen filter limbah belum lengkap…"
          />
          <div className="mt-4 flex gap-2">
            <button
              className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 text-neutral-300 rounded-lg transition-colors"
              onClick={() => setRejectFor(null)}
            >
              Batal
            </button>
            <button
              disabled={!alasan.trim()}
              className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-400 text-black font-bold rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              onClick={() => {
                onDecline(rejectFor.id, alasan.trim());
                setRejectFor(null);
              }}
            >
              Kirim DECLINE
            </button>
          </div>
        </Modal>
      )}
    </motion.div>
  );
}

export default function AntreanPage() {
  const [data, setData] = useState(initialAntrean);

  const onAccept = (id: string) => {
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "accepted" } : item)));
  };

  const onDecline = (id: string, alasan: string) => {
    void alasan;
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status: "declined" } : item)));
  };

  return <AntreanSection data={data} query="" onAccept={onAccept} onDecline={onDecline} />;
}

function Modal({ children, onClose, title }: { children: React.ReactNode; onClose: () => void; title: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-4 sm:items-center">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0a0f0a] border border-white/10 p-6 shadow-2xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h4 className="text-lg font-black text-white">{title}</h4>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}