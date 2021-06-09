import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import axios from '../constants/axios';
import Colors from '../constants/Colors';
import Window from '../constants/Layout';
import socket from '../components/Socket';

export default function ChatScreen({ nomUsuari, navigation }) {
  socket.emit('conectado');
  //console.log('hola');
  return null;
}
