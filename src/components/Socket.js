import io from 'socket.io-client';

let socket = io('http://172.21.80.143:3000');

export default socket;
