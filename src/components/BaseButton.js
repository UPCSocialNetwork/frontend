import React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';
import Colors from '../constants/Colors';

function BaseButton({ OnPress, title }) {
  return (
    <TouchableNativeFeedback>
      <View style={styles.button}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 320,
    height: 55,
    borderRadius: 8,
    backgroundColor: Colors.primary,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default BaseButton;
