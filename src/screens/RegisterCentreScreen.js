import React, { useState } from 'react';
import { View, StyleSheet, Text, Modal, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import ModalPicker from '../components/ModalPicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterCentreScreen({ navigation }) {
  const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  const [isModalVisible, setModalVisible] = useState(false);
  const [choosenData, setChoosenData] = useState('Selecciona el teu centre ...');

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const changeModalVisibility = (bool) => {
    setModalVisible(bool);
  };

  const setData = (option) => {
    setChoosenData(option);
  };

  const registerCentreGrauHandler = () => {
    alert('Bona elecció');
    //navigation.navigate('Intro');
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
        <Text style={styles.subtitle}>Selecciona el teu centre i grau</Text>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity activeOpacity={0.6} style={styles.dropdownCentre} onPress={() => changeModalVisibility(true)}>
          <View style={styles.dropdownIcon}></View>
          <Text style={styles.dropdownText}>{choosenData}</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon style={{ marginEnd: 25 }} name="caret-down" size={25} color={Colors.secondary} />
          </View>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => changeModalVisibility(false)}
          >
            <ModalPicker onPress={() => changeModalVisibility(false)}></ModalPicker>
          </Modal>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} style={styles.dropdownCentre} onPress={() => changeModalVisibility(true)}>
          <View style={styles.dropdownIcon}></View>
          <Text style={styles.dropdownText}>Escull el teu grau ...</Text>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Icon style={{ marginEnd: 25 }} name="caret-down" size={25} color={Colors.secondary} />
          </View>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            onRequestClose={() => changeModalVisibility(false)}
          >
            <ModalPicker setData={setData} onPress={() => changeModalVisibility(false)}></ModalPicker>
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
