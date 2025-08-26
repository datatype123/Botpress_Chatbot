import React, { useEffect, useCallback } from 'react';
import { 
  View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity, RefreshControl
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns'; // Import thư viện date-fns
import { RootState } from '../redux/store';
import { conversationActions } from '../redux/conversation/conversationSlice';

interface ChatItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
}

const GroupChat: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const conversations = useSelector((state: RootState) => state.conversation.conversations);
  const loading = useSelector((state: RootState) => state.conversation.loading['fetchConversations']);
  const userKey = useSelector((state: RootState) => state.login.userKey);

  // Fetch conversations khi component được mount
useEffect(() => {
  if (userKey) {
    dispatch(conversationActions.fetchConversationsrequest(userKey));
  }
}, [dispatch, userKey]);

const onRefresh = useCallback(() => {
  if (userKey) {
    dispatch(conversationActions.fetchConversationsrequest(userKey));
  }
}, [dispatch, userKey, conversations]);


  const renderItem = ({ item }: { item: ChatItem }) => {
    // Định dạng ngày giờ
    const formattedDate = format(new Date(item.createdAt), 'dd MMM yyyy'); // Ngày
    const formattedTime = format(new Date(item.createdAt), 'hh:mm a'); // Giờ

    return (
      <TouchableOpacity
        style={styles.chatItemContainer}
        onPress={() => {
          dispatch(conversationActions.selectConversation(item.id));
          console.log("Selected Conversation ID:", userKey);
          dispatch(conversationActions.fetchHistoryConversation({ conversationId: item.id, userKey: userKey }));
          navigation.navigate('Chat');
        }}>
        <Image source={require('../assets/conversations.png')} style={styles.avatar} />
        <View style={styles.chatInfoContainer}>
          <Text style={styles.chatName}>{item.id}</Text>
          <View style={styles.dateTime}>
            <Text style={styles.lastMessage}>{formattedDate}</Text>
            <Text style={styles.lastMessage}>{formattedTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Adapt conversations to match ChatItem interface
  const chatItems: ChatItem[] = conversations.map((conv: any) => ({
    id: conv.id,
    createdAt: conv.createdAt,
    updatedAt: conv.updatedAt ?? conv.createdAt,
    avatar: conv.avatar ?? '', // Provide a fallback if avatar is missing
  }));

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={chatItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
          ListEmptyComponent={<Text style={styles.noConversationsText}>Sorry, you have no conversations.</Text>}
        />
      )}

      {/* Floating Button to Add New Conversation */}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate("CreateConversation")}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F9',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  noConversationsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  chatItemContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#E07A5F',
  },
  chatInfoContainer: {
    flex: 1,
  },
  chatName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#222',
  },
  lastMessage: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#1A73E8',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
  },
  dateTime: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default GroupChat;
