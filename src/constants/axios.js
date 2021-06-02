import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.31.187.201:3000/',
});

export default axiosInstance;
