import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeesStackNavigator from '../employees/Employees_Stack';
import Home_Stack from '../home/Home_Stack';
import Settings_Stack from '../settings/Settings_Stack'
import { Ionicons } from '@expo/vector-icons';
export type BottomTabParas = {
    home : undefined;
    employees : undefined;
    settings : undefined;

}

const Tab = createBottomTabNavigator<BottomTabParas>();


const Main_navigation = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6366F1',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 90,
          paddingBottom: 10,
          paddingTop: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tab.Screen 
        name="home" 
        component={Home_Stack}
        options={{
          tabBarIcon: ({ color, size  }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="employees" 
        component={EmployeesStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
          tabBarLabel: 'Employees',
        }}
      />
      <Tab.Screen 
        name="settings" 
        component={Settings_Stack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  )
}


export default Main_navigation