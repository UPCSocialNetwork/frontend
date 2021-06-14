import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.91.63:3000/',
});

export default axiosInstance;
