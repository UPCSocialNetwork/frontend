import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ChatListItem from './ChatListItem';
import { MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';

function ChatList(chatData) {
  const url_aux = 'https://randomuser.me/api/portraits/men/1.jpg';

  const renderItem = ({ item }) => <ChatListItem nom={item[0]} message={item[1]} time={item[2]} imageSrc={url_aux} />;

  return (
    <View style={styles.allChats}>
      <FlatList
        keyExtractor={(index) => index.toString()}
        renderItem={renderItem}
        data={chatData.chatData}
        contentContainerStyle={{ paddingBottom: 5 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChatList;
