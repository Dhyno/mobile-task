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

function MyTab(){

  return(
    <Tab.Navigator
      initialRouteName="Calculator"
        screenOptions={({ route }) => ({
            
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Calculator') {
                iconName = focused ? "calculator" : "calculator-outline";
              } else if (route.name === 'Todo') {
                iconName = focused ? "notifications-circle"
                : "notifications-circle-outline";
              }
  
            //   You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
        })}
        >
            
        <Tab.Screen name="Calculator" component={Calculator} />
        <Tab.Screen name="Todo" component={TodoApp} />
    </Tab.Navigator>
  )
}

export default function Container() {
  return (
    <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen
            name="Main"
            component={MyTab}
            options={{
              headerShown: false,
            }}
          />

        </Stack.Navigator>
    </NavigationContainer>
  )
}