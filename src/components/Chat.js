import React, { useState, useEffect, useRef } from 'react';
import Socket from './Socket';

const Chat = ({ nom }) => {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    socket.emit('conectado', nombre);
  }, [nombre]);

  return null;
};

export default Chat;
