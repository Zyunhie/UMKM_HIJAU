"use client";

import Cropper from "react-easy-crop";
import { useEffect, useRef, useState } from "react";
import { BellRing, Send, Pencil, Trash2, ImagePlus, X } from "lucide-react";
import { initialPengumuman, type Pengumuman } from "@/lib/data";
import { motion } from "framer-motion";
import { getCroppedImg } from "@/lib/cropImage";
import clsx from "clsx";

function PengumumanSection({
  history,
  onSend,
  onUpdate,
  onDelete,
}: {
  history: Pengumuman[];
  onSend: (p: Omit<Pengumuman, "id" | "dibaca" | "edited" | "editedAt">) => void;
  onUpdate: (id: string, p: Partial<Pengumuman>) => void;
  onDelete: (id: string) => void;
}) {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState(""); // HTML string
  const [target, setTarget] = useState("Semua UMKM");
  const [prioritas, setPrioritas] = useState<Pengumuman["prioritas"]>("info");
  const [gambar, setGambar] = useState<string | null>(null);
  const [dari, setDari] = useState("");
  const [sampai, setSampai] = useState("");
  const [preview, setPreview] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Crop state
  const [cropModal, setCropModal] = useState<{
    open: boolean;
    imageSrc: string;
    aspect: number;
    onCrop: (croppedDataUrl: string) => void;
  }>({ open: false, imageSrc: "", aspect: 16 / 9, onCrop: () => {} });
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const valid = judul.trim().length >= 5 && isi.trim().length >= 10;

  // ===== Crop handlers =====
  const handleCropComplete = (_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await getCroppedImg(cropModal.imageSrc, croppedAreaPixels);
      cropModal.onCrop(croppedImage);
      setCropModal({ ...cropModal, open: false });
    } catch (e) {
      console.error(e);
    }
  };

  const openCropModal = (
    file: File,
    aspect: number,
    onCrop: (croppedDataUrl: string) => void
  ) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({ open: true, imageSrc: reader.result as string, aspect, onCrop });
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, aspect: number, onCrop: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) openCropModal(file, aspect, onCrop);
    e.target.value = "";
  };

  const insertImageAtCursor = (url: string) => {
    const editor = contentRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand("insertImage", false, url);
    setIsi(editor.innerHTML);
  };

  // ===== Submit handlers =====
  const handleSend = () => {
    const currentIsi = contentRef.current?.innerHTML || "";
    if (judul.trim().length < 5 || currentIsi.trim().length < 10) return;
    const payload = {
      judul: judul.trim(),
      isi: currentIsi,
      target,
      prioritas,
      gambar,
      tanggal: new Date().toISOString().slice(0, 16).replace("T", " "),
      dari,
      sampai,
    };
    onSend(payload);
    resetForm();
  };

  const handleUpdate = () => {
    if (!editingId) return;
    const currentIsi = contentRef.current?.innerHTML || "";
    if (judul.trim().length < 5 || currentIsi.trim().length < 10) return;
    const payload = {
      judul: judul.trim(),
      isi: currentIsi,
      target,
      prioritas,
      gambar,
      dari,
      sampai,
      edited: true,
      editedAt: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    onUpdate(editingId, payload);
    resetForm();
  };

  const resetForm = () => {
    setJudul("");
    setIsi("");
    setTarget("Semua UMKM");
    setPrioritas("info");
    setGambar(null);
    setDari("");
    setSampai("");
    setEditingId(null);
    if (contentRef.current) contentRef.current.innerHTML = "";
  };

  const handleEdit = (item: Pengumuman) => {
    setEditingId(item.id);
    setJudul(item.judul);
    setIsi(item.isi);
    setTarget(item.target);
    setPrioritas(item.prioritas);
    setGambar(item.gambar ?? null);
    setDari(item.dari || "");
    setSampai(item.sampai || "");
    // Konten akan di-set oleh useEffect setelah render
  };

  // Sinkronkan konten contentEditable saat isi berubah dari state (misal saat edit)
  useEffect(() => {
    if (contentRef.current && isi !== contentRef.current.innerHTML) {
      contentRef.current.innerHTML = isi;
    }
  }, [isi]);

  const handleDelete = (id: string) => {
    if (confirm("Yakin hapus pengumuman ini?")) onDelete(id);
  };

  // ===== Time status helper =====
  const getTimeStatus = (dari?: string, sampai?: string) => {
    if (!dari && !sampai) return "none";
    const now = new Date();
    if (dari && new Date(dari) > now) return "upcoming";
    if (sampai && new Date(sampai) < now) return "expired";
    return "active";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Pengumuman</h1>
        <p className="text-neutral-400 mt-2">
          Kirim pengumuman ke loceng user, terkoneksi real-time ke dashboard.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* ===== FORM ===== */}
        <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6 lg:col-span-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-500/10 p-2.5">
              <BellRing className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-green-500 rounded-full" />
                {editingId ? "Edit pengumuman" : "Kirim pengumuman"}
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Terkirim instan ke ikon loceng 🔔 di aplikasi user/UMKM.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {/* Judul */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Judul pengumuman</label>
              <input
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                placeholder="cth: Batas lapor audit energi Q3"
              />
            </div>

            {/* Target & Prioritas */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Target penerima</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                >
                  <option>Semua UMKM</option>
                  <option>Top 10 Leaderboard</option>
                  <option>Badge Gold saja</option>
                  <option>UMKM pending verifikasi</option>
                  <option>UMKM di Jawa Timur</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Prioritas</label>
                <div className="flex gap-2">
                  {(["info", "penting", "mendesak"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPrioritas(p)}
                      className={clsx(
                        "flex-1 rounded-lg px-3 py-2.5 text-xs font-bold capitalize transition-all border",
                        prioritas === p
                          ? p === "mendesak"
                            ? "bg-red-500/10 border-red-500/50 text-red-400"
                            : p === "penting"
                            ? "bg-amber-500/10 border-amber-500/50 text-amber-400"
                            : "bg-green-500/10 border-green-500/50 text-green-400"
                          : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Rentang waktu */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Dari (mulai)</label>
                <input
                  type="datetime-local"
                  value={dari}
                  onChange={(e) => setDari(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Sampai (akhir)</label>
                <input
                  type="datetime-local"
                  value={sampai}
                  onChange={(e) => setSampai(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition"
                />
              </div>
            </div>

            {/* Gambar utama */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Gambar utama (opsional)</label>
              {gambar ? (
                <div className="relative rounded-lg overflow-hidden border border-white/10">
                  <img src={gambar} alt="Preview" className="w-full h-40 object-cover" />
                  <button
                    onClick={() => setGambar(null)}
                    className="absolute top-2 right-2 bg-black/60 p-1 rounded-full hover:bg-black/80"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-white/10 rounded-lg p-6 text-neutral-400 hover:text-white hover:border-white/30 transition text-sm flex items-center justify-center gap-2"
                >
                  <ImagePlus className="h-5 w-5" /> Upload gambar (dengan crop)
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(e, 16 / 9, setGambar)}
              />
            </div>

            {/* Isi dengan inline image */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Isi pengumuman</label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) openCropModal(file, 4 / 3, insertImageAtCursor);
                    };
                    input.click();
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
                >
                  <ImagePlus className="h-4 w-4" /> Sisipkan Gambar
                </button>
              </div>
              <div
                ref={contentRef}
                contentEditable
                onInput={(e) => setIsi(e.currentTarget.innerHTML)}
                className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition resize-none"
                data-placeholder="Tulis isi yang jelas & ada call-to-action…"
              ></div>
            </div>

            <label className="flex items-center gap-2 text-sm text-neutral-400 cursor-pointer">
              <input type="checkbox" checked={preview} onChange={(e) => setPreview(e.target.checked)} className="h-4 w-4 accent-green-500" />
              Tampilkan pratinjau loceng sebelum kirim
            </label>

            <div className="flex gap-3">
              {editingId && (
                <button
                  onClick={resetForm}
                  className="w-1/3 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg transition-colors"
                >
                  Batal
                </button>
              )}
              <button
                disabled={!valid}
                onClick={editingId ? handleUpdate : handleSend}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId ? <Pencil className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                {editingId ? "Update Pengumuman" : `Kirim ke ${target} 🔔`}
              </button>
            </div>
            {!valid && (
              <p className="text-center text-xs text-neutral-500">
                Judul min. 5 karakter & isi min. 10 karakter untuk mengaktifkan tombol.
              </p>
            )}
          </div>
        </div>

        {/* ===== PRATINJAU & RIWAYAT ===== */}
        <div className="space-y-5 lg:col-span-2">
          {preview && (judul || isi) && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
              <p className="border-b border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-bold text-green-400">
                PRATINJAU LOCENG USER 🔔
              </p>
              <div className="flex gap-3 px-4 py-3">
                <span
                  className={clsx(
                    "mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full",
                    prioritas === "mendesak" ? "bg-red-400" : prioritas === "penting" ? "bg-amber-400" : "bg-green-400"
                  )}
                />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{judul || "(judul…)"}</p>
                  {gambar && <img src={gambar} className="mt-2 rounded-lg max-h-32 object-cover" />}
                  <div
                    className="mt-0.5 text-xs text-neutral-400 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: isi || "(isi…)" }}
                  />
                  <p className="mt-1 text-[11px] text-neutral-500">
                    {target} • {dari || "kapan saja"} s/d {sampai || "selamanya"} • Baru
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <p className="border-b border-white/10 bg-white/[0.05] px-4 py-3 font-bold text-white">
              Riwayat pengumuman ({history.length})
            </p>
            <div className="max-h-[480px] divide-y divide-white/5 overflow-y-auto">
              {history.map((h) => {
                const status = getTimeStatus(h.dari, h.sampai);
                const bgColor =
                  status === "upcoming"
                    ? "bg-yellow-500/10 border-yellow-500/20"
                    : status === "active"
                    ? "bg-green-500/10 border-green-500/20"
                    : status === "expired"
                    ? "bg-red-500/10 border-red-500/20"
                    : "bg-white/[0.03] border-white/10";
                return (
                  <div key={h.id} className={clsx("px-4 py-3 border rounded-xl my-2", bgColor)}>
                    <div className="flex items-center gap-2">
                      <p className="flex-1 truncate text-sm font-bold text-white">{h.judul}</p>
                      <span
                        className={clsx(
                          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                          h.prioritas === "mendesak"
                            ? "bg-red-500/10 text-red-400"
                            : h.prioritas === "penting"
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-green-500/10 text-green-400"
                        )}
                      >
                        {h.prioritas}
                      </span>
                    </div>
                    {h.gambar && (
                      <img src={h.gambar} className="mt-2 rounded-lg max-h-32 object-cover" />
                    )}
                    <div
                      className="mt-0.5 text-xs text-neutral-300 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: h.isi }}
                    />
                    <p className="mt-1 text-[11px] text-neutral-400">
                      {h.target} • {h.tanggal}
                      {h.dari && ` • Dari ${h.dari}`}
                      {h.sampai && ` s/d ${h.sampai}`}
                      {h.edited && (
                        <span className="ml-2 text-amber-400">✎ diedit {h.editedAt}</span>
                      )}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => handleEdit(h)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-white/10 hover:bg-white/20 text-white rounded"
                      >
                        <Pencil className="h-3 w-3" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(h.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded"
                      >
                        <Trash2 className="h-3 w-3" /> Hapus
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== CROP MODAL ===== */}
      {cropModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-neutral-900 rounded-2xl w-full max-w-3xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h3 className="font-bold text-white">Crop Gambar</h3>
              <button
                onClick={() => setCropModal({ ...cropModal, open: false })}
                className="p-1 hover:bg-white/10 rounded-full"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="relative h-[400px] bg-black">
              <Cropper
                image={cropModal.imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={cropModal.aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
              />
            </div>
            <div className="p-4 flex justify-end gap-3">
              <button
                onClick={() => setCropModal({ ...cropModal, open: false })}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleCropConfirm}
                className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function PengumumanPage() {
  const [history, setHistory] = useState(initialPengumuman);

  const onSend = (p: Omit<Pengumuman, "id" | "dibaca" | "edited" | "editedAt">) => {
    setHistory((prev) => [
      {
        id: `P-${Date.now()}`,
        ...p,
        dibaca: false,
        edited: false,
        editedAt: undefined,
        tanggal: new Date().toISOString().slice(0, 16).replace("T", " "),
      },
      ...prev,
    ]);
  };

  const onUpdate = (id: string, p: Partial<Pengumuman>) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...p } : item))
    );
  };

  const onDelete = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PengumumanSection
      history={history}
      onSend={onSend}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  );
}