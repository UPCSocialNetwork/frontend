import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useFonts } from 'expo-font';

function IntroScreen() {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.backgroundView}>
      <Text style={styles.Text}>On{`\n`}Campus</Text>
    </View>
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

export default IntroScreen;
