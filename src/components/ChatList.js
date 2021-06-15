import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ChatListItem from './ChatListItem';
import Colors from '../constants/Colors';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

function ChatList({ chatData, setUser, user, setToggle, toggle }) {
  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const renderItem = ({ item }) => (
    <ChatListItem
      roomID={item[0]}
      participantID={item[1]}
      titol={item[2]}
      message={item[3]}
      time={item[4]}
      nom={item[5]}
      imageSrc={url_aux}
      setUser={setUser}
      user={user}
      setToggle={setToggle}
      toggle={toggle}
    />
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: Colors.greySeparator,
        }}
      />
    );
  };

  return (
    <View style={styles.allChats}>
      <FlatList
        keyExtractor={(index) => index.toString()}
        renderItem={renderItem}
        data={chatData}
        ItemSeparatorComponent={FlatListItemSeparator}
        contentContainerStyle={{ paddingBottom: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatList;
