/**
 * create new conversations
 * 
 */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setConversationId } from '../redux/slice';
import { NavigationProp } from '@react-navigation/native';
import { createNewConversation } from '../services/apiConversations';

const Conversation = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [conversationName, setConversationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState(['']);
  const user_key = useSelector((state:any) => state.app.user_key);
  const dispatch = useDispatch();

  const createConversation = async () => {
    if (!conversationName.trim()) {
      Alert.alert('Error', 'Please enter a conversation name.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await createNewConversation(conversationName, user_key);
      if (response["conversation"]["id"]) {
        Alert.alert('Success', 'Conversation created successfully!');
      } else {
        Alert.alert('Error', response || 'Failed to create conversation.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong or this conversation existed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Conversation</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter conversation name"
        value={conversationName}
        onChangeText={setConversationName}
      />
      {participants.map((participant, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder="Enter participant name"
          value={participant}
          onChangeText={(text) => {
            const newParticipants = [...participants];
            newParticipants[index] = text;
            setParticipants(newParticipants);
          }}
        />
      ))}
      <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
        <Text style={styles.addButtonText}>Add Participant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={createConversation} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Create</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f6f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Conversation;
