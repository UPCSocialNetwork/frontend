import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ModalPicker from '../components/ModalPicker';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import MentorListItem from '../components/MentorListItem';

export default function RegisterMentor1Screen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [mentorsData, setMentorsData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [Graus, setGraus] = useState([]);
  const [actualGrau, setActualGrau] = useState('Tots els graus');
  const [mentorActiu, setMentorActiu] = useState({
    nomUsuari: 'none',
    Grau: 'none',
    xatMentorID: 'none',
  });
  const [errorMentor, setErrorMentor] = useState(false);
  const [isGrauModalVisible, setGrauModalVisible] = useState(false);
  const [xatMentorReady, setXatMentorReady] = useState(false);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  // const [newUser, setNewUser] = useState({
  //   nomUsuari: '',
  //   mail: '',
  //   contrasenya: '',
  //   descripcio: '',
  //   centreID: '',
  //   grauID: '',
  //   esMentor: '',
  //   interessos: '',
  //   xatMentorID: '',
  //   LlistaAssignatures: [],
  //   LlistaXatGrupTancat: [],
  // });

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  // Errors
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
        setFilterData(responseMentors.data.mentors);
        let totGraus = { _id: 'none', centreUniversitariID: 'none', credits: 0, nom: 'Tots els graus' };
        let grausData = responseGrau.data.grau;
        grausData = grausData.unshift(totGraus);
        setGraus(responseGrau.data.grau);
      } catch (error) {
        console.error(error);
      }
      return responseMentors + responseGrau;
    }
    fetchData();
  }, []);

  /*
  // Get XatMentorID
  useEffect(() => {
    async function getXatMentor() {
      let response = null;
      try {
        response = await axios.get(`XatMentor/${mentorActiu}`);
        let user = newUser;
        user.xatMentorID = response.data.xatMentor._id;
        navigation.navigate('RegisterPerfil', { user });
      } catch (error) {
        console.error(error);
      }
      return response;
    }
    if (xatMentorReady === true) getXatMentor();
  }, [xatMentorReady]);
*/

  // Filter Grau
  useEffect(() => {
    function setFilteredDataOnFlatlist() {
      setErrorText({ ...errorText, errorStatus: false });
      const newData = mentorsData.filter((item) => {
        if (item.Grau === actualGrau || actualGrau === 'Tots els graus') return item;
      });
      setFilterData(newData);
    }
    setFilteredDataOnFlatlist();
  }, [actualGrau]);

  // Error mentor
  useEffect(() => {
    function errorMentorFunc() {
      setErrorText({ errorMsg: `No es pot seleccionar més d'un mentor`, errorStatus: errorMentor });
    }
    errorMentorFunc();
  }, [errorMentor]);

  if (!loaded) {
    return null;
  }

  const registerMentorSeguentHandler = () => {
    if (mentorActiu.nomUsuari === 'none') {
      setErrorText({ errorMsg: `Compte, no has seleccionat cap mentor`, errorStatus: true });
    } else {
      let user = newUser;
      user.xatMentorID = mentorActiu.xatMentorID;
      navigation.navigate('RegisterProfile', { user });
    }
  };

  const registerMentorNoMentorHandler = () => {
    let user = newUser;
    navigation.navigate('RegisterProfile', { user });
  };

  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';
  const renderItem = ({ item }) => (
    <MentorListItem
      mentorActiu={mentorActiu}
      setMentorActiu={setMentorActiu}
      mentor={item}
      setErrorMentor={setErrorMentor}
      //titol={item.nomUsuari}
      //grau={item.Grau}
      imageSrc={url_aux}
      errorText={errorText}
      setErrorText={setErrorText}
    />
  );

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

  const searchFilter = (text) => {
    setErrorText({ ...errorText, errorStatus: false });
    if (text) {
      const newData = mentorsData.filter((item) => {
        if (item.Grau === actualGrau || actualGrau === 'Tots els graus') {
          const itemData = item.nomUsuari ? item.nomUsuari.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      const newData = mentorsData.filter((item) => {
        if (item.Grau === actualGrau || actualGrau === 'Tots els graus') {
          return item;
        }
      });
      setFilterData(newData);
      setSearch(text);
    }
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
          <TextInput
            style={styles.dropdown}
            value={search}
            placeholder="Cerca el teu mentor..."
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
          ></TextInput>
          <MaterialIcons style={styles.iconSearch} name="search" size={25} color={Colors.secondary} />
        </View>
        <View style={styles.grauBtn}>
          <TouchableOpacity activeOpacity={0.6} style={styles.grauDropdown} onPress={() => isGrauChosen()}>
            <Text style={styles.textBtn} numberOfLines={1} ellipsizeMode="tail">
              {actualGrau}
            </Text>
            <MaterialIcons style={styles.textFilter} name="subject" size={20} color={Colors.secondary} />
            <Modal
              animationType="fade"
              visible={isGrauModalVisible}
              presentationStyle="fullScreen"
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
            data={filterData}
            ItemSeparatorComponent={FlatListItemSeparator}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.registerButton1}>
          <BaseButton onPress={registerMentorSeguentHandler} title="Següent" btnColor={Colors.primary} />
        </View>
        <View style={styles.registerButton2}>
          <BaseButton onPress={registerMentorNoMentorHandler} title="No vull ser mentoritzat" btnColor={Colors.red} />
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
  searchBloc: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: Window.width * 0.85,
    borderRadius: 8,
    borderColor: Colors.lightBlack,
    borderWidth: 1,
  },
  dropdown: {
    alignSelf: 'center',
    width: '88%',
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 15,
    fontSize: 17,
    borderWidth: 0,
  },
  iconSearch: {
    marginEnd: 17,
    width: '12%',
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
    paddingLeft: 5,
  },
  textFilter: {
    textAlignVertical: 'center',
    marginLeft: '1%',
  },
  flatListView: {
    marginTop: Window.height * 0.02,
    height: Window.height * 0.42,
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
    marginBottom: 12,
    alignItems: 'center',
    marginTop: Window.height * 0.01,
  },
  registerButton2: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
