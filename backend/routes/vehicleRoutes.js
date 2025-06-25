const express = require("express");
const router = express.Router();
const {
  addVehicle,
  getAvailableVehicles,
  getAllVehicles, // ✅ Import this
} = require("../controllers/vehicleController");

// 🔹 POST /api/vehicles → Add new vehicle
router.post("/", addVehicle);

// 🔹 GET /api/vehicles → Get all vehicles ✅ (Required for ViewVehicles.jsx)
router.get("/", getAllVehicles);

// 🔹 GET /api/vehicles/available → Only available vehicles
router.get("/available", getAvailableVehicles);

module.exports = router;
