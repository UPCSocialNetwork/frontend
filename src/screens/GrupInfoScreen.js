import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
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
import axios from '../constants/axios';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import ParticipantList from '../components/ParticipantList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDerivedValue } from 'react-native-reanimated';

export default function GrupInfoScreen({ navigation }) {
  const [userSess, setUserSess] = useState(null);
  const [user, setUser] = useState(navigation.getParam('user'));
  /*const [user, setUser] = useState({
    nomUsuari: 'daniel.benavente', //navigation.getParam('user').nomUsuari,
    room: '60d7631aca477993ec206e7d', // xatid
    participant: 'none',
    tipusXat: 'XatAssignatura', //priv / XatGrupTancat / XatAssignatura / XatMentor
    titol: 'FOMA',
  });*/
  const [xatGrupal, setXatGrupal] = useState({});
  const [llistatParticipants, setLlistatParticipants] = useState([]);
  const [visitUser, setVisitUser] = useState(false);

  useEffect(() => {
    async function getData() {
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
      try {
        let xatGrupal = null;
        if (user.tipusXat === 'XatAssignatura') xatGrupal = await axios.get(`XatAssignatura/getOneID/${user.room}`);
        else xatGrupal = await axios.get(`${user.tipusXat}/${user.room}`);

        if (user.tipusXat === 'XatAssignatura') setXatGrupal(xatGrupal.data.xatAssignatura);
        else if (user.tipusXat === 'xatGrupTancat') setXatGrupal(xatGrupal.data.xatGrupTancat);
        else if (user.tipusXat === 'xatMentor') setXatGrupal(xatGrupal.data.xatMentor);

        let participants = await axios.get(`/estudiants/${user.room}`);
        setLlistatParticipants(participants.data.persones);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (visitUser) navigation.replace({ user });
  }, [visitUser]);

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

  return (
    <ScrollView style={styles.backgroundView}>
      <View style={styles.Container}>
        <BackHeader
          onPress={() => {
            navigation.replace({ user });
          }}
        ></BackHeader>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{xatGrupal.titol}</Text>
            <TouchableOpacity style={styles.imageView}>
              <View style={styles.imageProfile}>
                <Text style={styles.textImage}>GN</Text>
              </View>
              {/*<Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />*/}
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.textInfo}>Informació</Text>
            <View style={styles.border1}>
              <View style={styles.scroll}>
                <Text
                  style={styles.textArea}
                  placeholder="Escriu la teva descripció..."
                  underlineColorAndroid="transparent"
                  multiline={true}
                >
                  {`${xatGrupal.titol} - ${xatGrupal.assignaturaID}`}
                </Text>
              </View>
            </View>
            <Text style={styles.textInfo}>Descripció</Text>
            <View style={styles.border2}>
              <View style={styles.scroll}>
                <Text
                  style={styles.textArea}
                  placeholder="Escriu la teva descripció..."
                  underlineColorAndroid="transparent"
                  multiline={true}
                >
                  {xatGrupal.descripcio}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.GuiaDocentContainer}>
              <Text style={styles.text}>Veure Guia Docent</Text>
            </TouchableOpacity>
            <View style={styles.llistatParticipants}>
              <Text style={styles.textLlistat}>LLISTAT PARTICIPANTS {`(${llistatParticipants.length})`}</Text>
              <View>
                {llistatParticipants.map((nomUsuari, index) => (
                  <View key={index}>
                    <ParticipantList nomUsuari={nomUsuari} setVisitUser={setVisitUser}></ParticipantList>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.BlockButton}>
              <BaseButton title="Bloquejar grup" btnColor={Colors.warning} />
            </View>
            <View style={styles.ExitButton}>
              <BaseButton title="Sortir del grup" btnColor={Colors.red} />
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
  },
  Container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    width: Window.width * 0.9,
  },
  title: {
    fontFamily: 'InterSemiBold',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
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
    fontFamily: 'InterSemiBold',
    fontSize: 30,
  },
  mainContainer: {
    flex: 1,
    width: Window.width * 0.9,
    flexDirection: 'column',
    alignContent: 'center',
  },
  textInfo: {
    fontFamily: 'InterSemiBold',
    marginLeft: 5,
    marginTop: 10,
    fontSize: 15,
    color: Colors.secondary,
  },
  border1: {
    marginTop: 8,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    width: Window.width * 0.9,
    height: 60,
  },
  border2: {
    marginTop: 8,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    width: Window.width * 0.9,
    height: 100,
  },
  scroll: {
    alignSelf: 'center',
    width: Window.width * 0.85,
  },
  textArea: {
    width: '100%',
    fontSize: 15,
    textAlign: 'justify',
    padding: 5,
  },
  GuiaDocentContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: Window.width * 0.688,
    height: 37,
    borderRadius: 8,
    backgroundColor: Colors.green2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  llistatParticipants: {
    marginTop: 30,
    width: Window.width * 0.9,
  },
  textLlistat: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    marginBottom: 10,
    fontSize: 14,
    color: Colors.secondary,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Window.width * 0.688,
    height: 37,
    borderRadius: 8,
    backgroundColor: Colors.green2,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    color: Colors.white,
  },
  BlockButton: {
    marginTop: 25,
    marginBottom: 20,
    alignItems: 'center',
  },
  ExitButton: {
    marginBottom: 30,
    alignItems: 'center',
  },
});
