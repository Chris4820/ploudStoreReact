import axios from "axios";

const baseURL = import.meta.env.VITE_URL || 'http://localhost:3000/api/auth'; // Default fallback

const axiosAuth = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosAuth;
