import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Save } from "lucide-react";

export const SettingsGearModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-slate-950 p-8 text-white overflow-hidden">
      {/* Top Right Gear Button */}
      <div className="absolute top-6 right-6 z-40">
        {!isOpen && (
          <motion.button
            layoutId="gear-to-paper-container"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 shadow-lg shadow-emerald-500/25 transition-colors duration-300 hover:bg-white"
          >
            <Settings className="h-6 w-6 text-white transition-transform duration-500 group-hover:rotate-90 group-hover:text-slate-900" />
          </motion.button>
        )}
      </div>

      {/* Backdrop & Paper Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId="gear-to-paper-container"
                style={{
                  transformPerspective: 1000,
                  transformOrigin: "top right",
                }}
                initial={{
                  opacity: 0.8,
                  scale: 0.15,
                  rotateX: -25,
                  rotateY: 30,
                  rotateZ: -12,
                  skewX: 12,
                }}
                animate={{
                  opacity: 1,
                  scale: [0.15, 1.04, 0.98, 1],
                  rotateX: [-25, 10, -4, 0],
                  rotateY: [30, -12, 5, 0],
                  rotateZ: [-12, 5, -2, 0],
                  skewX: [12, -6, 2, 0],
                }}
                exit={{
                  scale: 0.1,
                  opacity: 0,
                  rotateX: 20,
                  rotateY: -20,
                  transition: { duration: 0.25, ease: "easeIn" },
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pointer-events-auto relative w-full max-w-md rounded-3xl bg-white p-8 text-slate-900 shadow-2xl border border-slate-100 overflow-hidden"
              >
                {/* Form Content - Delayed Fade-in */}
                <motion.div
                  initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="text-xl font-bold text-slate-900">System Settings</h3>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">API Endpoint Key</label>
                    <input
                      type="text"
                      placeholder="https://api.ecosertif.com/v1"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Audit Threshold (kWh)</label>
                    <input
                      type="number"
                      placeholder="1.0"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 active:scale-[0.98] transition-all"
                    >
                      <Save className="h-4 w-4" /> Save Changes
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
