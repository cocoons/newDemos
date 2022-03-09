import * as React from 'react';
import { StyleSheet, Text, View, Button, Picker, } from 'react-native';
import { selectCurrentAuth} from '../../Login/LoginSlice';
import { useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { selectCurrentEmployeesList } from '../../Employee/EmployeeSlice';
import { useDispatch} from 'react-redux';
import { updateEmployeesList } from '../../Employee/EmployeeSlice';


var peopleToHireList = 	[
  {
    id: 9, 
    name: 'Alex', 
    fullName: 'Alexander Silveröhrt',
    avatar: '',
    title: 'Job seeker',
    source: '',
  },
  {
    id: 10, 
    name: 'SomeOtherGuy', 
    fullName: 'I Am The guy',
    avatar: '',
    title: 'Expert',
    source: '',
  }
]

export const HireFireScreen = () => {

  const dispatch = useDispatch()

  const currentAuth = useSelector(selectCurrentAuth)
  console.log('currentAuth in accountScreen is: ', currentAuth)
  const selectEmployeesList = useSelector(selectCurrentEmployeesList)

  const [selectedEmployee, setSelectedEmployee] = useState('select employee')
  const [selectedHireEmployee, setSelectedHireEmployee] = useState('select to hire')

  const [employeesList, setEmployeesList] = useState(selectEmployeesList)
  const [employeesToHireList, setEmployeesToHireList] = useState(peopleToHireList)

  const removeEmployee = () => {
    const tmpList = employeesList.filter((employee) => employee.name !== selectedEmployee)
    setEmployeesList(tmpList)
    dispatch(updateEmployeesList(tmpList))
    setSelectedEmployee('select employee')
  }
  const addEmployee = () => {
    const tmpList = employeesToHireList.filter( (hire) => hire.name === selectedHireEmployee)
    const ost = [...employeesList, ...tmpList]
    setEmployeesList(ost)
    dispatch(updateEmployeesList([...employeesList, ...tmpList]))

    setEmployeesToHireList(employeesToHireList.filter(it => it.name !== selectedHireEmployee))
    setSelectedHireEmployee('select to hire')
  }

    return (
    <View style={styles.layout}>
      {
        currentAuth.isAdmin === 'true' ? <AdminSettings 
        selectedHireEmployee={selectedHireEmployee} 
        setSelectedHireEmployee={setSelectedHireEmployee}
        employeesToHireList={employeesToHireList} 
        addEmployee={addEmployee}
        currentAuth={currentAuth} 
        removeEmployee={removeEmployee} 
        employeesList={employeesList} 
        selectedEmployee={selectedEmployee} 
        setSelectedEmployee={setSelectedEmployee}/>
        :
        <NoAdminSettings />
      }
    </View>
    )
  };

  const AdminSettings = (props) => {
    return (
      <View style={styles.layout}>
        <View style={styles.container}>
          
          <Text style={styles.title}>{props.currentAuth.username}</Text>
          <Text style={styles.title}>do you want to fire some people today? </Text>
          <Text style={styles.selectEmployeeTitle}>Pick an employee to fire</Text> 
              
          <Picker
            selectedValue={props.selectedEmployee}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => props.setSelectedEmployee(itemValue)}>
            <Picker.Item key={10} label={props.selectedEmployee} value={props.selectedEmployee} />
            {
              props.employeesList.map( employee => {
                return (
                    <Picker.Item key={employee.id} label={employee.name} value={employee.name} />
                )
              })
            }
          </Picker>      

          <View style={styles.button}>
            <Button color="#7394af" title="Fire selected" onPress={() => props.removeEmployee()} />
          </View>

          <Text style={styles.selectEmployeeTitle}>Pick an employee to hire</Text>     
          <Picker
            selectedValue={props.selectedHireEmployee}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => props.setSelectedHireEmployee(itemValue)}>
            <Picker.Item key={10} label={props.selectedHireEmployee} value={props.selectedHireEmployee} />
            {
              props.employeesToHireList.map( hire => {
                return (
                  <Picker.Item key={hire.id} label={hire.name} value={hire.name} />
                )
              })
            }
          </Picker>      

          <View style={styles.button}>
            <Button color="#7394af" title="Hire selected" onPress={() => props.addEmployee()} />
          </View>

        </View>    
        
      </View>
    )
  }

  const NoAdminSettings = () => {
    return (
      <Text style={styles.title}>You are not admin.</Text>
    )
  }


  const styles = StyleSheet.create({
    layout: {
      flex: 1,
      justifyContent: 'center',
      padding: 8,
      alignItems: "center"
    },
    container: {
      justifyContent: 'center',
      padding: 8,
      alignItems: "center"
    },    
    button: {
      marginTop: 10,
      width: 240,

    },    
    picker: {
      height: 40, 
      width: 240,
      color: '#7394af',
      backgroundColor: '#d0dbe4'
      
    },    
    settingsScreenTitle: {
      margin: 10,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    selectEmployeeTitle: {
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      fontStyle: 'normal',
      fontFamily: 'kanit',
      lineHeight: 14,
      paddingTop: 12, 
      textTransform: 'uppercase', 
      textAlign: 'left',
      justifyContent: 'left',
    },    
  });