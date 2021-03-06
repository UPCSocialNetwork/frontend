import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
//import Window from '../constants/Layout';
const Window = Dimensions.get('window');

var JWT = '';

export default function LoginScreen({ navigation }) {
  const [data, setData] = useState({
    errorMsg: 'Please provide username and password.',
    username: '',
    password: '',
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isValidSignIn: true,
    isnotEmpty: true,
  });

  //const [userSession, setUserSession] = useState({});

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    async function getData() {
      try {
        let user = await AsyncStorage.getItem('userSession');
        if (user != null) {
          user = JSON.parse(user);
          try {
            response = await axios.get('estudiant/auth/session', {
              headers: {
                Authorization: `${user.jwt}`,
              },
            });
            if (response.data.msg == 'Success') {
              let tipusXat = 'grups';
              navigation.replace('listXatScreen', { user, tipusXat });
            }
          } catch (error) {}
        }
      } catch (e) {
        // error reading value
      }
    }
    getData();
  }, []);

  if (!loaded) {
    return null;
  }

  const userInputChange = (val) => {
    if (!(val.indexOf(' ') >= 0)) {
      setData({
        ...data,
        username: val,
        isValidUser: true,
        isValidSignIn: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        errorMsg: 'That username and password combination is incorrect.',
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (!(val.indexOf(' ') >= 0)) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
        isValidSignIn: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        errorMsg: 'That username and password combination is incorrect.',
        isValidPassword: false,
      });
    }
  };

  async function loginUser() {
    let responseLogin = null;
    try {
      responseLogin = await axios.post(
        '/estudiant/auth/signin',
        {
          nomUsuari: data.username,
          contrasenya: data.password,
        },
        { 'Content-Type': 'application/json' },
      );
      JWT = responseLogin.data.jwt;
      return responseLogin.data.message;
    } catch (error) {
      return error;
    }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('userSession', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  async function LoginHandler() {
    if (data.password == '' || data.username == '') {
      setData({
        ...data,
        isnotEmpty: false,
        errorMsg: 'Please provide username and password.',
      });
    } else if (!data.isValidSignIn) {
      setData({
        ...data,
        errorMsg: 'That username and password combination is incorrect.',
      });
    } else {
      setData({
        ...data,
        isValidSignIn: true,
        isnotEmpty: true,
      });
      let responseLogin = await loginUser();
      if (responseLogin === 'Success') {
        let user = {
          nomUsuari: data.username,
          jwt: JWT,
        };
        // setUserSession(user);
        await storeData(user);
        let tipusXat = 'grups';
        navigation.replace('listXatScreen', { user, tipusXat });
      } else {
        setData({
          ...data,
          isValidSignIn: false,
          errorMsg: 'That username and password combination is incorrect.',
        });
      }
    }
  }

  return (
    <KeyboardAwareScrollView
      style={styles.backgroundView}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.headerContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
        <Text style={styles.title}>OnCampus</Text>
        <Text style={styles.subtitle}>Acc??s a l'aplicaci??</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textErrorInputs}>
          {data.isValidUser && data.isValidPassword && data.isValidSignIn ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorText}>{data.errorMsg}</Text>
            </Animatable.View>
          )}
          {data.isnotEmpty ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorText}>{data.errorMsg}</Text>
            </Animatable.View>
          )}
        </View>
        <TextInput
          placeholder="Nom d'usuari"
          autoCorrect={false}
          style={styles.inputStyle}
          autoCapitalize="none"
          onChangeText={(val) => userInputChange(val)}
        />
        <TextInput
          secureTextEntry={data.secureTextEntry ? true : false}
          placeholder="Contrasenya"
          autoCorrect={false}
          style={styles.inputStyle}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
        <TouchableOpacity>
          <Text style={styles.forgetPasswordText}>Has oblidat la teva contrasenya?</Text>
        </TouchableOpacity>
        <View style={styles.loginButton}>
          <BaseButton
            onPress={() => {
              LoginHandler();
              /*
              let newUser = {
                nomUsuari: 'cesar.guti',
              };
              navigation.navigate('listXatScreen', { newUser });
              */
            }}
            title="Accedeix"
            btnColor={Colors.primary}
          />
          <Text style={styles.noaccountText}>No tens compte?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterMail');
            }}
          >
            <Text style={styles.registerText}>Reg??stra't aqu??!</Text>
          </TouchableOpacity>
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
    marginTop: Window.height * 0.1,
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
    width: Window.width * 0.85,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 25,
  },
  forgetPasswordText: {
    fontFamily: 'InterMedium',
    color: Colors.secondary,
    fontWeight: 'bold',
    marginStart: 2,
    marginTop: 15,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: 100,
    marginBottom: 20,
    alignItems: 'center',
  },
  noaccountText: {
    fontFamily: 'InterMedium',
    marginTop: 12,
  },
  registerText: {
    marginTop: 4,
    fontFamily: 'InterBold',
    color: Colors.primary,
  },
});
