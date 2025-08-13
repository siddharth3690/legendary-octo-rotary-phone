import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { ComponentType } from 'react'
import globalStyles from '../styles/common'
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

interface Actionprops {
  title: string;
  onPress : ()=> void;
  IconComponent: ComponentType<any>; // e.g., MaterialIcons
  iconName: string;
  iconColor: string;
  backgroundColor: string;
}

interface QuickActionsProps {
  actions: Actionprops[];
}

const ActionButton = ({ title, onPress, IconComponent, iconName, iconColor = '#3B82F6', backgroundColor = '#F3F4F6' } : Actionprops) => {
  return (
    <TouchableOpacity 
      style={[styles.actionButton, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <IconComponent name={iconName} size={18} color={iconColor} style={styles.actionIcon} />
      <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
  );
};

const QuickActions = ({ actions  } : QuickActionsProps) => {
  // Default actions if none provided
  


  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <AntDesign name="plus" size={20} color="#374151" />
        <Text style={styles.headerTitle}>Quick Actions</Text>
      </View>
      
      {/* Actions Container */}
      <ScrollView 
        
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {actions.map((action, index) => (
          <ActionButton
            key={index}
            title={action.title}
            onPress={action.onPress}
            IconComponent={action.IconComponent}
            iconName={action.iconName}
            iconColor={action.iconColor}
            backgroundColor={action.backgroundColor}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8FAFC',
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 8,
  },
  scrollView: {
    flexGrow: 0,
    
  },
  scrollContainer: {
    paddingRight: 0,
  },
  actionButton: {
    marginVertical : 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 140,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionIcon: {
    marginRight: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    flex: 1,
  },
});

export default QuickActions