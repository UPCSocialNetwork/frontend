import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';

function InteresListItem({ titol, setInteSelect, inteSelect }) {
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    function checkPressed() {
      for (let i = 0; i < inteSelect.length; i++) {
        const el = inteSelect[i];
        if (el === titol) setIsPressed(true);
      }
    }
    checkPressed();
  }, []);

  const onPress = () => {
    if (isPressed) {
      var filteredAry = inteSelect.filter(function (e) {
        return e !== titol;
      });
      setIsPressed(false);
      setInteSelect(filteredAry);
    } else {
      setIsPressed(true);
      setInteSelect((inteSelect) => [...inteSelect, titol]);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={isPressed ? styles.flatItemPressed : styles.flatItemNotPressed}>
      <View style={styles.flatTextView}>
        <Text style={styles.flatText}>{titol}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flatItemNotPressed: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: Window.height * 0.015,
    marginBottom: Window.height * 0.02,
    width: '46%',
    height: Window.height * 0.08,
    borderRadius: 8,
    backgroundColor: Colors.grey,
    elevation: 3,
  },
  flatItemPressed: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: Window.height * 0.015,
    marginBottom: Window.height * 0.02,
    width: '46%',
    height: Window.height * 0.08,
    borderRadius: 8,
    backgroundColor: Colors.blue,
    elevation: 3,
  },
  flatTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatText: {
    fontSize: 18,
  },
});

export default InteresListItem;
