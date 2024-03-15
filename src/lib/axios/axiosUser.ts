import axios from "axios";
import Cookies from "js-cookie";
import { redirect } from "react-router-dom";

const axiosUser = axios.create({
  baseURL: 'http://localhost:3000/api/user',
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosUser.interceptors.request.use(
  async (config) => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      redirect('/auth/login');
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
    (response) => {
      if(response.status === 403) {
        Cookies.remove("authToken");
        console.log("A sessão expirou");
        redirect('/auth/login');
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosUser;
