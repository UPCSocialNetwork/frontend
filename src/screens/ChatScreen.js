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

  const formatMsg = (msg) => {
    let giftMess = {
      _id: msg._id,
      text: msg.text,
      createdAt: new Date(msg.createdAt),
      user: {
        _id: msg.participantID,
        name: 'React Native',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    };
    return giftMess;
  };

  useEffect(() => {
    socket.on('send message', (message) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    async function getMessages() {
      socket.emit('xat actiu', user.name, user.room, user.participant);
      let response = null;
      try {
        response = await axios.get('missatge/xat/' + user.room);
        let missatges = response.data.missatges;
        let giftedMessages = [];
        if (missatges) {
          missatges.forEach((element) => {
            element.forEach((msg) => {
              msg = formatMsg(msg);
              giftedMessages.push(msg);
            });
          });
        }
        giftedMessages.sort((a, b) => b.createdAt - a.createdAt);
        setMessages(giftedMessages);
      } catch (e) {
        console.error(e);
      }
    }
    getMessages();
  }, []);

  const onSend = useCallback(async (newMessage = []) => {
    newMessage = newMessage[0];
    try {
      let response = await axios.post(
        '/missatge/add',
        {
          text: newMessage.text,
          participantID: user.participant,
        },
        { 'Content-Type': 'application/json' },
      );
      let missatgeDB = response.data.Missatge;
      await axios.put(
        `/Xat/${user.room}`,
        {
          ultimMissatgeID: missatgeDB._id,
        },
        { 'Content-Type': 'application/json' },
      );
      let giftMess = {
        _id: missatgeDB._id,
        text: missatgeDB.text,
        createdAt: missatgeDB.createdAt,
        user: {
          _id: user.participant,
          name: user.name,
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
      };
      socket.emit('send message', giftMess, user.room);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <GiftedChat
      messages={messages}
      placeholder={'Escriu un missatge'}
      alwaysShowSend={true}
      onSend={(newMessage) => onSend(newMessage)}
      user={{
        _id: user.participant,
      }}
    />
  );
}
