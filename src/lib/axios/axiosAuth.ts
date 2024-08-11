import axios from "axios";

const baseURL = import.meta.env.VITE_URL ? import.meta.env.VITE_URL + "/api/auth" : 'http://localhost:3000/api/auth'; // Default fallback

const axiosAuth = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default axiosAuth;
