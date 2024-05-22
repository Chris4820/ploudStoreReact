import axios from "axios";

const axiosAuth = axios.create({
  baseURL: import.meta.env.BASE_URL + '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosAuth;
