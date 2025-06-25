import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const token = JSON.parse(localStorage.getItem("fleet_user"))?.token;
    const res = await axios.get("http://localhost:3000/api/vehicles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVehicles(res.data);
  };

  const deleteVehicle = async (id) => {
    const token = JSON.parse(localStorage.getItem("fleet_user"))?.token;
    await axios.delete(`http://localhost:3000/api/vehicles/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchVehicles();
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Dashboard - All Vehicles</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Capacity (KG)</th>
            <th className="p-2 border">Tyres</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((v) => (
            <tr key={v._id}>
              <td className="p-2 border">{v.name}</td>
              <td className="p-2 border">{v.capacityKg}</td>
              <td className="p-2 border">{v.tyres}</td>
              <td className="p-2 border text-center">
                <button
                  onClick={() => deleteVehicle(v._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
