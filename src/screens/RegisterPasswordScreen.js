import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import { useFonts } from 'expo-font';

import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterPasswordScreen({ navigation }) {
  const [data, setData] = useState({
    errorMsg: 'Passwords does not match',
    isValidPassword: true,
    matchPassword: true,
  });

  const [newUser, setNewUser] = useState(navigation.getParam());

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const passwordInputChange = (val) => {
    if (!(val.indexOf(' ') >= 0)) {
      setData({
        ...data,
        isValidPassword: true,
      });
      setNewUser({
        ...newUser,
        password: val,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
      setNewUser({
        ...newUser,
        password: val,
      });
    }
  };

  const registerPasswordHandler = (pageNumber) => {
    if (newUser.password == '' || !data.isValidMail) {
      setData({
        ...data,
        isValidPassword: false,
      });
    } else {
      navigation.navigate('Intro');
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.backgroundView}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      ></BackHeader>
      <View style={styles.headerContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
        <Text style={styles.title}>OnCampus</Text>
        <Text style={styles.subtitle}>Escriu la teva contrasenya</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textErrorInputs}>
          {data.isValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorText}>{data.errorMsg}</Text>
            </Animatable.View>
          )}
        </View>
        <TextInput
          secureTextEntry={true}
          placeholder="Nova contrasenya"
          autoCorrect={false}
          style={styles.inputStyle}
          autoCapitalize="none"
          onChangeText={(val) => passwordInputChange(val)}
        />
        <TextInput
          secureTextEntry={true}
          placeholder="Repeteix la contrasenya"
          autoCorrect={false}
          style={styles.inputStyle}
          autoCapitalize="none"
          onChangeText={(val) => passwordInputChange(val)}
        />
        <Text style={styles.infoMailText}>La contrasenya ha de tenir com a mínim 8 caràcters.</Text>
        <View style={styles.registerButton}>
          <BaseButton
            onPress={() => {
              registerPasswordHandler(1);
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
    marginTop: Window.height * 0.05,
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
    color: Colors.secondary,
    width: Window.width * 0.85,
    paddingLeft: 5,
    paddingLeft: 5,
    marginTop: 15,
    fontSize: 14,
  },
  registerButton: {
    marginTop: 70,
    marginBottom: 20,
    alignItems: 'center',
  },
});
