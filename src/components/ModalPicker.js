import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';

export default function ModalPicker({ onPress, setChoosenData, DataList, type }) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const onPressItem = (option) => {
    onPress(false);
    setChoosenData(option);
  };

  const renderItemCentre = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => onPressItem(item.nomSigles)}>
      <View style={styles.optionCard}>
        <Text style={styles.text}>
          {' '}
          {item.nomSigles} - {item.nomComplet}{' '}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderItemGrau = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => onPressItem(item.nom)}>
      <View style={styles.optionCard}>
        <Text style={styles.text}>{item.nom}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.modal}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
          data={DataList}
          renderItem={type == 'centre' ? renderItemCentre : renderItemGrau}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        ></FlatList>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  modal: {
    backgroundColor: Colors.white,
    width: Window.width * 0.9,
    height: Window.height * 0.8,
    borderRadius: 8,
  },
  option: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionCard: {
    backgroundColor: Colors.lightBlue,
    width: Window.width * 0.85,
    borderRadius: 50,
    margin: 7,
  },
  text: {
    textAlign: 'center',
    padding: 10,
    alignSelf: 'center',
    fontSize: 15,
  },
});
