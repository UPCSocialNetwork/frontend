import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.86.94:3000/',
});

export default axiosInstance;
