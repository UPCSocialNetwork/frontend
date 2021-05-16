import React from 'react';
import BaseButton from '../components/BaseButton';
import { View, StyleSheet, Text } from 'react-native';

function IntroScreen() {
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
    marginBottom: 30,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 75,
    color: '#fff',
  },
});

export default IntroScreen;
