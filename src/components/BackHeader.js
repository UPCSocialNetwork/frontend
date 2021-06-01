import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../constants/Colors';
import Window from '../constants/Layout';

function BackHeader({ onPress }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.backgroundView} onPress={onPress} activeOpacity={0.5}>
      <View style={styles.buttonAll}>
        <View style={styles.backButton}>
          <Icon name="arrow-left" size={18} color={Colors.primary} />
        </View>
        <Text style={styles.Text}>Enrere</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  buttonAll: {
    flex: 1,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightBlue,
  },
  Text: {
    fontFamily: 'InterBold',
    fontSize: 16,
    marginLeft: 5,
    color: Colors.primary,
  },
});

export default BackHeader;
