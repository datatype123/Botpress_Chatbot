import { Picker } from '@react-native-picker/picker'; // Đảm bảo bạn đã cài đặt thư viện này
import { NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../redux/slice';
import { RootState } from '../../redux/store';
import { createNewConversation } from '../../services/apiConversations';
import { styles } from './conversations.styles';

const Conversation = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [conversationName, setConversationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState<string[]>(['']);
  const [availableUsers] = useState([
    { label: 'Participant 1', value: 'user1' },
    { label: 'Participant 2', value: 'user2' },
    { label: 'Participant 3', value: 'user3' },
  ]);
  const user_key = useSelector((state: RootState) => state.app.user_key);
  const dispatch = useDispatch();

  const createConversation = async () => {
    if (!conversationName.trim()) {
      Alert.alert('Error', 'Please enter a conversation name.');
      return;
    }
    setLoading(true);
    try {
      const response = await createNewConversation(conversationName, user_key);
      if (response['conversation']['id']) {
        dispatch(appActions.setConversationId(response['conversation']['id']));
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

  const updateParticipant = (value: string, index: number) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Conversation</Text>

      <TextInput
        style={styles.input}
        value={conversationName}
        onChangeText={setConversationName}
        placeholder="Enter conversation name"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Choose Participants:</Text>
      {participants.map((participant, index) => (
        <View key={index} style={styles.pickerContainer}>
          <Picker
            selectedValue={participant}
            onValueChange={(value: string) => updateParticipant(value, index)}
            style={styles.picker}
          >
            <Picker.Item label="Select a participant" value="" />
            {availableUsers.map((user) => (
              <Picker.Item key={user.value} label={user.label} value={user.value} />
            ))}
          </Picker>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={addParticipant}>
        <Text style={styles.addButtonText}>+ Add Participant</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.createButton} onPress={createConversation} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createButtonText}>Create Conversation</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default Conversation;
