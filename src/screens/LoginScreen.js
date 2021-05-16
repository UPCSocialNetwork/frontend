import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import BaseButton from '../components/BaseButton';
import BaseInput from '../components/BaseInput';

import colors from '../constants/Colors';

function LoginScreen() {
  return (
    <View style={styles.backgroundView}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>OnCampus</Text>
        <Text style={styles.subtitle}>Accés a l'aplicació</Text>
      </View>
      <View style={styles.mainContainer}>
        <BaseInput placeholder="username" />
        <Text>testing inputext</Text>
        <View style={styles.loginButton}>
          <BaseButton title="Accedeix" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundView: { backgroundColor: colors.white, flex: 1 },
  headerContainer: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 47,
    marginTop: 50,
    color: colors.secondary,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 50,
    color: colors.secondary,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.test2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  loginButton: {
    marginBottom: 70,
  },
});

export default LoginScreen;
