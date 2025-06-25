import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("fleet_user"));
      const token = user?.token;
      const customerId = user?.customerId || "12345"; // fallback dummy ID

      if (!customerId) {
        console.warn("No customerId found.");
        return;
      }

      const res = await axios.get(
        `http://localhost:3000/api/bookings/customer/${customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">My Bookings</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <><ul className="space-y-4">
              {bookings.map((b) => {
                const durationHours = (
                  (new Date(b.endTime) - new Date(b.startTime)) /
                  (1000 * 60 * 60)
                ).toFixed(1);

                return (
                  <li key={b._id} className="border p-4 rounded shadow bg-white">
                    <p><strong>Vehicle:</strong> {b.vehicleId?.name || "N/A"}</p>
                    <p><strong>From:</strong> {b.fromPincode} → {b.toPincode}</p>
                    <p><strong>Start:</strong> {new Date(b.startTime).toLocaleString()}</p>
                    <p><strong>End:</strong> {new Date(b.endTime).toLocaleString()}</p>
                    <p><strong>Duration:</strong> {durationHours} hrs</p>
                  </li>
                );
              })}
            </ul><div className="mt-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Cancel Booking
                </button>
              </div></>
      )}
    </div>
  );
}
