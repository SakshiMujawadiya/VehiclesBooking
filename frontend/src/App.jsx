// ✅ App.jsx (Main Route File)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddVehicle from "./pages/AddVehicle";
import ViewVehicles from "./pages/ViewVehicles";
import BookVehicle from "./pages/BookVehicle";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import SearchAndBook from "./pages/SearchandBook";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Routes */}
          <Route path="/vehicles" element={<ViewVehicles />} />
          <Route
            path="/book/:id"
            element={<PrivateRoute><BookVehicle /></PrivateRoute>}
          />
          <Route
            path="/my-bookings"
            element={<PrivateRoute><MyBookings /></PrivateRoute>}
          />

          {/* Admin Routes */}
          <Route
            path="/admin/add-vehicle"
            element={<AdminRoute><AddVehicle /></AdminRoute>}
          />
          <Route
            path="/admin/dashboard"
            element={<AdminRoute><AdminDashboard /></AdminRoute>}
          />
      
        <Route
          path="/search-and-book"
          element={<SearchAndBook />}
        />
        </Routes>

        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
