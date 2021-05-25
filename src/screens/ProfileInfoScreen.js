import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Image, Text, ScrollView, FlatList } from 'react-native';
import BaseButton from '../components/BaseButton';
import { useFonts } from 'expo-font';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import axios from '../constants/axios';

function ProfileInfoScreen() {
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

  useEffect(() => {
    async function getUserData() {
      let response = null;
      try {
        response = await axios.get('estudiant/cesar.gutierrez');
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

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const Item = ({ nom }) => (
    <View style={styles.item}>
      <Text style={styles.nomItem}>{nom}</Text>
    </View>
  );

  const renderItem = ({ item }) => <Item nom={item} />;

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.nom}>{userData.nomUsuari}</Text>
        <Text style={styles.mail}>{userData.mail}</Text>
        <View style={styles.centreGrau}>
          <Text style={styles.textCentre}>
            {userData.centreID} - {userData.grauID}
          </Text>
        </View>
        <Image style={styles.imageProfile} source={require('../assets/images/user.png')} />
      </View>
      <View style={styles.border}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.textArea}>{userData.descripcio}</Text>
        </ScrollView>
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
        <TouchableNativeFeedback>
          <View style={styles.button}>
            <Text style={styles.text}>Veure assignatures de l'estudiant</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.btnLast}>
        <BaseButton title="Enviar missatge" btnColor={Colors.primary} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: Window.height * 0.1,
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
    width: Window.width * 0.4,
    height: Window.width * 0.4,
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
  border: {
    marginTop: 20,
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
    fontSize: 16,
    textAlign: 'justify',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 7,
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
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Window.width * 0.688,
    height: 37,
    borderRadius: 8,
    backgroundColor: Colors.yellow,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 2,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 4,
  },
  text: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: Colors.secondary,
  },
});

export default ProfileInfoScreen;
