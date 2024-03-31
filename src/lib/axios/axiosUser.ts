import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthTokenFromCookie, removeAuthCookie } from "../utils";

const axiosUser = axios.create({
  baseURL: 'http://localhost:3000/api/user',
  headers: {
    'Content-Type': 'application/json',
  }
});


axiosUser.interceptors.request.use(
  async (config) => {
    const authToken = await getAuthTokenFromCookie();
    if (!authToken) {
      const navigate = useNavigate();
      navigate('/auth/login');
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
      removeAuthCookie();
      return window.location.href = '/auth/login';
    }
  })

export default axiosUser;
