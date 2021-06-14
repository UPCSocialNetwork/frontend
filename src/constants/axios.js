import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http:/172.23.145.93:3000/',
});

export default axiosInstance;
