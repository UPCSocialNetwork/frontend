import React, { useState, useLayoutEffect, useEffect, ComponentDidMount, Component } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Image, Text, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import VarTest from '../components/VarTest';

//const url = 'http://localhost:3000/estudiant/getAll';

function ProfileInfoScreen() {
  const [nomEstudiant, setNomEstudiant] = useState(['hi']);

  useEffect(() => {
    const nomEstudiant = () => {
      const request = axios
        .get('http://localhost:3000/estudiant/getAll')
        .then((response) => {
          setNomEstudiant(response.data.estudiant[0].nomComplet);
          return request;
        })
        .catch(function (err) {
          console.error(err);
        });
    };
    nomEstudiant();
  }, []);

  if (nomEstudiant != 'hi') {
    return <VarTest nomEstudiant={nomEstudiant}></VarTest>;
  } else {
    return <VarTest nomEstudiant="mal"></VarTest>;
  }
}

export default ProfileInfoScreen;
