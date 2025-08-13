import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Index from './index'

export type SettingsStackParams = {
    index : undefined
}
const Stack = createNativeStackNavigator<SettingsStackParams>()
const Home_Stack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="index" component={Index} />
    </Stack.Navigator>
  )
}

export default Home_Stack