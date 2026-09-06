"use client";

export default function UserMapClient() {
  return (
    <div className="flex h-[calc(100vh-9rem)] items-center justify-center bg-slate-950 text-slate-200">
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-center shadow-lg shadow-emerald-900/20">
        <p className="text-lg font-semibold">Map view is loading…</p>
        <p className="mt-2 text-sm text-slate-300">This route is client-only and will render once the browser is ready.</p>
      </div>
    </div>
  );
}
