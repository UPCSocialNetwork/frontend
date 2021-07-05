import axios from 'axios';
import Config from './Config';

const axiosInstance = axios.create({
  baseURL: `http://${Config.SERVER_IP}:${Config.SERVER_PORT}/`,
});

export default axiosInstance;
