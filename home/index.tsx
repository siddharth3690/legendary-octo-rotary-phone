import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyles from "../styles/common"
import SummaryCard from '../components/SummaryCard'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Entypo from '@expo/vector-icons/Entypo'
import QuickActions from '../components/QuickAction'
const defaultActions = [
    {
      title: 'Add Employee',
      onPress: () => console.log('Add Employee pressed'),
      IconComponent: AntDesign,
      iconName: 'plus',
      iconColor: '#10B981',
      backgroundColor: '#F0FDF4'
    },
    {
      title: 'View All Employees',
      onPress: () => console.log('View All Employees pressed'),
      IconComponent: MaterialIcons,
      iconName: 'people',
      iconColor: '#3B82F6',
      backgroundColor: '#EFF6FF'
    },
    {
      title: 'Generate Report',
      onPress: () => console.log('Generate Report pressed'),
      IconComponent: Entypo,
      iconName: 'bar-graph',
      iconColor: '#8B5CF6',
      backgroundColor: '#F5F3FF'
    },
    {
      title: 'Settings',
      onPress: () => console.log('Settings pressed'),
      IconComponent: AntDesign,
      iconName: 'setting',
      iconColor: '#6B7280',
      backgroundColor: '#F9FAFB'
    }
  ];
const Index = () => {
  return (
    <SafeAreaView style ={globalStyles.container}>
      <View>
        <Text style={globalStyles.title}>👋 Hello,</Text>
        <Text style={globalStyles.text}> Here's what's happening today</Text>
      </View>
      <SummaryCard total={50} ontime={12} late={3}/>
      <QuickActions actions={defaultActions} />
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({})