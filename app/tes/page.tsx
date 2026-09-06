"use client";

import { useEffect, useState } from "react";

const baseUrl = "https://umkm-hijau.my.id/api";

interface UMKM {
  id: number;
  user_id: number;
  nama_usaha: string;
  pemilik: string;
  alamat: string;
  no_telepon: string;
  jenis_usaha: string;
  tahun_berdiri: string;
  status: string;
  created_at?: string;
  updated_at?: string;
  user?: any;
}

export default function Tes() {
  const [dataList, setDataList] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState({
    nama_usaha: "",
    pemilik: "",
    alamat: "",
    no_telepon: "",
    jenis_usaha: "",
    tahun_berdiri: "",
    status: "aktif",
  });

  // Ambil data pertama kali
  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi ambil semua data
  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/umkm`);
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setDataList(json.data);
      } else {
        alert("Format data tidak sesuai");
      }
    } catch (err) {
      console.error("Error fetching:", err);
      alert("Gagal mengambil data. Cek console.");
    } finally {
      setLoading(false);
    }
  }

  // Handler input form
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Reset form ke kosong
  function resetForm() {
    setForm({
      nama_usaha: "",
      pemilik: "",
      alamat: "",
      no_telepon: "",
      jenis_usaha: "",
      tahun_berdiri: "",
      status: "aktif",
    });
    setEditId(null);
  }

  // Isi form dengan data item untuk edit
  function handleEditClick(item: UMKM) {
    setEditId(item.id);
    setForm({
      nama_usaha: item.nama_usaha,
      pemilik: item.pemilik,
      alamat: item.alamat,
      no_telepon: item.no_telepon,
      jenis_usaha: item.jenis_usaha,
      tahun_berdiri: item.tahun_berdiri,
      status: item.status,
    });
    // Scroll ke form (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Submit: bisa tambah atau edit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let url = `${baseUrl}/umkm`;
      let method = "POST";

      if (editId) {
        url = `${baseUrl}/umkm/${editId}`;
        method = "PUT"; // atau "PATCH" kalau backend-nya beda
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      console.log(`${method} response:`, result);

      if (result.success) {
        alert(editId ? "Data berhasil diubah!" : "Data berhasil ditambahkan!");
        resetForm();
        await fetchData(); // refresh list
      } else {
        alert(`Gagal: ${result.message || "Terjadi kesalahan"}`);
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Gagal submit. Cek console.");
    } finally {
      setLoading(false);
    }
  }

  // Hapus data
  async function handleDelete(id: number) {
    if (!confirm(`Yakin hapus data ID ${id}?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/umkm/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      console.log("DELETE response:", result);

      if (result.success) {
        alert("Data berhasil dihapus!");
        await fetchData();
      } else {
        alert(`Gagal hapus: ${result.message || "Terjadi kesalahan"}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Gagal hapus. Cek console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto", color: 'black' }}>
      <h1 style={{ textAlign: "center" }}>Kelola Data UMKM</h1>

      {/* Form Tambah / Edit */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>{editId ? "Edit UMKM" : "Tambah UMKM Baru"}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <label>
            Nama Usaha:
            <input
              type="text"
              name="nama_usaha"
              value={form.nama_usaha}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            Pemilik:
            <input
              type="text"
              name="pemilik"
              value={form.pemilik}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            Alamat:
            <input
              type="text"
              name="alamat"
              value={form.alamat}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            No. Telepon:
            <input
              type="text"
              name="no_telepon"
              value={form.no_telepon}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            Jenis Usaha:
            <input
              type="text"
              name="jenis_usaha"
              value={form.jenis_usaha}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            Tahun Berdiri:
            <input
              type="text"
              name="tahun_berdiri"
              value={form.tahun_berdiri}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "8px" }}
            />
          </label>
          <label>
            Status:
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Nonaktif</option>
            </select>
          </label>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Menyimpan..." : editId ? "Update Data" : "Tambah Data"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      {/* Tabel Data */}
      <h2>Daftar UMKM</h2>
      {loading && <p>Loading...</p>}
      {!loading && dataList.length === 0 && <p>Tidak ada data.</p>}
      {dataList.length > 0 && (
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f1f1f1" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Nama Usaha</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Pemilik</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Alamat</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>No. Telp</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Jenis</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Tahun</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Status</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataList.map((item) => (
              <tr key={item.id} style={{color: 'white'}}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.id}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.nama_usaha}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.pemilik}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.alamat}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.no_telepon}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.jenis_usaha}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.tahun_berdiri}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.status}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => handleEditClick(item)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#2196F3",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "white",
                      border: "none",
                      borderRadius: "3px",
                      cursor: "pointer",
                    }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}