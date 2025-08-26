import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetMessage } from '../../services/apiGetMessage';
import { apiSend } from '../../services/apiSendMessage';
import { RootState } from '../../redux/store';
import { format } from 'date-fns';
import {markdownStyles,styles} from './chat.styles';
import { conversationActions } from '../../redux/conversation';
import { useNavigation } from '@react-navigation/native';



const ChatScreen = () => {
  const user_key = useSelector((state: RootState) => state.app.user_key);
  const botMessages = useSelector((state: RootState) => state.app.bot_message);
  const conversation_id = useSelector((state: RootState) => state.app.conversation_id);
  const [lastBotMessage, setLastBotMessage] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      setLastBotMessage(botMessages);
    }
  }, [botMessages]);

  useEffect(() => {
    console.log("conversation_id on render:", conversation_id);
  }, [conversation_id]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Math.random().toString(),
      text: inputText,
      user: 'You',
    };

    setMessages((prevMessages) => [userMessage, ...prevMessages]);
    setInputText('');
    console.log("conversation_id:", conversation_id);
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
                source={item.user === 'You' ? require('../../assets/chamber.jpg') : require('../../assets/bot.png')}
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


export default ChatScreen;
