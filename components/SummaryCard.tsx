import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { ComponentType } from 'react'
import globalStyles from '../styles/common'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

interface Cardprops {
  title: string;
  value: number | string;
  IconComponent: ComponentType<any>; // e.g., MaterialIcons
  iconName: string;
  iconColor: string;
  borderColor: string;
}

interface SummaryCardprops {
    total : number | string,
    ontime : number | string,
    late : number | string, 
}

const Card = ({ title, value, IconComponent, iconName, iconColor, borderColor } : Cardprops) => {
  return (
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      <View style={styles.cardContent}>
        <IconComponent name={iconName} size={28} color={iconColor} />
        <Text style={styles.cardValue}>{value}</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
};

const SummaryCard = ({total , ontime , late} : SummaryCardprops) => {
  const cardData = [
    {
      title: 'Total\nEmployees',
      value: total,
      IconComponent: MaterialIcons,
      iconName: 'people',
      iconColor: '#3B82F6',
      borderColor: '#3B82F6'
    },
    {
      title: 'On Time\nToday',
      value: ontime,
      IconComponent: AntDesign,
      iconName: 'checkcircle',
      iconColor: '#10B981',
      borderColor: '#10B981'
    },
    {
      title: 'Late\nToday',
      value: late,
      IconComponent: MaterialIcons,
      iconName: 'schedule',
      iconColor: '#EF4444',
      borderColor: '#EF4444'
    }
  ];

  return (
    <View style={[ styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <Entypo name="bar-graph" size={24} color="#374151" />
        <Text style={styles.headerTitle}>Summary Cards</Text>
      </View>
      
      {/* Cards Container */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        style={styles.scrollView}
      >
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            IconComponent={card.IconComponent}
            iconName={card.iconName}
            iconColor={card.iconColor}
            borderColor={card.borderColor}
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
    paddingRight: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    minWidth: 110,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    alignItems: 'center',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 4,
  },
  cardTitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '500',
  },
});

export default SummaryCard