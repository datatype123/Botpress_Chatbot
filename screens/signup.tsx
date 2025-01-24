import {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import CONFIG from '../config';
import React from 'react';

const SignupScreen: React.FC = () => {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const data ={
    user_id: userID,
    nickname: password,
    // profile_url: Config.
  };
  const Headers = {
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': CONFIG.SENDBIRD_API_TOKEN,
    },
  };
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!userID || !password || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(CONFIG.BASE_URL+'/users', data,Headers);
      Alert.alert('Success', 'Signup successful!');
      console.log(response.data);
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        placeholder="User ID"
        value={userID}
        onChangeText={setuserID}
        style={styles.input}
      />
      <TextInput
        placeholder="Nickname"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Nickname"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={{ padding: 20 }}>
        <Button title="Signup" onPress={handleSignup} color={'#007AFF'} />
      </View>
      <View style={{ padding: 20 }}>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default SignupScreen;
