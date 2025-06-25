import { useState } from "react";
import axios from "axios";

export default function SearchandBook() {
  const [formData, setFormData] = useState({
    capacityRequired: "",
    fromPincode: "",
    toPincode: "",
    startTime: "",
  });
  const [results, setResults] = useState([]);
  const [rideDuration, setRideDuration] = useState(null); // ⬅️ New
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setBookingStatus("");
    try {
      const { capacityRequired, fromPincode, toPincode, startTime } = formData;
      const res = await axios.get("http://localhost:3000/api/vehicles/available", {
        params: { capacityRequired, fromPincode, toPincode, startTime },
      });

      setResults(res.data.availableVehicles || []);
      setRideDuration(res.data.estimatedRideDurationHours); // ⬅️ Save duration
      setLoading(false);
    } catch (err) {
      alert("Search failed");
      setLoading(false);
    }
  };

  const handleBook = async (vehicleId) => {
    setBookingStatus("");
    try {
      const token = JSON.parse(localStorage.getItem("fleet_user"))?.token;
      const res = await axios.post(
        "http://localhost:3000/api/bookings",
        {
          vehicleId,
          fromPincode: formData.fromPincode,
          toPincode: formData.toPincode,
          startTime: formData.startTime,
          customerId: "12345"
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBookingStatus("Booking confirmed!");
    } catch (err) {
      setBookingStatus("Booking failed. Please try another vehicle or time.");
    }
    console.log("Vehicle ID being sent for booking:", vehicleId);

  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Search Available Vehicles</h1>

      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-white p-4 rounded shadow"
      >
        <input
          type="number"
          name="capacityRequired"
          placeholder="Capacity Required (KG)"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fromPincode"
          placeholder="From Pincode"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="toPincode"
          placeholder="To Pincode"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="datetime-local"
          name="startTime"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="sm:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search Availability"}
        </button>
      </form>

      {bookingStatus && (
        <div className="mb-4 text-center text-lg font-medium text-green-600">{bookingStatus}</div>
      )}

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((v) => (
            <div key={v._id} className="p-4 border rounded shadow bg-gray-50">
              <h3 className="text-xl font-bold mb-1">{v.name}</h3>
              <p>Capacity: {v.capacityKg} KG</p>
              <p>Tyres: {v.tyres}</p>
              <p className="text-gray-500 text-sm">
                Estimated Ride: ~{rideDuration} hrs
              </p>
              <button
                onClick={() => handleBook(v._id)}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center text-gray-600">No vehicles found yet.</p>
      )}
    </div>
  );
}
