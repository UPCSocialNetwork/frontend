import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.19.152.15:3000/',
});

export default axiosInstance;
