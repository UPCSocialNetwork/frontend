import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';

import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterAssigScreen({ navigation }) {
  const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  //LlistaAssignatures: [],
  const [errorText, setErrorText] = useState({
    errorMsg: 'Selecciona les opcions correctament.',
    errorStatus: false,
  });
  const [open, setOpen] = useState(false);
  const [quadrimestre, setValue] = useState(1);
  const [items, setItems] = useState([
    { label: 'Q1', value: 1 },
    { label: 'Q2', value: 2 },
    { label: 'Q3', value: 3 },
    { label: 'Q4', value: 4 },
    { label: 'Q5', value: 5 },
    { label: 'Q6', value: 6 },
    { label: 'Q7', value: 7 },
    { label: 'Q8', value: 8 },
  ]);
  const [listAssignatura, setListAssignatura] = useState([]);
  const [change, setChange] = useState(0);

  // Fonts
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  useEffect(() => {
    // Consultas
    async function fetchData() {
      let responseAssig = null;
      try {
        responseAssig = await axios.get(`/assignatura/${newUser.grauID}/${quadrimestre}`);
        let AssigList = responseAssig.data.assignatura.map(
          (assig) =>
            (assig = {
              nomComplet: assig.nomComplet,
              nomSigles: assig.nomSigles,
              choosen: false,
            }),
        );
        setListAssignatura(AssigList);
      } catch (error) {
        console.log(error);
      }
      return responseAssig;
    }
    fetchData();
  }, [quadrimestre]);

  if (!loaded) {
    return null;
  }

  const isCentreChoosen = () => {
    if (newUser.centreID != 'Selecciona el teu centre ...') {
      changeModalVisibility('grau', true);
      setErrorText({ ...errorText, errorStatus: false });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
  };

  const registerAssigHandler = () => {
    /*
    if (newUser.centreID != 'Selecciona el teu centre ...' && newUser.grauID != 'Selecciona el teu grau ...') {
      setErrorText({ ...errorText, errorStatus: false });
      navigation.navigate('RegisterAssig', { newUser });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
    */
  };

  const clickAssigHandler = (index) => {
    let auxList = listAssignatura;
    auxList[index] = !auxList[index].choosen;
    extraData(auxList);
  };

  /*
  const renderItem = ({ item, index }) => (
    <View style={styles.ListAssigItem}>
      <Text style={styles.ListAssigText} numberOfLines={1} ellipsizeMode="tail">
        {item.nomSigles} - {item.nomComplet}
      </Text>
      {!item.choosen ? (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.ListAssigAdd}
          onPress={() => {
            let auxList = listAssignatura;
            auxList[index].choosen = !auxList[index].choosen;
            setChange(!change);
            setListAssignatura(auxList);
          }}
        >
          <Icon style={{ marginEnd: 0 }} name="plus" size={22} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.ListAssigDelete}
          onPress={() => {
            let auxList = listAssignatura;
            auxList[index].choosen = !auxList[index].choosen;
            setChange(!change);
            setListAssignatura(auxList);
          }}
        >
          <Icon style={{ marginEnd: 0 }} name="trash" size={22} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );*/

  const renderItem = ({ item, index }) => (
    <View style={styles.ListAssigItem}>
      <Text style={styles.ListAssigText} numberOfLines={1} ellipsizeMode="tail">
        {item.nomSigles} - {item.nomComplet}
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={!item.choosen ? styles.ListAssigAdd : styles.ListAssigDelete}
        onPress={() => {
          let auxList = listAssignatura;
          auxList[index].choosen = !auxList[index].choosen;
          setChange(change === 'plus' ? 'trash' : 'plus');
          setListAssignatura(auxList);
        }}
      >
        <Icon style={{ marginEnd: 0 }} name={!item.choosen ? 'plus' : 'trash'} size={22} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

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
            <Text style={styles.title}>Assignatures</Text>
            <DropDownPicker
              style={styles.dropDownQ}
              dropDownContainerStyle={{
                color: Colors.secondary,
                backgroundColor: Colors.white,
                alignSelf: 'center',
                width: 120,
              }}
              open={open}
              value={quadrimestre}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
            />
          </View>
          <View style={styles.mainContainer}>
            <View style={styles.ListAssig}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                data={listAssignatura}
                extraData={change}
                contentContainerStyle={{ paddingBottom: 5 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View style={styles.ChoosenAssig}>
              <Text style={styles.textChoosenAssig}>Assignatures escollides</Text>
              <View style={styles.textErrorInputs}>
                {!errorText.errorStatus ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorText}>{errorText.errorMsg}</Text>
                  </Animatable.View>
                )}
              </View>
              <View style={styles.ChoosenAssigContainer}>
                <View style={styles.ChoosenAssigItem}>
                  <Text style={styles.ChoosenAssigItemText}>XASF</Text>
                </View>
                <View style={styles.ChoosenAssigItem}>
                  <Text style={styles.ChoosenAssigItemText}>XASF</Text>
                </View>
              </View>
            </View>
            <View style={styles.registerButton}>
              <BaseButton
                onPress={() => {
                  console.log(listAssignatura);
                  registerAssigHandler();
                }}
                title="Següent"
                btnColor={Colors.primary}
              />
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
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 55,
    width: Window.width * 0.9,
  },
  title: {
    fontFamily: 'InterSemiBold',
    fontWeight: 'bold',
    alignItems: 'flex-start',
    fontSize: 20,
    marginLeft: 5,
    color: Colors.secondary,
  },
  dropDownQ: {
    alignSelf: 'center',
    fontFamily: 'InterMedium',
    fontSize: 14,
    width: 80,
    height: 55,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  ListAssig: {
    paddingTop: 20,
    paddingBottom: 20,
    width: Window.width * 0.9,
    height: Window.height * 0.57,
  },
  ListAssigItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    height: 55,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
  },
  ListAssigText: {
    fontFamily: 'InterMedium',
    width: Window.width * 0.7,
    fontSize: 14,
    padding: 17,
  },
  ListAssigAdd: {
    padding: 10,
    height: 53,
    width: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.primary,
  },
  ListAssigDelete: {
    padding: 10,
    height: 53,
    width: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: Colors.red,
  },
  ChoosenAssig: {
    flex: 1,
    width: Window.width * 0.9,
    height: Window.height * 0.15,
    marginTop: 8,
  },
  ChoosenAssigContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChoosenAssigItem: {
    width: 75,
    height: 75,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.lightBlue,
  },
  ChoosenAssigItemText: {
    fontFamily: 'InterBold',
    fontSize: 14,
  },
  textChoosenAssig: {
    fontFamily: 'InterMedium',
    fontSize: 15,
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
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
});
