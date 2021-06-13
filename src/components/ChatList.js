import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ChatListItem from './ChatListItem';
import Colors from '../constants/Colors';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

function ChatList({ chatData, setUser, user, setToggle, toggle }) {
  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const renderItem = ({ item }) => (
    <ChatListItem
      roomId={item[0]}
      titol={item[1]}
      message={item[2]}
      time={item[3]}
      nom={item[4]}
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
          backgroundColor: Colors.lightBlack,
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
