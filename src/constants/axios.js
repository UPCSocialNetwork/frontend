import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.27.68.90:3000/',
});

export default axiosInstance;
