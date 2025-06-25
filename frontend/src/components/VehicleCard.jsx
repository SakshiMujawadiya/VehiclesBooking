import { Link } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold">{vehicle.name}</h3>
      <p className="text-gray-600">Type: {vehicle.type}</p>
      <p className="text-gray-600">₹{vehicle.price}/day</p>
      <Link
        to={`/book/${vehicle._id}`}
        className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Book Now
      </Link>
    </div>
  );
} 