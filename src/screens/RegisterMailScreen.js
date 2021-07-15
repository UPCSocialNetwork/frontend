import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, BackHandler } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import axios from '../constants/axios';
import BackHeader from '../components/BackHeader';
import { useFonts } from 'expo-font';

import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterMailScreen({ navigation }) {
  const [data, setData] = useState({
    errorMsg: 'Proporciona un correu vàlid',
    isValidMail: true,
  });

  const [userExists, setUserExists] = useState({
    errorMsg: 'Aquest usuari ja existeix',
    isValidUser: true,
  });

  const [puntNom, setPuntNom] = useState({
    errorMsg: `El nom i cognoms s'han de separar amb un punt`,
    isValidPunt: true,
  });

  const validMail = {
    upc: 'estudiant.upc.edu',
  };

  const [newUser, setNewUser] = useState({
    nomUsuari: '',
    mail: '',
    contrasenya: '',
    descripcio: 'Sense descripció',
    centreID: '',
    grauID: '',
    xatMentorID: 'none',
    esMentor: false,
    interessos: [],
    LlistaAssignatures: [],
    LlistaXatGrupTancat: [],
  });

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  const goBackHandler = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBackHandler);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBackHandler);
  }, []);

  if (!loaded) {
    return null;
  }

  const mailInputChange = (val) => {
    if (!(val.indexOf(' ') >= 0)) {
      setData({
        ...data,
        isValidMail: true,
      });
      setUserExists({
        ...userExists,
        isValidUser: true,
      });
      setPuntNom({
        ...puntNom,
        isValidPunt: true,
      });
      setNewUser({
        ...newUser,
        mail: val,
        nomUsuari: val.split('@')[0],
      });
    } else {
      setData({
        ...data,
        isValidMail: false,
      });
      setUserExists({
        ...userExists,
        isValidUser: false,
      });
      setPuntNom({
        ...puntNom,
        isValidPunt: false,
      });
      setNewUser({
        ...newUser,
        mail: val,
        nomUsuari: val.split('@')[0],
      });
    }
  };

  const noPoint = (mail) => {
    if (mail.indexOf('.') !== -1) return true;
    else return false;
  };

  const registerMailHandler = async () => {
    if (newUser.mail == '' || !data.isValidMail || newUser.mail.split('@')[1] != validMail.upc) {
      setData({
        ...data,
        isValidMail: false,
      });
    } else {
      try {
        response = await axios.get(`estudiant/${newUser.mail.split('@')[0]}`);
        if (response.data.message !== 'Estudiant not found') {
          setUserExists({
            ...userExists,
            isValidUser: false,
          });
        } else {
          if (noPoint(newUser.mail.split('@')[0])) {
            navigation.navigate('RegisterPassword', { newUser });
          } else {
            setUserExists({
              ...puntNom,
              isValidPunt: false,
            });
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.backgroundView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      ></BackHeader>
      <View style={styles.headerContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
        <Text style={styles.title}>OnCampus</Text>
        <Text style={styles.subtitle}>Registre a l'aplicació</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textErrorInputs}>
          {userExists.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorText}>{userExists.errorMsg}</Text>
            </Animatable.View>
          )}
          {data.isValidMail ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorText}>{data.errorMsg}</Text>
            </Animatable.View>
          )}
        </View>
        <TextInput
          placeholder="Correu electrònic"
          autoCorrect={false}
          style={styles.inputStyle}
          autoCapitalize="none"
          onChangeText={(val) => mailInputChange(val)}
        />
        <Text style={styles.infoMailText}>
          Recorda que has d'utilitzar el correu d'estudiant del teu centre universitari i que enviarem un correu de
          verificació per activar el teu compte.
        </Text>
        <View style={styles.registerButton}>
          <BaseButton
            onPress={() => {
              registerMailHandler();
            }}
            title="Següent"
            btnColor={Colors.primary}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundView: { backgroundColor: Colors.white, flex: 1 },
  headerContainer: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
  },
  title: {
    fontFamily: 'InterBold',
    fontWeight: 'bold',
    fontSize: 47,
    color: Colors.secondary,
  },
  subtitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: Colors.secondary,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  textErrorInputs: {
    marginTop: 10, // 25 base
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  errorText: {
    fontFamily: 'InterMedium',
    fontSize: 13,
    marginTop: 15,
    alignSelf: 'center',
    color: Colors.red,
  },
  inputStyle: {
    fontFamily: 'InterMedium',
    fontWeight: 'bold',
    width: Window.width * 0.85,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 30,
  },
  infoMailText: {
    fontFamily: 'InterMedium',
    textAlign: 'justify',
    color: Colors.secondary,
    width: Window.width * 0.85,
    padding: 5,
    marginTop: 15,
    fontSize: 14,
  },
  registerButton: {
    marginTop: 140,
    marginBottom: 20,
    alignItems: 'center',
  },
});
