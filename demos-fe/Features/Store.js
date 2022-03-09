import { configureStore } from '@reduxjs/toolkit';
import loginSliceReducer from './Login/LoginSlice';
import envSliceReducer from './Env/EnvSlice'
import EmployeesListReducer from './Employee/EmployeeSlice';

export const store = configureStore({
  reducer: {
    login: loginSliceReducer,
    appEnv: envSliceReducer,
    employeesList: EmployeesListReducer
  },
});