//TODO: them hinh anh account user 
//TODO: them header bar 
//TODO: viet ham nhan thong bao day khi tin nhan den
//TODO: query data tu realm ra va hien thi ra man hinh

import React, { useState } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView,Platform } from 'react-native';
import post from '../services/sendMessage';
import Markdown from 'react-native-markdown-display';
import TypeWriterEffect from 'react-native-typewriter-effect';
import HeaderBar from '../components/HeaderBar';
import Ionicons from '@expo/vector-icons/Ionicons';

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      user: 'ChatBot',
    },
  ]);
  const [inputText, setInputText] = useState('');

  // Function to send message and handle API response
  const handleSendMessage = async () => {
    if (!inputText.trim()) return; // Prevent sending empty messages

    // Add user message to chat
    const userMessage = {
      id: Math.random().toString(),
      text: inputText,
      user: 'You',
    };

    setMessages((prevMessages) => [userMessage, ...prevMessages]);

    setInputText(''); // Clear input field

    try {
      // Send user input to API and get bot response
      const response = await post(inputText);

      // Check if response is valid and contains messages
      if (response && response.length > 0) {
        const botMessage = {
          id: Math.random().toString(),
          text: response[0], // Access the message content from API response
          user: 'Assistant',
        };
        setMessages((prevMessages) => [botMessage, ...prevMessages]);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.main}>
      <View>
        <HeaderBar isHide={false} title='Chat' icon={"menu"} iconLeft={"menu"} iconRight={"settings"}></HeaderBar>
      </View>
      <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            {/* <Image  ></Image> */}
            <Text style={styles.user}>{item.user}:</Text>
            <TypeWriterEffect content={item.text} maxDelay={20}style={{fontSize:16}}></TypeWriterEffect>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>
            <Ionicons name='send'></Ionicons>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  main:{
    width:"100%",
    flex:1,
    backgroundColor:'#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  messageContainer: {
    marginVertical: 5,
    backgroundColor:'#EFE9D5',
    padding:20,
    borderCurve:'circular',
    borderRadius:20,
  },
  user: {
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    // padding: 10,
    paddingVertical:10
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChatScreen;
