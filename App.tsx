import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main_navigation from "./navigations/main_navigation";
import { EmployeeProvider } from "./utils/context";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App() {
  return (
    <GestureHandlerRootView style={{flex :1}}>
    <SafeAreaProvider>
      <EmployeeProvider>
        <NavigationContainer>
          <Main_navigation />
        </NavigationContainer>
      </EmployeeProvider>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
