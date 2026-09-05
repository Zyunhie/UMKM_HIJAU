// app/(dashboard)/user/contact/page.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle } from "lucide-react";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset setelah 2 detik
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 2000);
  };

  const contactCards = [
    {
      icon: Mail,
      title: "Email",
      value: "support@umkmhijau.id",
    },
    {
      icon: Phone,
      title: "Telepon",
      value: "+62 812-3456-7890",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "+62 812-3456-7890",
      isWa: true,
    },
    {
      icon: MapPin,
      title: "Alamat",
      value: "Jl. Hijau No. 1, Bandung",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="space-y-8 max-w-6xl mx-auto"
    >
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Contact Us</h1>
        <p className="text-neutral-400 mt-2 text-base">Ada pertanyaan? Hubungi tim UMKM Hijau, kami siap membantu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informasi kontak */}
        <div className="space-y-4">
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/5 p-5 hover:bg-white/[0.05] hover:border-green-400/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  card.isWa 
                    ? "bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20" 
                    : "bg-green-400/10 border border-green-400/20 group-hover:bg-green-400/20"
                }`}>
                  <card.icon size={22} className={card.isWa ? "text-green-500" : "text-green-400"} />
                </div>
                <div>
                  <p className="font-semibold text-neutral-200 text-sm">{card.title}</p>
                  <p className="text-sm text-neutral-400 mt-0.5">{card.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-sm rounded-3xl border border-white/5 p-6 md:p-8">
          {submitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Send size={32} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Pesan Terkirim!</h3>
              <p className="text-neutral-400 mt-3 max-w-md mx-auto">
                Terima kasih telah menghubungi kami. Tim kami akan membalas pesan Anda secepatnya.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-300 ml-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-green-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-green-400/10 transition-all duration-300 placeholder:text-neutral-600"
                    placeholder="Masukkan nama kamu"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-neutral-300 ml-1">Alamat Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-green-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-green-400/10 transition-all duration-300 placeholder:text-neutral-600"
                    placeholder="nama@email.com"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 ml-1">Subjek</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-green-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-green-400/10 transition-all duration-300 placeholder:text-neutral-600"
                  placeholder="Perihal apa pesan ini?"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-neutral-300 ml-1">Pesan</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  // resize-none MENCEGAH user menarik sudut textarea jadi kotak kaku/ngotak
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-4 py-3.5 text-sm text-white outline-none focus:border-green-400/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-green-400/10 transition-all duration-300 placeholder:text-neutral-600 resize-none leading-relaxed"
                  placeholder="Tulis detail pesan atau pertanyaan kamu di sini..."
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold text-base transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.25)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] mt-2"
              >
                Kirim Pesan
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
}