import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.118.102:3000/',
});

export default axiosInstance;
