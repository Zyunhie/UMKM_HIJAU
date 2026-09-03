import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Pastikan path CSS global kamu sesuai

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "UMKM Hijau",
  description: "Platform UMKM Ramah Lingkungan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-[#050505] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}