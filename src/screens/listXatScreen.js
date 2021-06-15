import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import ChatList from '../components/ChatList';
import axios from '../constants/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function listXatScreen({ nomUsuari, navigation }) {
  const [userSess, setUserSess] = useState(navigation.getParam('user'));
  const [chatData, setChatData] = useState([]);
  const [listType, setListType] = useState('privs');
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({
    nomUsuari: navigation.getParam('user').nomUsuari,
    room: 'none',
    participant: 'none',
  });

  const pressPickerPrivs = () => {
    setListType('privs');
  };

  const pressPickerGrups = () => {
    setListType('grups');
  };

  useEffect(() => {
    // console.log(user);
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
      } catch (e) {
        // navigation.replace('Login');
      }
    }
    getData();
  }, []);

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
        navigation.navigate('ChatScreen', { user });
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

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      navigation.replace('Login');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.scroll}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.imageView}>
          <View>
            <Image style={styles.imageProfile} source={{ uri: url_aux }} />
            <View style={styles.circle}></View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.textView}>
          <View>
            <Text style={styles.textHeader} numberOfLines={1} ellipsizeMode="tail">
              {user.nomUsuari}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.searchView}>
            <MaterialIcons name="search" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <View style={styles.optionsView}>
            <SimpleLineIcons name="options-vertical" style={styles.optionsIcon} />
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
        <TouchableOpacity style={styles.plusCircle}>
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
    marginTop: Window.height * 0.1,
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
    width: Window.width * 0.17,
    height: Window.width * 0.17,
    position: 'absolute',
    marginTop: Window.height * 0.9,
    marginLeft: Window.width * 0.75,
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
    fontSize: 43,
    alignSelf: 'center',
  },
});
