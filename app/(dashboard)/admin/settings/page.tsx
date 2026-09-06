export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-surface px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border-subtle bg-white p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Settings</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-slate-900">Pengaturan Admin</h1>
        <p className="mt-3 text-sm text-slate-600">
          Halaman ini sengaja dibuat tanpa sidebar agar layout utama bisa disembunyikan hanya di setting.
        </p>
      </div>
    </main>
  );
}
