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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GrupInfoScreen({ navigation }) {
  const [userSess, setUserSess] = useState(null);
  const [user, setUser] = useState({
    nomUsuari: 'daniel.benavente', //navigation.getParam('user').nomUsuari,
    room: 'none',
    participant: 'none',
    tipusXat: 'none',
    titol: 'none',
  });

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
    }
    getData();
  }, []);

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
    <View style={styles.backgroundView}>
      <View style={styles.Container}>
        <BackHeader
          onPress={() => {
            navigation.goBack();
          }}
        ></BackHeader>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>NOM GRUP</Text>
            <TouchableOpacity style={styles.imageView}>
              <Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainContainer}>
            <Text style={styles.textInfo}>Informació</Text>
            <View style={styles.border1}>
              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text
                  style={styles.textArea}
                  placeholder="Escriu la teva descripció..."
                  underlineColorAndroid="transparent"
                  multiline={true}
                >
                  FOMA - Fonaments de les matemàtiques Classe- I1012s
                </Text>
              </ScrollView>
            </View>
            <Text style={styles.textInfo}>Descripció</Text>
            <View style={styles.border2}>
              <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
                <Text
                  style={styles.textArea}
                  placeholder="Escriu la teva descripció..."
                  underlineColorAndroid="transparent"
                  multiline={true}
                >
                  FOMA - Fonaments de les matemàtiques Classe- I1012s
                </Text>
              </ScrollView>
            </View>
            <TouchableOpacity style={styles.GuiaDocentContainer}>
              <Text style={styles.text}>Veure Guia Docent</Text>
            </TouchableOpacity>
            <View style={styles.registerButton}>
              <BaseButton title="Següent" btnColor={Colors.primary} />
            </View>
          </View>
        </View>
      </View>
    </View>
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
    borderColor: Colors.white,
    borderWidth: 1,
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
    width: Window.width * 0.8,
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
    marginTop: 5,
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
    lineHeight: 17,
    textAlign: 'center',
    color: Colors.white,
  },
  registerButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
