import axios from 'axios';
import authService from './authService';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api'
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
