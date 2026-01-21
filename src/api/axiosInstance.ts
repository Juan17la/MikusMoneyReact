import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://mikusmoneybackend-0-0-1-alpha.onrender.com/api/',
  withCredentials: true,
});

export default axiosInstance;