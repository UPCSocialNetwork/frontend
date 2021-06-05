import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

function MentorListItem({ nomMentor, setNomMentor, setErrorMentor, titol, grau, imageSrc, errorText, setErrorText }) {
  const [isPressed, setIsPressed] = useState(false);

  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  useEffect(() => {
    function checkPressed() {
      if (nomMentor === titol) setIsPressed(true);
    }
    checkPressed();
  }, []);

  if (!loaded) {
    return null;
  }

  const onPress = () => {
    if (isPressed === true) {
      setIsPressed(false);
      setNomMentor('none');
      setErrorMentor(false);
      //console.log('apretao');
    } else {
      if (nomMentor === 'none') {
        setIsPressed(true);
        setNomMentor(titol);
        if (errorText.errorStatus === true) {
          setErrorText({ ...errorText, errorStatus: false });
        }
        //console.log('no apretao primer mentor');
        //console.log(titol);
      } else {
        setErrorMentor(true);
        //console.log('no apretao ya hay mentor');
      }
    }
  };

  if (titol && grau && imageSrc && isPressed) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.pressed}>
        <View style={styles.card}>
          <View style={styles.imageViewParent}>
            <View style={styles.imageView}>
              <Image style={styles.imageChat} source={{ uri: imageSrc }} />
            </View>
          </View>
          <View style={styles.userViewParent}>
            <View style={styles.userView}>
              <Text style={styles.nom} numberOfLines={1} ellipsizeMode="tail">
                {titol}
              </Text>
              <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
                {grau}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.optionsView}>
              <MaterialIcons name="done" style={styles.optionsIcon} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.notPressed}>
        <View style={styles.card}>
          <View style={styles.imageViewParent}>
            <View style={styles.imageView}>
              <Image style={styles.imageChat} source={{ uri: imageSrc }} />
            </View>
          </View>
          <View style={styles.userViewParent}>
            <View style={styles.userView}>
              <Text style={styles.nom} numberOfLines={1} ellipsizeMode="tail">
                {titol}
              </Text>
              <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
                {grau}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  pressed: {
    backgroundColor: Colors.blue,
  },
  notPressed: {},
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
  optionsView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: Window.width * 0.02,
  },
  optionsIcon: {
    fontSize: 25,
  },
});

export default MentorListItem;
