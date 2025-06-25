// src/pages/ViewVehicles.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ViewVehicles() {
  const [vehicles, setVehicles] = useState([]);

  const fetchVehicles = async () => {
    const res = await axios.get("http://localhost:3000/api/vehicles");
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Available Vehicles</h2>

      {vehicles.length === 0 ? (
        <p className="text-center text-gray-600">No vehicles available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div key={v._id} className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-semibold">{v.name}</h3>
              <p className="text-gray-600">Type: {v.type}</p>
              <p className="text-gray-600">Price: ₹{v.price}/day</p>
              <Link
                to={`/book/${v._id}`}
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
