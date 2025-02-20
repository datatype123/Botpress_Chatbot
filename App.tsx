import SignupScreen from './ui/signup';
import LoginScreen from './ui/login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ChatScreen from './ui/chat';
import GroupChat from './ui/GroupChat';
import BottomNavigation from './components/BottomNavigation';
import { Provider } from 'react-redux';
import store from './redux/store';
import Conversation from './ui/conversations';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
                options={{headerShown:true,title:"Create Conversation"}}
              />
            </Stack.Navigator>
          </NavigationContainer>
    </Provider>
  );
}
