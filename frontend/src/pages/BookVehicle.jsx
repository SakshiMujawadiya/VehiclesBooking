import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const BookVehicle = () => {
  const { id } = useParams(); // vehicleId from URL

  const [formData, setFormData] = useState({
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleBooking = async () => {
    const user = JSON.parse(localStorage.getItem("fleet_user"));
    const token = user?.token;
    const customerId = user?.user?._id; // ⬅️ fetch user ID from localStorage

    if (!token || !customerId) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/bookings",
        {
          vehicleId: id,
          customerId,
          ...formData, // includes fromPincode, toPincode, startTime
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Vehicle booked successfully!");
    } catch (err) {
      alert("❌ Booking failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Book Vehicle</h2>

      <input
        type="text"
        name="fromPincode"
        placeholder="From Pincode"
        value={formData.fromPincode}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <input
        type="text"
        name="toPincode"
        placeholder="To Pincode"
        value={formData.toPincode}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <input
        type="datetime-local"
        name="startTime"
        value={formData.startTime}
        onChange={handleChange}
        className="w-full border p-2 mb-3"
      />

      <button
        onClick={handleBooking}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookVehicle;
