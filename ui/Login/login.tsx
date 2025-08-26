import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../database/insertDB';
import { loginActions } from '../../redux/login';
import { RootState } from '../../redux/store';
import {styles} from './login.styles';

export default function LoginScreen() {
  const [nickname, setNickname] = useState('');
  const [UserId, setUserId] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const isLoading = useSelector((state: RootState) => state.login.isLoading);
  const userKey = useSelector((state: RootState) => state.login.userKey);
  const [error, setError] = useState('');
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!nickname || !UserId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Thiếu nickname và user id '
      });
      return;
    }

    try {
      const key = await getItem(nickname, 'user_key');
      console.log("Retrieved user key:", key);

      if (typeof key !== 'string') {
        Toast.show({
          type: 'error',
          text1: 'Sai nickname hoặc user id',
        });
        return;
      }

      dispatch(loginActions.setUserKey(key));
      dispatch(loginActions.loginRequest({ nickname, userKey: key }));
    } catch (error) {
      console.error("Login error:", error);
      setError('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    if (isLoading) {
      navigation.navigate('BottomNavigation'); 
    }
  }, [isLoading, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      {/* User ID Input */}
      <TextInput
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
        style={styles.input}
        autoCapitalize="none"
      />

      {/* UserId Input */}
      <View style={styles.UserIdContainer}>
        <TextInput
          placeholder="User ID"
          value={UserId}
          onChangeText={setUserId}
          secureTextEntry={isSecure}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setIsSecure(!isSecure)}
          style={styles.eyeButton}
        >
          <Text style={styles.toggleButtonText}>{isSecure ? '👁️' : '🙈'}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      {/* Forgot UserId */}
      <TouchableOpacity>
        <Text style={styles.forgotUserIdText}>Forgot UserId?</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity
        style={styles.signUpRedirect}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.signUpText}>
          Don't have an account? <Text style={styles.signUpLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ** Optimized Styling**
