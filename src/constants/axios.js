import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.116.86:3000/',
});

export default axiosInstance;
