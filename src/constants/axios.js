import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.28.169.192:3000/',
});

export default axiosInstance;
