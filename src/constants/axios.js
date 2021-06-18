import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.30.211.254:3000/',
});

export default axiosInstance;
