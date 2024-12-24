import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
export default function EditGudang() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
  });

  useEffect(() => {
    axios
      .get(`https://express-gudang.vercel.app/gudang/${id}`)
      .then((response) => setFormData(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://express-gudang.vercel.app/gudang/${id}`, formData)
      .then(() => {
        alert("Data berhasil diupdate!");
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return <></>;
}
