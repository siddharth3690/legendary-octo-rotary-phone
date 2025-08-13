import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../styles/common";
import Button from "../components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { Directions } from "react-native-gesture-handler";
import { StackNavigationState, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EmployeeStackParams } from "./Employees_Stack";
const Index = () => {
  const navigation = useNavigation<NativeStackNavigationProp<EmployeeStackParams>>()
  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={{flex : 1 }}>
        <Button
          style={{position : 'absolute', bottom : 20 , right : 20}}
          width={70}
          type={"circle"}
          IconComponent={Entypo}
          iconName={"plus"}
          iconColor={"black"}
          iconSize={28}
          backgroundColor="rgba(32, 101, 211, 1)"
          onPress={() => navigation.navigate('new')}
          borderWidth={1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Index;
