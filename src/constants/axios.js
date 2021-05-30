import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.19.158.146:3000/',
});

export default axiosInstance;
