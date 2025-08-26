import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signupUser } from '../services/apiSignup';
import { insertUser } from '../database/insertDB';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../redux/slice';
import {RootState} from '../redux/store';

const SignupScreen: React.FC = () => {
  const [userID, setUserID] = useState('');
  const [nickname, setNickname] = useState('');
  const [confirmNickname, setConfirmNickname] = useState('');
  const [profile, setProfile] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userKey = useSelector((state: RootState) => state.app?.user_key || '');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  /**Handle data Signup */
  const handleSignup = async () => {
    setIsLoading(true);

    if (!userID || !nickname || !confirmNickname) {
      setError('All fields are required.');
      return;
    }

    if (nickname !== confirmNickname) {
      setError('Nicknames do not match.');
      return;
    }

    try {
      const response = await signupUser(userID, nickname, profile);
      console.log(response["key"])
      insertUser(userID, nickname, '', response["key"]);
      console.log('insert done')
      Alert.alert('Success', 'Signup successful!');
      dispatch(appActions.setUserKey(response["key"]));
      navigation.navigate('BottomNavigation');
      dispatch(appActions.setUserKey(response["key"]));
      console.log(userKey);
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.response?.data?.message || 'Signup failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput placeholder="User ID" value={userID} onChangeText={setUserID} style={styles.input} autoCapitalize="none" />

      <View style={styles.inputRow}>
        <TextInput placeholder="Nickname" value={nickname} onChangeText={setNickname} secureTextEntry={isHidden} style={[styles.input, styles.flexInput]} autoCapitalize="none" />
        <TouchableOpacity style={styles.toggleButton} onPress={() => setIsHidden(!isHidden)}>
          <Text style={styles.toggleButtonText}>{isHidden ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      <TextInput placeholder="Confirm Nickname" value={confirmNickname} onChangeText={setConfirmNickname} secureTextEntry={isHidden} style={styles.input} autoCapitalize="none" />
      <TextInput placeholder="Profile (Optional)" value={profile} onChangeText={setProfile} style={styles.input} autoCapitalize="sentences" />

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginRedirect} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginLink}>Log in</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', backgroundColor: 'white', paddingHorizontal: 20,
  },
  title: {
    fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#333',
  },
  input: {
    width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 15, backgroundColor: '#fff', marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', width: '100%', marginBottom: 12,
  },
  flexInput: { flex: 1 },
  toggleButton: {
    marginLeft: 10, backgroundColor: '#007bff', padding: 12, borderRadius: 6,
  },
  toggleButtonText: {
    color: '#fff', fontSize: 16,
  },
  signupButton: {
    width: '100%', backgroundColor: '#007bff', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 10,
  },
  signupButtonText: {
    color: 'white', fontSize: 18, fontWeight: 'bold',
  },
  loginRedirect: { marginTop: 15 },
  loginText: { fontSize: 14, color: '#555' },
  loginLink: { color: '#007bff', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 10 },
});

export default SignupScreen;
