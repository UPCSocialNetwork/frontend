import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Image, TouchableOpacity, StatusBar, View, StyleSheet, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';
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

  const formatMsg = (msg, sender) => {
    let giftMess = {
      _id: msg._id,
      text: msg.text,
      createdAt: new Date(msg.createdAt),
      user: {
        _id: msg.participantID,
        name: sender,
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg', //                   PRIORIDAD 3 // IMAGENES REALES
      },
    };
    return giftMess;
  };

  useEffect(() => {
    socket.on('send message', async (message, roomID) => {
      setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
      try {
        let response = await axios.get(`estudiants/${roomID}`);
        let noms = response.data.persones;
        noms.forEach((element) => {
          socket.emit('refresh list', message, element, roomID);
        });
      } catch (e) {
        console.log(e);
      }
    });
    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    //console.log(user.tipusXat);
    async function getMessages() {
      socket.emit('xat actiu', user.room);
      let response = null;
      try {
        response = await axios.get('missatge/xat/' + user.room);
        let missatges = response.data.missatges;
        let giftedMessages = [];
        if (missatges) {
          missatges.map(function (element) {
            element[1].map(function (msg) {
              msg = formatMsg(msg, element[0]);
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
      if (user.tipusXat === 'privs') {
        try {
          await axios.put(
            `/Xat/${user.room}`,
            {
              ultimMissatgeID: missatgeDB._id,
            },
            { 'Content-Type': 'application/json' },
          );
        } catch (e) {
          console.error(e);
        }
      } else if (user.tipusXat === 'XatGrupTancat') {
        try {
          await axios.put(
            `/XatGrupTancat/${user.room}`,
            {
              ultimMissatgeID: missatgeDB._id,
            },
            { 'Content-Type': 'application/json' },
          );
        } catch (e) {
          console.error(e);
        }
      } else if (user.tipusXat === 'XatAssignatura') {
        try {
          await axios.put(
            `/XatAssignatura/${user.room}`,
            {
              ultimMissatgeID: missatgeDB._id,
            },
            { 'Content-Type': 'application/json' },
          );
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          await axios.put(
            `/XatMentor/${user.room}`,
            {
              ultimMissatgeID: missatgeDB._id,
            },
            { 'Content-Type': 'application/json' },
          );
        } catch (e) {
          console.error(e);
        }
      }
      let giftMess = {
        _id: missatgeDB._id,
        text: missatgeDB.text,
        createdAt: missatgeDB.createdAt,
        user: {
          _id: user.participant,
          name: user.nomUsuari,
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg', //           PRIORIDAD 3 // IMAGENES REALES
        },
      };
      socket.emit('send message', giftMess, user.room);
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    // user.tipusXat
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            //                                                                 // PRIORIDAD 2
            navigation.goBack();
          }}
        >
          <View style={styles.goBack}>
            <View style={styles.goBackView}>
              <Icon name="arrow-left" size={20} color={Colors.primary} />
            </View>
            <Text style={styles.textEnrere}> Enrere </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.nameAndImg}>
            <View style={styles.nameView}>
              <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">
                {user.titol}
              </Text>
            </View>
            <View style={styles.imgView}>
              <View style={styles.imgViewChild}>
                <Image style={styles.image} source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} />
                <View style={styles.circle}></View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        renderUsernameOnMessage={true}
        placeholder={'Escriu un missatge'}
        alwaysShowSend={true}
        onSend={(newMessage) => onSend(newMessage)}
        user={{
          _id: user.participant,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: Window.height * 0.09,
    width: Window.width,
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
  },
  goBack: {
    width: Window.width * 0.3,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  goBackView: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 50,
    height: '55%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  textEnrere: {
    fontFamily: 'InterBold',
    fontSize: 16,
    color: Colors.primary,
  },
  nameAndImg: {
    width: Window.width * 0.7,
    height: '100%',
    flexDirection: 'row',
  },
  nameView: {
    width: Window.width * 0.4,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 18,
    fontFamily: 'InterBold',
  },
  imgView: {
    width: Window.width * 0.3,
    height: '100%',
    justifyContent: 'center',
  },
  imgViewChild: {
    justifyContent: 'center',
    height: '85%',
    aspectRatio: 1,
    marginLeft: '30%',
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 50,
  },
  circle: {
    height: '30%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.green,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderColor: Colors.white,
    borderWidth: 2,
  },
});
