import { Inter_900Black } from '@expo-google-fonts/inter';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TouchableOpacityBase,
} from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import ChatList from '../components/ChatList';
import { useEffect } from 'react/cjs/react.development';
import axios from '../constants/axios';

export default function listXatScreen({ navigation }) {
  const [nomUsuari, setNomUsuari] = useState('cesar.martos');
  const [chatData, setChatData] = useState([]);

  useEffect(() => {
    async function getChatData() {
      let response = null;
      try {
        response = await axios.get('estudiant/xats/' + nomUsuari);
        let chats = response.data.xatsFinals;
        console.log(chats);
        setChatData(chats);
      } catch (e) {
        console.error(e);
      }
    }
    getChatData();
  }, []);

  const random = Math.floor(Math.random() * 100);
  const url = 'https://randomuser.me/api/portraits/men/' + random + '.jpg';

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.header}>
        <View style={styles.imageView}>
          <Image style={styles.imageProfile} source={{ uri: url }} />
          <View style={styles.circle}></View>
        </View>
        <View style={styles.textView}>
          <Text style={styles.textHeader} numberOfLines={1} ellipsizeMode="tail">
            {nomUsuari}
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.searchView}>
            <MaterialIcons name="search" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.optionsView}>
            <SimpleLineIcons name="options-vertical" style={styles.optionsIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.selectPicker}></View>
      <View style={styles.allChats}>
        <ChatList></ChatList>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
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
    fontSize: 20,
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
    fontSize: 25,
  },
  selectPicker: {
    marginTop: 25,
    height: 70,
    width: '100%',
    backgroundColor: Colors.lightBlue,
  },
  listXats: {
    marginTop: 20,
    backgroundColor: Colors.red,
    width: '100%',
  },
  allChats: {
    marginTop: 30,
  },
});
