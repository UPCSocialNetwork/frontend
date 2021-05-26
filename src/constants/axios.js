import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://172.31.187.238:3000',
});

export default instance;
