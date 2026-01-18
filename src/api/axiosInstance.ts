import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://mikus-money-alpha.onrender.com/api/',
  withCredentials: true,
});

export default axiosInstance;