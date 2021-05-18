import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions, ScrollView, FlatList } from 'react-native';
import colors from '../constants/Colors';
import BaseButton from '../components/BaseButton';
import { useFonts } from 'expo-font';
import { Inter_600SemiBold } from '@expo-google-fonts/inter';
import Colors from '../constants/Colors';

const { height, width } = Dimensions.get('window');

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
        <ScrollView style={styles.scroll}>
          <Text style={styles.textArea}>
            {
              'When set, the scroll view will adjust the scroll position so that the first child that is currently visible and at or beyond minIndexForVisible will not change position. This is useful for lists that are loading content in both directions, e.g. a chat thread, where new messages coming in might otherwise cause the scroll position to jump. A value of 0 is common, but other values such as 1 can be used to skip loading spinners or other content that should not maintain position.'
            }
          </Text>
        </ScrollView>
      </View>
      <Text style={styles.interessosTitle}>{'Interessos'}</Text>
      <View style={styles.horInteressos}>
        <FlatList horizontal renderItem={renderItem} data={DATA} />
      </View>
      <View style={styles.btn}>
        <BaseButton title="Veure assignatures de l'estudiant" btnColor={Colors.yellow} />
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
    marginTop: height * 0.1,
  },
  imageProfile: {
    width: width * 0.4,
    height: width * 0.4,
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
    width: width * 0.85,
    height: 105,
  },
  scroll: {
    alignSelf: 'center',
    width: width * 0.8,
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
  horInteressos: {
    width: width * 0.85,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  item: {
    backgroundColor: Colors.lightBlack,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
  },
});

export default ProfileInfoScreen;
