import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseButton from '../components/BaseButton';
import BaseInput from '../components/BaseInput';
import { useFonts } from 'expo-font';

import Colors from '../constants/Colors';

function LoginScreen() {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <KeyboardAwareScrollView style={styles.backgroundView}>
      <View style={styles.headerContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
        <Text style={styles.title}>OnCampus</Text>
        <Text style={styles.subtitle}>Accés a l'aplicació</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textInputs}>
          <BaseInput placeholder="Correu electrònic" />
          <BaseInput placeholder="Contrasenya" secureTextEntry />
          <TouchableOpacity>
            <Text style={styles.forgetPasswordText}>Has oblidat la teva contrasenya?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginButton}>
          <BaseButton title="Accedeix" />
          <Text style={styles.noaccountText}>No tens compte?</Text>
          <TouchableOpacity>
            <Text style={styles.registerText}>Regístra't aquí!</Text>
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
  },
  title: {
    fontFamily: 'InterBold',
    fontWeight: 'bold',
    fontSize: 47,
    marginTop: 50,
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
    alignItems: 'center',
  },
  textInputs: {
    marginTop: 5, // 25 base
  },
  forgetPasswordText: {
    fontFamily: 'InterMedium',
    color: Colors.secondary,
    fontWeight: 'bold',
    marginStart: 2,
    marginTop: 10,
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  loginButton: {
    marginTop: 150,
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

export default LoginScreen;
