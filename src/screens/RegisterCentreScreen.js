import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import ModalPicker from '../components/ModalPicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterCentreScreen({ navigation }) {
  const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  const [isCentreModalVisible, setCentreModalVisible] = useState(false);
  const [isGrauModalVisible, setGrauModalVisible] = useState(false);
  const [errorText, setErrorText] = useState({
    errorMsg: 'Selecciona les opcions correctament.',
    errorStatus: false,
  });
  const [choosenCentre, setChoosenCentre] = useState('Selecciona el teu centre ...');
  const [choosenGrau, setChoosenGrau] = useState('Selecciona el teu grau ...');

  const [Centre, setCentre] = useState([]);
  const [Grau, setGrau] = useState([]);

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    async function fetchData() {
      let responseCentre = null;
      let responseGrau = null;
      try {
        responseCentre = await axios.get('/centre/getAll');
        responseGrau = await axios.get('/grau/getAll');
        setCentre(responseCentre.data.centreUniversitari);
        setGrau(responseGrau.data.grau);
      } catch (error) {
        console.log(error);
      }
      return responseCentre + responseGrau;
    }
    fetchData();
  }, []);

  if (!loaded) {
    return null;
  }

  const isCentreChoosen = () => {
    if (choosenCentre != 'Selecciona el teu centre ...') {
      changeModalVisibility('grau', true);
      setErrorText({ ...errorText, errorStatus: false });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
  };

  const changeModalVisibility = (type, bool) => {
    if (type == 'centre') setCentreModalVisible(bool);
    else setGrauModalVisible(bool);
  };

  const registerCentreGrauHandler = () => {
    if (choosenCentre != 'Selecciona el teu centre ...' && choosenGrau != 'Selecciona el teu grau ...') {
      setNewUser({
        ...newUser,
        centreID: choosenCentre,
        grauID: choosenGrau,
      });
      setErrorText({ ...errorText, errorStatus: false });
      alert(choosenCentre + '\n' + choosenGrau);
      //navigation.navigate('RegisterAssig', { newUser });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
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
        <Text style={styles.subtitle}>Selecciona el teu centre i grau</Text>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textErrorInputs}>
          {!errorText.errorStatus ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorText}>{errorText.errorMsg}</Text>
            </Animatable.View>
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.dropdownCentre}
          onPress={() => changeModalVisibility('centre', true)}
        >
          <View style={styles.dropdownIcon}></View>
          <View style={styles.dropdownTextContainer}>
            <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
              {choosenCentre}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon style={{ marginEnd: 25 }} name="caret-down" size={25} color={Colors.secondary} />
          </View>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isCentreModalVisible}
            onRequestClose={() => changeModalVisibility('centre', false)}
          >
            <ModalPicker
              onPress={() => changeModalVisibility('centre', false)}
              setChoosenData={setChoosenCentre}
              DataList={Centre}
              type="centre"
            ></ModalPicker>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.dropdownCentre}
          onPress={() => isCentreChoosen()}
          // changeModalVisibility('grau', true);
        >
          <View style={styles.dropdownIcon}></View>
          <View style={styles.dropdownTextContainer}>
            <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
              {choosenGrau}
            </Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon style={{ marginEnd: 25 }} name="caret-down" size={25} color={Colors.secondary} />
          </View>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isGrauModalVisible}
            onRequestClose={() => {
              changeModalVisibility('grau', false);
            }}
          >
            <ModalPicker
              onPress={() => changeModalVisibility('grau', false)}
              setChoosenData={setChoosenGrau}
              DataList={Grau}
              type="grau"
            ></ModalPicker>
          </Modal>
        </TouchableOpacity>
        <View style={styles.registerButton}>
          <BaseButton
            onPress={() => {
              registerCentreGrauHandler();
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
  dropdownCentre: {
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
    width: Window.width * 0.6,
  },
  dropdownText: {
    fontFamily: 'InterMedium',
    marginRight: 15,
    marginLeft: 15,
    fontSize: 14,
  },
  registerButton: {
    marginTop: 70,
    marginBottom: 20,
    alignItems: 'center',
  },
});
