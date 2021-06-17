import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.83.254:3000/',
});

export default axiosInstance;
