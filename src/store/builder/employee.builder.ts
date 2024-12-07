import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";
import { route } from "../../utils/routes";
import { Employee } from "../../types";
  
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axiosInstance.get(route.employee.get);
    return response.data.employees;
  });
  export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee: Omit<Employee, 'id'>) => {
    const response = await axiosInstance.post(route.employee.post, employee);
    return response.data.employee;
  });
  
  export const updateEmployee = createAsyncThunk(
    'employees/updateEmployee',
    async (employee: Employee) => {
      const response = await axiosInstance.put(route.employee.put(employee.id), employee);
      return response.data.employee;
    }
  );
  
  export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: string) => {
    await axiosInstance.delete(route.employee.put(id));
    return id;
  });