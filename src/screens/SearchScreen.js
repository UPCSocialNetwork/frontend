import React, { useState, useEffect } from 'react';
import { View, Image, StatusBar, StyleSheet, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
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

export default function SearchScreen({ navigation }) {
  const [searchType, setSearchType] = useState(navigation.getParam('listType'));
  const [search, setSearch] = useState('');
  const [actualGrau, setActualGrau] = useState('Tots els graus');
  const [isGrauModalVisible, setGrauModalVisible] = useState(false);
  const [Graus, setGraus] = useState([]);
  const [Users, setUsers] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState(navigation.getParam('user'));

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
        setUsers(responseUsers.data.estudiant);
        setFilterData(responseUsers.data.estudiant);
        setGraus(responseGrau.data.grau);
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
          backgroundColor: Colors.lightBlack,
        }}
      />
    );
  };

  const itemPrivPress = (receiverName) => {
    // crear chat
    // recoger el id
    // crear participantes con user.nomUsuari y receiverName
    // actualizas user con: user.nomUsuari, room; id recogido del chat, participant: partID con user.nomUsuari, tipusXat: 'privs', titol: receiverName
    // mandas a chat screen con user
    // Si no envia mensaje y tira para atras se borra el chat
    // Si envia mensaje se crea
  };

  const renderItemPrivs = ({ item, index }) => (
    <TouchableOpacity activeOpacity={0.6} onPress={() => itemPrivPress(item.nomUsuari)}>
      <View style={styles.card}>
        <View style={styles.imageViewParent}>
          <View style={styles.imageView}>
            <Image
              style={styles.imageChat}
              source={{ uri: `https://randomuser.me/api/portraits/men/${index + 1}.jpg` }}
            />
          </View>
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

  const ListUsersPrivs = () => {
    return (
      <View style={styles.flatListView}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemPrivs}
          data={filterData}
          ItemSeparatorComponent={FlatListItemSeparator}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  const ListUsersGrups = () => {
    return (
      <View style={styles.flatListView}>
        <View>
          <Text>GRUPS</Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemGrups}
          data={filterData}
          ItemSeparatorComponent={FlatListItemSeparator}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View style={styles.backgroundView}>
      <View style={styles.header}>
        <BackHeader
          onPress={() => {
            navigation.goBack();
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
  header: {
    //marginTop: StatusBar.currentHeight,
  },
  titleView: {
    justifyContent: 'center',
    width: Window.width,
    alignItems: 'center',
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
  flatListView: {
    marginTop: Window.height * 0.02,
    height: Window.height * 0.42,
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
});
