import React, { useState, useEffect } from 'react';
import { View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
import BackHeader from '../components/BackHeader';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import ModalPicker from '../components/ModalPicker';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import BaseButton from '../components/BaseButton';

export default function SearchScreen({ navigation }) {
  const [searchType, setSearchType] = useState(navigation.getParam('listType'));
  const [tipusCerca, setTipusCerca] = useState(navigation.getParam('tipusCerca'));
  const [search, setSearch] = useState('');
  const [actualGrau, setActualGrau] = useState('Tots els graus');
  const [isGrauModalVisible, setGrauModalVisible] = useState(false);
  const [Graus, setGraus] = useState([]);
  const [Users, setUsers] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState(navigation.getParam('user'));
  const [userSelected, setUserSelected] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [inicialsUser, setInicialsUser] = useState();

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    async function fetchData() {
      let responseGrau = null;
      let responseUsers = null;
      try {
        responseGrau = await axios.get('/grau/getAll');
        let totGraus = { _id: 'none', centreUniversitariID: 'none', credits: 0, nom: 'Tots els graus' };
        responseGrau.data.grau.unshift(totGraus);
        responseUsers = await axios.get('/estudiant');
        responseUsers.data.estudiant.map((element, index) => {
          if (element.nomUsuari === user.nomUsuari) responseUsers.data.estudiant.splice(index, 1);
        });
        responseUsers.data.estudiant.sort(function (a, b) {
          return b.nomUsuari < a.nomUsuari;
        });
        if (tipusCerca === 'all') {
          setUsers(responseUsers.data.estudiant);
          setFilterData(responseUsers.data.estudiant);
          setGraus(responseGrau.data.grau);
        } else {
          if (searchType === 'privs') {
            let responseXats = await axios.get(`/estudiant/xats/${user.nomUsuari}`);
            responseXats = responseXats.data.xatsFinals;
            let index = responseUsers.data.estudiant.length - 1;
            let element;
            while (index >= 0) {
              element = responseUsers.data.estudiant[index];
              responseXats.forEach((xat) => {
                if (xat[2] === element.nomUsuari) {
                  responseUsers.data.estudiant.splice(index, 1);
                }
              });
              index -= 1;
            }
          }
          setUsers(responseUsers.data.estudiant);
          setFilterData(responseUsers.data.estudiant);
          setGraus(responseGrau.data.grau);
        }
      } catch (error) {
        console.error(error);
      }
      return responseGrau + responseUsers;
    }
    fetchData();
  }, []);

  // Filter Grau
  useEffect(() => {
    function setFilteredDataOnFlatlist() {
      const newData = Users.filter((item) => {
        if (item.grauID === actualGrau || actualGrau === 'Tots els graus') return item;
      });
      setFilterData(newData);
    }
    setFilteredDataOnFlatlist();
  }, [actualGrau]);

  if (!loaded) {
    return null;
  }

  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const changeModalVisibility = (bool) => {
    setGrauModalVisible(bool);
  };

  const isGrauChosen = () => {
    changeModalVisibility(true);
  };

  const Title = ({ text }) => {
    return <Text style={styles.titleText}>{text}</Text>;
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = Users.filter((item) => {
        if (item.grauID === actualGrau || actualGrau === 'Tots els graus') {
          const itemData = item.nomUsuari ? item.nomUsuari.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      const newData = Users.filter((item) => {
        if (item.grauID === actualGrau || actualGrau === 'Tots els graus') {
          return item;
        }
      });
      setFilterData(newData);
      setSearch(text);
    }
  };

  const GrauButton = () => {
    return (
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
              userInfo={null}
              dataList={Graus}
              type="canviGrau"
            ></ModalPicker>
          </Modal>
        </TouchableOpacity>
      </View>
    );
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          alignSelf: 'center',
          backgroundColor: Colors.greySeparator,
        }}
      />
    );
  };

  const itemPrivPress = (receiverName) => {
    if (tipusCerca === 'all') {
      const newUser = {
        nomUsuari: user.nomUsuari,
        room: 'none',
        participant: 'none',
        tipusXat: 'XatCerca',
        titol: receiverName,
      };
      let visitUser = receiverName;
      navigation.replace('ProfileInfoScreen', { user: newUser, visitUser });
    } else {
      const newUser = {
        nomUsuari: user.nomUsuari,
        room: 'none',
        participant: 'none',
        tipusXat: 'privs',
        titol: receiverName,
      };
      navigation.replace('ChatScreen', { user: newUser });
    }
  };

  const itemGrupPress = (item) => {
    if (userSelected.find((element) => element.id === item._id)) {
      let index = userSelected.findIndex((element) => element.id === item._id);
      onPressCircle(index);
    } else {
      let inicials = item.nomUsuari[0].toUpperCase();
      inicials = inicials + item.nomUsuari.split('.')[1][0].toUpperCase();
      let userSelectedAux = userSelected;
      var data = { id: item._id, inicials: inicials, nomUsuari: item.nomUsuari };
      userSelectedAux.push(data);
      setUserSelected(userSelectedAux);
      setRefresh(!refresh);
    }
  };

  const renderItemPrivs = ({ item, index }) => (
    <TouchableOpacity activeOpacity={0.6} onPress={() => itemPrivPress(item.nomUsuari)}>
      <View style={styles.card}>
        <View style={styles.imageViewParent}>
          <View style={styles.imageProfile}>
            <Text style={styles.textImage}>
              {item.nomUsuari[0].toUpperCase() + item.nomUsuari.split('.')[1][0].toUpperCase()}
            </Text>
          </View>
          {/*
          <View style={styles.imageView}>
            <Image
              style={styles.imageChat}
              source={{ uri: `https://randomuser.me/api/portraits/men/${index + 1}.jpg` }}
            />
          </View>
          */}
        </View>
        <View style={styles.userViewParent}>
          <View style={styles.userView}>
            <Text style={styles.nom} numberOfLines={1} ellipsizeMode="tail">
              {item.nomUsuari}
            </Text>
            <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
              {item.grauID}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItemGrups = ({ item, index }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => itemGrupPress(item)}
      style={userSelected.find((element) => element.id === item._id) ? styles.pressed : styles.notPressed}
    >
      <View style={styles.card}>
        <View style={styles.imageViewParent}>
          <View style={styles.imageProfile}>
            <Text style={styles.textImage}>
              {item.nomUsuari[0].toUpperCase() + item.nomUsuari.split('.')[1][0].toUpperCase()}
            </Text>
          </View>
          {/*
          <View style={styles.imageView}>
            <Image
              style={styles.imageChat}
              source={{ uri: `https://randomuser.me/api/portraits/men/${index + 1}.jpg` }}
            />
          </View>
          */}
        </View>
        <View style={styles.userViewParent}>
          <View style={styles.userView}>
            <Text style={styles.nom} numberOfLines={1} ellipsizeMode="tail">
              {item.nomUsuari}
            </Text>
            <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
              {item.grauID}
            </Text>
          </View>
        </View>
        {userSelected.find((element) => element.id === item._id) ? (
          <View>
            <View style={styles.optionsView}>
              <MaterialIcons name="done" style={styles.optionsIcon} />
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  const ListUsersPrivs = () => {
    return (
      <View style={styles.flatListViewPrivs}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemPrivs}
          data={filterData}
          ItemSeparatorComponent={FlatListItemSeparator}
        />
      </View>
    );
  };

  const onPressCircle = (index) => {
    let userSelectedAux = userSelected;
    userSelectedAux.splice(index, 1);
    setUserSelected(userSelectedAux);
    setRefresh(!refresh);
  };

  const renderUserSelected = ({ item, index }) => (
    <TouchableOpacity style={styles.item} onPress={() => onPressCircle(index)}>
      <Text style={styles.nomItem}>{item.inicials}</Text>
      <View style={styles.circle}>
        <MaterialIcons style={styles.icon} name="close" size={14} color={Colors.black} />
      </View>
    </TouchableOpacity>
  );

  const creaGrupHandler = () => {
    let me = {
      id: '0',
      inicials: 'ME',
      nomUsuari: user.nomUsuari,
    };
    let llistatEstudiants = userSelected;
    if (!userSelected.find((item) => (item.nomUsuari === me.nomUsuari ? true : false))) llistatEstudiants.push(me);
    navigation.navigate('CreateGrup', { llistatEstudiants });
  };

  const ListUsersGrups = () => {
    return (
      <View style={styles.flatListViewGrups}>
        {userSelected.length > 0 ? (
          <View style={styles.userSelected}>
            <FlatList
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderUserSelected}
              data={userSelected}
              extraData={refresh}
              contentContainerStyle={{ paddingBottom: 5 }}
            />
          </View>
        ) : (
          <View style={styles.userSelected0}>
            <Text style={styles.textIntegrants}>Cap integrant</Text>
          </View>
        )}
        <View style={styles.flatView}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItemGrups}
            data={filterData}
            extraData={refresh}
            ItemSeparatorComponent={FlatListItemSeparator}
          />
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={creaGrupHandler} activeOpacity={0.5} style={styles.touchable}>
            <View style={[styles.button, { backgroundColor: Colors.primary }]}>
              <Text style={styles.text}>Següent</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.backgroundView}>
      <View style={styles.header}>
        <BackHeader
          onPress={() => {
            let tipusXat;
            {
              user.tipusXat === 'privs' ? (tipusXat = 'privs') : (tipusXat = 'grups');
            }
            navigation.replace('listXatScreen', { user, tipusXat });
          }}
        ></BackHeader>
      </View>
      <View style={styles.titleView}>
        {searchType === 'privs' ? (
          <Title text={'Cerca un estudiant'} />
        ) : (
          <Title text={'Afegeix els integrants del grup'} />
        )}
      </View>
      <View style={styles.searchBloc}>
        <TextInput
          style={styles.dropdown}
          value={search}
          placeholder="Cerca estudiant..."
          underlineColorAndroid="transparent"
          onChangeText={(text) => searchFilter(text)}
        ></TextInput>
        <MaterialIcons style={styles.iconSearch} name="search" size={25} color={Colors.secondary} />
      </View>
      <GrauButton></GrauButton>
      {searchType === 'privs' ? <ListUsersPrivs></ListUsersPrivs> : <ListUsersGrups></ListUsersGrups>}
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundView: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  titleView: {
    justifyContent: 'center',
    width: Window.width,
    alignItems: 'center',
    marginTop: 5,
  },
  titleText: {
    fontFamily: 'InterSemiBold',
    fontSize: 18,
  },
  searchBloc: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
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
  flatListViewPrivs: {
    marginTop: 15,
    flex: 1,
  },
  flatListViewGrups: {
    flex: 1,
  },
  userSelected: {
    height: 80,
    marginLeft: 7,
    marginRight: 7,
    marginLeft: Window.width * 0.041,
  },
  flatView: {
    height: 330,
  },
  flatViewEmpty: {
    marginTop: 10,
    height: 400,
  },
  userSelected0: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textIntegrants: {
    fontFamily: 'InterMedium',
    fontSize: 18,
    color: Colors.lightBlack,
  },
  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 80,
    width: '100%',
    flexDirection: 'row',
  },
  imageViewParent: {
    justifyContent: 'center',
    marginLeft: Window.width * 0.06,
    width: Window.width * 0.1333,
  },
  imageProfile: {
    width: Window.width * 0.1333,
    height: Window.width * 0.1333,
    borderRadius: 50,
    justifyContent: 'center',
    backgroundColor: Colors.lightBlue,
    borderColor: Colors.white,
    borderWidth: 1,
  },
  textImage: {
    textAlign: 'center',
    fontFamily: 'InterSemiBold',
    fontSize: 16,
  },
  imageView: {
    height: Window.width * 0.1333,
  },
  imageChat: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userViewParent: {
    marginLeft: Window.width * 0.032,
    justifyContent: 'center',
    width: Window.width * 0.64,
  },
  userView: {
    height: '80%',
  },
  nom: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: Colors.secondary,
    width: '95%',
  },
  message: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: Colors.blueGrey,
    paddingTop: 2,
  },
  itemParent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    height: '100%',
  },
  item: {
    backgroundColor: Colors.blue,
    height: '70%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginLeft: 7,
    marginRight: 7,
    borderRadius: 50,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nomItem: {
    fontSize: 17,
  },
  circle: {
    height: '35%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderColor: Colors.white,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Window.width * 0.85,
    height: 55,
    borderRadius: 8,
  },
  text: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 22,
    textAlign: 'center',
    color: Colors.white,
  },
  touchable: {
    borderRadius: 8,
  },
  pressed: {
    backgroundColor: Colors.blue,
  },
  notPressed: {},
  optionsView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: Window.width * 0.02,
  },
  optionsIcon: {
    fontSize: 25,
    color: Colors.primary,
  },
});
