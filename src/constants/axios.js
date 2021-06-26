import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.28.163.229:3000/',
});

export default axiosInstance;
