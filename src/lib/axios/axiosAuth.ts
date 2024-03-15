import axios from "axios";

const axiosAuth = axios.create({
  baseURL: 'http://localhost:3000/api/auth',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosAuth;
