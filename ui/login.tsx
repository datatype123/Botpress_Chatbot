import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert,
  Appearance
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAllUsers, getItem} from '../database/insertDB';
import { useDispatch, useSelector } from 'react-redux';
import { setUserKey } from '../redux/slice';
import { loginUser } from '../services/apiLogin';


export default function LoginScreen() {
  const [nickname, setNickname] = useState('');
  const [UserId, setUserId] = useState('');
  const [isSecure, setIsSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const waitForSeconds = (seconds = 2) => {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
  };
  

  const handleLogin = async () => {
    if (!nickname || !UserId) {
      setError('User ID and UserId are required.');
      return;
    }

    setIsLoading(true);

    try {
      const key = await getItem(nickname,'user_key');
      dispatch(setUserKey(key));
      loginUser(nickname,UserId, dispatch);
      await waitForSeconds(1.4);
      getAllUsers();
      setIsLoading(false);
      navigation.navigate("BottomNavigation");
    } catch (error) {
      setIsLoading(false);
      setError('Login failed. Please check your credentials.');
    }
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      setError('');
    }
  }, [error]);

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  toggleButtonText: {
    color: '#fff', fontSize: 16,
  },
  UserIdContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  eyeButton: {
    position: 'absolute',
    right: 15,
    bottom:20,
    padding:10,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotUserIdText: {
    color: '#007AFF',
    fontSize: 14,
    marginTop: 15,
  },
  signUpRedirect: {
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: '#666',
  },
  signUpLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});