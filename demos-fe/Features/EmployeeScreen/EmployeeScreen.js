import * as React from 'react';
import { StyleSheet, Text, Image, View, Button, Picker, TextInput, TouchableOpacity} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import axios from 'axios'
import { useEffect, useState} from 'react';

const Heading = (props) => (
  <Text style={blipCardstyles.heading}>
    {props.text}
  </Text>
);

let toDoListCollector = []

export const EmployeeScreen = ({route, navigation}) => {
  const headerHeight = useHeaderHeight(); 
  console.log(`route.params is: `, route.params)

  const [userToDos, setUserToDos] = useState()
  const [waitForData, setWaitForData] = useState(false)
  const [selectedToDoList, setSelectedTodoList] = useState()
  //if need to update a users ToDO List todos in backend memory the post finalUserToDoObject to function sendUpdateUserTodos
  const [finalUserToDoObject, setFinalUserToDoObject] = useState({id: 100, userId: 0, name: '', date: '', toDo: []})
  const [currToDoList, setCurrToDoList ] = useState()
  const [newToDo, setNewTodo] = useState("Add ToDo here")
  
  // API
  const getUserToDos = (userId) => {
    console.log('userId is: ', userId)
    axios
      .post('http://172.29.91.47:8080/' + `valtech/getUserToDosByUserId`, {userId: userId} )
      .then(res => {
          console.log(`received user data in getUserToDos is:`, res.data)
          setUserToDos(res.data)
          setWaitForData(true)
      })
  }

  const sendUpdateUserTodos = (todoObj) => {
    console.log('todoObj is: ', todoObj)
    axios
      .post('http://172.29.91.47:8080/' + `hiotlabs/updateUserTodos`, {todoObj} )
      .then(res => {
          console.log(`received user data in sendUpdateUserTodos is:`, res.data)
      })
  }  
  
  // Controllers
  const removeToDo = (todoId) => {
    const tmpToDoList = currToDoList.toDo.filter((item) => item.id !== todoId);
    var final = currToDoList
    final.toDo = tmpToDoList
    setCurrToDoList({...final})
    setFinalUserToDoObject(final)
  }  

  const addToDo = (todoId) => {
    var tmpList = currToDoList
    //can fail but its just a demo
    tmpList.toDo.push({id: Math.floor(Math.random() * 1000), desc: newToDo})
    setCurrToDoList({...tmpList})
    setFinalUserToDoObject(tmpList)
    setNewTodo("Add ToDo here")
  }

  const onSubmitToDoList = () => {
    //no use to post it since its just inMemory in BE but if re-run app and want to see the changes onLoad then post it. "Button submit"
    //just uncomment
    //sendUpdateUserTodos(finalUserToDoObject)
  }
   
  const updateUserToDoList = (itemValue, itemIndex) => {
    var tmpList = []
    if (userToDos.length <= 1) {
      setCurrToDoList(userToDos[0])
    }
    else {
      tmpList = userToDos.filter(it => it.id === itemIndex)[0]
      setCurrToDoList(tmpList)
    }

    setSelectedTodoList(itemValue)
  }

  // Init
  useEffect(() => {
    getUserToDos(route.params.id)
  },[])

  //Main employeeScreen we run from here
  return (
    <>
      <View style={styles.layout}>
        <View >
          <Text style={styles.heading}> {route.params.title} </Text>
          <EmployeeAvatar url={route.params.avatar} />
          <Text style={styles.title}> {route.params.fullName} </Text>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              <View>
                <Text style={{width: "100%", textAlign: 'center'}}> ToDos </Text>
              </View>
            <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
          </View>
        </View>

        <View style={styles.container}>
          {
            !waitForData ? <></> : 
            <>
              <Text style={styles.todoTitle}> Pick a ToDo List</Text>
              <Picker
                selectedValue={selectedToDoList}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => updateUserToDoList(itemValue, itemIndex)}>
                <Picker.Item key={20} label="Select ToDo list" value={selectedToDoList} />
                {
                  userToDos.map( todo => {
                    return (
                      <Picker.Item key={todo.id} label={todo.name} value={todo.name} />
                    )
                  })
                }
              </Picker>
            </>
          }
        </View>

        <View style={{marginTop: 20}}>
          {
            !selectedToDoList ? <></> 
            : 
            <ToDos 
              currToDoList={currToDoList} 
              addToDo={addToDo}
              removeToDo={removeToDo}
              onSubmitToDoList={onSubmitToDoList}
              newTodo={newToDo}
              setNewTodo={setNewTodo}
            />
          }
        </View>
      </View>
    </>
  )
}

  //##########
  const ToDos = (props) => {
    return (
      <View style={{marginTop: 10}}>

        {props.currToDoList.toDo.map( (todo, index) => {
            return (
              <View key={todo.id}>
                <View>
                  {
                    index === 0 && 
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 1}} >
                      <TextInput style={{backgroundColor: '#e8edf2', color: 'black', marginRight: 2}}
                        placeholder={props.newToDo}
                        value={props.newTodo}
                        onChangeText={props.setNewTodo}
                      />
                      <TouchableOpacity style={{backgroundColor: '#d0dbe4', width: 37, height: 33, justifyContent: "center", textAlign: "center"}} onPress={() => props.addToDo(todo.id) }>
                        <Text style={{color: 'black'}}>+</Text>
                      </TouchableOpacity>                    
                    </View>                  
                  }                   
                </View>
              
                <View  style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 1}} >
                  {
                    index % 2 ? 
                    <>
                      <TextInput style={{backgroundColor: '#e8edf2', color: 'black', marginRight: 2}}
                        placeholder={todo.desc}
                        value={todo.desc}
                      />
                      <TouchableOpacity style={{backgroundColor: '#d0dbe4', width: 37, height: 33, justifyContent: "center", textAlign: "center"}} onPress={() => props.removeToDo(todo.id) }>
                        <Text style={{color: 'black'}}>-</Text>
                      </TouchableOpacity>
                    </>
                    : 
                    <>
                      <TextInput style={{backgroundColor: '#d0dbe4',  color: 'black', marginRight: 2}}
                        placeholder={todo.desc}
                        value={todo.desc}
                      />
                      <TouchableOpacity style={{backgroundColor: '#e8edf2', width: 37, height: 33, justifyContent: "center", textAlign: "center"}} onPress={() => props.removeToDo(todo.id) }>
                        <Text style={{color: 'black'}}>-</Text>
                      </TouchableOpacity>
                    </>
                  }
                </View>
              </View>
            )
          })
        }  
          <View style={{marginTop: 40}}>
            <Button  color="#7394af" title="submit" onPress={() => props.onSubmitToDoList() } />
          </View>    
      </View>
    )
  }

const EmployeeAvatar = (props) => {
  return (
    <Image 
      style={styles.img}
      source={{ uri: props.url }}
    />
  )
}

  const styles = StyleSheet.create({
    layout: {
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    container: {
      justifyContent: 'center',
      padding: 8,
      alignItems: "center"
    },
    remove: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },    
    title: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    heading: { 
      color: '#08060B',
      fontSize: 16,
      fontWeight: '600',
      fontStyle: 'normal',
      fontFamily: 'Kanit',
      lineHeight: 22,
      paddingTop: 20,
      paddingBottom: 12,
      textAlign: 'center',
      textTransform: 'uppercase', 
    },
    img: {
      borderRadius: '50%',
      width: 128,
      height: 128,
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto'    
    },
    picker: {
      height: 40, 
      width: 240,
      color: 'black',
      backgroundColor: '#d0dbe4'
    },
    todoTitle: {
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      fontStyle: 'normal',
      fontFamily: 'kanit',
      lineHeight: 14,
      paddingTop: 12, 
      textTransform: 'uppercase', 
      textAlign: 'left',
    },      
  });  





