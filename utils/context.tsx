import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Employee, loadEmployees, saveEmployees } from './storage';

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (emp: Employee) => void;
  removeEmployee: (id: string) => void;
  refreshEmployees: () => void;
}

export const EmployeeContext = createContext<EmployeeContextType | null>(null);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Load from AsyncStorage on app start
  useEffect(() => {
    refreshEmployees();
  }, []);

  const refreshEmployees = async () => {
    const loaded = await loadEmployees();
    setEmployees(loaded);
  };

  const addEmployee = async (emp: Employee) => {
    const updated = [...employees, emp];
    setEmployees(updated);
    await saveEmployees(updated);
  };

  const removeEmployee = async (id: string) => {
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    await saveEmployees(updated);
  };

  return (
    <EmployeeContext.Provider value={{ employees, addEmployee, removeEmployee, refreshEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};
