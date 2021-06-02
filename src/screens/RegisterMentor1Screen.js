import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
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
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Vols ser mentoritzat?</Text>
          <Text style={styles.textHeader}>Selecciona el teu mentor!</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.textErrorInputs}>
            {!errorText.errorStatus ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorText}>{errorText.errorMsg}</Text>
              </Animatable.View>
            )}
          </View>
        </View>
        <View style={styles.searchBloc}>
          <TouchableOpacity style={styles.dropdown}>
            <View style={styles.dropdownIcon}></View>
            <View style={styles.dropdownTextContainer}>
              <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
                Cerca el teu mentor...
              </Text>
            </View>
            <View style={{ backgroundColor: Colors.black, height: '86%', width: 1 }}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <MaterialIcons style={{ marginEnd: 17 }} name="search" size={25} color={Colors.secondary} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.registerButton1}>
          <BaseButton onPress={registerMentorHandler} title="Següent" btnColor={Colors.primary} />
        </View>
        <View style={styles.registerButton2}>
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
    marginTop: Window.height * 0.1,
  },
  textHeader: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    alignSelf: 'center',
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
  dropdown: {
    alignSelf: 'center',
    width: Window.width * 0.85,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    marginTop: 30,
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    borderRadius: 50,
    marginLeft: 18,
    backgroundColor: Colors.darkBlue,
  },
  dropdownTextContainer: {
    width: Window.width * 0.61,
  },
  dropdownText: {
    fontFamily: 'InterMedium',
    marginRight: 15,
    marginLeft: 15,
    fontSize: 14,
  },
  registerButton1: {
    marginBottom: 20,
    alignItems: 'center',
    marginTop: Window.height * 0.3,
  },
  registerButton2: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
