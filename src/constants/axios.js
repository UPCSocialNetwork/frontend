import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.27.46.128:3000/',
});

export default axiosInstance;
