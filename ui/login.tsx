/*TODO: fix function component addUser()
FIXED: addUser function have:
  - insert data to realm
  - check data is existed
  - return data & console log data
FIXME: sua lai truong hop neu ng dung cu dang nhap thi chi query data ra thoi
NOTE: bo comment trong line 30 de test kha nang us
*/ 


import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import HeaderBar from '../components/HeaderBar';
import { loginUser } from '../services/apiLogin';
import addUser from '../DB/insertDB';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const navigation = useNavigation();

  const handleLogin = useCallback(async () => {
    try {
      const userData = await loginUser(email);
      console.log(userData);

      // addUser(
      //   'user123111231127',
      //   'TestUser',
      //   'someAccessToken',
      //   new Date(),
      //   true,
      //   false,
      //   'asdasd'
      //   // userData['user_id'],
      //   // userData['nickname'],
      //   // userData['access_token'],
      //   // new Date(),
      //   // userData['is_active']
      // );
      navigation.navigate("Chat");
    } catch (error) {
      console.error('Login failed:', error);
    }
  }, [email, navigation]);

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <HeaderBar title="Login" style={styles.header} onBackPressLeft={() => navigation.navigate('Signup')} isHide={false} iconLeft={"arrow-back"} iconRight={"menu"} icon={"menu"}/>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>

        {/* User ID Input */}
        <TextInput
          placeholder="User ID"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* Password Input with Toggle Visibility */}
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={isSecure}
            style={[styles.input, { flex: 1 }]}
          />
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)} style={styles.eyeButton}>
            <Ionicons name={isSecure ? "eye-off" : "eye"} size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} color="#007AFF" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Sign Up" onPress={() => navigation.navigate('Signup')}  />
        </View>
      </View>
    </View>
  );
}

// **💎 Optimized Styling**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: 120,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  eyeButton: {
    justifyContent:'center',
    position: 'absolute',
    right: 15,
  },
  buttonContainer: {
    width: '100%',
    paddingVertical: 10,
  },
});

