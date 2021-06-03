import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ModalPicker from '../components/ModalPicker';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterMentor1Screen({ navigation }) {
  //const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  const [isModalVisible, setModalVisible] = useState(false);
  const [mentorsData, setMentorsData] = useState([]);
  const [Graus, setGraus] = useState([]);
  const [actualGrau, setActualGrau] = useState('GRAU EN ENGINYERIA INFORMÀTICA DSADSA');
  const [nomMentor, setNomMentor] = useState(['Cerca el teu mentor...']);
  const [isGrauModalVisible, setGrauModalVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    nomUsuari: '',
    mail: '',
    contrasenya: '',
    descripcio: '',
    centreID: '',
    grauID: '',
    esMentor: '',
    interessos: '',
    xatMentorID: '',
    LlistaAssignatures: [],
    LlistaXatGrupTancat: [],
  });

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  const [errorText, setErrorText] = useState({
    errorMsg: `Si vols mentor, l'has d'escollir`,
    errorStatus: false,
  });

  useEffect(() => {
    async function fetchData() {
      let responseMentors = null;
      let responseGrau = null;
      try {
        responseMentors = await axios.get('mentors');
        responseGrau = await axios.get('/grau/getAll');
        setMentorsData(responseMentors.data.mentors);
        setGraus(responseGrau.data.grau);
      } catch (error) {
        console.error(e);
      }
      return responseMentors + responseGrau;
    }
    fetchData();
  }, []);

  if (!loaded) {
    return null;
  }

  const registerMentorHandler = () => {
    if (nomMentor === 'Cerca el teu mentor...') {
      setErrorText({ ...errorText, errorStatus: false });
      //navigation.navigate('RegisterProfile', { newUser });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
  };

  const Item = ({ nom }) => (
    <TouchableOpacity style={styles.cardParent}>
      <View style={styles.card}>
        <Text style={styles.nomItem}>{nom.nomUsuari}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => <Item nom={item} />;

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.lightBlack,
        }}
      />
    );
  };

  const changeModalVisibility = (bool) => {
    setGrauModalVisible(bool);
  };

  const isGrauChosen = () => {
    changeModalVisibility(true);
  };

  return (
    <View style={styles.backgroundView}>
      <BackHeader
        onPress={() => {
          navigation.goBack();
        }}
      ></BackHeader>
      <View>
        <View style={styles.headerContainer}>
          <Text style={styles.textHeader}>Vols ser mentoritzat?</Text>
          <Text style={styles.textHeader}>Selecciona el teu mentor!</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.textErrorInputs}>
            {!errorText.errorStatus ? null : (
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorText}>{errorText.errorMsg}</Text>
              </Animatable.View>
            )}
          </View>
        </View>
        <View style={styles.searchBloc}>
          <TouchableOpacity activeOpacity={0.6} style={styles.dropdown} onPress={() => setModalVisible(true)}>
            <View style={styles.dropdownIcon}></View>
            <View style={styles.dropdownTextContainer}>
              <Text style={styles.dropdownText} numberOfLines={1} ellipsizeMode="tail">
                {nomMentor}
              </Text>
            </View>
            <View style={{ backgroundColor: Colors.black, height: '86%', width: 1 }}></View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <MaterialIcons style={{ marginEnd: 17 }} name="search" size={25} color={Colors.secondary} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.grauBtn}>
          <TouchableOpacity activeOpacity={0.6} style={styles.grauDropdown} onPress={() => isGrauChosen()}>
            <Text style={styles.textBtn} numberOfLines={1} ellipsizeMode="tail">
              {actualGrau}
            </Text>
            <MaterialIcons style={styles.textFilter} name="subject" size={20} color={Colors.secondary} />
            <Modal
              transparent={true}
              animationType="fade"
              visible={isGrauModalVisible}
              onRequestClose={() => {
                changeModalVisibility(false);
              }}
            >
              <ModalPicker
                onPress={() => changeModalVisibility(false)}
                setChoosenData={setActualGrau}
                userInfo={newUser}
                dataList={Graus}
                type="canviGrau"
              ></ModalPicker>
            </Modal>
          </TouchableOpacity>
        </View>
        <View style={styles.flatListView}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            data={mentorsData}
            ItemSeparatorComponent={FlatListItemSeparator}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.registerButton1}>
          <BaseButton onPress={registerMentorHandler} title="Següent" btnColor={Colors.primary} />
        </View>
        <View style={styles.registerButton2}>
          <BaseButton onPress={registerMentorHandler} title="No vull ser mentoritzat" btnColor={Colors.red} />
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
  headerContainer: {
    marginTop: 10,
  },
  textHeader: {
    fontSize: 18,
    fontFamily: 'InterSemiBold',
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  textErrorInputs: {
    alignItems: 'center',
  },
  errorText: {
    fontFamily: 'InterMedium',
    fontSize: 13,
    alignSelf: 'center',
    color: Colors.red,
  },
  dropdown: {
    alignSelf: 'center',
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
    width: Window.width * 0.61,
  },
  dropdownText: {
    fontFamily: 'InterMedium',
    marginRight: 15,
    marginLeft: 15,
    fontSize: 14,
  },
  grauBtn: {
    marginTop: Window.height * 0.02,
    height: Window.height * 0.06,
  },
  grauDropdown: {
    alignSelf: 'center',
    width: Window.width * 0.85,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.grey,
    borderRadius: 8,
    paddingLeft: 10,
  },
  textBtn: {
    borderRadius: 8,
    fontFamily: 'InterMedium',
    fontSize: 16,
    backgroundColor: Colors.grey,
    height: '100%',
    width: '90%',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textFilter: {
    textAlignVertical: 'center',
    marginLeft: '1%',
  },
  flatListView: {
    marginTop: Window.height * 0.02,
    height: Window.height * 0.43,
  },
  card: {
    height: 50,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  nomItem: {
    marginLeft: 10,
    fontSize: 17,
    textAlign: 'center',
  },
  registerButton1: {
    marginBottom: 20,
    alignItems: 'center',
    marginTop: Window.height * 0.02,
  },
  registerButton2: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
