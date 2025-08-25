import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FlashMessage from "react-native-flash-message";
import { Provider } from 'react-redux';
import BottomNavigation from './components/BottomNavigation';
import store from './redux/store';
import ChatScreen from './ui/Chat/chat';
import Conversation from './ui/Conversations/conversations';
import GroupChat from './ui/GroupChat';
import LoginScreen from './ui/login';
import SignupScreen from './ui/signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <Provider store={store}>
      <FlashMessage position="top" />
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Signup">
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chat"
            component={ChatScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GroupChat"
            component={GroupChat}
            options={{ title: 'Group Chat' }}
          />
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateConversation"
            component={Conversation}
            options={{ headerShown: true, title: "Create Conversation" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
