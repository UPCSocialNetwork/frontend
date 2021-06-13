import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import socket from '../components/Socket';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen({ navigation }) {
  //socket.emit('conectado');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(navigation.getParam('user'));
  /*const [user, setUser] = useState({
    name: 'cesar',
    room: 'room1',
  });*/

  useEffect(() => {
    socket.emit('connected', user.name, user.room);
    /*socket.on('chat message', (msg) => {
      console.log(msg);
    });*/
    setMessages([
      {
        _id: 1,
        text: 'Hello developers',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 3,
        text: 'Hello developera',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    socket.emit('chat message', messages);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}
