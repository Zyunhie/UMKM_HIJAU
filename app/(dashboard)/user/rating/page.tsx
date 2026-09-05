// app/(dashboard)/user/rating/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Trash2, Edit3 } from "lucide-react";

// Riwayat rating dummy
const initialRatings = [
  { id: 1, umkm: "Kopi Dari Hati", rating: 5, comment: "Kopi enak, tempatnya nyaman, dan sudah pakai listrik hemat!", date: "2024-03-15" },
  { id: 2, umkm: "Batik Rara Djonggrang", rating: 4, comment: "Bagus, tapi lampu masih agak terang di siang hari.", date: "2024-03-14" },
  { id: 3, umkm: "Sate Maranggi Cibungur", rating: 5, comment: "Sate terenak! Bangga lihat label Gold-nya.", date: "2024-03-12" },
];

export default function RatingSayaPage() {
  const [ratings, setRatings] = useState(initialRatings);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editRating, setEditRating] = useState(0);
  const [editComment, setEditComment] = useState("");

  const handleDelete = (id: number) => {
    setRatings((prev) => prev.filter((r) => r.id !== id));
  };

  const startEdit = (r: typeof initialRatings[0]) => {
    setEditingId(r.id);
    setEditRating(r.rating);
    setEditComment(r.comment);
  };

  const saveEdit = () => {
    setRatings((prev) =>
      prev.map((r) =>
        r.id === editingId ? { ...r, rating: editRating, comment: editComment } : r
      )
    );
    setEditingId(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Rating Saya</h1>
        <p className="text-neutral-400 mt-2">Kelola rating yang telah kamu berikan kepada UMKM.</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {ratings.map((rating) => (
            <motion.div
              key={rating.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6"
            >
              {editingId === rating.id ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-neutral-300">Rating:</span>
                    {[...Array(5)].map((_, i) => (
                      <button key={i} onClick={() => setEditRating(i + 1)}>
                        <Star
                          size={24}
                          className={i < editRating ? "text-yellow-400 fill-yellow-400" : "text-neutral-600"}
                        />
                      </button>
                    ))}
                  </div>
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-green-400/50"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-400 text-black font-bold text-sm">
                      Simpan
                    </button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 text-sm">
                      Batal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold">{rating.umkm}</h3>
                      <span className="text-xs text-neutral-500">{rating.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < rating.rating ? "text-yellow-400 fill-yellow-400" : "text-neutral-600"}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-neutral-300 text-sm leading-relaxed">{rating.comment}</p>
                  </div>
                  <div className="flex gap-2 self-end sm:self-start">
                    <button
                      onClick={() => startEdit(rating)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(rating.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-neutral-400 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {ratings.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            <Star size={48} className="mx-auto mb-4 text-neutral-600" />
            <p>Belum ada rating. Yuk beri rating ke UMKM hijau!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}