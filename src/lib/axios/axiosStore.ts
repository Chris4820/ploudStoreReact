import axios from "axios";
import Cookies from "js-cookie";


const baseURL = import.meta.env.VITE_URL + "/api/store" || 'http://localhost:3000/api/store'; // Default fallback
const axiosStore = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosStore.interceptors.request.use(
  async (config) => {
    const authToken = Cookies.get('authToken');
    const storeToken = Cookies.get('storeToken');
    if (!authToken) {
      Cookies.remove("authToken");
      Cookies.remove("storeToken");
      window.location.href = '/auth/login';
      return Promise.reject("Redirecting to login...");
    }
    if (!storeToken) {
      Cookies.remove("storeToken");
      window.location.href = '/';
      return Promise.reject("Redirecting to store...");
    }
    config.headers.Authorization = `Bearer ${authToken}`;
    config.headers['Store-Token'] = `Bearer ${storeToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosStore.interceptors.response.use(
    response => response,
    error => {
      if(error.response.status === 403) {
        Cookies.remove("storeToken");
        return window.location.href = '/';
      }
    })
  
export default axiosStore;
