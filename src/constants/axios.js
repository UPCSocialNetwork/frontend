import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.28.171.76:3000/',
});

export default axiosInstance;
