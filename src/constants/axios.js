import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http:/172.23.149.81:3000/',
});

export default axiosInstance;
