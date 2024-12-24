import axios from "axios";
import { useState } from "react";

export default function Tambah() {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    kapasitas: 0,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'kapasitas' ? parseInt(value, 10) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://express-gudang.vercel.app/gudang",
        formData
      );
      console.log(response);

      setMessage("Data berhasil disimpan!");
      setFormData({ nama: "", alamat: "", kapasitas:0, });
    } catch (error) {
      console.error("Gagal Menyimpan Data", error);
      setMessage("Terjadi Kesalahan Saat Menyimpan Data .");
    }
  };

  return (
    <div className="container mt-3">
      {message && (
        <div
          className={`alert ${
            message.includes("berhasil") ? "alert-success" : "alert-danger"
          }`}
          role="alert"
        >
          {message}
        </div>
      )}
      <div className="row">
        <div className="col-12 col-md-5 col-sm-12">
          <div className="card">
            <div className="card-header">
              <h6 className="card-title">Form Tambah Gudang</h6>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <label htmlFor="nama" className="form-label">
                      Nama Gudang
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nama"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan Nama Gudang"
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6">
                    <label htmlFor="alamat" className="form-label">
                      Alamat
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="alamat"
                      name="alamat"
                      value={formData.alamat}
                      onChange={handleChange}
                      placeholder="Masukkan Alamat Gudang"
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-12">
                    <label htmlFor="kapasitas" className="form-label">
                      Kapasitas
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="kapasitas"
                      name="kapasitas"
                      value={formData.kapasitas}
                      onChange={handleChange}
                      placeholder="Masukkan Kapasitas Gudang"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-dark mt-3">
                  Simpan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
