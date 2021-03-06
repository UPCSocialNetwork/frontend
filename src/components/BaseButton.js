import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function BaseButton({ onPress, title, btnColor }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={styles.touchable}>
      <View style={[styles.button, { backgroundColor: btnColor }]}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Window.width * 0.85,
    height: 55,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.white,
  },
  touchable: {
    borderRadius: 8,
  },
});
