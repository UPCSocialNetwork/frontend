import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.19.154.156:3000/',
});

export default axiosInstance;
