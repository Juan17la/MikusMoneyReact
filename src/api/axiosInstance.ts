import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:10101/api/v0.1',
  withCredentials: true,
});

export default axiosInstance;