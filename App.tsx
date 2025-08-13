import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Main_navigation from "./navigations/main_navigation";
import { EmployeeProvider } from "./utils/context";
export default function App() {
  return (
    <SafeAreaProvider>
      <EmployeeProvider>
        <NavigationContainer>
          <Main_navigation />
        </NavigationContainer>
      </EmployeeProvider>
    </SafeAreaProvider>
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
