import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.31.178.120:3000',
});

export default instance;
