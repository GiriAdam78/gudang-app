import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function List() {
  const [gudangList, setGudangList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //! Tampilkan Semua List Gudang Yang ada Di Database
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://express-gudang.vercel.app/showall"
      );
      setGudangList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Gagal Mengambil Data Gudang", error);
      setLoading(false);
    }
  };

  //! Fungsi Hapus Berdasarkan ID data
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus gudang ini?")) {
      try {
        await axios.delete(`https://express-gudang.vercel.app/gudang/${id}`);
        setMessage("Gudang berhasil dihapus.");
        // Hapus gudang dari list secara lokal
        setGudangList(gudangList.filter((gudang) => gudang.id !== id));
      } catch (error) {
        console.error("Error deleting data:", error);
        setMessage("Gagal menghapus gudang.");
      }
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h2>Loading....</h2>
      </div>
    );
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-12 col-sm-12">
          <div className="d-flex align-items-center justify-content-end">
            <a href="/tambahdata" className="btn btn-dark mb-2 mt-3">
              Tambah Data
            </a>
          </div>
          <div className="card mt-3 mb-2">
            {message && (
              <div
                className={`alert ${
                  message.includes("berhasil")
                    ? "alert-success"
                    : "alert-danger"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}
            <div className="card-header">
              <h6 className="card-title">List Gudang</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Nama Gudang</th>
                      <th>Alamat</th>
                      <th>Kapasitas</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gudangList.length > 0 ? (
                      gudangList.map((gudang) => (
                        <tr key={gudang.id}>
                          <td>{gudang.id}</td>
                          <td>{gudang.nama}</td>
                          <td>{gudang.alamat}</td>
                          <td>{gudang.kapasitas}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(gudang.id)}
                            >
                              <i className="fa-solid fa-trash"></i> Hapus
                            </button>
                         
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          Tidak ada data gudang.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
