import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function ModalPicker({ onPress, setData }) {
  const OPTIONS = ['EPSEVG', 'FIB', 'ETSEIB', 'ESCAI', 'TLCE'];

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const onPressItem = (option) => {
    onPress(false);
    setData(option);
  };

  const option = OPTIONS.map((item, index) => {
    return (
      <TouchableOpacity style={styles.option} key={index} onPress={() => onPressItem(item)}>
        <Text style={styles.text}> {item} </Text>
      </TouchableOpacity>
    );
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.modal}>
        <ScrollView>{option}</ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modal: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
    width: Window.width * 0.9,
    height: Window.height * 0.8,
  },
  option: {
    alignItems: 'flex-start',
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
