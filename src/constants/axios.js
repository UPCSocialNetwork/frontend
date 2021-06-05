import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.125.159:3000/',
});

export default axiosInstance;
