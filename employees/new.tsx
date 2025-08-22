import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  Platform,
  
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { departments, statusOptions } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { EmployeeStackParams } from "./Employees_Stack";
import { EmployeeContext } from "../utils/context";
import { supabase } from "../services/superbase";

export type Employe = {
  id ?: number;
  fullName: string;
  email: string;
  role: string;
  department: string;
  dateOfJoining: Date;
  status: "Active" | "Inactive"; // safer with union
  profilePicture: string | null; // URL or null
};

const AddEmployeeScreen = () => {
  

  const update_database = async (Employe_data: Employe) => {
    try {
      // Convert Date to ISO string for Supabase
      const dataToInsert = {
        fullName: Employe_data.fullName, // Note: using snake_case for database column
        email: Employe_data.email,
        role: Employe_data.role,
        department: Employe_data.department,
        dateOfJoining: Employe_data.dateOfJoining, // Convert Date to string
        status: Employe_data.status,
        profilePicture: Employe_data.profilePicture,
      };

      const { data, error } = await supabase
        .from("employes") // Fixed typo: 'employes' -> 'employees'
        .insert([dataToInsert])
        .select();

      if (error) {
        console.error("Error inserting employee:", error);
        throw error;
      }

      console.log("Employee added successfully:", data);
      return data;
    } catch (err) {
      console.error("Failed to add employee:", err);
      throw err;
    }
  };

  const [EmployeData, setEmployeData] = useState<Employe>({
  
    fullName: "",
    email: "",
    role: "",
    department: "",
    dateOfJoining: new Date(),
    status: "Active",
    profilePicture: null,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<EmployeeStackParams>>();
  const context = useContext(EmployeeContext);
  if (!context) return null;

  

  const handleInputChange = (field: string, value: string | Date) => {
    setEmployeData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || EmployeData.dateOfJoining;
    setShowDatePicker(Platform.OS === "ios");
    handleInputChange("dateOfJoining", currentDate);
  };

  const EmployeatDate = (date: Date) => {
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleUploadProfilePicture = () => {
    Alert.alert("Upload Profile Picture", "Choose an option", [
      { text: "Camera", onPress: () => console.log("Open Camera") },
      { text: "Gallery", onPress: () => console.log("Open Gallery") },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleSaveEmployee = () => {
    if (
      !EmployeData.fullName ||
      !EmployeData.email ||
      !EmployeData.role ||
      !EmployeData.department
    ) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(EmployeData.email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    update_database(EmployeData);
    console.log("Employee Data:", EmployeData);
    navigation.replace("index");
  };

  const DepartmentPicker = () => (
    <View style={styles.pickerContainer}>
      {departments.map((dept, index) => (
        <TouchableOpacity
          key={index}
          style={styles.pickerItem}
          onPress={() => {
            handleInputChange("department", dept);
            setShowDepartmentPicker(false);
          }}
        >
          <Text style={styles.pickerItemText}>{dept}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.EmployeContainer}>
          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>👤 Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="John Doe"
              value={EmployeData.fullName}
              onChangeText={(text) => handleInputChange("fullName", text)}
            />
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📧 Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="johndoe@email.com"
              value={EmployeData.email}
              onChangeText={(text) => handleInputChange("email", text)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Role / Position */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🧾 Role / Position</Text>
            <TextInput
              style={styles.textInput}
              placeholder="UI Designer"
              value={EmployeData.role}
              onChangeText={(text) => handleInputChange("role", text)}
            />
          </View>

          {/* Department */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🏢 Department</Text>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowDepartmentPicker(!showDepartmentPicker)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  !EmployeData.department && styles.placeholderText,
                ]}
              >
                {EmployeData.department || "Select Department"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            <Text style={styles.helperText}>(e.g., Tech, HR, Sales)</Text>

            {showDepartmentPicker && <DepartmentPicker />}
          </View>

          {/* Date of Joining */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📅 Date of Joining</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>
                {EmployeatDate(EmployeData.dateOfJoining)}
              </Text>
              <Text style={styles.calendarIcon}>⬇️</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={EmployeData.dateOfJoining}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Status */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🔘 Status</Text>
            <View style={styles.radioGroup}>
              {statusOptions.map((status, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.radioOption}
                  onPress={() => handleInputChange("status", status)}
                >
                  <View style={styles.radioButton}>
                    {EmployeData.status === status && (
                      <View style={styles.radioButtonSelected} />
                    )}
                  </View>
                  <Text style={styles.radioText}>{status}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Upload Profile Picture */}
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleUploadProfilePicture}
          >
            <Text style={styles.uploadButtonText}>
              ➕ Upload Profile Picture (Optional)
            </Text>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveEmployee}
          >
            <Text style={styles.saveButtonText}>📤 Save Employee</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    fontSize: 24,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  scrollView: {
    flex: 1,
  },
  EmployeContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  dropdownButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  dropdownArrow: {
    fontSize: 12,
    color: "#666",
  },
  helperText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    fontStyle: "italic",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginTop: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  pickerItem: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#333",
  },
  dateButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  calendarIcon: {
    fontSize: 16,
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
    marginBottom: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  radioText: {
    fontSize: 16,
    color: "#333",
  },
  uploadButton: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderStyle: "dashed",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 30,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
});

export default AddEmployeeScreen;
