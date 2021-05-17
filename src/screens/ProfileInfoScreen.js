import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, TextInput, ScrollView } from 'react-native';
import colors from '../constants/Colors';
import { useFonts } from 'expo-font';

const { height, width } = Dimensions.get('window');

function ProfileInfoScreen() {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.nom}>César Gutiérrez</Text>
        <Text style={styles.mail}>cesar.gutierrez@estudiantat.upc.edu</Text>
        <Image style={styles.imageProfile} source={require('../assets/images/user.png')} />
      </View>
      <View style={styles.border}>
        <ScrollView style={styles.scroll}>
          <Text style={styles.textArea}>
            {
              'When set, the scroll view will adjust the scroll position so that the first child that is currently visible and at or beyond minIndexForVisible will not change position. This is useful for lists that are loading content in both directions, e.g. a chat thread, where new messages coming in might otherwise cause the scroll position to jump. A value of 0 is common, but other values such as 1 can be used to skip loading spinners or other content that should not maintain position.'
            }
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: height * 0.15,
  },
  imageProfile: {
    width: width * 0.4,
    height: width * 0.4,
    marginTop: 15,
  },
  nom: {
    fontFamily: 'InterBold',
    fontSize: 20,
    lineHeight: 19,
  },
  mail: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    lineHeight: 19,
  },
  scroll: {
    alignSelf: 'center',
    width: width * 0.8,
    paddingTop: 3,
  },
  textArea: {
    fontSize: 16,
  },
  border: {
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    width: width * 0.85,
    height: 105,
  },
});

export default ProfileInfoScreen;
