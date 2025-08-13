import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Employee  {
  id: string;
  fullName: string;
  role: string;
  department: string;
  dateOfJoining : any;  
  status : string;
  profilePicture : any

};


const STORAGE_KEY = 'employees';

// Save entire array
export const saveEmployees = async (employees: Employee[]): Promise<void> => {
  try {
    const json = JSON.stringify(employees);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error('Error saving employees:', error);
  }
};

// Get all employees
export const loadEmployees = async (): Promise<Employee[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.error('Error loading employees:', error);
    return [];
  }
};