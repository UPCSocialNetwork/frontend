import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

function ChatList({}) {
  return (
    <View style={styles.card}>
      <Text>Hola chicos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 75,
    width: '100%',
    backgroundColor: Colors.red,
  },
});

export default ChatList;
