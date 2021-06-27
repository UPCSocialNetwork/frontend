import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Image, Modal, Text, ScrollView, FlatList } from 'react-native';
import BaseButton from '../components/BaseButton';
import { useFonts } from 'expo-font';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../constants/axios';
import BackHeader from '../components/BackHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileInfoScreen({ navigation }) {
  const [user, setUser] = useState(navigation.getParam('user'));
  const [visitUser, setVisitUser] = useState(navigation.getParam('visitUser'));

  const [isAssigModalVisible, setAssigModalVisible] = useState(false);
  const [userData, setUserData] = useState([
    {
      nomUsuari: '',
      mail: '',
      descripcio: '',
      centreID: '',
      grauID: '',
      interessos: [''],
      LlistaAssignatures: [''],
    },
  ]);

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  const url = 'https://randomuser.me/api/portraits/men/1.jpg';

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
    async function getUserData() {
      let response = null;
      try {
        response = await axios.get(`estudiant/${visitUser}`);
        let est = response.data.estudiant;
        setUserData({
          ...userData,
          nomUsuari: est.nomUsuari,
          mail: est.mail,
          descripcio: est.descripcio,
          centreID: est.centreID,
          grauID: est.grauID,
          interessos: est.interessos,
          LlistaAssignatures: est.LlistaAssignatures,
        });
      } catch (err) {
        console.error(err);
      }
    }
    getUserData();
  }, []);

  if (!loaded) {
    return null;
  }

  const Item = ({ nom }) => (
    <View style={styles.item}>
      <Text style={styles.nomItem}>{nom}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item nom={item} />;

  const renderItemAssig = ({ item }) => (
    <View style={styles.itemAssig}>
      <Text style={styles.itemAssigTextBold}>
        <Text style={styles.itemAssigTextBold}>{item.nomSigles}</Text>
        <Text> - {item.nomComplet}</Text>
      </Text>
      {item.quad === 1 || item.quad === 2 ? <Text style={styles.itemAssigText}>Curs 1 - Q{item.quad}</Text> : null}
      {item.quad === 3 || item.quad === 4 ? <Text style={styles.itemAssigText}>Curs 2 - Q{item.quad}</Text> : null}
      {item.quad === 5 || item.quad === 6 ? <Text style={styles.itemAssigText}>Curs 3 - Q{item.quad}</Text> : null}
      {item.quad === 7 || item.quad === 8 ? <Text style={styles.itemAssigText}>Curs 4 - Q{item.quad}</Text> : null}
    </View>
  );

  const onPressAssig = () => {
    changeModalVisibility(true);
  };

  const changeModalVisibility = (bool) => {
    setAssigModalVisible(bool);
  };

  const esborrarXat = async () => {
    try {
      await axios.delete(`/missatge/xat/${user.room}`);
      await axios.delete(`/participant/xat/${user.room}`);
      await axios.delete(`/Xat/${user.room}`);
    } catch (e) {
      console.error(e);
    }
    let tipusXat = 'privs';
    navigation.replace('listXatScreen', { user, tipusXat });
  };

  const modificaHandler = () => {
    navigation.replace('ModificarPerfil', { userData, user, visitUser });
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.removeItem('userSession');
      navigation.replace('Login');
    } catch (e) {
      console.log(e);
    }
  };

  const enviarMissatgeHandler = async () => {
    try {
      let response = await axios.get(`Xat/Parts/${user.nomUsuari}/${visitUser}`);
      if (response.data != false) {
        let responsePart = await axios.get(`/participant/${user.nomUsuari}/${response.data[0]._id}`);
        const newUser = {
          nomUsuari: user.nomUsuari,
          room: response.data[0]._id,
          participant: responsePart.data.participant._id,
          tipusXat: 'privs',
          titol: visitUser,
        };
        navigation.replace('ChatScreen', { user: newUser });
      } else {
        const newUser = {
          nomUsuari: user.nomUsuari,
          room: 'none',
          participant: 'none',
          tipusXat: 'privs',
          titol: visitUser,
        };
        navigation.replace('ChatScreen', { user: newUser });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.greySeparator,
        }}
      />
    );
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.white, flex: 1 }}>
      <BackHeader
        onPress={() => {
          let tipusXat = 'grups';
          if (user.titol === 'none') navigation.replace('listXatScreen', { user, tipusXat });
          else if (user.tipusXat === 'privs' && user.titol !== 'none') navigation.replace('ChatScreen', { user });
          else if (user.tipusXat === 'XatCerca') {
            let tipusCerca = 'all';
            const newUser = {
              nomUsuari: user.nomUsuari,
              room: 'none',
              participant: 'none',
              tipusXat: 'privs',
              titol: visitUser,
            };
            let listType = 'privs';
            navigation.replace('SearchScreen', { listType, user: newUser, tipusCerca });
          } else navigation.replace('GrupInfoScreen', { user });
        }}
      ></BackHeader>
      <View style={styles.header}>
        <Text style={styles.nom}>{userData.nomUsuari}</Text>
        <Text style={styles.mail}>{userData.mail}</Text>
        <View style={styles.centreGrau}>
          <Text style={styles.textCentre}>
            {userData.centreID} - {userData.grauID}
          </Text>
        </View>
        <Image style={styles.imageProfile} source={{ uri: url }} />
      </View>
      <Text style={styles.descripcioTitle}>Descripció</Text>
      <View style={styles.border}>
        <Text style={styles.textArea} numberOfLines={4}>
          {userData.descripcio}
        </Text>
      </View>
      <Text style={styles.interessosTitle}>{'Interessos'}</Text>
      <View style={styles.list}>
        <FlatList
          horizontal
          keyExtractor={(index) => index.toString()}
          renderItem={renderItem}
          data={userData.interessos}
          contentContainerStyle={{ paddingBottom: 5 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.btn}>
        <TouchableOpacity onPress={onPressAssig}>
          <View style={styles.button}>
            <Text style={styles.text}>Veure assignatures de l'estudiant</Text>
          </View>
          <Modal
            animationType="fade"
            presentationStyle="fullScreen"
            visible={isAssigModalVisible}
            style={styles.modal}
            onRequestClose={() => {
              changeModalVisibility(false);
            }}
          >
            <TouchableOpacity onPress={() => changeModalVisibility(false)}>
              <View style={styles.goBack}>
                <View style={styles.goBackView}>
                  <Icon name="arrow-left" size={20} color={Colors.primary} />
                </View>
                <Text style={styles.textEnrere}> Enrere </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.llistatView}>
              <Text style={styles.llistatText}>LLISTAT ASSIGNATURES</Text>
            </View>
            <View style={styles.assigView}>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItemAssig}
                data={userData.LlistaAssignatures}
                contentContainerStyle={{ flexGrow: 1 }}
                ItemSeparatorComponent={FlatListItemSeparator}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
      {user.tipusXat === 'privs' && user.titol !== 'none' ? (
        <View style={styles.btnLast}>
          <BaseButton onPress={esborrarXat} title="Esborrar xat" btnColor={Colors.red} />
        </View>
      ) : null}
      {user.tipusXat === 'XatAssignatura' ||
      user.tipusXat === 'XatMentor' ||
      user.tipusXat === 'XatGrupTancat' ||
      user.tipusXat === 'XatCerca' ? (
        <View style={styles.btnLast}>
          <BaseButton onPress={enviarMissatgeHandler} title="Enviar missatge" btnColor={Colors.primary} />
        </View>
      ) : null}
      {user.titol === 'none' ? (
        <View>
          <View style={styles.btnLast}>
            <BaseButton onPress={modificaHandler} title="Modificar" btnColor={Colors.primary} />
          </View>
          <View style={styles.btnLastLogout}>
            <BaseButton onPress={logoutHandler} title="Tancar sessió" btnColor={Colors.red} />
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  goBack: {
    height: 30,
    flexDirection: 'row',
    marginLeft: 15,
    marginTop: 15,
  },
  goBackView: {
    backgroundColor: Colors.lightBlue,
    borderRadius: 50,
    height: '100%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  textEnrere: {
    fontFamily: 'InterBold',
    fontSize: 16,
    color: Colors.primary,
  },
  llistatView: {
    justifyContent: 'center',
    alignSelf: 'center',
    height: Window.height * 0.1,
    marginBottom: 40,
    width: Window.width * 0.87,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey,
  },
  llistatText: {
    textAlign: 'center',
    fontFamily: 'InterSemiBold',
    fontSize: 20,
    color: Colors.secondary,
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
  imageProfile: {
    width: Window.width * 0.33,
    aspectRatio: 1,
    marginTop: 15,
    borderRadius: 100,
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
  descripcioTitle: {
    fontFamily: 'InterSemiBold',
    fontSize: 15,
    color: Colors.secondary,
    marginTop: 20,
    marginLeft: Window.width * 0.08,
  },
  border: {
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.lightBlack,
    width: Window.width * 0.85,
    height: 90,
  },
  textArea: {
    fontSize: 16,
    textAlign: 'justify',
    paddingTop: 3,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  interessosTitle: {
    marginTop: 20,
    alignSelf: 'center',
    fontFamily: 'InterBold',
  },
  list: {
    width: Window.width * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  btnLast: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  btnLastLogout: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
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
  },
  modal: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  assigView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
  itemAssig: {
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    justifyContent: 'center',
    paddingTop: 5,
    paddingBottom: 5,
  },
  itemAssigTextBold: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: '96%',
    alignSelf: 'center',
    color: Colors.secondary,
  },
  itemAssigText: {
    textAlign: 'center',
    width: '96%',
    alignSelf: 'center',
    color: Colors.secondary,
  },
  button: {
    width: Window.width * 0.688,
    height: 37,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.yellow,
  },
  text: {
    width: '100%',
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: Colors.secondary,
  },
});

export default ProfileInfoScreen;
