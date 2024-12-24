import { UserButton } from "@clerk/clerk-react";
import Search from "./Search";

export default function Navbar() {
  return (
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
              <a className="nav-link active" aria-current="page" href="/dashboard">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/listgudang">
                List Gudang
              </a>
            </li>
          </ul>
          <Search/>
          <UserButton />
        </div>
      </div>
    </nav>
  );
}
