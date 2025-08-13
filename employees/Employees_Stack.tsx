import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 👉 Import your screens
import Index from './index'
import New from './new';
import Edit from './[id]/edit';
import Detail from './[id]/detail';

// Define route param types
export type EmployeeStackParams = {
  index: undefined;
  new: undefined;
  employDetail: { id: string };
  edit: { id: string };
};

const Stack = createNativeStackNavigator<EmployeeStackParams>();

const EmployeesStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="index">
      <Stack.Screen name="index" component={Index} options={{ title: 'Employees' }} />
      <Stack.Screen name="new" component={New} options={{ title: 'Add Employee' }} />
      <Stack.Screen
        name="employDetail"
        component={Detail}
        options={{ title: 'Employee Detail' }}
      />
      <Stack.Screen
        name="edit"
        component={Edit}
        options={{ title: 'Edit Employee' }}
      />
    </Stack.Navigator>
  );
};

export default EmployeesStackNavigator;
