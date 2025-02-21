import axios from "axios";


const baseURL = import.meta.env.VITE_URL ? import.meta.env.VITE_URL + "/api/store" : 'http://localhost:3000/api'; // Default fallback
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
    if (error.response) {
      switch (error.response.status) {
        case 403:
          // Token da loja inválido
            window.location.href = '/';
          break;
        default:
          // Outros erros
          console.error('Erro na requisição:', error.response.data);
      }
    }
    return Promise.reject(error);
  }
);
  
export default axiosStore;
