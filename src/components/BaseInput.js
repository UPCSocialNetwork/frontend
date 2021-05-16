import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

function BaseInput() {
  const [value, onChangeText, placeholder, secureTextEntry] = React.useState(null);
  const { inputStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: Colors.black,
    width: '80%',
    height: 40,
    borderColor: Colors.lightBlack,
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BaseInput;
