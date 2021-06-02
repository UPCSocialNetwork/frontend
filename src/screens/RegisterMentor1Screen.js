import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterMentor1Screen({ navigation }) {
  //const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  const [newUser, setNewUser] = useState({
    nomUsuari: '',
    mail: '',
    contrasenya: '',
    descripcio: '',
    centreID: '',
    grauID: '',
    mentorID: '',
    interessos: '',
    LlistaAssignatures: [],
    LlistaXatGrupTancat: [],
  });

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  const [errorText, setErrorText] = useState({
    errorMsg: 'Selecciona com a mínim una assignatura',
    errorStatus: false,
  });

  useEffect(() => {
    /*
    async function fetchData() {
      let response = null;
      try {
      } catch (error) {
      }
      return response;
    }
    fetchData();
    */
  }, []);

  if (!loaded) {
    return null;
  }

  const registerMentorHandler = () => {
    /*
    if (condition) {
      setErrorText({ ...errorText, errorStatus: false });
      navigation.navigate('RegisterProfile', { newUser });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
    */
  };

  return (
    <View style={styles.backgroundView}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      ></BackHeader>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <View style={styles.headerContainer}></View>
        <View style={styles.mainContainer}>
          <View style={styles.textErrorInputs}>
            {!errorText.errorStatus ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorText}>{errorText.errorMsg}</Text>
              </Animatable.View>
            )}
          </View>
        </View>
        <View style={styles.registerButton}>
          <BaseButton onPress={registerMentorHandler} title="Següent" btnColor={Colors.primary} />
        </View>
        <View style={styles.registerButton}>
          <BaseButton onPress={registerMentorHandler} title="No vull ser mentoritzat" btnColor={Colors.red} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 55,
    width: Window.width * 0.9,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  textErrorInputs: {
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'InterMedium',
    fontSize: 13,
    alignSelf: 'center',
    color: Colors.red,
  },
  registerButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
