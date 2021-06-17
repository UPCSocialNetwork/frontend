import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.30.213.79:3000/',
});

export default axiosInstance;
