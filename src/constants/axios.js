import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.31.191.106:3000/',
});

export default axiosInstance;
