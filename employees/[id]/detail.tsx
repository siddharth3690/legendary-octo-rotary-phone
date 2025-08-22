import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EmployeeStackParams } from '../Employees_Stack';
import { supabase } from '../../services/superbase';
import { Employe } from '../new';
import CustomButton from '../../components/CustomButton';


type EmployeeDetailRouteProp = RouteProp<EmployeeStackParams, 'employDetail'>;

const Detail = ({ route }: { route: EmployeeDetailRouteProp }) => {
  const { id } = route.params;
  const [employeeData, setEmployeeData] = useState<Employe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data: employees, error } = await supabase
        .from('employes')
        .select('*')
        .eq('id', id)
        .single(); // Use .single() since we expect only one employee
      
      if (error) {
        console.log('Supabase error:', error);
        setError(error.message);
        return;
      }
      
      if (employees) {
        setEmployeeData(employees as Employe);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch employee details');
    } finally {
      setLoading(false);
    }
  };

  // Fixed useEffect - added dependency array
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]); // Add id as dependency

  const formatDate = (date: Date | string) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Invalid Date';
    }
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#2065d3" />
          <Text style={styles.loadingText}>Loading employee details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <CustomButton
            text="Try Again"
            onPress={fetchData}
            backgroundColor="#2065d3"
            style={styles.retryButton} width={10} type={'circle'} borderWidth={1}          />
        </View>
      </SafeAreaView>
    );
  }

  // No employee found state
  if (!employeeData) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Employee not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            {employeeData.profilePicture ? (
              <Text>Profile Image Here</Text>
              // You can replace this with actual image component
              // <Image source={{ uri: employeeData.profilePicture }} style={styles.profileImage} />
            ) : (
              <View style={styles.initialsContainer}>
                <Text style={styles.initialsText}>
                  {employeeData.fullName
                    .split(' ')
                    .map(name => name.charAt(0).toUpperCase())
                    .slice(0, 2)
                    .join('')}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.nameSection}>
            <Text style={styles.nameText}>{employeeData.fullName}</Text>
            <Text style={styles.emailText}>{employeeData.email}</Text>
            <View style={[
              styles.statusBadge,
              employeeData.status === 'Active' ? styles.activeStatus : styles.inactiveStatus
            ]}>
              <Text style={[
                styles.statusText,
                employeeData.status === 'Active' ? styles.activeStatusText : styles.inactiveStatusText
              ]}>
                {employeeData.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Details Section */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>Employee Details</Text>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Department:</Text>
            <Text style={styles.detailValue}>{employeeData.department}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Role:</Text>
            <Text style={styles.detailValue}>{employeeData.role}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Date of Joining:</Text>
            <Text style={styles.detailValue}>
              {formatDate(employeeData.dateOfJoining)}
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Employee ID:</Text>
            <Text style={styles.detailValue}>{employeeData.id}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    marginTop: 10,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  initialsContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
  },
  nameSection: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 5,
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activeStatus: {
    backgroundColor: '#dcfce7',
  },
  inactiveStatus: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  activeStatusText: {
    color: '#166534',
  },
  inactiveStatusText: {
    color: '#991b1b',
  },
  detailsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#6b7280',
    flex: 1,
    textAlign: 'right',
  },
});