import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.23.145.170:3000/',
});

export default axiosInstance;
