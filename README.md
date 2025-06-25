# 🚚 FleetLink - Logistics Vehicle Booking System

FleetLink is a full-stack web application for logistics companies to manage and book vehicles for B2B clients. It includes real-time availability checks, vehicle management, and booking capabilities.

---

## 📦 Tech Stack

- ⚛️ **Frontend**: ReactJS, Axios, React Router
- 🌐 **Backend**: Node.js, Express.js
- 🛢️ **Database**: MongoDB
- 🧪 **Testing**: Jest (backend unit testing)

---

## 🚀 Features

### 🔧 Admin / User Functionalities:
- Add new vehicles (capacity, tyres, etc.)
- Search for available vehicles based on:
  - Required capacity (kg)
  - From and To Pincode
  - Desired start time
- View estimated ride duration
- Book selected vehicles
- View & cancel existing bookings

### 🧠 Core Logic:
- Vehicle availability is checked by comparing time windows with existing bookings
- Ride duration is calculated as:
estimatedRideDurationHours = Math.abs(toPincode - fromPincode) % 24

---

## 📁 Folder Structure (MERN Stack)

FleetLink/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── config/
│ └── server.js
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── index.js
│
└── README.md



## 🧪 Backend Testing

Tested with **Jest**, covering:
- Booking overlap validation
- Vehicle availability logic
- Successful and failed booking attempts

Run tests:
```bash
cd backend
npm test

👨‍💻 Author
Sakshi Porwal — GitHub
