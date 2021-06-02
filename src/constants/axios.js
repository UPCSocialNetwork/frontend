import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.127.48:3000/',
});

export default axiosInstance;
