import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.21.88.193:3000/',
});

export default axiosInstance;
