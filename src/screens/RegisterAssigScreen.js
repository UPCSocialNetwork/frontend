import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';

export default function RegisterAssigScreen({ navigation }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }
  console.log(navigation.getParam('newUser'));

  const pressHandler = () => {
    navigation.navigate('Login');
  };

  return (
    <TouchableOpacity style={styles.backgroundView} activeOpacity={0.8} onPress={pressHandler}>
      <Text style={styles.Text}>On{`\n`}Campus</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: '#377DFF',
    flex: 1,
    flexDirection: 'column', // horizontal
    justifyContent: 'center', // main (horiz)
    alignItems: 'center', // scondary (vert)
  },
  Text: {
    fontFamily: 'InterBold',
    marginBottom: 30,
    fontSize: 75,
    color: '#fff',
  },
});
