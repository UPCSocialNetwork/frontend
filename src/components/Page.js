import React from 'react';
import { View, Text } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Colors from '../constants/Colors';

export default function Page({ backgroundColor, iconName, title }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}
    >
      <Icon name={iconName} size={172} color={Colors.white} />
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: Colors.white }}>{title}</Text>
      </View>
    </View>
  );
}
