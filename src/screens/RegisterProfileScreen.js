import React, { useState, useEffect } from 'react';
import { View, TextInput, Image, StyleSheet, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterProfileScreen({ navigation }) {
  //const [newUser, setNewUser] = useState(navigation.getParam('user'));
  const [newUser, setNewUser] = useState({
    nomUsuari: 'cesar.gutierrez',
    mail: 'cesar.gutierrez@estudiantat.upc.edu',
    contrasenya: '',
    descripcio: '',
    centreID: '',
    grauID: '',
    mentorID: '',
    interessos: [],
    LlistaAssignatures: [],
    LlistaXatGrupTancat: [],
  });
  const [textDesc, setTextDesc] = useState('');

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  const random = Math.floor(Math.random() * 100);
  const url = 'https://randomuser.me/api/portraits/men/' + random + '.jpg';

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
    console.log(newUser);
  };

  return (
    <ScrollView style={styles.backgroundView}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      ></BackHeader>
      <View style={styles.header}>
        <Text style={styles.nom}>{newUser.nomUsuari}</Text>
        <Text style={styles.mail}>{newUser.mail}</Text>
        <TouchableOpacity style={styles.imageView}>
          <Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.border}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.textArea}
            placeholder="Escriu la teva descripció..."
            underlineColorAndroid="transparent"
            multiline={true}
            onChangeText={(text) => setTextDesc(text)}
          ></TextInput>
        </ScrollView>
      </View>
      <Text style={styles.interessosTitle}>{'Interessos'}</Text>
      <View style={styles.btnLast}>
        <BaseButton title="Enviar missatge" btnColor={Colors.primary} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.white,
  },
  header: {
    alignItems: 'center',
    marginTop: 30,
  },
  nom: {
    fontFamily: 'InterBold',
    fontSize: 20,
    lineHeight: 19,
    textAlign: 'center',
    width: Window.width * 0.8,
  },
  mail: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    lineHeight: 19,
    textAlign: 'center',
    width: Window.width * 0.8,
  },
  imageView: {
    width: Window.width * 0.4,
    height: Window.width * 0.4,
    marginTop: 30,
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderColor: Colors.white,
    borderWidth: 2,
  },
  border: {
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    width: Window.width * 0.85,
    height: 105,
  },
  scroll: {
    alignSelf: 'center',
    width: Window.width * 0.8,
  },
  textArea: {
    width: '100%',
    fontSize: 16,
    textAlign: 'justify',
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 6,
    paddingRight: 5,
  },
  interessosTitle: {
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: 'InterBold',
  },
  btnLast: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
});
