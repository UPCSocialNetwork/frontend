import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.92.237:3000/',
});

export default axiosInstance;
