import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", formData);
      login(res.data); // Save user and token
      res.data.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/vehicles");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mt-10 border rounded space-y-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input type="email" name="email" placeholder="Email" className="w-full border p-2" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" className="w-full border p-2" onChange={handleChange} />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
    </form>
  );
}
