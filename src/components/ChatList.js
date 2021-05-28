import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';

function ChatList({ nom, message, time, imageSrc }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  if (nom && message && time) {
    return (
      <View style={styles.card}>
        <View style={styles.imageViewParent}>
          <View style={styles.imageView}>
            <Image style={styles.imageChat} source={{ uri: imageSrc }} />
          </View>
        </View>
        <View style={styles.userViewParent}>
          <View style={styles.userView}>
            <Text style={styles.nom}>{nom}</Text>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  card: {
    height: 75,
    width: '100%',
    marginTop: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightBlack,
  },
  imageViewParent: {
    justifyContent: 'center',
    marginLeft: Window.width * 0.0746,
    width: Window.width * 0.1333,
  },
  imageView: {
    height: Window.width * 0.1333,
  },
  imageChat: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userViewParent: {
    marginLeft: Window.width * 0.032,
    justifyContent: 'center',
    width: Window.width * 0.4933,
  },
  userView: {
    height: Window.width * 0.1333,
  },
  nom: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: Colors.secondary,
  },
  message: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: Colors.blueGrey,
  },
});

export default ChatList;
