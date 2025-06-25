import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Home from "../pages/Home";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-blue-700 text-white p-4 flex justify-between">
      <Link to="/" className="text-xl font-bold">FleetLink</Link>
      <div className="flex gap-4">
        {user ? (
          <>
            <Link to="/vehicles">Vehicles</Link>
            {user.role === "admin" && (
              <>
                <Link to="/admin/add-vehicle">Add Vehicle</Link>
                <Link to="/admin/dashboard">Dashboard</Link>
              </>
            )}
            {user.role === "user" && (
              <Link to="/my-bookings">My Bookings</Link>
            )}
            <button onClick={logout} className="text-red-300 hover:text-red-100">Logout</button>
          </>
        ) : (
          <>
          <Link to="/search-and-book" className="hover:text-blue-600">Search & Book</Link>

          
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
           
          </>
        )}
      </div>
    </nav>
  );
}