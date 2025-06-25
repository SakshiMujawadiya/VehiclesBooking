import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

API.interceptors.request.use((req) => {
  const token = JSON.parse(localStorage.getItem("fleet_user"))?.token;
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getVehicles = () => API.get("/vehicles");
export const addVehicle = (data) => API.post("/vehicles", data);
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`);