import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import socket from '../components/Socket';
import { GiftedChat } from 'react-native-gifted-chat';

export default function ChatScreen({ nomUsuari, navigation }) {
  //socket.emit('conectado');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
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
