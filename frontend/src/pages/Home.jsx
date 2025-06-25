import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="text-center py-20 px-4 bg-blue-50 min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-blue-700">Welcome to FleetLink</h1>
      <p className="text-lg text-gray-700 mb-10 max-w-xl mx-auto">
        Your trusted platform for vehicle bookings and management. Whether you're an admin managing the fleet or a user booking your next ride – we've got you covered.
      </p>

      <div className="flex justify-center gap-6 flex-wrap">
        <Link
          to="/vehicles"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          View Vehicles
        </Link>
        <Link
          to="/login"
          className="bg-gray-600 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}