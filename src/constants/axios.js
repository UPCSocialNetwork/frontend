import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http:/172.23.156.74:3000/',
});

export default axiosInstance;
