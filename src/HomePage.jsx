import { useAuth, SignedIn,  } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
export default function HomePage() {
  
  const {isSignedIn} = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in');
  }


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white shadow-sm">
        <div className="container">
          <a href="#" className="navbar-brand">
            Gudang Berkah
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  List Gudang
                </a>
              </li>
            </ul>
            {isSignedIn ? (
               
               <Link to="/dashboard" className="btn btn-dark">Dashboard</Link>   
             
            ):(
                <Link to="/sign-in" className="btn btn-primary">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <main id="main-section">
      <section>
        <div className="w-full bg-white">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 col-md-6 col-sm-12">
                <h1 className="fs-2 lh-lg center">
                  Lihat List Gudang Favorit anda
                </h1>
                <p className="lh-lg center">
                  Sistem Informasi yang Berisi tentang Data Dari Gudang Favorit anda,
                  Anda dapat mencari gudang bedasarkan ID gudang yang telah kami siapkan.
                  Dan Tentu degan kapasitas gudang yang anda perlukan.
                </p>
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-dark">
                    Hubungi Kami
                  </button>
                  <button type="button" className="btn btn-dark">
                    Daftarkan Gudang
                  </button>
                </div>
              </div>
              <div className="col-12 col-md-6 col-sm-12">
                <img
                  src="https://ik.imagekit.io/ez2pfjbvj/gudang.png?updatedAt=1731310854493"
                  alt="Gambar Gudang"
                  className="imgkecil"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
