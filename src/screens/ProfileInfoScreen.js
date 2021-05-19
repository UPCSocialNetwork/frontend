import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Image, Text, ScrollView, FlatList } from 'react-native';
import BaseButton from '../components/BaseButton';
import { useFonts } from 'expo-font';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

const DATA = [
  { id: 'sa', nom: 'Futbol' },
  { id: 'adsd', nom: 'Basquet' },
  { id: 'dsf', nom: 'Golf' },
  { id: 'fdsf', nom: 'Tenis' },
  { id: 'fdsf1', nom: 'Cricket' },
  { id: 'fdsf2', nom: 'Leer' },
  { id: 'fdsf3', nom: 'Abecedario' },
  { id: 'fdsf4', nom: 'Saltar a la comba' },
];

const Item = ({ nom }) => (
  <View style={styles.item}>
    <Text style={styles.nomItem}>{nom}</Text>
  </View>
);

function ProfileInfoScreen() {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }

  const renderItem = ({ item }) => <Item nom={item.nom} />;

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.nom}>César Gutiérrez</Text>
        <Text style={styles.mail}>cesar.gutierrez@estudiantat.upc.edu</Text>
        <Image style={styles.imageProfile} source={require('../assets/images/user.png')} />
      </View>
      <View style={styles.border}>
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.textArea}>
            {
              'When set, the scroll view will adjust the scroll position so that the first child that is currently visible and at or beyond minIndexForVisible will not change position. This is useful for lists that are loading content in both directions, e.g. a chat thread, where new messages coming in might otherwise cause the scroll position to jump. A value of 0 is common, but other values such as 1 can be used to skip loading spinners or other content that should not maintain position.'
            }
          </Text>
        </ScrollView>
      </View>
      <Text style={styles.interessosTitle}>{'Interessos'}</Text>
      <View style={styles.list}>
        <FlatList
          horizontal
          renderItem={renderItem}
          data={DATA}
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
      <View style={styles.btn}>
        <BaseButton title="Enviar missatge" btnColor={Colors.primary} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: Window.height * 0.1,
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
  },
  mail: {
    fontFamily: 'InterRegular',
    fontSize: 16,
    lineHeight: 19,
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
    marginTop: 55,
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
  },
  text: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default ProfileInfoScreen;
