import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
  BackHandler,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import InteresListItem from '../components/InteresListItem';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterProfileScreen({ navigation }) {
  const [newUser, setNewUser] = useState(navigation.getParam('user'));
  const [register, setRegister] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inteSelect, setInteSelect] = useState([]);

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  const random = Math.floor(Math.random() * 100);
  const url = 'https://randomuser.me/api/portraits/men/' + random + '.jpg';

  const dataFlatlist = [
    'Cuina',
    'Esports',
    'Tecnologia',
    'Política',
    'Religió',
    'Videojocs',
    'Oci nocturn',
    'Viatjar',
    'Lectura',
    'Passejar',
    'Mascotes',
    'Filosofia',
    'Amor',
    'Moda',
  ];

  useEffect(() => {
    if (register) createUser();
  }, [newUser]);

  const goBackHandler = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBackHandler);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBackHandler);
  }, []);

  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }) => (
    <InteresListItem titol={item} setInteSelect={setInteSelect} inteSelect={inteSelect}></InteresListItem>
  );

  const renderItemInt = ({ item }) => <Item nom={item} />;

  const Item = ({ nom }) => (
    <View style={styles.item}>
      <Text style={styles.nomItem}>{nom}</Text>
    </View>
  );

  async function crearUsuariHandler() {
    let responseXatMentor = null;
    let responseXatAssig = null;
    try {
      if (newUser.esMentor) {
        //CREAR XAT MENTOR
        responseXatMentor = await axios.post(
          '/XatMentor',
          {
            mentorID: newUser.nomUsuari,
            titol: 'XatMentor ' + newUser.nomUsuari,
            descripcio: 'MailMentor: ' + newUser.mail,
            imatge: 'none',
            ultimMissatgeID: 'none',
          },
          { 'Content-Type': 'application/json' },
        );
        setNewUser({
          ...newUser,
          xatMentorID: responseXatMentor.data.XatMentor._id,
        });

        //CREAR PARTICIPANT XAT MENTOR
        createParticipant(responseXatMentor.data.XatMentor._id);
      } else {
        createUser();
        //CREAR PARTICIPANT XAT MENTOR
        if (newUser.xatMentorID != 'none') createParticipant(newUser.xatMentorID);
      }

      //CREAR PARTICIPANTES POR XAT ASSIGNATURA
      responseXatAssig = await axios.post(
        '/XatAssignatura/getXatAssig',
        {
          LlistaAssignatures: newUser.LlistaAssignatures,
        },
        { 'Content-Type': 'application/json' },
      );

      responseXatAssig.data.xatAssignatura.forEach((Xatassig) => {
        createParticipant(Xatassig._id);
      });
      navigation.navigate('Login');
    } catch (error) {
      console.log('USUARI HANDLER:', error);
    }
  }

  async function createUser() {
    let responseEstudiant = null;
    try {
      responseEstudiant = await axios.post('/estudiant/auth/signup', newUser, { 'Content-Type': 'application/json' });
    } catch (error) {
      console.log('CREATE USER:', error);
    }
  }

  async function createParticipant(xatID) {
    let responseParticipant = null;
    try {
      responseParticipant = await axios.post(
        '/participant',
        {
          estudiantID: newUser.nomUsuari,
          xatID: xatID,
          ultimaLectura: 0,
          notificacions: 'Activat',
          bloqueigGrup: 'Desactivat',
        },
        { 'Content-Type': 'application/json' },
      );
    } catch (error) {
      console.log('CREATE PARTICIPANT:', error);
    }
  }

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
          <View style={styles.imageProfile}>
            <Text style={styles.textImage}>Afegeix una foto</Text>
          </View>
          {/*<Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />*/}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.textInfo}>Descripció</Text>
      </View>
      <View style={styles.border}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <TextInput
            style={styles.textArea}
            placeholder="Escriu la teva descripció..."
            underlineColorAndroid="transparent"
            multiline={true}
            onChangeText={(text) =>
              setNewUser({
                ...newUser,
                descripcio: text,
              })
            }
          ></TextInput>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.5} style={styles.btnInteres}>
        <Text style={styles.textBtnInteres}>Selecciona els teus interessos</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        visible={modalVisible}
        presentationStyle="fullScreen"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.flatListView}>
          <FlatList
            numColumns={'2'}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            data={dataFlatlist}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.btnModalView}>
          <BaseButton
            onPress={() => {
              setNewUser({
                ...newUser,
                interessos: inteSelect,
              });
              setModalVisible(false);
            }}
            title="Continuar"
            btnColor={Colors.primary}
          />
        </View>
      </Modal>
      {inteSelect.length > 0 ? (
        <View style={styles.interessosView}>
          <Text style={styles.interessosTitle}>{'Interessos'}</Text>
          <View style={styles.flatInteressos}>
            <FlatList
              horizontal
              keyExtractor={(index) => index.toString()}
              renderItem={renderItemInt}
              data={inteSelect}
              contentContainerStyle={{ paddingBottom: 5 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      ) : (
        <View style={styles.interessosView}>
          <Text style={styles.interessosTitle}></Text>
          <View style={styles.flatInteressos}>
            <FlatList
              horizontal
              keyExtractor={(index) => index.toString()}
              renderItem={renderItemInt}
              data={inteSelect}
              contentContainerStyle={{ paddingBottom: 5 }}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      )}
      <View style={styles.btnLast}>
        <BaseButton
          onPress={() => {
            setRegister(true);
            crearUsuariHandler();
          }}
          title="Crear usuari"
          btnColor={Colors.primary}
        />
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
    width: Window.width * 0.3,
    height: Window.width * 0.3,
    marginTop: 30,
  },
  imageProfile: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  textImage: {
    textAlign: 'center',
    fontFamily: 'InterMedium',
    color: Colors.addImageColor,
    fontSize: 14,
  },
  textInfo: {
    fontFamily: 'InterBold',
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.secondary,
    marginTop: 20,
  },
  descripcioTitle: {
    fontFamily: 'InterBold',
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.secondary,
  },
  border: {
    marginTop: 10,
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
  btnInteres: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: Window.width * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 8,
    backgroundColor: Colors.yellow,
    elevation: 1,
  },
  touchable: {
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  textBtnInteres: {
    fontFamily: 'InterMedium',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.white,
    borderRadius: 8,
  },
  flatListView: {
    marginTop: Window.height * 0.03,
    height: Window.height * 0.85,
    marginLeft: Window.width * 0.02,
    marginRight: Window.width * 0.02,
  },
  btnModalView: {
    height: Window.height * 0.12,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button1: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Window.height * 0.08,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    elevation: 1,
    width: '92%',
    alignSelf: 'center',
  },
  interessosView: {
    marginTop: 30,
    flex: 1,
    height: Window.height * 0.1,
  },
  interessosTitle: {
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.secondary,
    fontFamily: 'InterBold',
    alignSelf: 'center',
  },
  flatInteressos: {
    marginTop: 10,
    height: '75%',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: Colors.lightGrey,
    padding: 10,
    marginHorizontal: 7,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
    width: Window.width * 0.23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLast: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
});
