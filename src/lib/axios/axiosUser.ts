import axios from "axios";
import { getAuthTokenFromCookie } from "../utils";
import Cookies from "js-cookie";


const baseURL = import.meta.env.VITE_URL ? import.meta.env.VITE_URL + "/api/user" : 'http://localhost:3000/api/user'; // Default fallback

const axiosUser = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


axiosUser.interceptors.request.use(
  async (config) => {
    console.log("1")
    const authToken = await getAuthTokenFromCookie();
    /*if (!authToken) {
      console.log("2")
      Cookies.remove("storeToken");
      Cookies.remove("authToken");
      window.location.href = '/auth/login';
      console.log('Token de autenticação não encontrado! Redirecionando para a página de login...');
    }*/
    console.log("4")
    //config.headers.Authorization = `Bearer ${authToken}`;
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
    if (error.response && error.response.status === 401) {
      Cookies.remove("authToken", { path: "/" }); // Remover o cookie authToken
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default axiosUser;
