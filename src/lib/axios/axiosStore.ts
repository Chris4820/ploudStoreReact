import axios from "axios";


const baseURL = import.meta.env.VITE_URL ? import.meta.env.VITE_URL + "/api/store" : 'http://localhost:3000/api/store'; // Default fallback
const axiosStore = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosStore.interceptors.request.use(
  async (config) => {
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
        return window.location.href = '/';
      }
      // Adicione isto para garantir que outros erros sejam propagados corretamente
    return Promise.reject(error);
    })
  
export default axiosStore;
