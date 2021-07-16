import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  TextInput,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import axios from '../constants/axios';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import ParticipantList from '../components/ParticipantList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateGrupScreen({ navigation }) {
  const [userSess, setUserSess] = useState(null);
  const [llistatParticipants, setLlistatParticipants] = useState(navigation.getParam('llistatEstudiants'));
  const [visitUser, setVisitUser] = useState('none');

  const [user, setUser] = useState({
    nomUsuari: '',
    room: '',
    participant: null,
    tipusXat: 'XatGrupTancat',
    titol: '',
  });

  const [errorText, setErrorText] = useState({
    errorMsg: `Has d'escollir un nom de Grup`,
    errorStatus: false,
  });

  const [xatGrupTancat, setXatGrupTancat] = useState({
    titol: '',
    descripcio: 'Sense descripció',
    imatge: 'none',
    ultimMissatgeID: 'none',
  });

  useEffect(() => {
    async function getData() {
      BackHandler.addEventListener('hardwareBackPress', () => true);
      try {
        let userSess = await AsyncStorage.getItem('userSession');
        if (userSess != null) {
          userSess = JSON.parse(userSess);
          setUserSess(userSess);

          try {
            response = await axios.get('estudiant/auth/session', {
              headers: {
                Authorization: `${userSess.jwt}`,
              },
            });
            if (response.data.msg != 'Success') navigation.replace('Login');
          } catch (error) {
            console.log(error);
          }
        }
      } catch (e) {}
    }

    getData();
  }, []);

  useEffect(() => {
    if (user.participant !== null) {
      navigation.replace('ChatScreen', { user });
    }
  }, [user.participant]);

  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  async function crearGrupHandler() {
    if (xatGrupTancat.titol !== '') {
      setErrorText({ ...errorText, errorStatus: false });
      let responseCrearGrup = null;
      try {
        // CREAR GRUP
        responseCrearGrup = await axios.post('/XatGrupTancat', xatGrupTancat, { 'Content-Type': 'application/json' });

        if (responseCrearGrup.data.message === 'Saved') {
          let xatID = responseCrearGrup.data.XatGrupTancat._id;
          // CREAR PARTICIPANTS
          llistatParticipants.forEach((estudiant) => {
            createParticipant(estudiant.nomUsuari, xatID);
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
  }

  async function createParticipant(nomUsuari, xatID) {
    let responseParticipant = null;
    try {
      responseParticipant = await axios.post(
        '/participant',
        {
          estudiantID: nomUsuari,
          xatID: xatID,
          ultimaLectura: 0,
          notificacions: 'Activat',
          bloqueigGrup: 'Desactivat',
        },
        { 'Content-Type': 'application/json' },
      );

      if (nomUsuari === userSess.nomUsuari && responseParticipant.data.message === 'Saved') {
        setUser({
          ...user,
          nomUsuari: nomUsuari,
          room: xatID,
          titol: xatGrupTancat.titol,
          participant: responseParticipant.data.Participant._id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.backgroundView}>
      <View style={styles.Container}>
        <BackHeader
          onPress={() => {
            navigation.goBack();
          }}
        ></BackHeader>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <View style={styles.headerContainer}>
            <View style={styles.textInputView}>
              <TextInput
                style={styles.title}
                placeholder="Nom del Grup"
                placeholderTextColor={Colors.secondary}
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(val) => {
                  setErrorText({ ...errorText, errorStatus: false });
                  setXatGrupTancat({
                    ...xatGrupTancat,
                    titol: val,
                  });
                }}
              ></TextInput>
              {xatGrupTancat.titol !== '' ? null : (
                <View style={{ justifyContent: 'center' }}>
                  <MaterialIcons style={styles.icon} name="edit" size={14} color={Colors.secondary} />
                </View>
              )}
            </View>
            <TouchableOpacity style={styles.imageView}>
              <View style={styles.imageProfile}>
                <Text style={styles.textImage}>Afegeix una foto</Text>
              </View>
              {/*<Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />*/}
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.textErrorInputs}>
              {!errorText.errorStatus ? null : (
                <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorText}>{errorText.errorMsg}</Text>
                </Animatable.View>
              )}
            </View>
            <Text style={styles.textInfo}>Descripció</Text>
            <View style={styles.border2}>
              <View style={styles.scroll}>
                <TextInput
                  style={styles.textArea}
                  placeholder="Escriu la teva descripció..."
                  underlineColorAndroid="transparent"
                  multiline={true}
                  onChangeText={(val) => {
                    setXatGrupTancat({
                      ...xatGrupTancat,
                      descripcio: val,
                    });
                  }}
                ></TextInput>
              </View>
            </View>
            <View style={styles.llistatParticipants}>
              <Text style={styles.textLlistat}>LLISTAT PARTICIPANTS {`(${llistatParticipants.length})`}</Text>
              <View>
                {llistatParticipants.map((estudiant, index) => (
                  <View key={index}>
                    <ParticipantList nomUsuari={estudiant.nomUsuari} setVisitUser="none"></ParticipantList>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.CreateGrup}>
              <BaseButton title="Crear Grup" btnColor={Colors.primary} onPress={crearGrupHandler} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.white,
    flex: 1,
    marginTop: Window.height * 0.01,
  },
  Container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    width: Window.width * 0.9,
  },
  textInputView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'InterSemiBold',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    marginRight: 8,
    color: Colors.secondary,
  },
  imageView: {
    width: Window.width * 0.3,
    height: Window.width * 0.3,
    marginTop: 15,
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: Colors.grey,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  textImage: {
    textAlign: 'center',
    fontFamily: 'InterMedium',
    color: Colors.addImageColor,
    fontSize: 14,
  },
  mainContainer: {
    flex: 1,
    marginTop: 10,
    width: Window.width * 0.9,
    flexDirection: 'column',
    alignContent: 'center',
  },
  textErrorInputs: {
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  errorText: {
    fontFamily: 'InterMedium',
    fontSize: 13,
    marginTop: 6,
    alignSelf: 'center',
    color: Colors.red,
  },
  textInfo: {
    fontFamily: 'InterSemiBold',
    marginLeft: 5,
    marginTop: 10,
    fontSize: 15,
    color: Colors.secondary,
  },
  border2: {
    marginTop: 8,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    width: Window.width * 0.9,
    height: 130,
  },
  scroll: {
    alignSelf: 'center',
    width: Window.width * 0.85,
  },
  textArea: {
    width: '100%',
    fontSize: 15,
    textAlign: 'justify',
    padding: 10,
  },
  llistatParticipants: {
    flex: 1,
    marginTop: 40,
    width: Window.width * 0.9,
  },
  textLlistat: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    marginBottom: 10,
    fontSize: 14,
    color: Colors.secondary,
  },
  CreateGrup: {
    marginTop: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
});
