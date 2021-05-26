import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.19.144.183:3000/',
});

export default axiosInstance;
