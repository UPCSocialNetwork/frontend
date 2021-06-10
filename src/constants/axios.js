import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.27.68.171:3000/',
});

export default axiosInstance;
