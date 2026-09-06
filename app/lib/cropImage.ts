export interface Pengumuman {
  id: string;
  judul: string;
  isi: string;
  target: string;
  prioritas: "info" | "penting" | "mendesak";
  tanggal: string;
  dibaca: boolean;
  edited?: boolean;
  editedAt?: string;
  gambar?: string | null;
  dari?: string;   // <-- tambahkan
  sampai?: string; // <-- tambahkan
}

export async function getCroppedImg(imageSrc: string, pixelCrop: any): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );
  return canvas.toDataURL("image/jpeg", 0.9);
}