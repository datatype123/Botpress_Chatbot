import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import SignupScreen from './ui/signup';
import LoginScreen from './ui/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from './ui/chat';
import MenuChat from './ui/ChatInterface';
import { RealmProvider } from '@realm/react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RealmProvider>
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Chat" component={ChatScreen}/>
        <Stack.Screen name="MenuChat" component={MenuChat}/>
      </Stack.Navigator>
    </NavigationContainer>
    </RealmProvider>
  );
}
