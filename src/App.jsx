import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  SignIn,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";
import HomePage from "./HomePage";
import List from "./pages/list";
import Tambah from "./pages/tambah";
import EditGudang from "./pages/editData";

function App() {
  const location = useLocation();

  const showNavbar =
    location.pathname === "/dashboard" ||
    location.pathname === "/listgudang" ||
    location.pathname === "/tambahdata" ||
    location.pathname === "/gudang/edit/:id";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignIn redirect="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <Dashboard />
            </SignedIn>
          }
        />
        <Route path="/listgudang" element={<List />} />
        <Route path="/tambahdata" element={<Tambah />} />
        <Route path="/gudang/edit/:id" element={<EditGudang />} />
        <Route
          path="*"
          element={
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          }
        />
      </Routes>
    </>
  );
}

export default App;
