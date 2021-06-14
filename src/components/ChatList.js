import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ChatListItem from './ChatListItem';
import Colors from '../constants/Colors';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

function ChatList(chatData) {
  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const renderItem = ({ item }) => (
    <ChatListItem titol={item[0]} message={item[1]} time={item[2]} nom={item[3]} imageSrc={url_aux} />
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
        data={chatData.chatData}
        ItemSeparatorComponent={FlatListItemSeparator}
        contentContainerStyle={{ paddingBottom: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatList;
