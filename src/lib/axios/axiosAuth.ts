import axios from "axios";

const baseURL = import.meta.env.VITE_URL || 'http://localhost:3000/api/auth'; // Default fallback

console.log('VITE_URL:', import.meta.env.VITE_URL); // Deve mostrar o valor da variável de ambiente
console.log('Base URL:', baseURL); // Deve mostrar a URL base final usada pelo axios

const axiosAuth = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosAuth;
