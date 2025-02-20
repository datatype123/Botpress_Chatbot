import React, { useEffect, useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Markdown from 'react-native-markdown-display';
import { apiSend } from '../services/apiSendMessage';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetMessage } from '../services/apiGetMessage';

const ChatScreen = () => {
  const user_key = useSelector((state:any) => state.app.user_key);
  const botMessages = useSelector((state:any) => state.app.bot_message);
  const conversation_id = useSelector((state:any) => state.app.conversation_id);
  const [lastBotMessage, setLastBotMessage] = useState('');
  const dispatch = useDispatch();
  
  interface Message {
    id: string;
    text: string;
    user: string;
  }
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (botMessages && botMessages !== lastBotMessage) {
      const newBotMessage = {
        id: Math.random().toString(),
        text: botMessages,
        user: 'ChatBot',
      };
      setMessages((prevMessages) => [newBotMessage, ...prevMessages]);
      setLastBotMessage(botMessages); // Update last bot message to avoid repeats
    }
  }, [botMessages]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Math.random().toString(),
      text: inputText,
      user: 'You',
    };

    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    setInputText('');
    
    await apiSend(inputText, user_key, conversation_id);
    await apiGetMessage(user_key, dispatch, conversation_id);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'padding' : 'height'} style={styles.main}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          inverted
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.user === 'You' ? styles.userMessage : styles.botMessage]}>
              <Image
                source={item.user === 'You' ? require('../assets/chamber.jpg') : require('../assets/bot.png')}
                style={styles.profileImage}
              />
              <View style={styles.messageContent}>
              <Text style={[styles.user, item.user === 'ChatBot' && styles.botMessageText]}>{item.user}</Text>
                <Text style={[styles.message, item.user === 'ChatBot' && styles.botText]}>
                {item.user === 'ChatBot' ? (
                  <Markdown style={markdownStyles}>{item.text}</Markdown>
                ) : (
                  <Text style={[styles.message, item.user === 'ChatBot' && styles.botMessageText]}>{item.text}</Text>
                )}</Text>
              </View>
            </View>
          )}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
            placeholderTextColor="#bbb"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const markdownStyles = StyleSheet.create({
  text: { color: '#333', fontSize: 16 },
  heading1: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  heading2: { fontSize: 18, fontWeight: 'bold', color: '#007AFF' },
  strong: { fontWeight: 'bold', color: '#000' },
  em: { fontStyle: 'italic', color: '#666' },
  link: { color: '#007AFF', textDecorationLine: 'underline' },
  code_inline: { backgroundColor: '#f4f4f4', padding: 4, borderRadius: 4, color: '#D63384' },
});

const styles = StyleSheet.create({
  main: { flex: 1, backgroundColor: '#f4f6f9' },
  container: { flex: 1, padding: 15, backgroundColor: '#f4f6f9' },
  messageContainer: {
    marginVertical: 10,
    // marginHorizontal: 20,
    // padding: 12,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  userMessage: {
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
    marginHorizontal: 10,
    borderColor: '#E07A5F',
    borderWidth: 1,
  },
  messageContent: { flex: 1 ,marginHorizontal: 10 },
  user: { fontWeight: 'bold', color: '#007AFF' },
  botText: { color: '#34A853' },
  message: { fontSize: 16, color: '#333', marginTop: 5 },
  botMessageText: { color: '#555' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderTopWidth: 1,
    // borderTopColor: '#ccc',
    paddingVertical: 12,
    // backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
  },
});


export default ChatScreen;
