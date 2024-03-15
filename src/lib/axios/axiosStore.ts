import axios from "axios";
import { redirect } from "react-router-dom";
import Cookies from "js-cookie";


const axiosStore = axios.create({
  baseURL: 'http://localhost:3000/api/store',
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosStore.interceptors.request.use(
  async (config) => {
    const authToken = Cookies.get('authToken');
    const storeToken = Cookies.get('storeToken');
    if (!authToken) {
      redirect('/auth/login');
      console.log('Token de autenticação não encontrado! Redirecionando para a página de login...');
    }
    if (!storeToken) {
      redirect('/');
      console.log("O token de authStore não existe!");
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
    (response) => {
      if(response.status === 403) {
        Cookies.remove("authToken");
        console.log("A sessão expirou");
        redirect('/auth/login');
      }
      if(response.status === 402) {
        Cookies.remove("storeToken");
        console.log("A sessão de loja expirou");
        redirect('/');
      }
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default axiosStore;
