import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://172.27.33.62:3000/',
});

export default axiosInstance;
