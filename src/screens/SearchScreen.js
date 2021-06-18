import React, { useState, useEffect } from 'react';
import { View, StatusBar, StyleSheet, Text, TouchableOpacity, Modal, FlatList, TextInput } from 'react-native';
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
  const [errorMentor, setErrorMentor] = useState(false);
  const [mentorActiu, setMentorActiu] = useState({
    nomUsuari: 'none',
    Grau: 'none',
    xatMentorID: 'none',
  });

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

  const SearchInput = () => {
    return (
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
    );
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

  const renderItem = ({ item }) => <Text></Text>;

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

  const ListUsers = () => {
    return (
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
      <SearchInput></SearchInput>
      <GrauButton></GrauButton>
      <ListUsers></ListUsers>
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
});
