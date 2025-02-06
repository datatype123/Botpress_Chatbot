import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, ListRenderItemInfo } from 'react-native';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
}

const MenuChat: React.FC = () => {
  // Sample chat data
  const chatData: ChatItem[] = [
    { id: '1', name: 'Family Group', lastMessage: 'Mom: Don\'t forget to call!', timestamp: '12:30 PM', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Work Team', lastMessage: 'Reminder about the meeting at 3 PM', timestamp: '12:32 PM', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Friend Group', lastMessage: 'Let\'s hang out tomorrow', timestamp: '12:35 PM', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Project A', lastMessage: 'Check out the latest build', timestamp: '12:40 PM', avatar: 'https://via.placeholder.com/50' },
  ];

  // Render each chat item
  const renderItem = ({ item }: ListRenderItemInfo<ChatItem>) => (
    <View style={styles.chatItemContainer}>
      {/* Avatar of the group/chat */}
      <Image source={{ uri: item.avatar }} style={styles.avatar} />

      <View style={styles.chatInfoContainer}>
        {/* Group/chat name */}
        <Text style={styles.chatName}>{item.name}</Text>

        {/* Last message */}
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      {/* Timestamp of last message */}
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false} // Hide the vertical scroll bar
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  chatItemContainer: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfoContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default MenuChat;
