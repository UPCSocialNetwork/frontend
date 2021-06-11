import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.24.145.164:3000/',
});

export default axiosInstance;
