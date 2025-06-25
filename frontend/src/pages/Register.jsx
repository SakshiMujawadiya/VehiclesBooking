import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", formData);

      alert("Registered! You can login now.");
      navigate("/login");
    } catch (err) {
      // ✅ Better error display
      console.error("Register Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 mt-10 border rounded space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        className="w-full border p-2"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className="w-full border p-2"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        className="w-full border p-2"
        onChange={handleChange}
      />

      <select
        name="role"
        className="w-full border p-2"
        onChange={handleChange}
        defaultValue="user"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
}
