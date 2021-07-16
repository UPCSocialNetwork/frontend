import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import { useFonts } from 'expo-font';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import InteresListItem from '../components/InteresListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function ModificarPerfilScreen({ navigation }) {
  const [userSess, setUserSess] = useState(null);
  const [user, setUser] = useState(navigation.getParam('user'));
  const [userData, setUserData] = useState(navigation.getParam('userData'));
  const [modalVisible, setModalVisible] = useState(false);
  const [inteSelect, setInteSelect] = useState(navigation.getParam('userData').interessos);
  const [inicialsUser, setInicialsUser] = useState();

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  /*const random = Math.floor(Math.random() * 100);
  const url = 'https://randomuser.me/api/portraits/men/' + random + '.jpg';*/

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

  const goBackHandler = () => {
    navigation.replace('ProfileInfoScreen', { user, visitUser: userData.nomUsuari });
    return true;
  };

  useEffect(() => {
    async function getData() {
      BackHandler.addEventListener('hardwareBackPress', goBackHandler);
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
      } catch (e) {
        console.log(e);
      }
    }
    getData();
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', goBackHandler);
    };
  }, []);

  useEffect(() => {
    if (userSess != null) {
      let inicials = userSess.nomUsuari[0].toUpperCase();
      inicials = inicials + userSess.nomUsuari.split('.')[1][0].toUpperCase();
      setInicialsUser(inicials);
    }
  }, [userSess]);

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

  async function modificarUsuariHandler() {
    try {
      let updateUser = {
        descripcio: userData.descripcio,
        interessos: userData.interessos,
      };
      let responseEstudiant = await axios.put(`/estudiant/${userData.nomUsuari}`, updateUser, {
        'Content-Type': 'application/json',
      });

      navigation.replace('ProfileInfoScreen', { user, visitUser: userSess.nomUsuari });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={styles.backgroundView}>
      <BackHeader onPress={goBackHandler}></BackHeader>
      <View style={styles.header}>
        <Text style={styles.nom}>{userData.nomUsuari}</Text>
        <Text style={styles.mail}>{userData.mail}</Text>
        <View style={styles.centreGrau}>
          <Text style={styles.textCentre}>
            {userData.centreID} - {userData.grauID}
          </Text>
        </View>
        <TouchableOpacity style={styles.imageView}>
          <View style={styles.imageProfile}>
            <Text style={styles.textImage}>{inicialsUser}</Text>
          </View>
          {/*<Image style={styles.imageProfile} source={require('../assets/images/addimage.png')} />*/}
        </TouchableOpacity>
      </View>
      <View style={styles.ViewTextInfo}>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Text style={styles.textInfo}>Descripció</Text>
          <View style={{ justifyContent: 'center', marginLeft: 8 }}>
            <MaterialIcons style={styles.icon} name="edit" size={14} color={Colors.secondary} />
          </View>
        </View>
        <View style={styles.border}>
          <View style={styles.scroll}>
            <TextInput
              style={styles.textArea}
              placeholder="Escriu la teva descripció..."
              underlineColorAndroid="transparent"
              multiline={true}
              value={userData.descripcio}
              onChangeText={(text) =>
                setUserData({
                  ...userData,
                  descripcio: text,
                })
              }
            ></TextInput>
          </View>
        </View>
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
              setUserData({
                ...userData,
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
            modificarUsuariHandler();
          }}
          title="Guardar"
          btnColor={Colors.primary}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.white,
    marginTop: Window.height * 0.01,
  },
  header: {
    alignItems: 'center',
    marginTop: 15,
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
  centreGrau: {
    flexDirection: 'row',
    width: Window.width * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: Colors.primary,
    padding: 7,
    marginHorizontal: 7,
    borderRadius: 12,
  },
  textCentre: {
    color: Colors.white,
    fontFamily: 'InterMedium',
    fontSize: 12,
    textAlign: 'center',
  },
  imageView: {
    width: Window.width * 0.3,
    height: Window.width * 0.3,
    marginTop: 20,
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
    fontFamily: 'InterSemiBold',
    fontSize: 30,
  },
  ViewTextInfo: {
    flex: 1,
    alignSelf: 'center',
    width: Window.width * 0.85,
    marginTop: 15,
  },
  textInfo: {
    fontFamily: 'InterBold',
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.secondary,
    marginLeft: 2,
  },
  descripcioTitle: {
    fontFamily: 'InterBold',
    fontSize: 15,
    alignSelf: 'center',
    color: Colors.secondary,
    marginTop: 20,
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
    padding: 10,
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
