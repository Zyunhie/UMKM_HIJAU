"use client";

import dynamic from "next/dynamic";

const MapClient = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => <div className="flex h-[calc(100vh-9rem)] items-center justify-center text-slate-300">Loading map...</div>,
});

export default function MapPage() {
  return <MapClient />;
}
