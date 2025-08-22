import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { ComponentType } from "react";

interface ButtonProps {
  text?: string; // Made optional with proper typing
  onPress: () => void; // Removed null union - onPress should always be a function
  width: number;
  height?: number; // Added height prop for better control
  type: "circle" | "rectangle"; // Fixed typo and spacing
  borderWidth: number; // Fixed camelCase
  borderColor?: string; // Added border color prop
  backgroundColor?: string; // Added background color prop
  IconComponent?: ComponentType<any>; // Made optional
  iconName?: string; // Made optional
  iconColor?: string; // Made optional
  iconSize?: number; // Added icon size prop
  textColor?: string; // Added text color prop
  textSize?: number; // Added text size prop
  style?: ViewStyle; // Fixed style type
  disabled?: boolean; // Added disabled state
}

const CustomButton = ({
  text,
  onPress,
  width,
  height , // Default height
  type,
  borderWidth,
  borderColor = "#000",
  backgroundColor = "transparent",
  IconComponent,
  iconName,
  iconColor = "#000",
  iconSize = 28,
  textColor = "#000",
  textSize = 16,
  style,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: "row",
          width: width,
          height: type === "circle" ? width : height,
          borderRadius: type === "circle" ? width / 2 : 8,
          borderWidth: borderWidth,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {IconComponent && iconName && (
        <IconComponent 
          name={iconName} 
          size={iconSize} 
          color={iconColor}
          style={text ? { marginRight: 8 } : undefined}
        />
      )}
      
      {text && (
        <Text style={{ 
          color: textColor, 
          fontSize: textSize,
          fontWeight: '500'
        }}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  )
};

export default CustomButton;

const styles = StyleSheet.create({
  // You can add common button styles here if needed
  defaultButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});