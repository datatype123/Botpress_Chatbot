import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import ChatScreen from '../ui/chat';
import GroupChat from '../ui/GroupChat';
import AccountScreen from '../ui/account';
import { View,Image } from 'react-native';
import { useSelector } from 'react-redux';

const BottomNavigation = () => {
  const Tab = createBottomTabNavigator();
  const conversation_id = useSelector((state: any) => state.app.conversation_id);

  return (
    <Tab.Navigator
      initialRouteName="Conversations"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#fff', // Light theme background
          borderTopWidth: 0,
          elevation: 5,
          height: 65,
          borderRadius: 20,
          marginHorizontal: 10,
          position: 'relative',
          bottom: 10,
          paddingBottom: 10,
        },
        tabBarIcon: ({ focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'chatbubble-outline';

          switch (route.name) {
            case 'Chat':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'Conversations':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Account':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }

          return (
            <View style={{ alignItems: 'center' }}>
              <Ionicons name={iconName} size={28} color={focused ? '#007BFF' : '#555'} />
            </View>
          );
        },
        headerStyle: {
          backgroundColor: '#f8f9fa', // Light theme header
        },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen
        name="Conversations"
        component={GroupChat}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={require('../assets/conversations.png')} style={
              {
                width: 50,
                height:50
              }
            }/>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: `Conversation ${conversation_id}`,
          tabBarIcon: ({ focused }) => (
            <Image source={require('../assets/bot.png')} style={
            {
              width: 50,
              height:50
            }}/>
          ),
        }}
      />
      <Tab.Screen name="Account" component={AccountScreen} 
      options={{
        title:'Account',
        tabBarIcon: ({ focused }) => (
          <Image source={require('../assets/account.png')} style={
            {
              width: 50,
              height:50
              }}/>),}}/>
    </Tab.Navigator>
  );
};

export default BottomNavigation;
