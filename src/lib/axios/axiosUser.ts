import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie, removeAuthCookie } from "../utils";
import Cookies from "js-cookie";


const baseURL = import.meta.env.VITE_URL ? import.meta.env.VITE_URL + "/api/user" : 'http://localhost:3000/api/user'; // Default fallback

const axiosUser = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});


axiosUser.interceptors.request.use(
  async (config) => {
    const authToken = await getAuthTokenFromCookie();
    if (!authToken) {
      Cookies.remove("storeToken");
      Cookies.remove("authToken");
      window.location.href = '/auth/login';
      console.log('Token de autenticação não encontrado! Redirecionando para a página de login...');
    }
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosUser.interceptors.response.use(
  response => response,
  error => {
    if(error.response.status === 403) {
      Cookies.remove("authToken");
      Cookies.remove("storeToken");
      return window.location.href = '/auth/login';
    }
  })

export default axiosUser;
