// src/pages/AddVehicle.jsx
import { useState } from "react";
import axios from "axios";

const AddVehicle = () => {
  const [formData, setFormData] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("fleet_user"))?.token;
      const res = await axios.post(
        "http://localhost:3000/api/vehicles",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("✅ Vehicle added successfully!");
      setFormData({ name: "", capacityKg: "", tyres: "" }); // Clear form
    } catch (err) {
      alert("❌ Error adding vehicle.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-bold mb-4 text-center text-blue-700">Add New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Vehicle Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="capacityKg"
          value={formData.capacityKg}
          placeholder="Capacity (in KG)"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="tyres"
          value={formData.tyres}
          placeholder="Number of Tyres"
          className="w-full border p-2 rounded"
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
