import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import BaseButton from '../components/BaseButton';
import BackHeader from '../components/BackHeader';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function RegisterAssigScreen({ navigation }) {
  const [newUser, setNewUser] = useState(navigation.getParam('newUser'));
  const [errorText, setErrorText] = useState({
    errorMsg: 'Selecciona com a mínim una assignatura',
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
    BackHandler.addEventListener('hardwareBackPress', () => true);
  }, []);

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
              quad: assig.quadrimestre,
              chosen: isChosen(assig.nomComplet),
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

  const isChosen = (assigNom) => {
    let index = newUser.LlistaAssignatures.findIndex((e) => {
      return e.nomComplet === assigNom;
    });
    if (index >= 0) return true;
    else return false;
  };

  if (!loaded) {
    return null;
  }

  const isAssigChosen = () => {
    if (newUser.LlistaAssignatures.length > 0) {
      setErrorText({ ...errorText, errorStatus: false });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
  };

  const registerAssigHandler = () => {
    let notprimer = newUser.LlistaAssignatures.find((assig) => {
      return assig.quad != 1 && assig.quad != 2;
    });
    if (newUser.LlistaAssignatures.length > 0) {
      setErrorText({ ...errorText, errorStatus: false });
      if (notprimer) navigation.navigate('RegisterMentor2', { newUser });
      else navigation.navigate('RegisterMentor1', { newUser });
    } else {
      setErrorText({ ...errorText, errorStatus: true });
    }
  };

  const setChosen = (item, action) => {
    let chosenAux = newUser.LlistaAssignatures;
    if (action) {
      chosenAux.push({
        nomComplet: item.nomComplet,
        nomSigles: item.nomSigles,
        quad: item.quad,
        grauID: newUser.grauID,
      });
      setNewUser({
        ...newUser,
        LlistaAssignatures: chosenAux,
      });
    } else {
      let index = chosenAux.findIndex(function (elem) {
        return elem.nomComplet === item.nomComplet;
      });
      if (index >= 0) {
        chosenAux.splice(index, 1);
      }
      setNewUser({
        ...newUser,
        LlistaAssignatures: chosenAux,
      });
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.ListAssigItem}>
      <Text style={styles.ListAssigText} numberOfLines={1} ellipsizeMode="tail">
        {item.nomSigles} - {item.nomComplet}
      </Text>
      <TouchableOpacity
        activeOpacity={0.5}
        style={!item.chosen ? styles.ListAssigAdd : styles.ListAssigDelete}
        onPress={() => {
          if (newUser.LlistaAssignatures.length < 6 || item.chosen) {
            let auxList = listAssignatura;
            auxList[index].chosen = !auxList[index].chosen;
            setChosen(item, item.chosen);
            setChange(change === 'add' ? 'delete' : 'delete');
            setListAssignatura(auxList);
            isAssigChosen();
          }
        }}
      >
        <MaterialIcons style={{ marginEnd: 0 }} name={!item.chosen ? 'add' : 'delete'} size={25} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );

  const renderChosenItem = ({ item }) => (
    <View style={styles.ChosenAssigItem}>
      <Text style={styles.ChosenAssigItemText}>{item.nomSigles}</Text>
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
            <View style={styles.ListAssig} resetScrollToCoords={{ x: 0, y: 0 }}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                data={listAssignatura}
                extraData={change}
                contentContainerStyle={{ paddingBottom: 5 }}
                showsVerticalScrollIndicator={false}
              />
            </View>
            <View style={styles.ChosenAssig}>
              <Text style={styles.textChosenAssig}>Assignatures escollides</Text>
              <View style={styles.textErrorInputs}>
                {!errorText.errorStatus ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorText}>{errorText.errorMsg}</Text>
                  </Animatable.View>
                )}
              </View>
              <View style={styles.ChosenAssigContainer}>
                <FlatList
                  horizontal
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={renderChosenItem}
                  data={newUser.LlistaAssignatures}
                  //extraData={change}
                  contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            </View>
            <View style={styles.registerButton}>
              <BaseButton onPress={registerAssigHandler} title="Següent" btnColor={Colors.primary} />
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
  ChosenAssig: {
    flex: 1,
    width: Window.width * 0.9,
  },
  ChosenAssigContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ChosenAssigItem: {
    width: 85,
    height: '93%',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
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
  },
  ChosenAssigItemText: {
    fontFamily: 'InterMedium',
    fontSize: 15,
  },
  textChosenAssig: {
    fontFamily: 'InterSemiBold',
    marginLeft: 5,
    fontSize: 17,
    color: Colors.secondary,
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
  registerButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
