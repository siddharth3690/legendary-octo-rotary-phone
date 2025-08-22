import { View, Text, ActivityIndicator, RefreshControl, Button } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import globalStyles from "../styles/common";
import CustomButton from "../components/CustomButton";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EmployeeStackParams } from "./Employees_Stack";
import EmployeeCard from "../components/EmployeeCard";
import { Employe } from "./new";
import { supabase } from "../services/superbase";

const Index = () => {
  const navigation = useNavigation<NativeStackNavigationProp<EmployeeStackParams>>();
  const [data, setData] = useState<Employe[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Use useCallback to prevent infinite re-renders in useEffect
  const fetchData = useCallback(async () => {
    try {
      // Don't set loading to true if we're just refreshing
      if (!refreshing) {
        setLoading(true);
      }
      setError(null);
      
      const { data: employees, error } = await supabase
        .from('employes')
        .select('*');
      
      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        return;
      }
      
      if (employees) {
        setData(employees as Employe[]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);

  // Fixed useEffect dependency
  useEffect(() => {
    fetchData();
  }, []); // Remove fetchData from dependency array to prevent infinite loop

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, [fetchData]);

  // Fixed render function
  const renderItem = ({ item }: { item: Employe }) => {
    return (
      <EmployeeCard 
        employee={item} 
        onPress={() => {
          navigation.navigate('employDetail', { id : item.id?item.id:0});
          // You can navigate to employee details here if needed
          // navigation.navigate('EmployeeDetails', { employeeId: item.id });
        }}
      />
    );
  };

  // Handle empty state
  const renderEmptyState = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
      <Text style={{ fontSize: 16, color: '#666', marginBottom: 10 }}>
        No employees found
      </Text>
      <Button
        title="Add First Employee"
        onPress={() => navigation.navigate('new')}
        color="rgba(32, 101, 211, 1)"
      />
    </View>
  );

  // Handle error state
  if (error) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'red', marginBottom: 20 }}>
            {error}
          </Text>
          <Button
            title="Try Again"
            onPress={() => fetchData()}
            color="rgba(32, 101, 211, 1)"
          />
        </View>
      </SafeAreaView>
    );
  }

  // Handle loading state
  if (loading && !refreshing) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="rgba(32, 101, 211, 1)" />
          <Text style={{ marginTop: 10, color: '#666' }}>Loading employees...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={{ paddingBottom: 100 }} // Add padding for floating button
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['rgba(32, 101, 211, 1)']} // Android
            tintColor="rgba(32, 101, 211, 1)" // iOS
          />
        }
      />
      
      {/* Floating Action Button */}
      <CustomButton
        style={{ 
          position: 'absolute', 
          bottom: 20, 
          right: 20,
          elevation: 8, // Android shadow
          shadowColor: '#000', // iOS shadow
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
        }}
        width={70}
        type={"circle"}
        IconComponent={Entypo}
        iconName={"plus"}
        iconColor={"white"} // Changed to white for better contrast
        iconSize={28}
        backgroundColor="rgba(32, 101, 211, 1)"
        onPress={() => navigation.navigate('new')}
        borderWidth={0} // Remove border for cleaner look
      />
    </SafeAreaView>
  );
};

export default Index;