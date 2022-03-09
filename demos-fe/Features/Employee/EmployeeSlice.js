import { createSlice}  from '@reduxjs/toolkit'

const employeesListSlice = createSlice({
    name: 'employeesList',
    initialState: {'employeesList': [{}]},
    reducers: {
        updateEmployeesList: (state, action) => {
            return action.payload
        }
    }
})

export const { updateEmployeesList } = employeesListSlice.actions;
export const selectCurrentEmployeesList = (state) => state.employeesList;  //store.employeesList

export default employeesListSlice.reducer;