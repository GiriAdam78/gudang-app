import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [searchKey, setSearchKey] = useState(""); // Untuk ID atau nama pencarian
  const [searchType, setSearchType] = useState("id"); // Tipe pencarian: 'id' atau 'nama'
  const [results, setResults] = useState(null); // Data hasil pencarian
  const [message, setMessage] = useState(""); // Pesan jika terjadi error atau tidak ada data

  // Fungsi untuk menangani perubahan input pencarian
  const handleInputChange = (e) => {
    setSearchKey(e.target.value);
  };

  // Fungsi untuk menangani perubahan tipe pencarian
  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Mencegah refresh halaman
    if (!searchKey) {
      setMessage("Masukkan ID atau nama untuk pencarian!");
      return;
    }

    try {
      const endpoint =
        searchType === "id"
          ? `https://express-gudang.vercel.app/gudang/${searchKey}`
          : `https://express-gudang.vercel.app/showall?nama=${searchKey}`;
      const response = await axios.get(endpoint);

      setResults(response.data); // Simpan data hasil pencarian
      setMessage(""); // Reset pesan error
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults(null); // Reset data jika tidak ditemukan
      setMessage("Data tidak ditemukan.");
    }
  };
  return (
    <div>
      {/* Tombol untuk membuka modal */}
      <button
        type="button"
        className="btn btn-dark mr-3"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <i className="fa-solid fa-search"></i>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Cari Gudang Kamu Berdasarkan <b>ID</b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {message && (
                <div
                  className={`alert ${
                    message.includes("tidak ditemukan")
                      ? "alert-danger"
                      : "alert-warning"
                  }`}
                  role="alert"
                >
                  {message}
                </div>
              )}
              <form onSubmit={handleSearch} className="mt-4">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Cari berdasarkan ${searchType}`}
                      value={searchKey}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <select
                      className="form-select"
                      value={searchType}
                      onChange={handleTypeChange}
                    >
                      <option value="id">ID</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <button type="submit" className="btn btn-primary w-100">
                      Cari
                    </button>
                  </div>
                </div>
              </form>

              {/* Hasil Pencarian */}
              {results && (
                <div className="mt-5">
                  <h3>Hasil Pencarian:</h3>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nama Gudang</th>
                        <th>Lokasi</th>
                        <th>Kapasitas</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(results) ? (
                        results.map((gudang) => (
                          <tr key={gudang.id}>
                            <td>{gudang.id}</td>
                            <td>{gudang.nama}</td>
                            <td>{gudang.alamat}</td>
                            <td>{gudang.kapasitas}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>{results.id}</td>
                          <td>{results.nama}</td>
                          <td>{results.alamat}</td>
                          <td>{results.kapasitas}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
