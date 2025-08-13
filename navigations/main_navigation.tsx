import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EmployeesStackNavigator from '../employees/Employees_Stack';
import Home_Stack from '../home/Home_Stack';
import Settings_Stack from '../settings/Settings_Stack'

export type BottomTabParas = {
    home : undefined;
    employees : undefined;
    settings : undefined;

}

const Tab = createBottomTabNavigator<BottomTabParas>();

const Main_navigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown : false}}>
        <Tab.Screen name="home" component={Home_Stack} />
        <Tab.Screen name="employees" component={EmployeesStackNavigator} />
        <Tab.Screen name="settings" component={Settings_Stack} />
    </Tab.Navigator>
  )
}

export default Main_navigation