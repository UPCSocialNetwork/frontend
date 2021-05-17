import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import Colors from '../constants/Colors';

function BaseInput({ value, onChangeText, placeholder, secureTextEntry }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const { inputStyle } = styles;

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      autoCorrect={false}
      style={inputStyle}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    fontFamily: 'InterMedium',
    width: 320,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 25,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BaseInput;
