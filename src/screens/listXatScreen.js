import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, StatusBar, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import ChatList from '../components/ChatList';
import axios from '../constants/axios';
import socket from '../components/Socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function listXatScreen({ navigation }) {
  const [userSess, setUserSess] = useState(navigation.getParam('user'));
  const [inicialsUser, setInicialsUser] = useState();
  const [chatData, setChatData] = useState([]);
  const [listType, setListType] = useState(navigation.getParam('tipusXat'));
  const [toggle, setToggle] = useState(false);
  const [messageUpdate, setMessageUpdate] = useState({
    message: 'none',
    roomID: 'none',
  });
  const [user, setUser] = useState({
    nomUsuari: navigation.getParam('user').nomUsuari,
    room: 'none',
    participant: 'none',
    tipusXat: 'none',
    titol: 'none',
  });

  const pressPickerPrivs = () => {
    setListType('privs');
    setUser({ ...user, tipusXat: 'privs' });
  };

  const pressPickerGrups = () => {
    setListType('grups');
    setUser({ ...user, tipusXat: 'grups' });
  };

  useEffect(() => {
    async function getData() {
      try {
        let userSess = await AsyncStorage.getItem('userSession');
        if (userSess != null) {
          userSess = JSON.parse(userSess);
          setUserSess(userSess);
          try {
            response = await axios.get('estudiant/auth/session', {
              headers: {
                Authorization: `${userSess.jwt}`,
              },
            });
            if (response.data.msg != 'Success') navigation.replace('Login');
          } catch (error) {
            console.log(error);
          }
        }
      } catch (e) {}
    }
    getData();
    socket.emit('listXat ready', user.nomUsuari);
    socket.on('update message', (message, roomID) => {
      setMessageUpdate({ ...messageUpdate, message: message, roomID: roomID });
    });
    return () => {
      socket.removeListener('update message');
    };
  }, []);

  useEffect(() => {
    if (userSess != null) {
      let inicials = userSess.nomUsuari[0].toUpperCase();
      inicials = inicials + userSess.nomUsuari.split('.')[1][0].toUpperCase();
      setInicialsUser(inicials);
    }
  }, [userSess]);

  useEffect(() => {
    if (messageUpdate.message != 'none') {
      let chatDataAux = [];
      let xatAux;
      for (let i = 0; i < chatData.length; i++) {
        const element = chatData[i];
        if (element[0] === messageUpdate.roomID) {
          if (
            element[3] != messageUpdate.message.text ||
            element[4] != messageUpdate.message.createdAt ||
            element[5] != messageUpdate.message.user.name
          ) {
            xatAux = element;
            xatAux[3] = messageUpdate.message.text;
            xatAux[4] = messageUpdate.message.createdAt;
            xatAux[5] = messageUpdate.message.user.name;
            chatDataAux.unshift(xatAux);
          }
        } else {
          chatDataAux.push(element);
        }
      }
      setChatData(chatDataAux);
    }
  }, [messageUpdate]);

  useEffect(() => {
    async function getChatData() {
      let response = null;
      if (listType === 'privs') {
        try {
          response = await axios.get('estudiant/xats/' + user.nomUsuari);
          let chats = response.data.xatsFinals;
          setChatData(chats);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          response = await axios.get('estudiant/grups/' + user.nomUsuari);
          let chats = response.data.xatsFinals;
          setChatData(chats);
        } catch (e) {
          console.error(e);
        }
      }
    }
    getChatData();
  }, [listType]);

  useEffect(() => {
    function navigateRoom() {
      if (user.room != 'none') {
        navigation.replace('ChatScreen', { user });
      }
    }
    navigateRoom();
  }, [user.room, toggle]);

  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const onPressProfile = () => {
    let visitUser = user.nomUsuari;
    navigation.replace('ProfileInfoScreen', { user, visitUser });
  };

  const searchHandler = () => {
    let listType = 'privs';
    let tipusCerca = 'all';
    navigation.replace('SearchScreen', { listType, user, tipusCerca });
  };

  return (
    <View style={styles.scroll}>
      <View style={styles.header}>
        {/*}
        <TouchableOpacity style={styles.imageView} onPress={onPressProfile}>
          <View>
            <Image style={styles.imageProfile} source={{ uri: url_aux }} />
            <View style={styles.circle}></View>
          </View>
        </TouchableOpacity>*/}
        <TouchableOpacity style={styles.imageView} onPress={onPressProfile}>
          <View>
            <View style={styles.imageProfile}>
              <Text style={styles.textImage}>{inicialsUser}</Text>
            </View>
            <View style={styles.circle}></View>
          </View>
          {/*<Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />*/}
        </TouchableOpacity>
        <TouchableOpacity style={styles.textView} onPress={onPressProfile}>
          <View>
            <Text style={styles.textHeader} numberOfLines={1} ellipsizeMode="tail">
              {user.nomUsuari}
            </Text>
          </View>
        </TouchableOpacity>
        {/*
        <TouchableOpacity onPress={searchHandler}>
          <View style={styles.searchView}>
            <MaterialIcons name="search" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>
        */}
        <TouchableOpacity onPress={searchHandler}>
          <View style={styles.optionsView}>
            <MaterialIcons name="search" style={styles.searchIcon} />
            {/*<SimpleLineIcons name="options-vertical" style={styles.optionsIcon} />*/}
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.selectPicker}>
        <View style={styles.btnsView}>
          <TouchableOpacity
            style={listType === 'privs' ? [styles.btnChats] : [styles.btnGrups]}
            onPress={pressPickerPrivs}
          >
            <Text style={styles.textXats}>Xats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={listType === 'grups' ? [styles.btnChats] : [styles.btnGrups]}
            onPress={pressPickerGrups}
          >
            <Text style={styles.textGrups}>Grups</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ChatList chatData={chatData} setUser={setUser} user={user} setToggle={setToggle} toggle={toggle} />
      <View style={styles.plusBtn}>
        <TouchableOpacity
          style={styles.plusCircle}
          onPress={() => {
            let tipusCerca = 'some';
            navigation.replace('SearchScreen', { listType, user, tipusCerca });
          }}
        >
          <MaterialIcons name="add" style={styles.plusStyle}></MaterialIcons>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    marginTop: Window.height * 0.02 + StatusBar.currentHeight,
    height: 58,
    width: Window.width * 0.88,
    alignSelf: 'center',
  },
  imageView: {
    width: '16%',
    height: '100%',
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  textImage: {
    textAlign: 'center',
    fontFamily: 'InterSemiBold',
    fontSize: 16,
  },
  circle: {
    width: '30%',
    height: '30%',
    borderRadius: 50,
    backgroundColor: Colors.green,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: '3.1%',
    width: '60%',
    height: '100%',
  },
  textHeader: {
    fontFamily: 'InterBold',
    fontSize: 18,
    color: Colors.black,
  },
  searchView: {
    flex: 1,
    justifyContent: 'center',
  },
  optionsView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 10,
  },
  searchIcon: {
    fontSize: 27,
  },
  optionsIcon: {
    fontSize: 21,
  },
  selectPicker: {
    marginTop: 25,
    height: 70,
    width: '100%',
    backgroundColor: Colors.lightBlue,
  },
  selectPicker: {
    height: 100,
    justifyContent: 'center',
  },
  btnsView: {
    backgroundColor: Colors.grey,
    borderRadius: 8,
    width: Window.width * 0.85,
    height: 52,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnChats: {
    width: '47%',
    height: '70%',
    backgroundColor: Colors.white,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  btnGrups: {
    width: '47%',
    height: '70%',
    backgroundColor: Colors.grey,
    alignSelf: 'center',
    borderRadius: 8,
    justifyContent: 'center',
  },
  textXats: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'InterBold',
    textAlign: 'center',
  },
  textGrups: {
    color: Colors.secondary,
    fontSize: 16,
    fontFamily: 'InterBold',
    textAlign: 'center',
  },
  listXats: {
    marginTop: 20,
    backgroundColor: Colors.red,
    width: '100%',
  },
  plusBtn: {
    width: Window.width * 0.15,
    height: Window.width * 0.15,
    position: 'absolute',
    marginTop: Window.height * 0.87,
    marginLeft: Window.width * 0.77,
  },
  plusCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    elevation: 7,
  },
  plusStyle: {
    color: Colors.white,
    fontSize: 30,
    alignSelf: 'center',
  },
});
