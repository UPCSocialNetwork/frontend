import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.112.240:3000/',
});

export default axiosInstance;
