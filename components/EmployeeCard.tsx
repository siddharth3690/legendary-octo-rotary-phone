import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Employe } from '../employees/new';


interface EmployeeCardProps {
  employee: Employe;
  onPress?: () => void;
  style?: any;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  onPress,
  style 
}) => {
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  const CardContent = () => (
    <View style={[styles.card, style]}>
      <View style={styles.cardContent}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileContainer}>
            {employee.profilePicture ? (
              <Image
                source={{ uri: employee.profilePicture }}
                style={styles.profileImage}
                defaultSource={require('../assets/icon.png')} // Optional default image
              />
            ) : (
              <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>
                  {getInitials(employee.fullName)}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Employee Details Section */}
        <View style={styles.detailsSection}>
          {/* Name and Status */}
          <View style={styles.headerRow}>
            <Text style={styles.name} numberOfLines={1}>
              {employee.fullName}
            </Text>
            <View style={[
              styles.statusBadge,
              employee.status === 'Active' ? styles.activeStatus : styles.inactiveStatus
            ]}>
              <Text style={[
                styles.statusText,
                employee.status === 'Active' ? styles.activeStatusText : styles.inactiveStatusText
              ]}>
                {employee.status}
              </Text>
            </View>
          </View>

          {/* Email */}
          <Text style={styles.email} numberOfLines={1}>
            {employee.email}
          </Text>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>🏢</Text>
              <Text style={styles.detailLabel}>Department: </Text>
              <Text style={styles.detailValue} numberOfLines={1}>
                {employee.department}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>💼</Text>
              <Text style={styles.detailLabel}>Role: </Text>
              <Text style={styles.detailValue} numberOfLines={1}>
                {employee.role}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailIcon}>📅</Text>
              <Text style={styles.detailLabel}>Joined: </Text>
              <Text style={styles.detailValue}>
                {formatDate(employee.dateOfJoining)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <CardContent />
      </TouchableOpacity>
    );
  

  
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardContent: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileSection: {
    marginRight: 16,
  },
  profileContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  detailsSection: {
    flex: 1,
    minWidth: 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#dcfce7',
  },
  inactiveStatus: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '500',
  },
  activeStatusText: {
    color: '#166534',
  },
  inactiveStatusText: {
    color: '#991b1b',
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  detailsContainer: {
    gap: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 8,
    width: 16,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
  },
  detailValue: {
    fontSize: 13,
    color: '#6b7280',
    flex: 1,
  },
});

// Example usage component (for demonstration)


export default EmployeeCard;