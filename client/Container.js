import { View, Text } from 'react-native'
import React from 'react'

import Calculator from './src/screens/calculator/Index';
import TodoApp from './src/screens/todo/Index';

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Create Stack Navigation
const Stack = createStackNavigator();

//Create Bottom Tab Navigation
const Tab = createBottomTabNavigator();

export default function Container() {
  return (
    <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
      
                  if (route.name === 'Calculator') {
                    iconName = focused
                      ? 'calculator'
                      : 'book-outline';
                  } else if (route.name === 'Todo') {
                    iconName = focused ? 'book-outline' : 'calculator';
                  }
      
                //   You can return any component that you like here!
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}
        >
            
            <Tab.Screen name="Todo" component={TodoApp} />
            <Tab.Screen name="Calculator" component={Calculator} />
        </Tab.Navigator>
    </NavigationContainer>
  )
}