import React, { useRef } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import ViewPager from '@react-native-community/viewpager';
import { useFonts } from 'expo-font';

import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterScreen() {
  const [data, setData] = React.useState({
    errorMsg: 'Please provide a correct mail',
    mail: '',
    isValidMail: true,
  });

  const pagerRef = useRef(null);

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const pageChangeHandler = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  const emailInputChange = (val) => {
    if (!(val.indexOf(' ') >= 0)) {
      setData({
        ...data,
        mail: val,
        isValidMail: true,
      });
    } else {
      setData({
        ...data,
        mail: val,
        errorMsg: 'Please provide a correct mail',
        isValidMail: false,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ViewPager style={{ flex: 1 }} initialPage={0} ref={pagerRef}>
        <View key="1">
          <KeyboardAwareScrollView style={styles.backgroundView}>
            <View style={styles.headerContainer} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
              <Text style={styles.title}>OnCampus</Text>
              <Text style={styles.subtitle}>Registre a l'aplicació</Text>
            </View>
            <View style={styles.mainContainer}>
              <TextInput
                placeholder="Correu electrònic"
                autoCorrect={false}
                style={styles.inputStyle}
                autoCapitalize="none"
                onChangeText={(val) => emailInputChange(val)}
              />
              <Text style={styles.infoMailText}>
                El teu mail ha de ser el d’estudiant que pertany al teu centre universitari
              </Text>
              <View style={styles.registerButton}>
                <BaseButton
                  onPress={() => {
                    pageChangeHandler(1);
                  }}
                  title="Següent"
                  btnColor={Colors.primary}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View key="2">
          <BaseButton
            onPress={() => {
              pageChangeHandler(0);
            }}
            title="Anterior"
            btnColor={Colors.primary}
          />
        </View>
      </ViewPager>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundView: { backgroundColor: Colors.white, flex: 1 },
  headerContainer: {
    flex: 0.4,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: Window.height * 0.15,
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
    marginTop: 40,
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
    marginTop: 150,
    marginBottom: 20,
    alignItems: 'center',
  },
});
