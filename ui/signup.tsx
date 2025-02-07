import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import HeaderBar from '../components/HeaderBar';
import { signupUser } from '../services/apiSignup';  // Import API function


const SignupScreen: React.FC = () => {
  // **State variables for user input**
  const [userID, setUserID] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmNickname, setConfirmNickname] = useState('');
  const navigation = useNavigation();

  /**
   * Handles user signup process
   */
  const handleSignup = async () => {
    // **Validation checks**
    if (!userID || !nickname || !confirmNickname) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (nickname !== confirmNickname) {
      Alert.alert('Error', 'Nicknames do not match.');
      return;
    }

    try {
      // **API Call to register user**
      await signupUser(userID, nickname);
      Alert.alert('Success', 'Signup successful!');

      // **Navigate to Chat screen after signup**
      navigation.navigate("Chat");
    } catch (error: any) {
      console.error('Signup error:', error);
      Alert.alert('Error', error.response?.data?.message || 'Signup failed.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Fixed Header Bar */}
      {/* <HeaderBar title="Sign Up" style={styles.header} isHide={false} icon={"menu"} iconLeft={'menu'} iconRight={'menu'} /> */}

      {/* Main Signup Form */}
      <View style={styles.content}>
        <Text style={styles.title}>Signup</Text>

        {/* User ID Input */}
        <TextInput
          placeholder="User ID"
          value={userID}
          onChangeText={setUserID}
          style={styles.input}
        />

        {/* Nickname Input */}
        <TextInput
          placeholder="Nickname"
          value={nickname}
          onChangeText={setNickname}
          secureTextEntry
          style={styles.input}
        />

        {/* Confirm Nickname Input */}
        <TextInput
          placeholder="Confirm Nickname"
          value={confirmNickname}
          onChangeText={setConfirmNickname}
          secureTextEntry
          style={styles.input}
        />

        {/* Signup Button */}
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={handleSignup} color="#007AFF" />
        </View>

        {/* Navigate to Login */}
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
        
      </View>
    </View>
  );
};

// **💎 Optimized Styling**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    height: 120, // Adjust height based on your HeaderBar
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60, // Push content below the fixed header
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 10,
  },
});

export default SignupScreen;
