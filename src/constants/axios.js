import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.80.143:3000/',
});

export default axiosInstance;
