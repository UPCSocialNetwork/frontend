import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import axios from '../constants/axios';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

function ChatListItem({
  roomID,
  participantID,
  titol,
  message,
  time,
  nom,
  tipusXat,
  llegit,
  imageSrc,
  setUser,
  user,
  setToggle,
  toggle,
}) {
  const [loaded] = useFonts({
    InterBold: require('../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../assets/fonts/Inter-Medium.ttf'),
    InterSemiBold: require('../assets/fonts/Inter-SemiBold.ttf'),
    InterRegular: require('../assets/fonts/Inter-Regular.ttf'),
  });

  const [inicialsUser, setInicialsUser] = useState();

  useEffect(() => {
    if (tipusXat === 'privs') {
      let inicials = titol[0].toUpperCase();
      inicials = inicials + titol.split('.')[1][0].toUpperCase();
      setInicialsUser(inicials);
    } else {
      let inicials = titol[0].toUpperCase();
      if (titol.length > 1) inicials = inicials + titol[1].toUpperCase();
      setInicialsUser(inicials);
    }
  }, []);

  if (!loaded) {
    return null;
  }

  const formatNom = (nom) => {
    var nouNom;
    if (nom != '') {
      nouNom = nom.split('.')[0];
      nouNom = nouNom.charAt(0).toUpperCase() + nouNom.slice(1) + ': ';
    } else {
      nouNom = '';
    }
    return nouNom;
  };

  const formatTime = (time) => {
    if (time === 404) return null;
    var now = new Date();
    var time = new Date(time);
    var diff_time = now - time;
    var diff_minuts = diff_time / 1000 / 60;
    var diff_hora = diff_minuts / 60;
    var diff_dies = diff_hora / 24;
    if (diff_minuts < 60) {
      var recent = Math.round(diff_minuts) + 1;
      if (recent < 1) {
        recent = 'Ara mateix';
        return recent;
      } else if (recent === 1) {
        recent = 'Fa ' + recent + ' minut';
        return recent;
      } else {
        recent = 'Fa ' + recent + ' minuts';
        return recent;
      }
    } else if (diff_hora > 0 && diff_hora < 24) {
      var recent = Math.round(diff_hora);
      if (recent === 1) {
        recent = 'Fa 1 hora';
        return recent;
      } else {
        recent = 'Fa ' + recent + ' hores';
        return recent;
      }
    } else if (diff_dies > 0 && diff_dies < 2) {
      return 'Ahir';
    } else {
      var day = new Date(time).getDate();
      var month = new Date(time).getMonth() + 1;
      var year = new Date(time).getFullYear();
      var recent = day + '/' + month + '/' + year;
      return recent;
    }
  };

  const updateParticipant = async (roomID, read) => {
    try {
      let updatePart = {
        estudiantID: user.nomUsuari,
        xatID: roomID,
        ultimaLectura: read,
        notificacions: 'Activat',
        bloqueigGrup: 'Desactivat',
      };
      await axios.put(`participant`, updatePart, {
        'Content-Type': 'application/json',
      });
    } catch (e) {
      console.error(e);
    }
  };

  const onPress = () => {
    // updateParticipant(roomID, 0);
    setUser({ ...user, room: roomID, participant: participantID, titol: titol, tipusXat: tipusXat });
    if (user.room === roomID) setToggle(!toggle);
  };

  if (roomID && participantID && titol && message && time) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <View style={styles.imageViewParent}>
            {/*
            <View style={styles.imageView}>
              <Image style={styles.imageChat} source={{ uri: imageSrc }} />
            </View>
            */}
            <View style={styles.imageProfile}>
              <Text style={styles.textImage}>{inicialsUser}</Text>
            </View>
          </View>
          <View style={styles.userViewParent}>
            <View style={styles.userView}>
              <Text style={styles.nom} numberOfLines={1} ellipsizeMode="tail">
                {titol}
              </Text>
            </View>
            <Text style={styles.message} numberOfLines={1} ellipsizeMode="tail">
              {formatNom(nom)}
              {message}
            </Text>
          </View>
          <View style={styles.tempsViewParent}>
            <Text style={styles.temps}>{formatTime(time)}</Text>
            {llegit > 0 ? (
              <View style={styles.notisOn}>
                <Text style={styles.notisNum}>{llegit}</Text>
              </View>
            ) : null}
          </View>
          <View>
            <View style={styles.optionsView}>
              <SimpleLineIcons name="arrow-right" style={styles.optionsIcon} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  card: {
    height: 75,
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
  imageChat: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  userViewParent: {
    marginLeft: Window.width * 0.032,
    justifyContent: 'center',
    width: Window.width * 0.46,
  },
  userView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nom: {
    fontFamily: 'InterSemiBold',
    fontSize: 16,
    color: Colors.secondary,
  },
  notisOn: {
    backgroundColor: Colors.primary,
    marginTop: '10%',
    alignSelf: 'flex-end',
    borderRadius: 50,
    borderColor: Colors.black,
    borderWidth: 1,
    width: 20,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notisNum: {
    fontFamily: 'InterRegular',
    color: Colors.white,
  },
  message: {
    fontFamily: 'InterRegular',
    fontSize: 14,
    color: Colors.blueGrey,
    paddingTop: 2,
  },
  tempsViewParent: {
    marginLeft: Window.width * 0.02,
    width: Window.width * 0.19,
    justifyContent: 'center',
  },
  tempsView: {},
  temps: {
    fontFamily: 'InterMedium',
    fontSize: 12,
    color: Colors.blueGrey,
    alignSelf: 'flex-end',
  },
  optionsView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: Window.width * 0.03,
  },
  optionsIcon: {
    fontSize: 15,
  },
});

export default ChatListItem;
