import io from 'socket.io-client';
import Config from '../constants/Config';

let socket = io(`http://${Config.SERVER_IP}:${Config.SERVER_PORT}/`);

export default socket;
