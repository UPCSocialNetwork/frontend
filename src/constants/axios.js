import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.19.153.153:3000/',
});

export default axiosInstance;
