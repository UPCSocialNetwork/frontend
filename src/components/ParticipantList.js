import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

export default function ParticipantList({ nomUsuari, setVisitUser }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const onPress = () => {
    setVisitUser(nomUsuari);
  };
  var imageSrc = 'https://randomuser.me/api/portraits/men/1.jpg';

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.imageViewParent}>
          <View style={styles.imageView}>
            <Image style={styles.imageChat} source={{ uri: imageSrc }} />
          </View>
        </View>
        <View style={styles.userViewParent}>
          <View>
            <Text style={styles.nomText} numberOfLines={1} ellipsizeMode="tail">
              {nomUsuari}
            </Text>
          </View>
        </View>
        <View style={styles.optionsView}>
          <SimpleLineIcons name="arrow-right" style={styles.optionsIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 75,
    flexDirection: 'row',
    width: Window.width * 0.88,
  },
  imageViewParent: {
    justifyContent: 'center',
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
    paddingLeft: Window.width * 0.04,
    paddingRight: Window.width * 0.04,
    justifyContent: 'center',
    flex: 1,
  },
  nomText: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: Colors.secondary,
  },
  correuText: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: Colors.blueGrey,
  },
  optionsView: {
    justifyContent: 'center',
  },
  optionsIcon: {
    fontSize: 15,
  },
});
