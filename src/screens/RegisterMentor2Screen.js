import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterMentor2Screen({ navigation }) {
  //const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  const [newUser, setNewUser] = useState({
    nomUsuari: '',
    mail: '',
    contrasenya: '',
    descripcio: '',
    centreID: '',
    grauID: '',
    xatMentorID: '',
    esMentor: false,
    interessos: '',
    LlistaAssignatures: [],
    LlistaXatGrupTancat: [],
  });
  const [textMentor, setTextMentor] = useState(
    'Si acceptes es crearà un grup de tipus mentor amb el teu usuari com a administrador i apareixeràs a la llista de mentors de la teva universitat.',
  );

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
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

  const registerMentorHandler = (isMentor) => {
    let user = newUser;
    user.esMentor = isMentor;
    navigation.navigate('RegisterProfile', { user });
  };

  return (
    <ScrollView
      style={styles.backgroundView}
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      ></BackHeader>
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Vols ser mentor?</Text>
        <Text style={styles.subtitle}>{textMentor}</Text>

        <View style={styles.registerButton}>
          <BaseButton
            onPress={() => {
              registerMentorHandler(true);
            }}
            title="D'acord"
            btnColor={Colors.primary}
          />
        </View>
        <View style={styles.registerButton}>
          <BaseButton
            onPress={() => {
              registerMentorHandler(false);
            }}
            title="No vull ser mentor"
            btnColor={Colors.red}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.white,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    height: 55,
    width: Window.width * 0.9,
  },
  title: {
    fontFamily: 'InterBold',
    fontSize: 20,
    marginTop: '20%',
    color: Colors.secondary,
  },
  subtitle: {
    fontFamily: 'InterMedium',
    textAlign: 'justify',
    color: Colors.secondary,
    width: Window.width * 0.85,
    marginBottom: '35%',
    padding: 5,
    marginTop: 25,
    fontSize: 14,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  registerButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
